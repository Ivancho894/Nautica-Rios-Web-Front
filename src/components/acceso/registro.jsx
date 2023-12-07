import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function Registro() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [register, setRegister] = useState({
    correo: "",
    contraseña: "",
    nombre: ""
  });

  const handleRegister = (e) => {
    e.preventDefault();
    auth.register(register.correo, register.contraseña, register.nombre);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img
          className="w-full h-full object-cover"
          src="https://upload.wikimedia.org/wikipedia/commons/0/07/Riva_junior_Paris.jpg"
          alt=""
        />
      </div>

      <div className="bg-gray flex flex-col justify-center">
        <form
          className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8"
          onSubmit={(r) => handleRegister(r)}
        >
          <h2 className="text-4xl dark:text-white font-bold text-center">
            Registro
          </h2>
          <div className="flex flex-col text-gray-400 py-2 mt-10">
            <label htmlFor="correo" className="text-left">
              Correo Electronico
            </label>
            <input
              id="correo"
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="email"
              name="correo"
              value={register.correo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="nombre" className="text-left">
              Nombre
            </label>
            <input
              id="nombre"
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
              name="nombre"
              value={register.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="contraseña" className="text-left">
              Contraseña
            </label>
            <input
              id="contraseña"
              className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
              name="contraseña"
              value={register.contraseña}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-between text-gray-400 py-2"></div>
          <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
            REGISTRARSE
          </button>
          <p className="mb-2 mt-2 pt-1 text-sm font-semibold">
            ¿Ya tienes una cuenta?
            <a
              href="/login"
              className="text-danger ml-1 transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
            >
              Inicia sesion
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
