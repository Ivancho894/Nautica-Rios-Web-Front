import { useAuth } from "../../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const AccesoControl = ({ children }) => {
    const auth = useAuth();
    const [acceso, setAcceso] = useState(null);
  
    useEffect(() => {
        const checkAcceso = async (uid) => {
          console.log('Verificando', uid);
        try {
          const userDocRef = doc(db, "users", uid);
          const docSnapshot = await getDoc(userDocRef);
          console.log(uid);
  
          if (docSnapshot.exists()) {
            const userAcceso = docSnapshot.data().acceso;
            console.log("Acceso del usuario:", userAcceso);
            setAcceso(userAcceso);
          } else {
            console.error("El documento de usuario no existe en Firestore");
            setAcceso(false);
          }
        } catch (error) {
          console.error("Error al obtener el documento de usuario:", error);
          setAcceso(false);
        }
      };
  
      const user = auth.currentUser;
      if (user) {
        checkAcceso(user.uid);
      }
    }, [auth]);
  
    if (acceso === null) {
      console.log("Verificando acceso...");
      return null;
    }
  
    // Si el acceso es false, redirige a una página de acceso denegado
    if (acceso === false) {
      console.log("Acceso denegado. Redirigiendo...");
      return <Navigate to="/acceso-denegado" />;
    }
  
    console.log("Acceso permitido. Renderizando children...");
    return children;
  };
  
export default AccesoControl;


// import { useEffect } from 'react';
// import { useAuth } from '../../../context/AuthContext';
// import { onAuthStateChanged } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../../../../firebase-config';
// import { useState } from 'react';
// import { Navigate } from 'react-router-dom';

// const AccesoControl = ({ children }) => {
//   const auth = useAuth();
//   const [acceso, setAcceso] = useState(null);

//   const checkAcceso = async (uid) => {
//     try {
//       const userDocRef = doc(db, 'users', uid);
//       const docSnapshot = await getDoc(userDocRef);

//       if (docSnapshot.exists()) {
//         const userAcceso = docSnapshot.data().acceso;
//         setAcceso(userAcceso);
//       } else {
//         setAcceso(false);
//       }
//     } catch (error) {
//       console.error('Error al obtener el documento de usuario:', error);
//       setAcceso(false);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         checkAcceso(user.uid);
//       }
//     });

//     return () => unsubscribe();
//   }, [auth]);

//   if (acceso === null) {
//     console.log('Verificando acceso...', acceso);
//     return null;
//   }

//   if (acceso === false) {
//     console.log('Acceso denegado. Redirigiendo...');
//     return <Navigate to="/acceso-denegado" />;
//   }

//   console.log('Acceso permitido. Renderizando children...');
//   return children;
// };

// export default AccesoControl;

  