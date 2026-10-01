import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyD3_UWOLDDYfjQjeWCBY3q70u-lwkmOGdo",
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
export const messaging = getMessaging(app);

// Firestore rules now require a signed-in Firebase Auth user (request.auth != null).
// The app uses its own phone+password login, so every visitor gets a silent
// anonymous Firebase session first. main.jsx waits for this before starting the app,
// so no Firestore listener runs before auth is ready.
export const authReady = new Promise((resolve, reject) => {
  const unsub = onAuthStateChanged(auth, (u) => {
    if (u) { unsub(); resolve(u); }
    else signInAnonymously(auth).catch(reject);
  }, reject);
});

