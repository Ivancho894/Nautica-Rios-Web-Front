// import { useDispatch, useSelector } from 'react-redux';
// import { getAccesorios, ADD_FILTER_ACC, SET_FILTER_ACC, getFiltersAcc, SET_ORDER_ACC } from '../../redux/actions';
// import { useEffect, useState } from 'react';

// export default function FiltrosAcce(){
//  const allFilters = useSelector(state => state.allFiltersAcc)
//  const filtrosAplicados = useSelector(state => state.filterAcc)
//  const dispatch = useDispatch()

//  useEffect(() => {
//   const fetchData = async () => {
//     await dispatch(getAccesorios());
//     console.log('Estado después de GET_ACCESORIOS:');
    
//     await dispatch(getFiltersAcc());
//     console.log('Estado después de GET_FILTERS_ACC:');
//   };

//   fetchData();
// }, []);


//  const handleChange= (event)=>{
//     dispatch(ADD_FILTER_ACC({name:event.target.name,value:event.target.value}))
//     dispatch(SET_FILTER_ACC())
//  }
 

//  const handleChangeOrder = (event) => {
//   dispatch(SET_ORDER_ACC(event.target.value));
// };


//  return (
//     <div className="text-black-200  flex-cols ">

//       <label>Orden:</label>
//       <select onChange={handleChangeOrder} name="orden">
//         <option value="-">-</option>
//         <option value="precioAsc">Ascendente</option>
//         <option value="precioDesc">Descendente</option>

// </select>

//       <div className="flex justify-between items-center">
//       {allFilters?.map((filtro,i)=>{
        
//         let prop = Object.keys(filtro)[0]

//         switch (prop){
       
//           case 'precio':
//             {
//               return (
//               <div key={i} className=" flex flex-row justify-between mt-4 ml-2 ">
//                 <label className="ml-4 ">{prop}:</label>
//                 <select className=" ml-4 h-[20px] w-[100px] mr-2 " onChange={(event)=>handleChange(event)} name={prop}>
//                  <option value="-">-</option>
                  
//                  {filtro[prop].map((rango,i) =>{     
//                     return <option className="text-black" value={`{"min":${rango.min},"max":${rango.max}}`} key={i}>{rango.min}-{rango.max}</option>
//                  })}
                
//                 </select>
//               </div>)
//               }
//         case 'marca': case 'tipo': case 'material':
//           { 
//             return (
//             <div key={i} className="flex flex-row justify-between mt-4 ml-2">
//               <label className="ml-4 ">{prop}:</label>
//               <select className="  ml-4 h-[20px] w-[100px] mr-2" onChange={(event)=>handleChange(event)} name={prop} >
//                 <option value="-">-</option>
                
//                 {filtro[prop].map((value,i)=>{
//                  return <option className="text-black" value={value} key={i}>{value}</option>
//                  })}
                
//               </select>
//             </div>
//             )
            
//           }
//         }})}
//           </div>
//           </div>
 
//  )
// }



import { useDispatch, useSelector } from 'react-redux';
import { getAccesorios, ADD_FILTER_ACC, SET_FILTER_ACC, getFiltersAcc, SET_ORDER_ACC } from '../../redux/actions';
import { useEffect } from 'react';

export default function FiltrosAcce() {
  const allFilters = useSelector(state => state.allFiltersAcc);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAccesorios());
      console.log('Estado después de GET_ACCESORIOS:');

      await dispatch(getFiltersAcc());
      console.log('Estado después de GET_FILTERS_ACC:');
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    dispatch(ADD_FILTER_ACC({ name: event.target.name, value: event.target.value }));
    dispatch(SET_FILTER_ACC());
  };

  const handleChangeOrder = (event) => {
    dispatch(SET_ORDER_ACC(event.target.value));
  };

  return (
    <div className="text-black-200 flex-cols">
      <br/>
    <h1 className="bg-slate-200 w-full text-2xl font-bold mb-5 mt-4">FILTRAR</h1>

      <div className="flex flex-col">

        {allFilters?.map((filtro, i) => {
          let prop = Object.keys(filtro)[0];

          switch (prop) {
            case 'precio':
              {
                return (
                  <div key={i} className="flex flex-row justify-between mt-4 ml-2">
                    <label className="ml-4">{prop}:</label>
                    <select className="ml-4 h-[20px] w-[100px] mr-2" onChange={(event) => handleChange(event)} name={prop}>
                      <option value="-">-</option>

                      {filtro[prop].map((rango, i) => {
                        return <option className="text-black" value={`{"min":${rango.min},"max":${rango.max}}`} key={i}>{rango.min}-{rango.max}</option>;
                      })}
                    </select>
                  </div>
                );
              }
            case 'marca':
            case 'tipo':
            case 'material':
              {
                return (
                  <div key={i} className="flex flex-row justify-between mt-4 ml-2">
                    <label className="ml-4 ">{prop}:</label>
                    <select className="ml-4 h-[20px] w-[100px] mr-2" onChange={(event) => handleChange(event)} name={prop}>
                      <option value="-">-</option>

                      {filtro[prop].map((value, i) => {
                        return <option className="text-black" value={value} key={i}>{value}</option>;
                      })}
                    </select>
                  </div>
                );
              }
          }
        })}
      </div>

      <div >
      <h1 className="bg-slate-200 w-full text-2xl font-bold mb-5 mt-4">ORDEN</h1>
        <label className="ml-4 " >Orden:</label>
        <select className="ml-4 h-[20px] w-[100px] mr-2" onChange={handleChangeOrder} name="orden">
          <option className="text-black" value="-">-</option>
          <option className="text-black" value="precioAsc">Ascendente</option>
          <option className="text-black" value="precioDesc">Descendente</option>
        </select>
        </div>


    </div>
  );
}
