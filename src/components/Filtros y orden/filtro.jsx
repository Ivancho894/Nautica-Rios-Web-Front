import { useDispatch, useSelector } from 'react-redux';
import { GET_BARCOS, ADD_FILTER, SET_FILTER, GET_FILTERS, ORDENAR, RESET_FILTERS } from '../../redux/actions';
import { useEffect, useState } from 'react';
import tituloFyO from './TituloFiltros';

export default function Filtros(){
 const allFilters = useSelector(state => state.allFilters)
 const initialValues = Object.fromEntries(allFilters?.map(x=>{return [Object.keys(x)[0],'-']}))
 const [filterValues,setFilterValues] = useState(initialValues)
 const dispatch = useDispatch()
 useEffect(()=>{

    // dispatch(GET_FILTERS())
      // setFiltros()
    },[])

 const handleChange= (event)=>{
    dispatch(ADD_FILTER({name:event.target.name,value:event.target.value}))
    dispatch(SET_FILTER())
    dispatch(ORDENAR())
    setFilterValues({...filterValues,[event.target.name]:event.target.value})

 }
 const handleResetChange = ()=>{
  dispatch(RESET_FILTERS())
  setFilterValues(initialValues)
  
 }
 return (
    <div className="text-black-200  flex-cols ">
       <button className="bg-[#3b82f6] text-white mt-8" onClick={handleResetChange}>RESET</button>
     
       <h1 className="bg-slate-200 w-full text-2xl font-bold mb-5 mt-4">FILTRAR</h1>
     
      {allFilters?.map((filtro,i)=>{
        
        let prop = Object.keys(filtro)[0]

        switch (prop){
       
          case 'precio': case 'year': 
            {
              return (
              <div key={i} className=" flex flex-row justify-between mt-4 ml-2 " >
                <label className="ml-4 ">{tituloFyO(prop)}:</label>
                <select className=" ml-4 h-[20px] w-[100px] mr-2 " onChange={(event)=>handleChange(event)} name={prop} value={filterValues[prop]}>
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
            <div key={i} className="flex flex-row justify-between mt-4 ml-2">
              <label className="ml-4 ">{tituloFyO(prop)}:</label>
              <select className="  ml-4 h-[20px] w-[100px] mr-2" onChange={(event)=>handleChange(event)} name={prop} value={filterValues[prop]}>
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
 
 )
}