import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const serviceAccount = require("./../../../../serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const db = admin.firestore();
export const auth = admin.auth();
