import { useEffect, useState } from "react";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import {
  AGREGAR_CARRITO,
  BORRAR_PRODUCTO,
  BORRAR_UNIDAD,
  VACIAR_CARRITO,
  TOTAL_PAGAR,
} from "../../redux/actions";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  const carrito = useSelector((state) => state.carrito);
  const [allProducts, setAllProducts] = useState([]);
  const dispatch = useDispatch();

  const [totalPagar, setTotal] = useState(0);
  const [active, setActive] = useState(false);
  let sum;

  useEffect(() => {
    carrito.length != 0
      ? carrito.map((prod) =>
          allProducts.find((x) => x.id === prod.id)
            ? null
            : setAllProducts([...allProducts, prod])
        )
      : setAllProducts([]);
    setTotal(
      carrito.reduce((sum, prod) => {
        sum = sum + prod.precio;
        // dispatch(TOTAL_PAGAR(sum));
        return sum;
      }, 0)
    );
    // setAllProducts([...new Set(carrito)])
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

  const pagar = () => {
    navigate("/detalleCompra");
  };

  return (
    <header>
      <div className="container-icon">
        <div className="container-cart-icon" onClick={() => setActive(!active)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="icon-cart"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <div className="count-products">
            <span id="contador-productos">{carrito.length}</span>
          </div>
        </div>

        <div
          className={`container-cart-products ${active ? "" : "hidden-cart"}`}
        >
          {allProducts.length ? (
            <>
              <div className="row-product">
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

              <button className="btn-clear-all" onClick={onCleanCart}>
                Vaciar Carrito
              </button>
              <button className="btn-clear-all" onClick={pagar}>
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
