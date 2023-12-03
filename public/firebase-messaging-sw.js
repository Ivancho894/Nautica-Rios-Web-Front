importScripts(
  "https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js"
);

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "@firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";
// import { getMessaging } from "firebase/messaging";
//Informacion de nuestra base de datos
const firebaseConfig = {
  apiKey: "AIzaSyDUnM_LwWCxq7lgSXvNjEM6nYTjt4Ol2p8",
  authDomain: "nautica-rios-web.firebaseapp.com",
  databaseURL: "https://nautica-rios-web-default-rtdb.firebaseio.com",
  projectId: "nautica-rios-web",
  storageBucket: "nautica-rios-web.appspot.com",
  messagingSenderId: "72749208775",
  appId: "1:72749208775:web:7d425c17d2680dc91b9ae2",
  measurementId: "G-KFZP590C9N",
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage((payload) => {
  console.log("Recibiste mensaje mientras estabas ausente");
  // previo a mostrar notificación
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/vite.svg",
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
