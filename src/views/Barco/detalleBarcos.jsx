import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Detalle() {
  const barcos = useSelector((state) => state.barcos);
  const { id } = useParams();
  const barco = barcos.find((x) => x.id === id);
  let keyId = 0;

  return (
    <>
      <br />
      <br />
      <div className={styles.container}>
        <h2 className={styles.title}>{barco.marcaBarco}</h2>
        <div className={styles.container2}>
          <div className={styles.detailItem}>
            {barco
              ? Object.keys(barco)?.map((key) => {
                  if (key != "imagenes") {
                    return (
                      <h3 key={keyId++}>
                        <b>{key}</b>: <span>{barco[key]}</span>
                      </h3>
                    );
                  }
                })
              : ""}
          </div>
          <div>
            {barco.imagenes.map((img) => {
              return <img className={styles.image} src={img} />;
            })}
            <h2>precio: ${barco.precio}</h2>
            <Link
              to="/todoslosbarcos"
              style={{
                backgroundColor: "#7e7e7e",
                color: "white",
                fontWeight: "bold",
                padding: "4px 16px",
                borderRadius: "4px",
                marginLeft: "16px",
              }}
            >
              Regresar
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
