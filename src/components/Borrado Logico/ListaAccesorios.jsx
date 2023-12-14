import React, { useState } from 'react';
import AccesorioItem from './AccesorioItem';
import { useEffect } from "react";
import { collection, getDocs, addDoc, where, query } from "firebase/firestore";
import { db } from '../../../firebase-config';
import SearchBar from './SearchBar';

export default function ListaAccesorios () {
  const [listaAcc, setListaAcc] = useState([]);

  const obtenerAccesorios = async () => {
    const accesorios = await getDocs(collection(db, 'accesorios'));
    const arrayAccesorios = [];
    accesorios.forEach((doc)=>{
        const accesorio = doc.data();
        const idAccesorios = doc.id;
        console.log(idAccesorios);
        arrayAccesorios.push({...accesorio, id: idAccesorios})
    });
    setListaAcc(arrayAccesorios);
    console.log(listaAcc);
    
  };

  useEffect(() => {
    obtenerAccesorios();
  }, []);

  const listaAccArray = Array.from(listaAcc);
  console.log(listaAccArray);

  return (    
  <div className='mt-4'>
    <SearchBar lista={listaAcc} set={setListaAcc}  prop={'nombre'}/>
    <div className="flex">

      <div className=" ml-8 w-full grid grid-cols-3 ">
        {listaAcc && listaAcc.map((accesorio) => {
          return <AccesorioItem key={accesorio.id} obtenerAccesorios={obtenerAccesorios} accesorio={accesorio} />;
        })}
      </div>
      </div>
    </div>
  );
}