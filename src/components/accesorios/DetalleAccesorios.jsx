import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { NavLink } from "react-router-dom";

const DetalleAccesorio = () => {
  const { id } = useParams();
  const [accesorio, setAccesorio] = useState(null);

  useEffect(() => {
    const fetchAccesorio = async () => {
      const accesorioDoc = doc(db, "accesorios", id);
      const accesorioSnapshot = await getDoc(accesorioDoc);

      if (accesorioSnapshot.exists()) {
        setAccesorio({
          id: accesorioSnapshot.id,
          ...accesorioSnapshot.data(),
        });
      }
    };

    fetchAccesorio();
  }, [id]);

  if (!accesorio) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="mb-5 mx-auto mt-16 w-full h-[1000px] relative">
      {accesorio.variaciones.map((variacion, variacionIndex) => (
        <div className=" grid grid-cols-2" key={variacionIndex}>
          {variacion.imagenes && variacion.imagenes.length > 0 && (
            
            
            <div className="grid grid-cols-2  mt-8 w-[900px] ">
              {variacion.imagenes.map((imagen, imagenIndex) => (
                <div key={imagenIndex} className="mt-8 ml-[220px] w-[4000] h-[400px] mb-2 ">
                  <img
                    src={imagen}
                    alt={`Imagen ${imagenIndex + 1}`}
                    className="object-contain w-[400] h-[400px]"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="ml-[270px] mb-4 mt-4 w-[500px] sticky top-0 h-screen ">
            <div className="mb-4  w-[500px]">
              <h3 className="text-3xl font-bold mb-2 mt-16 text-left">{accesorio.nombre}</h3>
              <table className="table-auto w-full my-2">
                <tbody>
                  <tr>
                    <td className="text-2xl font-bold mt-1 mb-4 text-left">${accesorio.precio}</td>
                  </tr>
                  {variacion.color && (
                    <tr>
                      <td className="font-semibold text-left">Color: {variacion.color}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <p className="text-lg text-gray-600">{accesorio.marca}</p>
            <p className="text-lg">{accesorio.descripcion}</p>
         
            <NavLink to="/accesorios">
        <button className="ml-4 p-2 bg-[#3b82f6] text-center text-white mt-8 h-[40px] w-[130px]">
          Regresar
        </button>
      </NavLink>
         
          </div>
        
       
        
        </div>
      ))}
    
    </div>
  );
};

export default DetalleAccesorio;
