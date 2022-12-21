// / Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAUFfhvtScMiEIuVB8s-LMDOPmMnF1N7LE",
  authDomain: "yantracore.firebaseapp.com",
  projectId: "yantracore",
  storageBucket: "yantracore.appspot.com",
  messagingSenderId: "656716715317",
  appId: "1:656716715317:web:fccea3146c360353aa687c",
  measurementId: "G-0KV5B9SEJG",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
