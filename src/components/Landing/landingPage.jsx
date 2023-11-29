import React, { useState } from "react";
import photo1 from "../../assets/photo1.jpg";
import photo2 from "../../assets/photo2.jpg";
import photo3 from "../../assets/photo3.jpg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_BARCOS } from "../../redux/actions";

import { Link } from "react-router-dom";

const photos = [photo1, photo2, photo3];

export default function LandingPage() {
  const [index, setIndex] = useState(0);
  const barcos = useSelector((state) => state.barcos);
  const dispatch = useDispatch();
  useEffect(() => {
    //   dispatch(GET_BARCOS())
  }, []);

  const handleNext = () => {
    setIndex(index + 1);
    if (index === photos.length - 1) {
      setIndex(0);
    }
  };

  const handlePrevious = () => {
    setIndex(index - 1);
    if (index === 0) {
      setIndex(photos.length - 1);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "50px",
      }}
    >
      <h1 style={{ fontSize: "2rem" }}>Bienvenido a Nautica Ríos</h1>
      <h2 style={{ fontSize: "1.5rem" }}>Ventas y Accesorios</h2>
      <h3>Actualmente Tenemos {barcos.length} Embarcaciones Publicadas</h3>
      <p style={{ color: "#7e7e7e" }}>
        Navega por nuestra página y encuentra el producto perfecto para tu
        barco.
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "50%" }}>
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={photos[index]}
            alt="Barco"
          />
          <button
            onClick={handlePrevious}
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              fontWeight: "bold",
              padding: "8px 16px",
              borderRadius: "4px",
            }}
          >
            &larr;
          </button>
          <button
            onClick={handleNext}
            style={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              fontWeight: "bold",
              padding: "8px 16px",
              borderRadius: "4px",
            }}
          >
            &rarr;
          </button>
        </div>
      </div>
      <Link
        to="/home"
        className="bg-blue-600 px-4 py-2 text-white rounded hover:bg-blue-500 transition-colors"
      >
        Home
      </Link>
    </div>
  );
}
