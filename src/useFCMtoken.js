import { useEffect } from "react";
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";
import axios from "axios";

const VAPID_KEY = "BICfX9FFHff5o3t_mNQQlEEtPSOSu7CHcBDg-5Tvc-vgt6f8ZXni_xFx5ckqTunOHauQKPtiuenKAM-cBK7F1wk";

export const useFCMToken = (studentId) => {
  useEffect(() => {
    if (!studentId) return;

    async function generateToken() {
      try {
        // Request notification permission
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.warn("Notification permission denied");
          return;
        }

        // Register service worker
        const swRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

        // Get token
        const token = await getToken(messaging, {
          vapidKey: VAPID_KEY,
          serviceWorkerRegistration: swRegistration
        });

        if (token) {
          await axios.post("http://localhost:8000/notification/saveToken", {
            studentId,
            token,
          });
          console.log("FCM Token saved:", token);
        }
      } catch (err) {
        console.error("FCM Error:", err);
      }
    }

    generateToken();
  }, [studentId]);
};
