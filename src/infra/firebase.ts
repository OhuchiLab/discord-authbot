import * as admin from "firebase-admin";
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import FirebaseConfig from "../entities/firebaseConfig";
import serviceAccount from "../../ohuchilab-discord-firebase-adminsdk-o871u-550d018435.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const firebaseConfig = FirebaseConfig;

const app: FirebaseApp = initializeApp(firebaseConfig);

export const db: admin.firestore.Firestore = admin.firestore();
export const adminAuth = admin.auth();
export const auth = getAuth(app);
