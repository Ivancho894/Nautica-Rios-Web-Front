import React from 'react';
import { Link } from 'react-router-dom';

const RenderAccesorios = ({ accesorio }) => {
 //Renderiza un solo barco
 return (
    <div className="border-6 border-gray-300 p-5 w-80 h-85 rounded-3xl bg-sky-400 flex flex-col items-center justify-center text-center mb-5">
      {/* //* la imagen es solo referencial, aun falta ver como traer las imgaes de la store de firebase */}
      {accesorio.variaciones && accesorio.variaciones.length > 0 && (
            <div>
            {accesorio.variaciones.map((variacion, variacionIndex) => (
              <div key={variacionIndex}>
                {variacion.imagenes && variacion.imagenes.length > 0 && (
                  <div>
                    {variacion.imagenes.map((imagen, imagenIndex) => (
                      <img key={imagenIndex} src={imagen} alt={`Imagen ${imagenIndex + 1}`} style={{ maxWidth: '100%' }}/>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          )}
      <h3>
        {accesorio.nombre} {accesorio.marca}
      </h3>
      <h4>
        Material de {accesorio.material}
      </h4>

      <Link to={"/detalleaccesorio/" + accesorio.id}>
        <button>more info</button>
      </Link>
    </div>
 );
};

export default RenderAccesorios;
