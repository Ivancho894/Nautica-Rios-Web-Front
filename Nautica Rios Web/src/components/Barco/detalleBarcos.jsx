import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"


export default function Detalle(){
    //BARCO INDIVIDUAL EN DETALLE
    const barcos = useSelector(state=>state.barcos)

    const {id} = useParams();
    //Por parametro le llega el id y lo busca entre los barcos que estan el store
    const barco = barcos.find(x=>x.id===id)
    let keyId = 0



    return (
        <div>
            <h2>Esta es la pagina de detalle</h2>
            {barco?Object.keys(barco)?.map(key=>{
                return (
                    <h3 key={keyId++}>{barco[key]}</h3>
                    )
            }):''}
        </div>
    )
}