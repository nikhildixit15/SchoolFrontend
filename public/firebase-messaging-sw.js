importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyD6QeMR-N14AtnAjjDBjnmwko4qLLK85WU",
  authDomain: "school-bd9d4.firebaseapp.com",
  projectId: "school-bd9d4",
  storageBucket: "school-bd9d4.firebasestorage.app",
  messagingSenderId: "92242982658",
  appId: "1:92242982658:web:fe606c4458116e5437741b",
  measurementId: "G-4X8MRFHE6C"
});
 
// Retrieve Firebase Messaging instance
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification?.title || 'New Notification';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/favicon.ico',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});