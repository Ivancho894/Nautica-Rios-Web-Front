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
      <button onClick={handleToggleEstado} className='ml-4 p-2 bg-[#3b82f6] text-center text-white mt-8 h-[40px] w-[130px]'>
        {accesorio.eliminado ? 'Habilitar' : 'Deshabilitar'}
      </button>
    </div>
  );
};

export default AccesorioItem;
