
import { useDispatch, useSelector } from 'react-redux';
import { GET_BARCOS, ADD_FILTER, SET_FILTER, GET_FILTERS } from '../../redux/actions';
import { useEffect, useState } from 'react';
import styles from "./filtro.module.css"


export default function Filtros(){
  // const [filtros,setFiltros] = useState({})
  const allFilters = useSelector(state => state.allFilters)
  const filtrosAplicados = useSelector(state => state.filter)
  const dispatch = useDispatch()
  useEffect(()=>{

    // dispatch(GET_FILTERS())
      // setFiltros()
    },[])

  const handleChange= (event)=>{
    dispatch(ADD_FILTER({name:event.target.name,value:event.target.value}))
    dispatch(SET_FILTER())

  }
  return (
    <div className={styles.contfilters}>
      {allFilters?.map((filtro,i)=>{
        
        let prop = Object.keys(filtro)[0]

        switch (prop){
       
          case 'precio': case 'year':
            {
              return (
              <div key={i} className={styles.contfilter}>
                <label>{prop}:</label>
                <select  onChange={(event)=>handleChange(event)} name={prop}>
                  <option value="-">-</option>
                  
                  {filtro[prop].map((rango,i) =>{     
                    return <option style={{color:"black"}} value={`{"min":${rango.min},"max":${rango.max}}`} key={i}>{rango.min}-{rango.max}</option>
                  })}
                
                </select>
              </div>)
              }
        case 'marcaBarco': case 'tipo':
          { 
            return (
            <div key={i} className={styles.contfilter}>
              <label>{prop}:</label>
              <select onChange={(event)=>handleChange(event)} name={prop} >
                <option value="-">-</option>
                
                {filtro[prop].map((value,i)=>{
                  return <option style={{color:"black"}} value={value} key={i}>{value}</option>
                  })}
                
              </select>
            </div>)
          }
        }})}
    </div>
  )
}