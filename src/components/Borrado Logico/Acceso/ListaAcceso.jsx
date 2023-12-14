// // ListaAcceso.jsx
// import React, { useEffect, useState } from 'react';
// import AccesoUsuario from './AccesoUsuario';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../../firebase-config';

// export default function ListaAcceso() {
//   const [listaUser, setListaUser] = useState([]);

//   useEffect(() => {
//     const obtenerUsuarios = async () => {
//       try {
//         const users = await getDocs(collection(db, 'users'));
//         const arrayUsers = users.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//         setListaUser(arrayUsers);
//         console.log(users);
//       } catch (error) {
//         console.error('Error al obtener usuarios:', error);
//       }
//     };

//     obtenerUsuarios();
//   }, []);

//   return (
//     <div className="flex">
//       <div className="ml-8 w-full grid grid-cols-3 p-16 mt-16">
//         {listaUser.map((user) => (
//           <AccesoUsuario key={user.id} user={user} />
//         ))}
//       </div>
//     </div>
//   );
// }




import React, { useState } from 'react';
import { useEffect } from "react";
import { collection, getDocs, addDoc, where, query } from "firebase/firestore";
import { db } from '../../../../firebase-config';
import AccesoItem from './AccesoItem';

export default function ListaAcceso () {
  const [listaUsers, setListaUsers] = useState([]);

  const obtenerUsers = async () => {
    const users = await getDocs(collection(db, 'users'));
    const arrayUsers = [];
    users.forEach((doc)=>{
        const user = doc.data();
        const idUser = doc.id;
        console.log(idUser);
        arrayUsers.push({...user, id: idUser})
    });
    setListaUsers(arrayUsers);
    console.log(listaUsers);
    
  };

  useEffect(() => {
    obtenerUsers();
  }, []);

  const listaUserArray = Array.from(listaUsers);
  console.log(listaUserArray);

  return (
    <div className="flex">

      <div className=" ml-8 w-full grid grid-cols-3 p-16 mt-16">
        {listaUsers && listaUsers.map((user) => {
          return <AccesoItem key={user.id} obtenerUsers={obtenerUsers} user={user} />;
        })}
      </div>
    </div>
  );
}
