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
  // const barcos = useSelector((state) => state.barcos);
  const { id } = useParams();
  // let barco = barcos.find((x) => x.id === id);
  const [barco, setBarco] = useState(false);
  async () => {
    const snap = await getDoc(doc(db, 'barcos', id))
    if (snap.exists()) {
      console.log(snap.data())
      setBarco(snap.data())
    }
  }
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
    <div className="flex justify-center p-16">
      <div className="border-2 mb-4 border-slate-200 p-16 w-[1500px] h-[1000px] rounded-3xlflex mt-16 shadow-[0_5px_40px_1px_rgba(0,0,0,2)]">
       
        <h2 className="text-6xl font-bold mb-16 mt-16">
          {barco.marcaBarco}
        </h2>
       
        <div className="flex">
          <div className="flex-1">
            {barco &&
              Object.keys(barco)?.map((key) => {
                if (key !== "imagenes") {
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
                className="ml-[200px] p-2 bg-[#3b82f6] text-center text-white mt-[620px] h-[60px] w-[180px]"
                  onClick={handleDeleteWish}
                >
                  Eliminar de lista de deseos
                </button>
              ) : (
                <button
                  className="ml-[200px] p-2 bg-[#3b82f6] text-center text-white mt-[620px] h-[60px] w-[180px]"
                  onClick={handleWish}
                >
                  agregar a lista de deseos
                </button>
              )}
            </>
          ) : null}
          
         
          <div className="flex-1">
            <Slider {...settings} className="w-[500px] h-[500px] mx-auto">
              {barco.imagenes.map((img, i) => (
                <img
                  key={i}
                  className="object-contain w-[500px] h-[500px]   mb-2"
                  src={img}
                  alt={`Imagen ${i}`}
                
                />
              ))}
            </Slider>
            
            <h2 className="text-4xl font-bold mt-16 mb-4">Precio: ${barco.precio}</h2>
            <button
            onClick={() => {
              // Lógica adicional si es necesaria antes de la navegación
              // Puedes agregar más lógica aquí si es necesario
            }}
            className="p-2 bg-[#3b82f6] text-white h-[60px] w-[190px] mb-4"
          >
            <Link to="/todoslosbarcos" className="text-white no-underline">
              Regresar
            </Link>
          </button>
          </div>
        </div>
      </div>
    </div>
  );
  
}



