import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";

import { useEffect, useState } from "react";
import { auth, userExist } from "../../../firebase-config";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../../components/AuthProvider";

const LoginView = () => {
  const navigate = useNavigate();
  // const [currentUser, setCurrentUser] = useState(null);
  const [state, setCurrentState] = useState(0);
  /*
  Stages:
  0: inicializando
  1: loading
  2: login completo
  3: login pero sin registro
  4: no hay nadie logeado
  5: ya existe username
  6: nuevo username, click para continuar
  7: user name no existe
*/
  // useEffect(() => {
  //   setCurrentState(1);
  //   onAuthStateChanged(auth, handleUserStateChanged);
  // }, [navigate]);

  // async function handleUserStateChanged(user) {
  //   if (user) {
  //     const isRegistred = await userExist(user.uid);
  //     if (isRegistred) {
  //       //TODO: redirigir a Dashboard
  //       navigate("/dashboard");
  //       setCurrentState(2);
  //     } else {
  //       //TODO: redirigir a choose user name
  //       navigate("/choose-username");
  //       setCurrentState(3);
  //     }
  //     console.log(user.displayName);
  //   } else {
  //     setCurrentState(4);
  //     console.log("no hay nadie autenticado");
  //   }
  // }

  async function handleOnclick() {
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);
    async function signInWithGoogle(googleProvider) {
      try {
        const res = await signInWithPopup(auth, googleProvider);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
  }
  function handleUserLoggedIn(user) {
    navigate("/dashboard");
  }
  function handleUserNotRegistered(user) {
    navigate("/choose-username");
  }
  function handleUserNotLoogedIn() {
    setCurrentState(4);
  }

  // if (state === 2) {
  //   return <div>estas autenticado y registrado </div>;
  // }
  // if (state === 3) {
  //   return <div>estas autenticado pero no registrado </div>;
  // }
  if (state === 4) {
    return (
      <div>
        <button onClick={handleOnclick}>Login with Google</button>
      </div>
    );
  }
  if (state === 5) {
    return (
      <div>
        <button onClick={handleOnclick}>Login with Google</button>
      </div>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoogedIn={handleUserNotLoogedIn}
    >
      <div>Loading....</div>
    </AuthProvider>
  );
};

export default LoginView;
