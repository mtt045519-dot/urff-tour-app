import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3_UWOLDDYfjQjeWCBY3q7Ou-lwkmOGdo",
  authDomain: "urfftour.firebaseapp.com",
  projectId: "urfftour",
  storageBucket: "urfftour.firebasestorage.app",
  messagingSenderId: "809102834134",
  appId: "1:809102834134:web:6a08691b5cc23510c5cc77",
  measurementId: "G-9FVJSRC1TY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
