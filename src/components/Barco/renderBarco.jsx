//BARCO INDIVIDUAL
import { Link } from "react-router-dom";
import style from "./renderBarco.module.css";
export default function RenderBarco({ barco }) {
  //Renderiza un solo barco
  console.log(barco);
  return (
    <div className={style.container}>
      {/* //* la imagen es solo referencial, aun falta ver como traer las imgaes de la store de firebase  */}
      <img
        className={style.image}
        src="https://img.interempresas.net/fotos/3114349.jpeg"
        alt="alguna imagen"
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
