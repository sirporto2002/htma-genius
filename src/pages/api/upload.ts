import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import { admin } from "../../lib/firebaseAdmin"; // CORRECTED: Using named import
import fs from "fs";

// Disable Next.js's default body parser to allow formidable to stream the file
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // We only want to handle POST requests for uploads
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    // Use a Promise to handle the formidable callback-based API
    const data: { files: any } = await new Promise((resolve, reject) => {
      const form = new IncomingForm();
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ files });
      });
    });

    // Check if a file was actually uploaded
    const uploadedFile = data.files.file?.[0];
    if (!uploadedFile) {
      return res.status(400).json({ error: "No file was uploaded." });
    }

    // Prepare to upload to Firebase Storage
    const bucket = admin.storage().bucket(); // Your default Firebase Storage bucket
    const tempFilePath = uploadedFile.filepath; // The temporary path on the server
    
    // Create a unique name for the file in Firebase Storage
    const destinationFileName = `uploads/${Date.now()}-${uploadedFile.originalFilename}`;

    // Stream the file from the temporary path to Firebase Storage
    await bucket.upload(tempFilePath, {
      destination: destinationFileName,
      metadata: {
        contentType: uploadedFile.mimetype,
      },
    });

    // Clean up the temporary file from the server's filesystem
    fs.unlinkSync(tempFilePath);

    // Respond with success message
    return res.status(200).json({ message: "File uploaded successfully!" });

  } catch (error) {
    console.error("Error during file upload:", error);
    // Be careful not to leak sensitive error details to the client
    return res.status(500).json({ error: "An internal server error occurred." });
  }
}