// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "igi-leb-8245c.firebaseapp.com",
  projectId: "igi-leb-8245c",
  storageBucket: "igi-leb-8245c.appspot.com",
  messagingSenderId: "661440757137",
  appId: "1:661440757137:web:8f99910e8cf910b713ae30"
};
export const app = initializeApp(firebaseConfig);
// Initialize Firebase
const storage = getStorage(app);

export { storage };
