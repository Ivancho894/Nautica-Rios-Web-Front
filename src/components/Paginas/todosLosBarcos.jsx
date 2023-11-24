import { useDispatch, useSelector } from "react-redux";

import RenderBarco from "../Barco/renderBarco";
import Filtros from "../Filtros y orden/filtro copy";

export default function TodosLosBarcos() {
  //Renderizar todos los barcos
  const barcos = useSelector((state) => state.barcos);

  return (
    <div>
      <Filtros />

      <div style={{ display: "flex", margin: "3px" }}>
        {barcos.map((barco) => {
          return <RenderBarco key={barco.id} barco={barco} />;
        })}
      </div>
    </div>
  );
}
