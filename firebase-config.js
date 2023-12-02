//Configuracion de La base de datos
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc,
} from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from "firebase/storage";
import { getMessaging } from "firebase/messaging";
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

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const storage = getStorage(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);
export async function userExist(uid) {
  const docRef = doc(db, "users", uid);
  const res = await getDoc(docRef);
  console.log(res);
  return res.exists();
}

export async function existsUsername(Username) {
  const users = [];
  const docsRef = collection(db, "users");
  const q = query(docsRef, where("username", "==", Username));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  });

  return users.length > 0 ? users[0] : null;
}

export async function registerNewUser(user) {
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (error) {
    console.error(error);
  }
}

export async function updateUser(user) {
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (error) {
    console.error(error);
  }
}

export async function getUserInfo(uid) {
  try {
    console.log(uid);
    const docRef = doc(db, "users", uid);
    console.log(docRef);
    const document = await getDoc(docRef);
    console.log(document);
    return document.data();
  } catch (error) {
    console.error(error);
  }
}

export async function setUserProfilePhoto(uid, file) {
  try {
    const imageRef = ref(storage, `images/${uid}`);
    const resUpload = await uploadBytes(imageRef, file);
    return resUpload;
  } catch (error) {
    console.error(error);
  }
}

export async function getProfilePhotoUrl(profilePicture) {
  try {
    const imageRef = ref(storage, profilePicture);
    const url = await getDownloadURL(imageRef);
    console.log(url);
    return url;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserPublicProfile({ uid }) {
  console.log(uid);
  const profileInfo = await getUserInfo(uid);
  return {
    profileInfo: profileInfo,
  };
}
