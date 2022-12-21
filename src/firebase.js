// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUFfhvtScMiEIuVB8s-LMDOPmMnF1N7LE",
  authDomain: "yantracore.firebaseapp.com",
  projectId: "yantracore",
  storageBucket: "yantracore.appspot.com",
  messagingSenderId: "656716715317",
  appId: "1:656716715317:web:fccea3146c360353aa687c",
  measurementId: "G-0KV5B9SEJG",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
const analytics = getAnalytics(firebaseApp);

export const getFirebaseToken = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      "BLWBMdUHNOfaGveWso_0HhCgJRGKqhs48zRGOe_gXhgw6gcn-cS2dnIx5mqdnlu02jlEucdEypuAtfw0qeSndZY",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
