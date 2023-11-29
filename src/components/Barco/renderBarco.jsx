import React from 'react';
import { Link } from 'react-router-dom';

const RenderBarco = ({ barco }) => {
 //Renderiza un solo barco
 return (
    <div className="border-6 border-gray-300 p-5 w-80 h-85 rounded-3xl bg-sky-400 flex flex-col items-center justify-center text-center mb-5">
      {/* //* la imagen es solo referencial, aun falta ver como traer las imgaes de la store de firebase */}
      <img
        className="w-100 h-60 object-cover rounded-3xl"
        src={barco.imagenes[0]}
      />
      <h3>
        {barco.marcaBarco} {barco.modelo}
      </h3>
      <h4>
        Embarcacion tipo {barco.tipo} del año {barco.year}, equipado con un
        motor {barco.marcaMotor} {barco.modeloMotor}
      </h4>

      <Link to={"/detalle/" + barco.id}>
        <button>more info</button>
      </Link>
    </div>
 );
};

export default RenderBarco;
