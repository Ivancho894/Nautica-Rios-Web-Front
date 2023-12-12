import React from "react";
import { NavLink } from "react-router-dom";
const Button = (props) => {
  console.log(props.children);
  return (
    <div>
      {props.children === "Acceder" ? (
        <NavLink to="/registro">
          <button
            className="bg-blue-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-blue-400 
      duration-500"
          >
            {props.children}
          </button>
        </NavLink>
      ) : (
        ""
      )}
    </div>
  );
};

export default Button;
