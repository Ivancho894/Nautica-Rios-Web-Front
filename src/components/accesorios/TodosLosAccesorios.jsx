// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import FiltrosAccesorios from "./FiltrosAccesorios";
// import { GET_FILTERS_ACC, GET_ACCESORIOS } from "../../redux/actions";

// export default function Accesorios() {
//   const accesorios = useSelector((state) => state.accesorios);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await dispatch(GET_ACCESORIOS());
//         dispatch(GET_FILTERS_ACC());
//       } catch (error) {
//         console.error('Error al obtener accesorios y filtros:', error);
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   if (!accesorios) {
//     return <p>Cargando accesorios...</p>;
//   }

//   return (
//     <div>
//       <FiltrosAccesorios />
//       {accesorios.map((accesorio) => (
//         console.log(accesorios),
//         <div key={accesorio.id}>
          
//           {accesorio.variaciones && accesorio.variaciones.length > 0 && (
//             <div>
//             {accesorio.variaciones.map((variacion, variacionIndex) => (
//               <div key={variacionIndex}>
//                 {variacion.imagenes && variacion.imagenes.length > 0 && (
//                   <div>
//                     {variacion.imagenes.map((imagen, imagenIndex) => (
//                       <img key={imagenIndex} src={imagen} alt={`Imagen ${imagenIndex + 1}`} style={{ maxWidth: '10%' }}/>
//                       ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//           )}
//           <h3>
//           {accesorio.nombre} {accesorio.marca}
//           </h3>
//           <h4>Accesorio de {accesorio.material}</h4>

//           <Link to={"/detalleaccesorio/" + accesorio.id}>
//             <button>more info</button>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// }




import { useDispatch, useSelector } from "react-redux";
import RenderAccesorios from "./RenderAccesorios";
import FiltrosAccesorios from "./FiltrosAccesorios"
import { useEffect } from "react";
import { getFiltersAcc, getAccesorios } from "../../redux/actions";
import { useState } from "react";

export default function TodosLosAccesorios() {
  
  const accesorios = useSelector((state) => state.accesorios);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAccesorios());
    dispatch(getFiltersAcc());
  }, []);
  
  return (
    <div>
        <div style={{ marginTop: '80px' }}>
          <FiltrosAccesorios />
        </div>
        <div>
          {accesorios && accesorios.map((accesorio) => {
            return <RenderAccesorios key={accesorio.id} accesorio={accesorio} />;
          })}
        </div>
    </div>
  );
}
