import React, { useState } from 'react';
import { useEffect } from "react";
import { collection, getDocs, addDoc, where, query } from "firebase/firestore";
import { db } from '../../../firebase-config';
import BarcosItem from './BarcosItem';
import SearchBar from './SearchBar';
import SinBarcos from '../Todos_los_Barcos/SinBarcos';

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
    <div className='mt-4'>
      <SearchBar lista={listaBarc} set={setListaBarc}  prop={'marcaBarco'}/>
    <div className="flex">
      <div className=" ml-8 w-full grid grid-cols-3 ">
        {listaBarc.length>0?listaBarc.map((barco) => {
          return <BarcosItem key={barco.id} obtenerBarcos={obtenerBarcos} barco={barco} />;
        }):<SinBarcos/>}
      </div>
    </div>
        </div>
  );
}