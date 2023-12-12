import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.ico";
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Toaster, toast } from "sonner";
import Header from "../Carrito/Header";
import MenuUsuario from "./MenuUsuario";
import MenuAdmin from "./MenuAdmin";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase-config";

import Button from "./Button";
const Navbar = ({ activarMensages }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const { pathname } = useLocation();

  const auth = useAuth();
  const { displayName, uid } = auth.user;

  const [permisos, setPermisos] = useState(null);

  const obtenerPermisos = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const datosUsuario = userSnap.data();
        const { permisosAdmin } = datosUsuario;
        setPermisos(permisosAdmin);
      } else {
        console.log("No sirve");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerPermisos(uid);
  }, [uid]);

  console.log(permisos);

  if (isLandingPage) {
    return null;
  }

  const Links = [
    {
      name: "Barcos",
      link: "/todoslosbarcos",
    },
    {
      name: "Accesorios",
      link: "/accesorios",
    },
    {
      name: "Contacto",
      link: "/contactar",
    },
    {
      name: "Nosotros",
      link: "/quienessomos",
    },
  ];
  let [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    navigate("/login");
    setIsLoggedIn(true);
  };

  const handleLogout = (e) => {
    e.preventDefault();

    auth.logout();
    toast.success(
      <span className="text-green-700 text-base">
        hasta pronto {displayName} 😢
      </span>
    );
  };

  return (
    <nav className="bg-gray-800 p-5 fixed top-0 left-0 w-full z-10">
      <Toaster />
      <div className="flex justify-between items-center">
        <NavLink to="/home" className="">
          <img src={Logo} alt="Logo" className="h-6" />
        </NavLink>

        <ul className="flex">
          <li className="mr-6">
            <Link
              to="/todoslosbarcos"
              className="cursor-pointier text-white"
              disabled={!isLoggedIn}
            >
              Barcos
            </Link>
          </li>
          <li className="mr-6">
            <Link
              to="/accesorios"
              className="cursor-pointier text-white"
              disabled={!isLoggedIn}
            >
              Accesorios
            </Link>
          </li>
          <li className="mr-6">
            <a href="/home#contacto" className="cursor-pointer text-white">
              Contacto
            </a>
          </li>
          <li>
            <a href="/home#nosotros" className="cursor-pointer text-white">
              Nosotros
            </a>
          </li>
        </ul>
        <div className="w-11 h-11s end-0">
          {/* <Header /> */}
          {pathname === "/accesorios" ? <Header /> : <></>}
        </div>
        <div>
          {auth.user ? (
            // <div className="flex items-center">
            //   <h3 className="mr-4 text-white">{displayName}</h3>
            //   <button
            //     onClick={handleLogout}
            //     className="bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 transition-colors"
            //   >
            //     Cerrar Sesión
            //   </button>
            // </div>
            <div>
              {!permisos ? (
                <MenuUsuario
                  handleLogout={handleLogout}
                  displayName={displayName}
                />
              ) : (
                <MenuAdmin
                  handleLogout={handleLogout}
                  displayName={displayName}
                />
              )}
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 transition-colors"
            >
              Acceder
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
