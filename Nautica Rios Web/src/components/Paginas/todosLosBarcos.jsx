import { useDispatch, useSelector } from "react-redux";
import {Route,Routes } from "react-router-dom";

import RenderBarco from "../Barco/renderBarco";

export default function TodosLosBarcos(){
    //Renderizar todos los barcos
    const barcos = useSelector(state=>state.barcos)
    console.log(barcos)

    return (
        <div>
            <h1>Hola</h1>
            {barcos.map(barco=>{
                return <RenderBarco key={barco.id} barco={barco}/>
            })}
        </div>
    )
}