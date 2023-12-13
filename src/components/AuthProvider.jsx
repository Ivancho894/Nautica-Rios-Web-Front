import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";

import { useEffect, useState } from "react";
import {
  auth,
  getUserInfo,
  registerNewUser,
  userExist,
} from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { GET_CARRITO } from "../redux/actions";

export default function AuthProvider({
  children,
  onUserLoggedIn,
  onUserNotLoogedIn,
  onUserNotRegistered,
}) {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log(user);
      if (user) {
        console.log(user.uid);
        const isRegistred = await userExist(user.uid);
        if (isRegistred) {
            dispatch(GET_CARRITO(user.uid));
          //TODO: redirigir a Dashboard
          const userInfo = await getUserInfo(user.uid);
          console.log(userInfo);
          if (userInfo.processCompleted) {
            onUserLoggedIn(userInfo);
          } else {
            onUserNotRegistered(userInfo);
          }
        } else {
          //TODO: redirigir a choose user name
          await registerNewUser({
            uid: user.uid,
            displayName: user.displayName,
            profilePicture: "",
            username: "",
            processCompleted: false,
          });
          onUserNotRegistered(user);
        }
      } else {
        onUserNotLoogedIn();
      }
    });
  }, [navigate, onUserLoggedIn, onUserNotRegistered, onUserNotLoogedIn]);
  return <div>{children}</div>;
}
