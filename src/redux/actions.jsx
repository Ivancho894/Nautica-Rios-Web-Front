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



export function getAccesorios() {
  return async (dispatch) => {
    try {
      const accesoriosCollectionRef = collection(db, 'accesorios');
      const data = await getDocs(accesoriosCollectionRef);
      const accesorios = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      dispatch({
        type: 'GET_ACCESORIOS',
        payload: accesorios,
      });

      dispatch(getFiltersAcc());
    } catch (error) {
      console.error('Error obteniendo accesorios:', error);
    }
  };
}

export function getFiltersAcc() {
  return (dispatch, getState) => {
    try {
      const accesorios = getState().accesorios;

      let filtrosAcc = [];

      dispatch({
        type: 'GET_FILTERS_ACC',
        payload: filtrosAcc,
      });
    } catch (error) {
      console.error('Error obteniendo filtros:', error);
    }
  };
}

export function ADD_FILTER_ACC(newFilterAcc){
    return {type:'ADD_FILTER_ACC', payload: newFilterAcc}
}

export function SET_FILTER_ACC() {
    return { type: 'SET_FILTER_ACC'}
}




export const SET_ORDER_ACC = (order) => ({
    type: 'SET_ORDER_ACC',
    payload: order,
  });
  