//BARCO INDIVIDUAL
import { Link } from "react-router-dom";
import style from "./renderBarco.module.css";
export default function RenderBarco({ barco }) {
  //Renderiza un solo barco
  return (
    <div className={style.container}>
      {/* //* la imagen es solo referencial, aun falta ver como traer las imgaes de la store de firebase  */}
      <img
        className={style.image}
        src={barco.imagenes[0]}
      />
      <h3>
        {barco.marcaBarco} {barco.modelo}
      </h3>
      <h4>
        Embarcacion tipo {barco.tipo} del año {barco.year}, equipado con un
        motor {barco.marcaMotor} {barco.modeloMotor}
      </h4>

      <Link to={"/detalle/" + barco.id}>
        <button>more info</button>
      </Link>
    </div>
  );
}
