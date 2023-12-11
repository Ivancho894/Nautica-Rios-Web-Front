import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const ProtectedRoutes = ({ authorizedUser }) => {
  const [permisos, setPermisos] = useState(null);
  const auth = getAuth();

  const checkAdminPermissions = async (uid) => {
    try {
      const userDocRef = doc(db, "users", uid); // Ajusta 'usuarios' al nombre de tu colección
      const docSnapshot = await getDoc(userDocRef);

      if (docSnapshot.exists()) {
        const permisosAdmin = docSnapshot.data().permisosAdmin;

        // Verifica los permisos y redirige según sea necesario
        if (permisosAdmin === true) {
          // El usuario tiene permisos de administrador, permite el acceso a la ruta DashboardAdmin
          // Puedes agregar aquí la lógica de redirección o permitir el acceso a la ruta
          console.log("hola");
          setPermisos(true);
        } else {
          // El usuario no tiene permisos de administrador, puedes redirigirlo a otra página o realizar otra acción
          setPermisos(false);
        }
      } else {
        console.error("El documento de usuario no existe en Firestore");
      }
    } catch (error) {
      console.error("Error al obtener el documento de usuario:", error);
    }
  };

  if (authorizedUser === "admin") {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        checkAdminPermissions(uid);
      } else {
        setPermisos(false);
      }
    });
  }

  if (!auth.currentUser && authorizedUser === "visitor") {
    return <Outlet />;
  }

  if (auth.currentUser && authorizedUser === "regularUser") {
    return <Outlet />;
  }

  // if (auth.user && authorizedUser === "admin" && permisos) {
  //   return <Outlet />;
  // }
  return (
    <>
      {permisos === null && authorizedUser === "admin" ? null : (
        <>{permisos ? <Outlet /> : <Navigate to="/home" />}</>
      )}
    </>
  );
};
