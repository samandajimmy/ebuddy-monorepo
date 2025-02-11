import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";  

const firebaseConfig = {
  apiKey: "AIzaSyBJfdDZJB73g4M3Np7IiEQwSuI-oAq4BBI",
  authDomain: "jsr-project-eb004.firebaseapp.com",
  projectId: "jsr-project-eb004",
  storageBucket: "jsr-project-eb004.firebasestorage.app",
  messagingSenderId: "592184675808",
  appId: "1:592184675808:web:c1447d01f946a6c088ef85"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
