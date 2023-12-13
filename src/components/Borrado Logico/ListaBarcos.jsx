import React, { useState } from 'react';
import { useEffect } from "react";
import { collection, getDocs, addDoc, where, query } from "firebase/firestore";
import { db } from '../../../firebase-config';
import BarcosItem from './BarcosItem';

export default function ListaBarcos () {
  const [listaBarc, setListaBarc] = useState([]);

  const obtenerBarcos = async () => {
    const barcos = await getDocs(collection(db, 'barcos'));
    const arrayBarcos = [];
    barcos.forEach((doc)=>{
        const barco = doc.data();
        const idBarco = doc.id;
        console.log(idBarco);
        arrayBarcos.push({...barco, id: idBarco})
    });
    setListaBarc(arrayBarcos);
    console.log(listaBarc);
    
  };

  useEffect(() => {
    obtenerBarcos();
  }, []);

  const listaBarcArray = Array.from(listaBarc);
  console.log(listaBarcArray);

  return (
    <div className="flex">

      <div className=" ml-8 w-full grid grid-cols-3 p-16 mt-16">
        {listaBarc && listaBarc.map((barco) => {
          return <BarcosItem key={barco.id} obtenerBarcos={obtenerBarcos} barco={barco} />;
        })}
      </div>
    </div>
  );
}