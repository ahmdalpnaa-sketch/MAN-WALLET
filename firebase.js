import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBL0Sa0ceh73dC0mpVIrgHzPWfr3pE3ks8",
  authDomain: "villagewallet.firebaseapp.com",
  projectId: "villagewallet",
  storageBucket: "villagewallet.firebasestorage.app",
  messagingSenderId: "496357005131",
  appId: "1:496357005131:web:0d23abdda74cc7c7f9face"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
