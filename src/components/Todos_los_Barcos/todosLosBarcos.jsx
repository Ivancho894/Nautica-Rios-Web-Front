import { useDispatch, useSelector } from "react-redux";

import RenderBarco from "../Barco/renderBarco";
import Filtros from "../Filtros y orden/filtro";
import Orden from "../Filtros y orden/orden";
import { useEffect } from "react";
import { GET_FILTERS, GET_BARCOS, SET_FILTER, ORDENAR } from "../../redux/actions";
import styles from "./todoslosbarcos.module.css";
import { useState } from "react";



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
    <div className={styles.scrollContainer} id="infinireScroll">
       <div className={styles.scrollContainer} id="infinireScroll">
    
        <div>
          <Filtros />
          <Orden/>
        </div>
        <div className="flex flex-wrap items-center space-x-4 ... ">
          {barcos.map((barco) => {
            return <RenderBarco key={barco.id} barco={barco} />;
          })}
        </div>
        {/* <div className={styles.conthome}>
        <div className={styles.cardscont}>
        {barcos.map((barco) => {
          return <RenderBarco key={barco.id} barco={barco} />;
        })}
        </div>
      </div> */}
   
    </div>
    </div>
  );
}
