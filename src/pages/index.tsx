import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs"
import { bucket } from "..//lib/firebaseAdmin";








// Disable Next.js default body parser for file streams
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper logging
function logInfo(context: string, message: string) {
  console.log(`[INFO] [${new Date().toISOString()}] ${context}: ${message}`);
}
function logError(context: string, error: unknown) {
  console.error(`[ERROR] [${new Date().toISOString()}] ${context}:`, error);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      logError("Form Parse", err);
      return res.status(500).json({ message: "File parsing failed" });
    }

    try {
      const file = files.file as formidable.File;
      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Create a unique file name inside "uploads/"
      const destFileName = `uploads/${Date.now()}-${file.originalFilename}`;
      const destination = bucket.file(destFileName);

      // Upload file to Firebase Storage
      await bucket.upload(file.filepath || file.path, {
        destination: destFileName,
        metadata: { contentType: file.mimetype || "application/octet-stream" },
      });

      // Make file public
      await destination.makePublic();

      // Generate public URL
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destFileName}`;
      logInfo("Firebase Upload", `✅ File uploaded to: ${publicUrl}`);

      return res.status(200).json({
        message: "File uploaded successfully!",
        url: publicUrl,
      });
    } catch (error) {
      logError("Upload Handler", error);
      return res.status(500).json({ message: "Unexpected server error" });
    }
  });
}
