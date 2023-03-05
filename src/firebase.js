
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCq8eR79_VWhLk3Kaektq7cas9GfU5D9q8",
  authDomain: "clash-of-codes-673c3.firebaseapp.com",
  projectId: "clash-of-codes-673c3",
  storageBucket: "clash-of-codes-673c3.appspot.com",
  messagingSenderId: "224086279210",
  appId: "1:224086279210:web:b64b5c85bfcaf5fd70ef53",
  measurementId: "G-STSKQPY798"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const db = getFirestore();
export const storage=getStorage(app);
export { auth, db, app };
