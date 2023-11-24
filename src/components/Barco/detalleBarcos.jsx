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
      <h2 className={styles.title}>Esta es la página de detalle</h2>
      {barco
        ? Object.keys(barco)?.map((key) => {
            return (
              <h3 className={styles.detailItem} key={keyId++}>
                {barco[key]}
              </h3>
            );
          })
        : ""}
    </div>
  );
}
