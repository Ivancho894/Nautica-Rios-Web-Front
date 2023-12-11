
import React from "react";
import { Link } from "react-router-dom";

const RenderBarco = ({ barco }) => {
  //Renderiza un solo barco
  return (
    <div className="border-2 mb-4 border-slate-200 p-5 w-80 h-85 rounded-3xl flex flex-col items-center justify-center text-center shadow-[0_5px_40px_1px_rgba(0,0,0,2)]">
      <img className="w-[350px] h-60 object-cover" src={barco.imagenes[0]} />
  
      <h3 className="text-2xl font-bold mb-5">
        {barco.marcaBarco} {barco.modelo}
      </h3>
      <h4>
        Embarcacion tipo {barco.tipo} del año {barco.year}, equipado con un
        motor {barco.marcaMotor} {barco.modeloMotor}
      </h4>
  
      <div className="flex flex-col items-center justify-center flex-grow">
        {/* Otros elementos si los hay */}
        <Link to={"/detalle/" + barco.id}>
          <button className="p-2 bg-[#3b82f6] text-white h-[40px] w-[130px]">
            + info
          </button>
        </Link>
      </div>
    </div>
  );
  

};

export default RenderBarco;