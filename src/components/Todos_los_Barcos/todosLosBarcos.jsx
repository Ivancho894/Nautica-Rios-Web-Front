import { useDispatch, useSelector } from "react-redux";

import RenderBarco from "../Barco/renderBarco";
import Filtros from "../Filtros y orden/filtro";
import Orden from "../Filtros y orden/orden";
import { useEffect } from "react";
import { GET_FILTERS, GET_BARCOS, SET_FILTER, ORDENAR } from "../../redux/actions";
import styles from "./todoslosbarcos.module.css";
import { useState } from "react";
import baner from "../../assets/homeBaner.png"



export default function TodosLosBarcos() {
  const [characters, setCharacters] = useState([]);
  const [infoPage, setInfoPage] = useState(null);
  //Renderizar todos los barcos
  const barcos = useSelector((state) => state.barcos);
  // console.log(barcos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GET_FILTERS());
    dispatch(GET_BARCOS());
    dispatch(SET_FILTER());
    dispatch(ORDENAR())
  }, []);
  return (
    <div className=" flex ">



      <div className="bg-slate-300 mt-16 w-[350px] ">
       
        <div className="  ">
          <Filtros />
        </div>

        <div className="bg-slate-300 mt-16 ">
          <Orden />
        </div>
      </div>

     
     
     
      <div className=" ml-8 w-full grid grid-cols-3 p-16 mt-16">
        {barcos.map((barco) => {
          return <RenderBarco key={barco.id} barco={barco} />;
        })}
      </div>



    </div>
  );
}
