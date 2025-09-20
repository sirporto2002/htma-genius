import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import admin from "../../lib/firebaseAdmin"; // adjust path if needed
import fs from "fs";

// Disable Next.js default body parsing (needed for file streams)
export const config = {
  api: {
    bodyParser: false,
  },
};

// Logging helpers
function logInfo(context: string, message: string, data?: unknown) {
  console.log(`[INFO] [${new Date().toISOString()}] ${context}: ${message}`, data || "");
}

function logError(context: string, error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[ERROR] [${new Date().toISOString()}] ${context}: ${message}`, error);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const bucket = admin.storage().bucket();
    const form = new IncomingForm({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        logError("Formidable Parsing", err);
        return res.status(500).json({ message: "Error parsing file" });
      }

      const file = files.file;
      if (!file || Array.isArray(file)) {
        logError("File Upload", "No valid file provided");
        return res.status(400).json({ message: "No file uploaded" });
      }

      const uploadedFile = file as any;
      const destination = `uploads/${Date.now()}-${uploadedFile.originalFilename}`;

      try {
        // Upload to Firebase Storage
        const [uploaded] = await bucket.upload(uploadedFile.filepath, { destination });

        // Clean up local temp file
        fs.unlinkSync(uploadedFile.filepath);

        // Generate signed URL valid for 7 days
        const [url] = await uploaded.getSignedUrl({
          action: "read",
          expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        });

        logInfo("Upload Success", "File uploaded successfully", { url, destination });

        return res.status(200).json({
          message: "✅ Upload successful",
          url,
        });
      } catch (uploadErr) {
        logError("Firebase Upload", uploadErr);
        return res.status(500).json({ message: "Upload failed" });
      }
    });
  } catch (e) {
    logError("Unexpected Server Error", e);
    if (!res.headersSent) {
      return res.status(500).json({ message: "Unexpected server error" });
    }
  }
}
