import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BORRAR_UNIDAD, UPDATE_CARRITO } from "../../redux/actions";
import Slider from "react-slick";
import img_pago from "../../assets/mercado-pago.webp";
import handlePay from "./handlePay";

const DetalleCompra = () => {
  const dispatch = useDispatch();
  const carr = useSelector((state) => state.carrito);
  const uid = useSelector((state) => state.uid);
  const [productos, setProductos] = useState([]);
  const [totalPagar, setTotalPagar] = useState(0);

  useEffect(() => {
    const productosUnicos = Array.from(
      new Set(carr.map((prod) => prod.id))
    ).map((id) => carr.find((prod) => prod.id === id));

    setProductos(productosUnicos);
    setTotalPagar(carr.reduce((sum, prod) => sum + prod.precio*1, 0));
    if(uid){
      dispatch(UPDATE_CARRITO(uid,carr));
    }
    
  }, [carr]);

  const contarProducto = (producto) => {
    return carr.filter((prod) => prod.id === producto.id).length;
  };

  const reducirCantidad = (producto) => {
    dispatch(BORRAR_UNIDAD(producto));
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="mt-16 p-16 flex-col my-16">
      <br />
      {carr.length !== 0 ? (
        <div>
          <div className="">
            <h2>
              <h1 className="font-bold">TU CARRITO</h1>
            </h2>
            <br />

            <span className="text-3xl">
              Total {carr.length} productos: $
              <strong>{totalPagar.toFixed(2)}</strong>
            </span>
            <br />
            <p className="text-2xl">
              Los artículos en tu carrito no están reservados. Termina el
              proceso de compra ahora para hacerte con ellos.
            </p>
          </div>

          <div className="flex justify-around my-6  ">
            <div className="flex flex-rows h-[1600px] w-[1500px]  p-16 ">
              <div className="">
                {productos?.map((producto, index) => (
                  <div
                    className="border-2 border-slate-200 p-5 w-80 h-85 rounded-3xlflex flex-col items-center justify-center text-center mb-5 shadow-[0_5px_40px_1px_rgba(0,0,0,2)]"
                    key={index}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="icon-close"
                      onClick={() => reducirCantidad(producto)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>

                    <div>
                      <div>
                        {producto.variaciones &&
                          producto.variaciones.length > 0 && (
                            <Slider {...settings} className="w-60 mx-auto">
                              {producto.variaciones.map(
                                (variacion, variacionIndex) =>
                                  variacion.imagenes &&
                                  variacion.imagenes.length > 0 &&
                                  variacion.imagenes.map(
                                    (imagen, imagenIndex) => (
                                      <div
                                        key={imagenIndex}
                                        className="w-full h-64 flex items-center justify-center "
                                      >
                                        <img
                                          src={imagen}
                                          alt={`Imagen ${imagenIndex + 1}`}
                                          className="object-contain w-full h-full "
                                          style={{
                                            maxWidth: "100%",
                                            maxHeight: "100%",
                                          }}
                                        />
                                      </div>
                                    )
                                  )
                              )}
                            </Slider>
                          )}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-5">
                          {producto.nombre}
                        </h3>
                        <h3>{producto.marca}</h3>
                        <h4>Material de {producto.material}</h4>
                        <p className="">Cantidad: {contarProducto(producto)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <button onClick={() => handlePay(uid, carr)}>Ir a pagar</button>

              <br />
              <br />

              <div>
                <h2>
                  <strong>RESUMEN DEL PEDIDO</strong>
                </h2>
                <div className="flex justify-between">
                  <p>{carr.length} productos</p>
                  <p>Total: ${totalPagar.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p> Total a pagar</p>
                  <p>${totalPagar.toFixed(2)}</p>
                </div>
                <div>
                  <p>Opciones de pago</p>

                  <img src={img_pago} alt="metodos de pago" width={250} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-col">
          <h2>
            <strong>TU CARRITO ESTÁ VACÍO</strong>
          </h2>
          <br />
          <p>
            Una vez que añadas algo a tu carrito, aparecerá aquí. ¿Listo para
            empezar?
          </p>
          <br />
          <Link to="/accesorios">
            <button>Comenzar ➡</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DetalleCompra;

// import { useSelector, useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { BORRAR_UNIDAD } from "../../redux/actions";
// import Slider from "react-slick";
// import img_pago from "../../assets/mercado-pago.webp";
// import handlePay from "./handlePay";

// const DetalleCompra = () => {
//   const dispatch = useDispatch();

//   const carr = useSelector((state) => state.carrito);
//   const uid = useSelector((state) => state.uid);

//   const [allProducts, setAllProducts] = useState([]);
//   const [totalPagar, setTotal] = useState(0);
//   console.log(carr);

//   useEffect(() => {
//     carr.length != 0
//       ? carr.map((prod) =>
//           allProducts.find((x) => x.id === prod.id)
//             ? null
//             : setAllProducts([...allProducts, prod])
//         )
//       : setAllProducts([]);
//     setTotal(
//       carr.reduce((sum, prod) => {
//         sum = sum + prod.precio;
//         // dispatch(TOTAL_PAGAR(sum));
//         return sum;
//       }, 0)
//     );
//     // setAllProducts([...new Set(carr)])
//   }, [carr]);
//   const contarProducto = (prod) => {
//     let count = 0;
//     carr.forEach((product) => {
//       if (product.id === prod.id) {
//         count++;
//       }
//     });
//     return count;
//   };
//   const onDeleteProduct = (product) => {
//     dispatch(BORRAR_UNIDAD(product));
//   };

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };
//   return (
//     <div className="mt-16 p-16 flex-col my-16">
//       <br />
//       {carr.length !== 0 ? (
//         <div>
//           <div className="">
//             <h2>
//               <h1 className="font-bold">TU CARRITO</h1>
//             </h2>
//             <br />

//             <span className="text-3xl">
//               Total {carr.length} productos <strong>{totalPagar}</strong>
//             </span>
//             <br />
//             <p className="text-2xl">
//               Los artículos en tu carrito no están reservados. Termina el
//               proceso de compra ahora para hacerte con ellos.
//             </p>
//           </div>

//           <div className="flex justify-around my-6  ">
//             <div className=" flex flex-rows h-[1600px] w-[1500px]  p-16 ">
//               <div className="">
//                 {allProducts?.map((producto, index) => (
//                   <div
//                     className="border-2 border-slate-200 p-5 w-80 h-85 rounded-3xlflex flex-col items-center justify-center text-center mb-5 shadow-[0_5px_40px_1px_rgba(0,0,0,2)]"
//                     key={index}
//                   >
//                     {/* <div className=" flex justify-end">
//                     <button onClick={() => onDeleteProduct(producto)}>X</button>
//                   </div> */}
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth="1.5"
//                       stroke="currentColor"
//                       className="icon-close"
//                       onClick={() => onDeleteProduct(producto)}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>

//                     <div>
//                       <div>
//                         {producto.variaciones &&
//                           producto.variaciones.length > 0 && (
//                             <Slider {...settings} className="w-60 mx-auto">
//                               {producto.variaciones.map(
//                                 (variacion, variacionIndex) =>
//                                   variacion.imagenes &&
//                                   variacion.imagenes.length > 0 &&
//                                   variacion.imagenes.map(
//                                     (imagen, imagenIndex) => (
//                                       <div
//                                         key={imagenIndex}
//                                         className="w-full h-64 flex items-center justify-center "
//                                       >
//                                         <img
//                                           src={imagen}
//                                           alt={`Imagen ${imagenIndex + 1}`}
//                                           className="object-contain w-full h-full "
//                                           style={{
//                                             maxWidth: "100%",
//                                             maxHeight: "100%",
//                                           }}
//                                         />
//                                       </div>
//                                     )
//                                   )
//                               )}
//                             </Slider>
//                           )}
//                       </div>
//                       <div>
//                         <h3 className="text-2xl font-bold mb-5">
//                           {producto.nombre}
//                         </h3>
//                         <h3>{producto.marca}</h3>
//                         <h4>Material de {producto.material}</h4>
//                         <p className="">cantidad: {contarProducto(producto)}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <button onClick={() => handlePay(uid, carr)}>Ir a pagar</button>

//               <br />
//               <br />

//               <div>
//                 <h2>
//                   <strong>RESUMUEN DEL PEDIDO</strong>
//                 </h2>
//                 <div className="flex justify-between">
//                   <p>{carr.length} productos</p>
//                   <p>{totalPagar}</p>
//                 </div>
//                 <div className="flex justify-between">
//                   <p> total</p>
//                   <p>{totalPagar}</p>
//                 </div>
//                 <div>
//                   <p>opciones de pago</p>

//                   <img src={img_pago} alt="metodos de pago" width={250} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="flex-col">
//           <h2>
//             <strong>TU CARRITO ESTA VACIO</strong>
//           </h2>
//           <br />
//           <p>
//             Una vez que añadas algo a tu carrito, aparecerá aquí. ¿Listo para
//             empezar?
//           </p>
//           <br />
//           <Link to="/accesorios">
//             <button>comenzar ➡</button>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DetalleCompra;
