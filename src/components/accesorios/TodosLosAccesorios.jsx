import { useDispatch, useSelector } from "react-redux";
import RenderAccesorios from "./RenderAccesorios";
import FiltrosAccesorios from "./FiltrosAccesorios"
import { useEffect } from "react";
import { getFiltersAcc, getAccesorios } from "../../redux/actions";
import { useState } from "react";

export default function TodosLosAccesorios() {
  
  const accesorios = useSelector((state) => state.accesorios);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAccesorios());
    dispatch(getFiltersAcc());
    console.log('Get filters acc');
  }, []);
  
  return (
    <div className="flex">

      <div className=" bg-slate-300 w-[400px] ">
        <div className="bg-slate-300 mt-16 h-[300px] w-full">
          <FiltrosAccesorios />
        </div>
        </div>

        <div className=" ml-8 w-full grid grid-cols-3 p-16 mt-16">
          {accesorios && accesorios.map((accesorio) => {
            return <RenderAccesorios key={accesorio.id} accesorio={accesorio} />;
          })}
        </div>
    </div>
  );
}