import { useDispatch, useSelector } from 'react-redux';
import { GET_ACCESORIOS, ADD_FILTER_ACC, SET_FILTER_ACC, GET_FILTERS_ACC } from '../../redux/actions';
import { useEffect, useState } from 'react';
//import styles from "./filtro.module.css"


export default function FiltrosAccesorios(){
  // const [filtros,setFiltros] = useState({})
  const allFiltersAcc = useSelector(state => state.allFiltersAcc);
  console.log('todos los filtros accesorios',allFiltersAcc);
  const filtrosAplicados = useSelector(state => state.filterAcc)
  const dispatch = useDispatch()
  useEffect(()=>{

     //dispatch(GET_FILTERS_ACC())
     
    },[])

  const handleChange= (event)=>{
    dispatch(ADD_FILTER_ACC({name:event.target.name,value:event.target.value}))
    dispatch(SET_FILTER_ACC())

  }
  return (
    <div>
      {allFiltersAcc?.map((filtro,i)=>{
        
        let prop = Object.keys(filtro)[0]

        console.log(prop);

        switch (prop){
       
          case 'precio':
            {
              return (
              <div key={i}>
                <label>{prop}:</label>
                <select  onChange={(event)=>handleChange(event)} name={prop}>
                  <option value="-">-</option>
                  
                                {filtro[prop].map((rango, i) => {     
                if (rango && typeof rango.min !== 'undefined' && typeof rango.max !== 'undefined') {
                  return (
                    <option style={{color:"black"}} value={`{"min":${rango.min},"max":${rango.max}}`} key={i}>
                      {rango.min}-{rango.max}
                    </option>
                  );
                } else {
                  return null; 
                }
              })}

                
                </select>
              </div>)
              }
        case 'marca': case 'tipo':
          { 
            return (
            <div key={i}>
              <label>{prop}:</label>
              <select onChange={(event)=>handleChange(event)} name={prop} >
                <option value="-">-</option>
                
                {filtro[prop].map((value, i) => {
                  const jsonValue = JSON.stringify({ tipo: value });
                  return (
                    <option style={{ color: "black" }} value={jsonValue} key={i}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>)
          }
        }})}
    </div>
  )
}