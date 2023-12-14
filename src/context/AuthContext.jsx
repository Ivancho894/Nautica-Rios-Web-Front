import React, { useState, useEffect, createContext, useContext } from "react";
import { auth, db } from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    console.log("error creating auth context");
  }
  return context;
};

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {
    const subscribed = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.log("no hay usuario suscrito");
        setUser("");
      } else {
        setUser(currentUser);
      }
    });
    return () => subscribed();
  }, []);

  const register = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const listaDeDeseos = [];
      const carrito = [];
      const acceso = true;

      await sendEmailVerification(auth.currentUser);

      const newUser = userCredential.user;

      await updateProfile(newUser, { displayName });
      await setDoc(doc(db, "users", newUser.uid), {
        displayName,
        email,
        carrito,
        listaDeDeseos,
        permisosAdmin: false,
        acceso,
      });
      setUser(newUser);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");

      // const { uid } = response.user;

      // console.log(uid);

      // const userRef = doc(db, "users", uid);
      // const userSnap = await getDoc(userRef);
      // if (userSnap.exists()) {
      //   const { acceso } = userSnap.data();
      //   if (!acceso) {
      //     alert("Tu cuenta ha sido baneada");
      //     logout();
      //   }
      // }
    } catch (error) {
      console.log(error.message);
    }
  };

  const loginWithGoogle = async () => {
    const responseGoogle = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, responseGoogle);
    const user = userCredential.user;

    console.log(user);
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      setDoc(userRef, {
        email: user.email,
        displayName: user.displayName,
        carrito: [],
        listaDeDeseos: [],
        permisosAdmin: false,
        acceso: true,
      });
    }
    setUser(user);
    navigate("/home");
    return;
  };

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <authContext.Provider
      value={{
        register,
        login,
        loginWithGoogle,
        logout,
        user,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
