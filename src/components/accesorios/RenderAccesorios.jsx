import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  AGREGAR_CARRITO,
  BORRAR_UNIDAD,
  BORRAR_PRODUCTO,
  UPDATE_CARRITO,
} from "../../redux/actions";
import ReviewStars from "../Reviews/Reviews";

const RenderAccesorios = ({ accesorio }) => {
  const uid = useSelector((state) => state.uid);
  const carr = useSelector((state) => state.carrito);
  const dispatch = useDispatch();


  const agregarAlCarrito = () => {
    dispatch(AGREGAR_CARRITO(accesorio));
    uid!=""?dispatch(UPDATE_CARRITO(uid,carr)):null;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="  border-2 border-slate-200 p-5 w-80 h-85 rounded-3xlflex flex-col items-center justify-center text-center mb-5 shadow-[0_5px_40px_1px_rgba(0,0,0,2)]">
      {accesorio.variaciones && accesorio.variaciones.length > 0 && (
        <Slider {...settings} className="w-60 mx-auto">
          {accesorio.variaciones.map(
            (variacion, variacionIndex) =>
              variacion.imagenes &&
              variacion.imagenes.length > 0 &&
              variacion.imagenes.map((imagen, imagenIndex) => (
                <div
                  key={imagenIndex}
                  className="w-full h-64 flex items-center justify-center"
                >
                  <img
                    src={imagen}
                    alt={`Imagen ${imagenIndex + 1}`}
                    className="object-contain w-full h-full"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </div>
              ))
          )}
        </Slider>
      )}
      <br />
      <h3 className="text-2xl font-bold mb-5">{accesorio.nombre}</h3>
      <h3>{accesorio.marca}</h3>
      <h4>Material de {accesorio.material}</h4>
      <p>precio: ${accesorio.precio}</p>

      <div className="flex items-end gap-16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => agregarAlCarrito()}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="hover:text-[#3b82f6] cursor-pointer ml-[20px]  w-[40px] h-[40px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>

        <Link to={"/detalleaccesorio/" + accesorio.id}>
          <button className="ml-4 p-2 bg-[#3b82f6] text-center text-white mt-8 h-[40px] w-[130px]">
            + info
          </button>
        </Link>
      </div>
      <ReviewStars productId={accesorio.id} />
    </div>
  );
};

export default RenderAccesorios;
