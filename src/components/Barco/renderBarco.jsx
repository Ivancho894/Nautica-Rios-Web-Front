//BARCO INDIVIDUAL
import { Link } from "react-router-dom"



export default function RenderBarco({barco}){
    //Renderiza un solo barco 
    return(
        <div>
            <Link to={'/detalle/'+barco.id}>
                <h1>Marca: {barco.marcaBarco}</h1>
            </Link>
            <h2>Marca del motor: {barco.marcaMotor}</h2>
            <h2>Marca del barco: {barco.modelo}</h2>
        </div>
    )
}