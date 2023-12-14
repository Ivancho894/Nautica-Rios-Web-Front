import { useParams } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { UPDATE_CARRITO, VACIAR_CARRITO } from "../../redux/actions"
import { useEffect } from "react"



export default function successPage(){
    const dispatch = useDispatch()
    const {id} = useParams()
    //Vaciar carrito
    useEffect(()=>{
        dispatch(UPDATE_CARRITO(id,[]))}
        ,[])




    return(
        <div class="min-h-screen items-center justify-center p-40 w-full ">
        <h1 class="text-5xl font-bold text-center mb-6">Gracias por tu compra</h1>
        <p class="text-xl text-center mb-6">
            Estamos encantados de que hayas elegido nuestros productos. 
            <br/>
            Un encargado de ventas se va a comunicar con usted en breve.
            Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nosotros.
        </p>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
            Regresar al inicio
        </a>
    </div>
    )

}