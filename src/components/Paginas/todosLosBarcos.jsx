import { useDispatch, useSelector } from "react-redux";
import Filtros from '../Filtros y orden/filtro';

import RenderBarco from "../Barco/renderBarco";
import { useEffect } from "react";
import { GET_FILTERS,GET_BARCOS } from "../../redux/actions";

export default function TodosLosBarcos(){
    //Renderizar todos los barcos
    const barcos = useSelector(state=>state.barcos)
    const allFilters = useSelector(state=>state.allFilters)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(GET_FILTERS())

    },[])
    return (
        <div>
            <Filtros/>
            <h1>Hola</h1>
            {barcos.map(barco=>{
                return <RenderBarco key={barco.id} barco={barco}/>
            })}
            
        </div>
    )
}