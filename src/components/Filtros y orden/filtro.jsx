import { useDispatch, useSelector } from 'react-redux';
import { GET_BARCOS, ADD_FILTER, SET_FILTER, GET_FILTERS } from '../../redux/actions';
import { useEffect, useState } from 'react';

export default function Filtros(){
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
    <div className="bg-blue-200 text-black-200 p-5 h-32 w-full">
      <div className="flex justify-between items-center">
      {allFilters?.map((filtro,i)=>{
        
        let prop = Object.keys(filtro)[0]

        switch (prop){
       
          case 'precio': case 'year':
            {
              return (
              <div key={i} className="flex-wrap justify-between items-center p-5 h-40 gap-5 w-3/4">
                <label>{prop}:</label>
                <select className="rounded-md" onChange={(event)=>handleChange(event)} name={prop}>
                 <option value="-">-</option>
                  
                 {filtro[prop].map((rango,i) =>{     
                    return <option className="text-black" value={`{"min":${rango.min},"max":${rango.max}}`} key={i}>{rango.min}-{rango.max}</option>
                 })}
                
                </select>
              </div>)
              }
        case 'marcaBarco': case 'tipo':
          { 
            return (
            <div key={i} className="flex-wrap justify-between items-center p-5 h-40 gap-5 w-full">
              <label>{prop}:</label>
              <select className="rounded-lg" onChange={(event)=>handleChange(event)} name={prop} >
                <option value="-">-</option>
                
                {filtro[prop].map((value,i)=>{
                 return <option className="text-black" value={value} key={i}>{value}</option>
                 })}
                
              </select>
            </div>
            )
            
          }
        }})}
          </div>
          </div>
 
 )
}