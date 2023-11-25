import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./detallebarcos.module.css";

export default function Detalle() {
  const barcos = useSelector((state) => state.barcos);
  const { id } = useParams();
  const barco = barcos.find((x) => x.id === id);
  let keyId = 0;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{barco.marcaBarco}</h2>
      <div className={styles.container2}>
        <div className={styles.detailItem}>
          {barco
            ? Object.keys(barco)?.map((key) => {
                return (
                  <h3 key={keyId++}>
                    <b>{key}</b>: <span>{barco[key]}</span>
                  </h3>
                );
              })
            : ""}
        </div>
        <div>
          <img
            className={styles.image}
            src="https://img.interempresas.net/fotos/3114349.jpeg"
            alt="imagen referencial"
          />
          <h2>precio: ${barco.precio}</h2>
        </div>
      </div>
    </div>
  );
}
