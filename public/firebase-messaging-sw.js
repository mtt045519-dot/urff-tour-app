importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyD3_UWOLDDYfjQjeWCBY3q70u-lwkmOGdo",
  authDomain: "urfftour.firebaseapp.com",
  projectId: "urfftour",
  storageBucket: "urfftour.firebasestorage.app",
  messagingSenderId: "809102834134",
  appId: "1:809102834134:web:6a08691b5cc23510c5cc77"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon-192.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
