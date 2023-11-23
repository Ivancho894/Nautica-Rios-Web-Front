//Importo la base de datos 
import {db} from '../../firebase-config'
import {collection,getDocs,addDoc} from 'firebase/firestore'


export function GET_BARCOS(){
    return async (dispatch)=>{
        const barcosCollectionRef = collection(db,'barcos')
        const data = await getDocs(barcosCollectionRef)
        const barcos = data.docs.map((doc)=>({...doc.data(),id:doc.id}))
        return dispatch({
            type: 'GET_BARCOS',
            payload: barcos
        })
    }
}
export function ADD_FILTER(newFilter){
    return {type:'ADD_FILTER',payload:newFilter}
}
export function GET_FILTERS(){
    return {type:'GET_FILTERS'}
}

export function SET_FILTER(newFilter) {
    console.log('SET_FILTER Action:', newFilter);
    return { type: 'SET_FILTER', payload: { filter: newFilter } };
}

