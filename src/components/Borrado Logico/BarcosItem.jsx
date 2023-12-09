import { db } from "../../../firebase-config";
import { doc, updateDoc } from "firebase/firestore";

const BarcosItem = ({ barco, obtenerBarcos }) => {

  const handleToggleEstado = async () => {
    try {
      const barcoRef = doc(db, 'barcos', barco.id);

      // Invierte el valor de 'eliminado'
      await updateDoc(barcoRef, {
        eliminado: !barco.eliminado,
      });
      obtenerBarcos();
      console.log(`Estado cambiado para el barco ${barco.id}`);
    } catch (error) {
      console.error('Error al cambiar el estado del barco:', error);
    }
  };

  return (
    <div>
      <p>{barco.marcaBarco} {barco.modelo}</p>
      <button onClick={handleToggleEstado} className='ml-4 p-2 bg-[#3b82f6] text-center text-white mt-8 h-[40px] w-[130px]'>
        {barco.eliminado ? 'Habilitar' : 'Deshabilitar'}
      </button>
    </div>
  );
};

export default BarcosItem;