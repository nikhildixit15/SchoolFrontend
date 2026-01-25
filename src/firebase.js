import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD6QeMR-N14AtnAjjDBjnmwko4qLLK85WU",
  authDomain: "school-bd9d4.firebaseapp.com",
  projectId: "school-bd9d4",
  storageBucket: "school-bd9d4.firebasestorage.app",
  messagingSenderId: "92242982658",
  appId: "1:92242982658:web:fe606c4458116e5437741b",
  measurementId: "G-4X8MRFHE6C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);