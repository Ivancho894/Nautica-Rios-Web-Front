//Configuracion de La base de datos
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
//Informacion de nuestra base de datos
const firebaseConfig = {
    apiKey: "AIzaSyDUnM_LwWCxq7lgSXvNjEM6nYTjt4Ol2p8",
    authDomain: "nautica-rios-web.firebaseapp.com",
    databaseURL: "https://nautica-rios-web-default-rtdb.firebaseio.com",
    projectId: "nautica-rios-web",
    storageBucket: "nautica-rios-web.appspot.com",
    messagingSenderId: "72749208775",
    appId: "1:72749208775:web:7d425c17d2680dc91b9ae2",
    measurementId: "G-KFZP590C9N"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)