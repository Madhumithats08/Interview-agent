// firebase/client.ts
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2M3tMxnUtz_v38vzpfxem7-79jAYomig",
  authDomain: "prepwise-4dd90.firebaseapp.com",
  projectId: "prepwise-4dd90",
  storageBucket: "prepwise-4dd90.appspot.com",
  messagingSenderId: "35417100923",
  appId: "1:35417100923:web:89a98b68dfa351e38988de",
  measurementId: "G-2F6T24ZXEP",
};

// ✅ Correct check for existing app instance
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
