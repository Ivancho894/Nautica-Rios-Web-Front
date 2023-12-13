import { useDispatch, useSelector } from "react-redux";
import RenderAccesorios from "./RenderAccesorios";
import FiltrosAccesorios from "./FiltrosAccesorios";
import { useEffect } from "react";
import { getFiltersAcc, getAccesorios, GET_CARRITO } from "../../redux/actions";
import { useState } from "react";
import Paginacion from "./Paginacion";
import ReviewStars from "../Reviews/Reviews";
import Orden from "./ordenAcc";

export default function TodosLosAccesorios() {
  const accesorios = useSelector((state) => state.accesorios);
  const uid = useSelector((state) => state.uid);
  const carr = useSelector((state) => state.carr);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAccesorios());
    dispatch(getFiltersAcc());
    console.log("Get filters acc");
    if(uid){
      dispatch(GET_CARRITO(uid,carr));
    }
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
  <div className="flex flex-col md:flex-row">
    <div className="bg-slate-300 md:w-1/4 lg:w-1/4 xl:w-1/4 md:flex-col  ">
      <div className="bg-slate-300 mt-16 md:h-[300px] md:w-full">
        <FiltrosAccesorios />
        <Orden />
      </div>
    </div>

    <div className=" flex flex-wrap gap-16 ml-8 w-full lg:grid-cols-3 xl:grid-cols-4  p-16 mt-16">
      {accesoriosPagina &&
        accesoriosPagina.map((accesorio) => (
          <div key={accesorio.id}>
            <RenderAccesorios className=" "accesorio={accesorio} />
          </div>
        ))}
    </div>
  </div>

  <Paginacion paginaActual={pagina} totalPaginas={totalPaginas} cambioPag={handleNextPage} />
</>

 );
}
