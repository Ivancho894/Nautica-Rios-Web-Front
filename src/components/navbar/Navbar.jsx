import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Navbar = () => {
 const navigate = useNavigate();
 const [isLoggedIn, setIsLoggedIn] = useState(false);

 const handleLogin = () => {
    navigate("/registro");
    setIsLoggedIn(true);
 };

 const handleLogout = () => {
    setIsLoggedIn(false);
 };

 return (
    <nav className="bg-gray-800 p-5 fixed top-0 left-0 w-full z-10">
      <div className="flex justify-between items-center">
        <NavLink to="/" className="">
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
        </ul>
        <div>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 transition-colors">
              Cerrar Sesión
            </button>
          ) : (
            <button onClick={handleLogin} className="bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 transition-colors">
              Iniciar Sesión
            </button>
          )}
        </div>
      </div>
    </nav>
 );
};

export default Navbar;
