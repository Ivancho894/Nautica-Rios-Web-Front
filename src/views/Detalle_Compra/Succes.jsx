import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { GET_CARRITO, UPDATE_CARRITO, UPDATE_USER_REVIEWS, VACIAR_CARRITO } from "../../redux/actions"
import { useEffect } from "react"
import { doc, setDoc } from '@firebase/firestore'
import { db } from '../../../firebase-config'



export default function successPage(){
    const dispatch = useDispatch()
    const {id} = useParams()

    //Crear prop review y comprado


    //Vaciar carrito
    useEffect(()=>{
        dispatch(GET_CARRITO)
        dispatch(UPDATE_USER_REVIEWS({}))
        //update reviews

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
            Cuando recibas tus productos, te invitamos a dejar una opinion de su compra.
        </p>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
            Regresar al inicio
        </a>
    </div>
    )

}