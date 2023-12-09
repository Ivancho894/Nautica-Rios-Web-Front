import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BORRAR_UNIDAD } from "../../redux/actions";
const DetalleCompra = () => {
  const dispatch = useDispatch();
  // const tpagar = useSelector((state) => state.totalPagar);
  const carr = useSelector((state) => state.carrito);
  console.log(carr);
  const onDeleteProduct = (product) => {
    dispatch(BORRAR_UNIDAD(product));
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="flex-col my-16">
      <br />
      {carr.length !== 0 ? (
        <div>
          <div className="flex-col">
            <h2>
              <strong>TU CARRITO</strong>
            </h2>
            <br />

            <span>
              Total {carr.length} productos <strong>$</strong>
            </span>
            <br />
            <p>
              Los artículos en tu carrito no están reservados. Termina el
              proceso de compra ahora para hacerte con ellos.
            </p>
          </div>
          <div className="flex justify-around my-6 ">
            <div className="flex-wrap ">
              {carr?.map((producto, index) => (
                <div
                  className="border-2 border-slate-200 p-5 w-80 h-85 rounded-3xlflex flex-col items-center justify-center text-center mb-5 shadow-[0_5px_40px_1px_rgba(0,0,0,2)]"
                  key={index}
                >
                  <button
                    className="flex"
                    onClick={() => onDeleteProduct(producto)}
                  >
                    x
                  </button>
                  <br />
                  {/* {producto.variaciones && producto.variaciones.length > 0 && (
              <Slider {...settings} className="w-60 mx-auto">
                {producto.variaciones.map(
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
            )} */}

                  <h3 className="text-2xl font-bold mb-5">{producto.nombre}</h3>
                  <h3>{producto.marca}</h3>
                  <h4>Material de {producto.material}</h4>
                </div>
              ))}
            </div>
            <div>
              <Link>
                <button>Ir a pagar</button>
              </Link>
              <br />
              <br />

              <div>
                <h2>
                  <strong>RESUMUEN DEL PEDIDO</strong>
                </h2>
                <div className="flex justify-between">
                  <p>{carr.length} productos</p>
                  <p>$</p>
                </div>
                <div className="flex justify-between">
                  <p> total</p>
                  <p>$</p>
                </div>
                <div>
                  <p>opciones de pago</p>
                  <span> algunas imagenes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-col">
          <h2>
            <strong>TU CARRITO ESTA VACIO</strong>
          </h2>
          <br />
          <p>
            Una vez que añadas algo a tu carrito, aparecerá aquí. ¿Listo para
            empezar?
          </p>
          <br />
          <Link to="/home">
            <button>comenzar ➡</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DetalleCompra;
