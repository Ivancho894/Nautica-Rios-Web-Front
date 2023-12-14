import { useEffect, useState } from "react";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  AGREGAR_CARRITO,
  BORRAR_PRODUCTO,
  BORRAR_UNIDAD,
  VACIAR_CARRITO,
  TOTAL_PAGAR,
  SET_UID,
  UPDATE_CARRITO,
} from "../../redux/actions";
import { useNavigate } from "react-router-dom";
export default function Header({ uid }) {
  const navigate = useNavigate();
  const carrito = useSelector((state) => state.carrito);
  const [allProducts, setAllProducts] = useState([]);
  const dispatch = useDispatch();

  const [totalPagar, setTotal] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let carrAux = []

    //Itero en carrito y busco uno de cada uno 
    carrito.length != 0
      ? carrito.map((prod) =>
          carrAux.find((x) => x.id === prod.id)
            ? null
            : carrAux.push(prod)
        )
      : null;

    setAllProducts(carrAux);

    setTotal(
      carrito.reduce((sum, prod) => {
        sum = sum + prod.precio*1;
        // dispatch(TOTAL_PAGAR(sum));
        return sum;
      }, 0)
    );
    // setAllProducts([...new Set(carrito)])
    if(uid){
      dispatch(UPDATE_CARRITO(uid,carrito));
    }
    
  }, [carrito]);

  const contarProducto = (prod) => {
    let count = 0;
    carrito.forEach((product) => {
      if (product.id === prod.id) {
        count++;
      }
    });
    return count;
  };

  const onDeleteProduct = (product) => {
    dispatch(BORRAR_UNIDAD(product));

  };

  const onCleanCart = () => {
    dispatch(VACIAR_CARRITO());
  };

  const pagar = (uid) => {
    if (uid) {
      dispatch(SET_UID(uid));
      navigate("/detalleCompra");
    } else {
      alert("Inicia sesion para pagar");
      navigate("/login");
    }
  };

  return (
    <header>
      <div className="container-icon  ">
        <div className="container-cart-icon" onClick={() => setActive(!active)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="icon-cart "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <div className="count-products h-8 w-8 text-black bg-slate-300 mt-4">
            <span id="contador-productos">{carrito?.length}</span>
          </div>
        </div>

        <div
          className={`bg-slate-300 container-cart-products ${
            active ? "" : "hidden-cart"
          }`}
        >
          {allProducts.length ? (
            <>
              {/* row-product */}
              <div className="scroll ">
                {allProducts.map((product, i) => (
                  <div className="cart-product" key={i}>
                    <div className="info-cart-product">
                      <span className="cantidad-producto-carrito">
                        x{contarProducto(product)}
                      </span>
                      <p className="titulo-producto-carrito">
                        {product.nombre}
                      </p>
                      <span className="precio-producto-carrito">
                        ${product.precio}
                      </span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="icon-close"
                      onClick={() => onDeleteProduct(product)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                ))}
              </div>
              <div className="cart-total">
                <h3>Total:</h3>
                <h2 className="total-pagar">${totalPagar}</h2>
              </div>
              <button
                className="p-2 bg-[#7183a2] m-4 text-white h-[50px] w-[190px] mb-4"
                onClick={onCleanCart}
              >
                Vaciar Carrito
              </button>
              <button
                className="p-2 bg-[#7183a2]  text-white h-[50px] w-[190px] mb-4"
                onClick={() => pagar(uid)}
              >
                Pagar
              </button>
            </>
          ) : (
            <span className="cart-empty">El carrito está vacío</span>
          )}
        </div>
      </div>
    </header>
  );
}
