import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.ico";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Button from "./Button";
const Navbar = () => {
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
    navigate("/registro");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
        >
          <NavLink to="/">
            <img src={Logo} />
          </NavLink>
        </div>
        {/* <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div> */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <a
                href={link.link}
                className="text-gray-800 hover:text-blue-400 duration-500"
              >
                {link.name}
              </a>
            </li>
          ))}
          <Button>Acceder</Button>
        </ul>
      </div>
    </div>
    // <nav className="bg-gray-800 p-5 fixed top-0 left-0 w-full z-10">
    //   <div className="flex justify-between items-center">
    //     <NavLink to="/" className="">
    //       <img src={Logo} alt="Logo" className="h-6" />
    //     </NavLink>

    //     <ul className="flex">
    //       <li className="mr-6">
    //         <Link
    //           to="/todoslosbarcos"
    //           className="cursor-pointier text-white"
    //           disabled={!isLoggedIn}
    //         >
    //           Barcos
    //         </Link>
    //       </li>
    //       <li className="mr-6">
    //         <Link
    //           to="/accesorios"
    //           className="cursor-pointier text-white"
    //           disabled={!isLoggedIn}
    //         >
    //           Accesorios
    //         </Link>
    //       </li>
    //       <li className="mr-6">
    //         <Link to="/contactar" className="cursor-pointer text-white">
    //           Contacto
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to="/quienessomos" className="cursor-pointer text-white">
    //           Nosotros
    //         </Link>
    //       </li>
    //     </ul>
    //     <div>
    //       {isLoggedIn ? (
    //         <button onClick={handleLogout} className="bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 transition-colors">
    //           Cerrar Sesión
    //         </button>
    //       ) : (
    //         <button onClick={handleLogin} className="bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 transition-colors">
    //           Iniciar Sesión
    //         </button>
    //       )}
    //     </div>
    //   </div>
    // </nav>
  );
};

export default Navbar;
