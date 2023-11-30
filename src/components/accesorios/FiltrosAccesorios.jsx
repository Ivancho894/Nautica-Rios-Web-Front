import { useDispatch, useSelector } from 'react-redux';
import { getAccesorios, ADD_FILTER_ACC, SET_FILTER_ACC, getFiltersAcc, SET_ORDER_ACC } from '../../redux/actions';
import { useEffect, useState } from 'react';

export default function FiltrosAcce(){
 const allFilters = useSelector(state => state.allFiltersAcc)
 const filtrosAplicados = useSelector(state => state.filterAcc)
 const dispatch = useDispatch()

 useEffect(() => {
  const fetchData = async () => {
    await dispatch(getAccesorios());
    console.log('Estado después de GET_ACCESORIOS:');
    
    await dispatch(getFiltersAcc());
    console.log('Estado después de GET_FILTERS_ACC:');
  };

  fetchData();
}, []);


 const handleChange= (event)=>{
    dispatch(ADD_FILTER_ACC({name:event.target.name,value:event.target.value}))
    dispatch(SET_FILTER_ACC())
 }
 

 const handleChangeOrder = (event) => {
  dispatch(SET_ORDER_ACC(event.target.value));
};


 return (
    <div>

<label>Orden:</label>
<select onChange={handleChangeOrder} name="orden">
  <option value="-">-</option>
  <option value="precioAsc">Ascendente</option>
  <option value="precioDesc">Descendente</option>
  {/* Añade más opciones según tus necesidades */}
</select>

      <div className="flex justify-between items-center">
      {allFilters?.map((filtro,i)=>{
        
        let prop = Object.keys(filtro)[0]

        switch (prop){
       
          case 'precio':
            {
              return (
              <div key={i} className="flex-wrap justify-between items-center p-5 h-40 gap-5 w-3/4">
                <label>{prop}:</label>
                <select onChange={(event)=>handleChange(event)} name={prop}>
                 <option value="-">-</option>
                  
                 {filtro[prop].map((rango,i) =>{     
                    return <option className="text-black" value={`{"min":${rango.min},"max":${rango.max}}`} key={i}>{rango.min}-{rango.max}</option>
                 })}
                
                </select>
              </div>)
              }
        case 'marca': case 'tipo': case 'material':
          { 
            return (
            <div key={i} className="flex-wrap justify-between items-center p-5 h-40 gap-5 w-full">
              <label>{prop}:</label>
              <select onChange={(event)=>handleChange(event)} name={prop} >
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