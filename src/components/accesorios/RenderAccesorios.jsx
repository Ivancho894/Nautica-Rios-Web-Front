// import React from 'react';
// import { Link } from 'react-router-dom';

// const RenderAccesorios = ({ accesorio }) => {
//  //Renderiza un solo barco
//  return (
//     <div className="border-6 border-gray-300 p-5 w-80 h-85 rounded-3xl bg-sky-400 flex flex-col items-center justify-center text-center mb-5">
//       {/* //* la imagen es solo referencial, aun falta ver como traer las imgaes de la store de firebase */}
//       {accesorio.variaciones && accesorio.variaciones.length > 0 && (
//             <div>
//             {accesorio.variaciones.map((variacion, variacionIndex) => (
//               <div key={variacionIndex}>
//                 {variacion.imagenes && variacion.imagenes.length > 0 && (
//                   <div>
//                     {variacion.imagenes.map((imagen, imagenIndex) => (
//                       <img key={imagenIndex} src={imagen} alt={`Imagen ${imagenIndex + 1}`} style={{ maxWidth: '100%' }}/>
//                       ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//           )}
//       <h3>
//         {accesorio.nombre} {accesorio.marca}
//       </h3>
//       <h4>
//         Material de {accesorio.material}
//       </h4>

//       <Link to={"/detalleaccesorio/" + accesorio.id}>
//         <button>más</button>
//       </Link>
//     </div>
//  );
// };

// export default RenderAccesorios;




import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RenderAccesorios = ({ accesorio }) => {
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
        <Slider {...settings} className="w-80 mx-auto">
          {accesorio.variaciones.map((variacion, variacionIndex) => (
            variacion.imagenes && variacion.imagenes.length > 0 && (
              variacion.imagenes.map((imagen, imagenIndex) => (
                <div key={imagenIndex} className="w-80 h-85">
                  <img
                    src={imagen}
                    alt={`Imagen ${imagenIndex + 1}`}
                    className="max-w-full h-auto rounded-3xl"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                </div>
              ))
            )
          ))}
        </Slider>
      )}
      <br/>
        <h3>{accesorio.nombre} {accesorio.marca}</h3>
        <h4>Material de {accesorio.material}</h4>
        <Link to={"/detalleaccesorio/" + accesorio.id}>
          <button>más</button>
        </Link>
      
    </div>
  );
};

export default RenderAccesorios;

