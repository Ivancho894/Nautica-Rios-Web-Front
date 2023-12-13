import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import RenderBarco from "../Barco/renderBarco";
import Filtros from "../Filtros y orden/filtro";
import Orden from "../Filtros y orden/orden";
import { useEffect } from "react";
import { GET_FILTERS, GET_BARCOS, SET_FILTER, ORDENAR } from "../../redux/actions";

import { useState } from "react";
import baner from "../../assets/homeBaner.png"
import MostrarBarcos from "../Barco/mostrarBarcos";
import Paginacion from "./Paginacion";
import SinBarcos from "./SinBarcos";



export default function TodosLosBarcos() {
  const [characters, setCharacters] = useState([]);
  const [infoPage, setInfoPage] = useState(null);
  //Renderizar todos los barcos
  const barcos = useSelector((state) => state.barcos);
  // console.log(barcos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GET_FILTERS());
    dispatch(GET_BARCOS());
    dispatch(SET_FILTER());
    dispatch(ORDENAR())
  }, []);


  //PAGINADO
  const [pagina, setPagina] = useState(1);
  const barcosPorPagina = 9;
  const totalPaginas = Math.ceil(barcos.length / barcosPorPagina);
  
  const handleNextPage = (nuevaPag) => {
    nuevaPag<=totalPaginas &&  nuevaPag>0?setPagina(nuevaPag):alert("No hay mas paginas");
  }



  return (
        <>
  <div className="flex flex-col md:flex-row">
    <div >
      <div className="bg-slate-300 md:mt-16 md:h-[400px] md:w-[350px]">
        <Filtros />
      </div>
      <div className="bg-slate-300 mt-4 md:mt-0 md:h-full">
        <Orden />
      </div>
    </div>

    {barcos.length>0?<MostrarBarcos barcos={barcos} paginaActual={pagina} className="flex flex-wrap"/>:<SinBarcos/>}
  </div>

  <Paginacion paginaActual={pagina} totalPaginas={totalPaginas} cambioPag={handleNextPage} />
</>

  );
}
