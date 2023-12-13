import { useDispatch, useSelector } from "react-redux";
import RenderAccesorios from "./RenderAccesorios";
import FiltrosAccesorios from "./FiltrosAccesorios";
import { useEffect } from "react";
import { getFiltersAcc, getAccesorios } from "../../redux/actions";
import { useState } from "react";
import Paginacion from "./Paginacion";
import ReviewStars from "../Reviews/Reviews";
import Orden from "./ordenAcc";

export default function TodosLosAccesorios() {
  const accesorios = useSelector((state) => state.accesorios);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAccesorios());
    dispatch(getFiltersAcc());
    console.log("Get filters acc");
  }, []);

  //PAGINADO
  const [pagina, setPagina] = useState(1);
  const accesoriosPorPagina = 6;
  const inicio = (pagina - 1) * accesoriosPorPagina;
  const fin = inicio + accesoriosPorPagina;
  const totalPaginas = Math.ceil(accesorios.length / accesoriosPorPagina);

  const handleNextPage = (nuevaPag) => {
    nuevaPag <= totalPaginas && nuevaPag > 0
      ? setPagina(nuevaPag)
      : alert("No hay mas paginas");
  };

  const accesoriosPagina = accesorios.slice(inicio, fin);

  return (
    <>
      <div className="flex">
        <div className=" bg-slate-300 w-[400px] ">
          <div className="bg-slate-300 mt-16 h-[300px] w-full">
            <FiltrosAccesorios />
            <Orden />
          </div>
        </div>

        <div className=" ml-8 w-full grid grid-cols-3 p-16 mt-16">
          {accesoriosPagina &&
            accesoriosPagina.map((accesorio) => {
              return (
                <div key={accesorio.id}>
                  <RenderAccesorios accesorio={accesorio} />
                  <ReviewStars productId={accesorio.id} />
                </div>
              );
            })}
        </div>
      </div>
      <Paginacion
        paginaActual={pagina}
        totalPaginas={totalPaginas}
        cambioPag={handleNextPage}
      />
    </>
  );
}
