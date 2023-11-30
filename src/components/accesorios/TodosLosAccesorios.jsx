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
  }, []);
  
  return (
    <div>
        <div style={{ marginTop: '80px' }}>
          <FiltrosAccesorios />
        </div>
        <div>
          {accesorios && accesorios.map((accesorio) => {
            return <RenderAccesorios key={accesorio.id} accesorio={accesorio} />;
          })}
        </div>
    </div>
  );
}
