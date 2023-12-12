import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../../../firebase-config";



export default async function handlePay(uid,carr){
    console.log(uid)
    const endpoint = "http://localhost:3000/create-order?id="

    try{
        //Agrego carrito a la DB
        if(carr.length>0){
            //agregar
            const userRef = doc(db, 'users', uid);
            await setDoc(userRef, { carrito: carr }, { merge: true });
        }
        //Mando la query con el id
        //const {data} = await axios(endpoint+uid)
        //Recibo la res para ver si completo

    }catch(error){
        console.log(error.message)
    }
}