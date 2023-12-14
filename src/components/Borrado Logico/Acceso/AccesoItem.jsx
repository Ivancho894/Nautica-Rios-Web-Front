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
      <p>{user.displayName} <br/> {user.email}</p>
      <button onClick={handleToggleEstado}  className={`ml-4 p-2 text-center mt-1 mb-6 h-[40px] w-[130px] ${
    user.acceso ? 'bg-red-500' : 'bg-green-500'} text-white`}>
        {user.acceso ? 'Deshabilitar' : 'Habilitar'}
      </button>
    </div>
  );
};

export default AccesoItem;