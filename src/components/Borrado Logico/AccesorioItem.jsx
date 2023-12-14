import { db } from "../../../firebase-config";
import { doc, updateDoc } from "firebase/firestore";

const AccesorioItem = ({ accesorio, obtenerAccesorios }) => {

  const handleToggleEstado = async () => {
    try {
      const accesorioRef = doc(db, 'accesorios', accesorio.id);

      // Invierte el valor de 'eliminado'
      await updateDoc(accesorioRef, {
        eliminado: !accesorio.eliminado,
      });
      obtenerAccesorios();
      console.log(`Estado cambiado para el accesorio ${accesorio.id}`);
    } catch (error) {
      console.error('Error al cambiar el estado del accesorio:', error);
    }
  };

  return (
    <div>
      <p>{accesorio.nombre}</p>
      <button onClick={handleToggleEstado} className={`ml-4 p-2 text-center mt-1 mb-6 h-[40px] w-[130px] ${
    accesorio.eliminado ? 'bg-red-500' : 'bg-green-500'} text-white`}>
        {accesorio.eliminado ? 'Habilitar' : 'Deshabilitar'}
      </button>
    </div>
  );
};

export default AccesorioItem;
