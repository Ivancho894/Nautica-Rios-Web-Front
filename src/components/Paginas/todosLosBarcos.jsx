import { useDispatch, useSelector } from "react-redux";

import RenderBarco from "../Barco/renderBarco";
import { useEffect } from "react";
import { GET_FILTERS } from "../../redux/actions";

export default function TodosLosBarcos(){
    //Renderizar todos los barcos
    const barcos = useSelector(state=>state.barcos)
    const allFilters = useSelector(state=>state.allFilters)
    console.log(barcos);
    console.log(barcos.length);
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(GET_FILTERS())

    },[])
    console.log(allFilters)
    return (
        <div>
            <h1>Hola</h1>
            {barcos.map(barco=>{
                return <RenderBarco key={barco.id} barco={barco}/>
            })}
            
        </div>
    )
}