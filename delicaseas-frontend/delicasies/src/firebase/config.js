import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Optional analytics (can fail on localhost/http in some setups)
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDV9y29n1SPbFjl91lXxJ-bpDEYXoDQI8Y",
  authDomain: "delicacies-f16c9.firebaseapp.com",
  projectId: "delicacies-f16c9",
  storageBucket: "delicacies-f16c9.firebasestorage.app",
  messagingSenderId: "934644803752",
  appId: "1:934644803752:web:56b5d5b2bee834736a7a9d",
  measurementId: "G-LTS1C1X2EP",
};

const app = initializeApp(firebaseConfig);

// ✅ Auth exports
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// ✅ Analytics (optional)
isSupported().then((ok) => {
  if (ok) getAnalytics(app);
});
