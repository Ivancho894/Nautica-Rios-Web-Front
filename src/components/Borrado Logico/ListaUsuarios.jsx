import React, { useState } from 'react';
import { useEffect } from "react";
import { collection, getDocs, addDoc, where, query } from "firebase/firestore";
import { db } from '../../../firebase-config';
import UsuariosItem from './UsuariosItem';
import SearchBar from './SearchBar';

export default function ListaUsuarios () {
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
  <div className='mt-4'>
    <SearchBar lista={listaUsers} set={setListaUsers}  prop={'email'}/>
    <div className="flex">

      <div className=" ml-8 w-full grid grid-cols-3 ">
        {listaUsers && listaUsers.map((user) => {
          return <UsuariosItem key={user.id} obtenerUsers={obtenerUsers} user={user} />;
        })}
      </div>
    </div>
    </div>
  );
}