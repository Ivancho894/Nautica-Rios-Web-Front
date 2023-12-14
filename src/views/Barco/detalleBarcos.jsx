import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../../firebase-config";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { async } from "@firebase/util";

export default function Detalle() {
  const barcos = useSelector((state) => state.barcos);
  const { id } = useParams();
  const barco = barcos.find((x) => x.id === id);
  const auth = useAuth();
  const [listaDeDeseos, setListaDeDeseos] = useState(null);
  const { uid } = auth.user;
  let keyId = 0;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


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

    <div className="grid grid-cols-2  p-16 mt-4 relative">


      <div className=" grid grid-cols-2  mt-8  w-[1100px]">

        {barco.imagenes.map((img, i) => (
          <img
            key={i}
            className="object-contain w-[400] h-[400px] mb-2"
            src={img}
            alt={`Imagen ${i}`}
          />
        ))}

      </div>

      <div className="ml-[320px] p-2 w-[400px] sticky top-0 h-screen ">
        <div>
          <h2 className="text-4xl font-bold mb-2 mt-16 text-left">
            {barco.marcaBarco}
          </h2>
          <h2 >
            ${barco.precio}
          </h2>
        </div>

        {barco && barco.accesorios && (
          <div className="mb-2">
            <div className="flex">
              <span className="font-bold">accesorios:</span>
              <div className="ml-2" style={{ maxHeight: '8rem', overflowY: 'auto' }}>
                {barco.accesorios}
              </div>
            </div>
          </div>
        )}

        <div className=" mt-8 grid grid-cols-2 gap-4 ">
          {barco &&
            Object.keys(barco).map((key) => {
              if (key !== "imagenes" && key !== "accesorios") {
                return (
                  <div key={keyId++} className="mb-2">
                    <div className="flex">
                      <span className="font-bold">{key}:</span>
                      <span className="ml-2">{barco[key]}</span>
                    </div>
                  </div>
                );
              }
              return null;
            })}
        </div >

        {auth.user ? (
          <div className="flex  gap-4 p-2">
            {listaDeDeseos?.some((deseo) => deseo.id === barco.id) ? (
              <button
                className=" p-2 bg-[#3b82f6] text-center text-white mt-[5px] h-[60px] w-[170px]"
                onClick={handleDeleteWish}
              >
                Eliminar de lista de deseos
              </button>
            ) : (
              <button
                className=" p-2 bg-[#3b82f6] text-center text-white mt-[5px] h-[60px] w-[170px]"
                onClick={handleWish}
              >
                agregar a lista de deseos
              </button>
            )}

            <button
              onClick={() => {
                // Lógica adicional si es necesaria antes de la navegación
                // Puedes agregar más lógica aquí si es necesario
              }}
              className="p-2 mt-1 bg-[#3b82f6] text-white h-[60px] w-[190px] mb-4"
            >
              <Link to="/todoslosbarcos" className="text-white no-underline">
                Regresar
              </Link>
            </button>
          </div>
        ) : null}
      </div>
    </div>


  );
}