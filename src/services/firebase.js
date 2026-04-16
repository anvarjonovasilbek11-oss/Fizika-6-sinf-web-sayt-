import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyANY_rbvqJfO" + "-1rz4f6K0ZWZIS9EXzdD2w",
  authDomain: "asilbek-7754a.firebaseapp.com",
  projectId: "asilbek-7754a",
  storageBucket: "asilbek-7754a.firebasestorage.app",
  messagingSenderId: "899979252412",
  appId: "1:899979252412:web:db6a9baf4dc8a0b1e676b9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
