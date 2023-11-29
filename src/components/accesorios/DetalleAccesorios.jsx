import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore"; 

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

  return (
    <div>

      {accesorio.variaciones && accesorio.variaciones.length > 0 && (
        <div>
          {accesorio.variaciones.map((variacion, variacionIndex) => (
            <div key={variacionIndex}>
              {variacion.imagenes && variacion.imagenes.length > 0 && (
                <div>
                  {variacion.imagenes.map((imagen, imagenIndex) => (
                    <img key={imagenIndex} src={imagen} alt={`Imagen ${imagenIndex + 1}`} style={{ maxWidth: '20%' }}/>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        )}

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
