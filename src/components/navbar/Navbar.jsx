import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.ico";
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Toaster, toast } from "sonner";
import  Header  from "../Carrito/Header";
import Button from "./Button";
const Navbar = ({ activarMensages }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const { pathname } = useLocation();

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

  const auth = useAuth();
  const { displayName } = auth.user;

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
            <Link to="/contactar" className="cursor-pointer text-white">
              Contacto
            </Link>
          </li>
          <li>
            <Link to="/quienessomos" className="cursor-pointer text-white">
              Nosotros
            </Link>
          </li>
          <li>
            <Link
              to="/publicarBarco"
              className="cursor-pointer text-white ml-4"
            >
              Publicar
            </Link>
          </li>

        </ul>
          <div className="w-11 h-11s end-0">
            {pathname==='/accesorios'?(<Header/>):(<></>)}
          </div>
        <div>
          {auth.user ? (
            <div className="flex items-center">
              <h3 className="mr-4 text-white">{displayName}</h3>
              <button
                onClick={handleLogout}
                className="bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 transition-colors"
              >
                Cerrar Sesión
              </button>
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
