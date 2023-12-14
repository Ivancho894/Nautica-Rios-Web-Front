import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NoAcceso from "./Usuario/NoAcceso";

export const ProtectedRoutes = ({ authorizedUser }) => {
  // const [acceso, setAcceso] = useState(null);
  // const [acceso,setAcceso] = useState(null)
  // const [permisos, setPermisos] = useState(null);
  // const auth = getAuth();

  // const checkAdminPermissions = async (uid) => {
  //   try {
  //     const userDocRef = doc(db, "users", uid); // Ajusta 'usuarios' al nombre de tu colección
  //     const docSnapshot = await getDoc(userDocRef);

  //     if (docSnapshot.exists()) {
  //       const permisosAdmin = docSnapshot.data().permisosAdmin;

  //       // Verifica los permisos y redirige según sea necesario
  //       if (permisosAdmin === true) {
  //         // El usuario tiene permisos de administrador, permite el acceso a la ruta DashboardAdmin
  //         // Puedes agregar aquí la lógica de redirección o permitir el acceso a la ruta
  //         console.log("hola");
  //         setPermisos(true);
  //       } else {
  //         // El usuario no tiene permisos de administrador, puedes redirigirlo a otra página o realizar otra acción
  //         setPermisos(false);
  //       }
  //     } else {
  //       console.error("El documento de usuario no existe en Firestore");
  //     }
  //   } catch (error) {
  //     console.error("Error al obtener el documento de usuario:", error);
  //   }
  // };

  // const checkAcceso = async (uid) => {
  //   console.log(uid);
  //   const userDocRef = doc(db, "users", uid); // Ajusta 'usuarios' al nombre de tu colección
  //   const docSnapshot = await getDoc(userDocRef);

  //   if (docSnapshot.exists()) {
  //     const user = docSnapshot.data();
  //     const acceso = user.acceso
  //     setAcceso(acceso)
  //   } else {
  //     console.log("no sirve");
  //   }
  // };

  // if (authorizedUser === "admin") {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const uid = user.uid;
  //       checkAdminPermissions(uid);
  //     } else {
  //       setPermisos(false);
  //     }
  //   });
  // }

  // if (!auth.currentUser && authorizedUser === "visitor") {
  //   return <Outlet />;
  // }

  // if (auth.currentUser && authorizedUser === "regularUser") {
  //   // onAuthStateChanged(auth, (user) => {
  //   //   checkAcceso(user.uid);
  //   // });

  //   return (
  //     <>
  //       {acceso === "undefined" ? null : (
  //         <>{acceso == true ? <Outlet /> : <Navigate to="/noAcceso" />}</>
  //       )}
  //     </>
  //   );

  //   // if (acceso) {
  //   //   return <Outlet />;
  //   // } else {
  //   //   return <Navigate to="/noAcceso"></Navigate>;
  //   // }
  // }

  // // if (auth.user && authorizedUser === "admin" && permisos) {
  // //   return <Outlet />;
  // // }
  // return (
  //   <>
  //     {permisos === null && authorizedUser === "admin" ? null : (
  //       <>{permisos ? <Outlet /> : <Navigate to="/home" />}</>
  //     )}
  //   </>
  // );

  const [accesoUsuario, setAccesoUsuario] = useState(null);
  const [permisos, setPermisos] = useState(null);
  const auth = getAuth();

  const checkAdminPermissions = async (uid) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const docSnapshot = await getDoc(userDocRef);

      if (docSnapshot.exists()) {
        const permisosAdmin = docSnapshot.data().permisosAdmin;

        if (permisosAdmin === true) {
          setPermisos(true);
        } else {
          setPermisos(false);
        }
      } else {
        console.error("El documento de usuario no existe en Firestore");
      }
    } catch (error) {
      console.error("Error al obtener el documento de usuario:", error);
    }
  };

  const checkAcceso = async (uid) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const docSnapshot = await getDoc(userDocRef);

      if (docSnapshot.exists()) {
        const user = docSnapshot.data();
        const acceso = user.acceso;
        console.log(acceso);
        setAccesoUsuario(acceso);
      } else {
        console.log("nada");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        if (authorizedUser === "admin") {
          checkAdminPermissions(uid);
        }

        if (authorizedUser === "regularUser") {
          checkAcceso(uid);
        }
      } else {
        setPermisos(false);
      }
    });

    return () => unsubscribe();
  }, [auth, authorizedUser]);

  if (!auth.currentUser && authorizedUser === "visitor") {
    return <Outlet />;
  }

  if (authorizedUser === "admin" && permisos === null) {
    return null;
  } else if (authorizedUser === "admin" && permisos !== null) {
    return <>{permisos ? <Outlet /> : <Navigate to="/home" />}</>;
  }

  if (
    auth.currentUser &&
    authorizedUser === "regularUser" &&
    accesoUsuario === null
  ) {
    return null;
  } else if (
    auth.currentUser &&
    authorizedUser === "regularUser" &&
    accesoUsuario !== null
  ) {
    return <>{accesoUsuario ? <Outlet /> : <Navigate to="/noAcceso" />}</>;
  }

  return <Navigate to="/home" />;
};
