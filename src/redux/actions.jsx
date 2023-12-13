//Importo la base de datos
import { db } from "../../firebase-config";
import { collection, getDocs, addDoc, where, query, doc, getDoc, setDoc } from "firebase/firestore";

export function NOTIFICACIONES(not) {
  return {
    type: "NOTIFICACIONES",
    payload: not,
  };
}

export const GET_BARCOS = () => async (dispatch) => {
  try {
    const q = query(collection(db, "barcos"), where("eliminado", "==", false));
    const data = await getDocs(q);
    const barcos = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    dispatch({
      type: "GET_BARCOS",
      payload: barcos,
    });
  } catch (error) {
    console.error("Error obteniendo barcos:", error);
  }
};

export function ADD_FILTER(newFilter) {
  return { type: "ADD_FILTER", payload: newFilter };
}
export function GET_FILTERS() {
  return { type: "GET_FILTERS" };
}

export function SET_FILTER() {
  return { type: "SET_FILTER" };
}
export function RESET_FILTERS() {
  return { type: "RESET_FILTERS" };
}
export function ORDENAR() {
  return { type: "ORDENAR" };
}
export function CAMBIAR_ORDENAR(or) {
  return { type: "CAMBIAR_ORDENAR", payload: or };
}

export const getAccesorios = () => async (dispatch) => {
  try {
    const q = query(
      collection(db, "accesorios"),
      where("eliminado", "==", false)
    );
    const data = await getDocs(q);

    const accesorios = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    dispatch({
      type: "GET_ACCESORIOS",
      payload: accesorios,
    });
    dispatch(getFiltersAcc());
  } catch (error) {
    console.error("Error obteniendo accesorios:", error);
  }
};

export function getFiltersAcc() {
  return (dispatch, getState) => {
    try {
      const accesorios = getState().accesorios;

      let filtrosAcc = [];

      dispatch({
        type: "GET_FILTERS_ACC",
        payload: filtrosAcc,
      });
    } catch (error) {
      console.error("Error obteniendo filtros:", error);
    }
  };
}

export function ADD_FILTER_ACC(newFilterAcc) {
  return { type: "ADD_FILTER_ACC", payload: newFilterAcc };
}

export function SET_FILTER_ACC() {
  return { type: "SET_FILTER_ACC" };
}
export function ORDENAR_ACC() {
  return { type: "ORDENAR_ACC" };
}
export function CAMBIAR_ORDENAR_ACC(or) {
  return { type: "CAMBIAR_ORDENAR_ACC", payload: or };
}

export const SET_ORDER_ACC = (order) => ({
  type: "SET_ORDER_ACC",
  payload: order,
});

export const GET_CARRITO = (uid) => async (dispatch) => {
  try{
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    const datosUsuario = userSnap.data();
    const carr = datosUsuario.carrito
    dispatch({
      type: "GET_CARRITO",
      payload: carr,
    })

  }catch(error){
    console.log(error)
  } 


}

export const UPDATE_CARRITO = (uid,carr)=>async()=>{
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, { carrito: carr }, { merge: true });
}
export function AGREGAR_CARRITO(acc) {
  return { type: "AGREGAR_CARRITO", payload: acc };
}
export function BORRAR_UNIDAD(acc) {
  return { type: "BORRAR_UNIDAD", payload: acc };
}

export function BORRAR_PRODUCTO(acc) {
  return { type: "BORRAR_PRODUCTO", payload: acc };
}
export function VACIAR_CARRITO() {
  return { type: "VACIAR_CARRITO" };
}
export function SET_UID(id){
  return {type: "SET_UID",payload:id}

}

export function TOTAL_PAGAR(p) {
  return {
    type: "TOTAL_PAGAR",
    payload: p,
  };
}
