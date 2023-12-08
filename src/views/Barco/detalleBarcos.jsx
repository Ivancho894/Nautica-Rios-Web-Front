import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../../firebase-config";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Detalle() {
  const barcos = useSelector((state) => state.barcos);
  const { id } = useParams();
  const barco = barcos.find((x) => x.id === id);
  const auth = useAuth();
  const [listaDeDeseos, setListaDeDeseos] = useState(null);
  const { uid } = auth.user;
  let keyId = 0;

  const recibirListaDeDeseos = async (id) => {
    try {
      const usuarioRef = doc(db, "users", id);
      const snap = await getDoc(usuarioRef);
      if (snap.exists()) {
        const datosUsuario = snap.data();
        const { listaDeDeseos } = datosUsuario;
        setListaDeDeseos(listaDeDeseos);
      } else {
        console.log("No hay datos");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    recibirListaDeDeseos(uid);
  }, [uid]);

  const handleWish = async (e) => {
    e.preventDefault();
    const userRef = doc(db, "users", auth.user.uid);
    await updateDoc(userRef, {
      listaDeDeseos: arrayUnion(barco),
    });
    await recibirListaDeDeseos(uid);
  };

  const handleDeleteWish = async (e) => {
    e.preventDefault();
    try {
      // Filtrar la lista de deseos para excluir el producto a eliminar
      const nuevaListaDeseos = listaDeDeseos.filter(
        (deseo) => deseo.id !== barco.id
      );

      const usuarioRef = doc(db, "users", uid);

      // Actualizar el documento del usuario en Firestore con la nueva lista de deseos
      await updateDoc(usuarioRef, {
        listaDeDeseos: nuevaListaDeseos,
      });

      await recibirListaDeDeseos(uid);

      console.log(listaDeDeseos);

      console.log("Producto eliminado con éxito.");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 bg-blue-200">
      <h2 className="text-xl font-bold mb-2" style={{ marginTop: "28px" }}>
        {barco.marcaBarco}
      </h2>
      <div className="flex">
        <div className="flex-1">
          {barco &&
            Object.keys(barco)?.map((key) => {
              if (key != "imagenes") {
                return (
                  <h3 key={keyId++} className="mb-2">
                    <b>{key}</b>: <span>{barco[key]}</span>
                  </h3>
                );
              }
            })}
        </div>
        {auth.user ? (
          <>
            {listaDeDeseos?.some((deseo) => deseo.id === barco.id) ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleDeleteWish}
              >
                Eliminar de lista de deseos
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleWish}
              >
                agregar a lista de deseos
              </button>
            )}
          </>
        ) : null}
        <div className="flex-1">
          {barco.imagenes.map((img, i) => {
            return <img key={i} className="w-4/5 mx-auto mb-2" src={img} />;
          })}
          <h2 className="text-2xl font-bold mb-4">precio: ${barco.precio}</h2>
          <Link
            to="/todoslosbarcos"
            className="bg-gray-800 text-white font-bold py-2 px-4 rounded"
          >
            Regresar
          </Link>
        </div>
      </div>
    </div>
  );
}
