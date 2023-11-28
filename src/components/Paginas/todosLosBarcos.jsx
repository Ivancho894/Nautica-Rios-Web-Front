import { useDispatch, useSelector } from "react-redux";

import RenderBarco from "../Barco/renderBarco";
import Filtros from "../Filtros y orden/filtro";
import { useEffect } from "react";
import { GET_FILTERS,GET_BARCOS } from "../../redux/actions";
import styles from "./todoslosbarcos.module.css"

export default function TodosLosBarcos() {
  //Renderizar todos los barcos
  const barcos = useSelector((state) => state.barcos);
  const dispatch = useDispatch()
  useEffect(()=>{
        dispatch(GET_FILTERS())
      },[])
  return (
   <div  >
    
    
   
   
   <div className={styles.conthome}>
     
      <Filtros />
    

      <div className={styles.cardscont}>
        {barcos.map((barco) => {
          return <RenderBarco key={barco.id} barco={barco} />;
        })}
      </div>
    </div>
   </div>
   
  );
}
