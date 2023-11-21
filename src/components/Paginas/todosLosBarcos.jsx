import { useDispatch, useSelector } from "react-redux";

import RenderBarco from "../Barco/renderBarco";

export default function TodosLosBarcos(){
    //Renderizar todos los barcos
    const barcos = useSelector(state=>state.barcos)

    return (
        <div>
            <h1>Hola</h1>
            {barcos.map(barco=>{
                return <RenderBarco key={barco.id} barco={barco}/>
            })}
        </div>
    )
}