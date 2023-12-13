import { useAuth } from "../../context/AuthContext";
import { Firestore, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import menuUsuario from "../navbar/MenuUsuario";

const ListaDeDeseos = () => {
  const [listaDeDeseos, setListaDeDeseos] = useState(null);

  const auth = useAuth();
  const {userStore} = auth
  const { uid } = auth.user;

  console.log(userStore);

  const recibirListaDeDeseos = async (id) => {
    try {
      const usuarioRef = doc(db, "users", id);
      const snap = await getDoc(usuarioRef);
      if (snap.exists()) {
        const datosUsuario = snap.data();
        const { listaDeDeseos } = datosUsuario;
        setListaDeDeseos(listaDeDeseos);
      } else {
        console.log("No hay datos");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    recibirListaDeDeseos(uid);
  }, [uid]);

  console.log(listaDeDeseos);
  return listaDeDeseos ? (
    <div className="bg-slate-300 min-h-screen">
      <h1 className="mt-20 p-5 text-center">Lista de deseos</h1>
      <div className=" w-full max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-16 mt-16">
        {listaDeDeseos.map((deseo, index) => {
          return (
            <div
              key={index}
              className="border-2 mb-4 border-slate-200 p-5 w-90 h-95 rounded-none flex flex-col items-center justify-center text-center mb-5 shadow-[0_5px_40px_1px_rgba(0,0,0,2)] mt-5 mr-5 mb-5 ml-5"
            >
              <img
                className="w-[350px] h-60 object-cover "
                src={deseo.imagenes[0]}
              />
              <h3 className="text-2xl font-bold mb-5">
                {deseo.marcaBarco} {deseo.modelo}
              </h3>
              <h4>
                Embarcacion tipo {deseo.tipo} del año {deseo.year}, equipado con
                un motor {deseo.marcaMotor} {deseo.modeloMotor}
              </h4>

              <div className="flex items-end gap-16">
                <Link to={"/detalle/" + deseo.id}>
                  <button className="ml-4 p-2 bg-[#3b82f6] text-center text-white mt-8 h-[40px] w-[230px]">
                    + info
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="mt-20 ">
      <h1>cargando...</h1>
    </div>
  );
};

export default ListaDeDeseos;
