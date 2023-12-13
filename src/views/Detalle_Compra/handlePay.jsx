import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../../../firebase-config";
import axios from "axios";




export default async function handlePay(uid,carr){
    if(!uid){
        //Tiene que ir al login y volver
        // navigate('/login')
    }
    const endpoint = "https://nautica-pf-pagos.onrender.com/create-order?id="

    try{
        //Agrego carrito a la DB
        if(carr.length>0){
            //agregar
            const userRef = doc(db, 'users', uid);
            await setDoc(userRef, { carrito: carr }, { merge: true });
        }
        //Mando la query con el id
        const {data} = await axios(endpoint+uid)
        //Recibo la res para ver si completo
        location.href = data.init_point

    }catch(error){
        navigate('/paginaerror')
    }
}