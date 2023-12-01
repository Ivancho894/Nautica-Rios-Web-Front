// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { db } from "../../../firebase-config";
// import { doc, getDoc } from "firebase/firestore"; 

// export default function DetalleAccesorio() {
//   const { id } = useParams();
//   const [accesorio, setAccesorio] = useState(null);

//   useEffect(() => {
//     const fetchAccesorio = async () => {
//       const accesorioDoc = doc(db, 'accesorios', id);
//       const accesorioSnapshot = await getDoc(accesorioDoc);
      
//       if (accesorioSnapshot.exists()) {
//         setAccesorio({
//           id: accesorioSnapshot.id,
//           ...accesorioSnapshot.data()
//         });
//       } 
//     };

//     fetchAccesorio();
//   }, [id]);

//   if (!accesorio) {
//     return <p>Cargando...</p>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 bg-blue-200">

//       {accesorio.variaciones && accesorio.variaciones.length > 0 && (
//         <div>
//           {accesorio.variaciones.map((variacion, variacionIndex) => (
//             <div key={variacionIndex}>
//               {variacion.imagenes && variacion.imagenes.length > 0 && (
//                 <div>
//                   {variacion.imagenes.map((imagen, imagenIndex) => (
//                     <img key={imagenIndex} src={imagen} alt={`Imagen ${imagenIndex + 1}`} style={{ maxWidth: '20%' }}/>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//         )}

//       <h3>
//         {accesorio.nombre} {accesorio.marca}
//         {accesorio.descripcion}
//       </h3>
//       <h4>
//         {accesorio.material} {accesorio.precio}
//         {accesorio.color} {accesorio.peso}
//       </h4>

//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function DetalleAccesorio() {
  const { id } = useParams();
  const [accesorio, setAccesorio] = useState(null);

  useEffect(() => {
    const fetchAccesorio = async () => {
      const accesorioDoc = doc(db, 'accesorios', id);
      const accesorioSnapshot = await getDoc(accesorioDoc);

      if (accesorioSnapshot.exists()) {
        setAccesorio({
          id: accesorioSnapshot.id,
          ...accesorioSnapshot.data()
        });
      }
    };

    fetchAccesorio();
  }, [id]);

  if (!accesorio) {
    return <p>Cargando...</p>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="mb-5">
      {accesorio.variaciones && accesorio.variaciones.length > 0 && (
        <div>
          {accesorio.variaciones.map((variacion, variacionIndex) => (
            <div key={variacionIndex}>
              {variacion.imagenes && variacion.imagenes.length > 0 && (
                <Slider {...settings} className="w-80 mx-auto">
                  {variacion.imagenes.map((imagen, imagenIndex) => (
                   <div key={imagenIndex} className="w-80 h-85">
                   <img
                     src={imagen}
                     alt={`Imagen ${imagenIndex + 1}`}
                     className="max-w-full h-auto rounded-3xl"
                     style={{ maxWidth: '100%', maxHeight: '100%' }}
                   />
                 </div>
                  ))}
                </Slider>
              )}
            </div>
          ))}
        </div>
      )}
      <br/>
      <h3>
        {accesorio.nombre} {accesorio.marca}
        {accesorio.descripcion}
      </h3>
      <h4>
        {accesorio.material} {accesorio.precio}
        {accesorio.color} {accesorio.peso}
      </h4>
    </div>
  );
}
