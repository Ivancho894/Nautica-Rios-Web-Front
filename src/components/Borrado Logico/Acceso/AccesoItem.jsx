import { db } from "../../../../firebase-config";
import { doc, updateDoc } from "firebase/firestore";

const AccesoItem = ({ user, obtenerUsers }) => {

  const handleToggleEstado = async () => {
    try {
      const userRef = doc(db, 'users', user.id);

      // Invierte el valor de 'permisosAdmin'
      await updateDoc(userRef, {
        acceso: !user.acceso,
      });
      obtenerUsers();
      console.log(`Estado cambiado para el usuario ${user.id}`);
    } catch (error) {
      console.error('Error al cambiar el estado del usuario:', error);
    }
  };

  return (
    <div>
      <p>{user.displayName} {user.email}</p>
      <button onClick={handleToggleEstado} className='ml-4 p-2 bg-[#3b82f6] text-center text-white mt-8 h-[40px] w-[130px]'>
        {user.acceso ? 'Deshabilitar' : 'Habilitar'}
      </button>
    </div>
  );
};

export default AccesoItem;