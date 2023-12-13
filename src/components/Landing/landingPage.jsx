import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_BARCOS, NOTIFICACIONES } from "../../redux/actions";
import { Link } from "react-router-dom";
import photo1 from "../../assets/photo1.jpg";
import photo2 from "../../assets/photo2.jpg";
import photo3 from "../../assets/photo3.jpg";
import { Toaster, toast } from "sonner";
const photos = [photo2, photo1, photo3];

const LandingPage = ({ activarMensages }) => {
  const [index, setIndex] = useState(0);
  const barcos = useSelector((state) => state.barcos);
  const not = useSelector((state) => state.notificaciones);
  const dispatch = useDispatch();
  // console.log(not);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 3000);

    toast("¿Quieres aceptar notificaciones?", {
      position: "top-center",
      action: {
        label: "Aceptar",
        onClick: (e) => {
          activarMensages();
          dispatch(NOTIFICACIONES(true));
          console.log(true);
        },
      },
      cancel: {
        label: "denegar",
        onClick: () => {
          dispatch(NOTIFICACIONES(false));
          console.log(false);
        },
      },
    });
    // Descomenta la siguiente línea si deseas obtener los barcos al cargar la página
    // dispatch(GET_BARCOS());

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Toaster />
        {photos.map((photo, i) => (
          <img
            key={i}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: index === i ? 1 : 0,
              transition: "opacity 1s ease-in-out",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            src={photo}
            alt={`Barco ${i + 1}`}
          />
        ))}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <h1 className="text-white">Bienvenido a Nautica Ríos</h1>
          <h2 className="text-white">Ventas y Accesorios</h2>
        </div>
        <div
          style={{
            position: "absolute",
            top: "80%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            whiteSpace: "nowrap",
            textAlign: "center",
          }}
        >
          <h3 className="text-white text-2xl font-bold mb-2">
            Actualmente Tenemos {barcos.length} Embarcaciones Publicadas
          </h3>
          <p className="text-white text-2xl font-bold mb-2">
            Navega por nuestra página y encuentra el producto perfecto para tu
            barco.
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "50px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Link
            to="/home"
            className="bg-blue-600 px-4 py-2 text-white rounded hover:bg-blue-500 transition-colors"
          >
            Ingresar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
