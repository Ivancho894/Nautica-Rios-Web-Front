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

export function SET_FILTER() {
    return { type: 'SET_FILTER'};
}




export function GET_ACCESORIOS() {
    return async (dispatch) => {
      try {
        const accesoriosCollectionRef = collection(db, 'accesorios');
        const data = await getDocs(accesoriosCollectionRef);
        const accesorios = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  
        dispatch({
          type: 'GET_ACCESORIOS_SUCCESS',
          payload: accesorios,
        });
      } catch (error) {
        console.error('Error al obtener accesorios:', error);
        dispatch({
          type: 'GET_ACCESORIOS_FAILURE',
          payload: error.message,
        });
      }
    };
  }
  

export function ADD_FILTER_ACC(newFilter){
    return {type:'ADD_FILTER_ACC',payload:newFilter}
}

export function GET_FILTERS_ACC(){
    return {type:'GET_FILTERS_ACC'}
}

export function SET_FILTER_ACC(newAccesorio) {
    return { type: 'SET_FILTER_ACC', payload: newAccesorio}
}