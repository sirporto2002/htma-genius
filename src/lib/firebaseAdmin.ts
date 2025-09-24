import * as admin from 'firebase-admin';

// This is the service account key you download from Firebase
// It's retrieved from environment variables for security
const serviceAccount: admin.ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  // The private key must have newlines replaced with \\n in your .env file
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

// Check if the app is already initialized to prevent errors in serverless environments
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      // Add your storage bucket URL here
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
    console.log('Firebase Admin SDK initialized successfully.');
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

// Export the initialized admin instance
export { admin };