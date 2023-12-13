import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import googleicon from "../../assets/google-icon.svg";
import { useDispatch } from "react-redux";
import { GET_CARRITO } from "../../redux/actions";

export function Login() {
  const navigate = useNavigate();
  const dispatch  = useDispatch()
  const auth = useAuth();

  const [login, setLogin] = useState({
    correo: "",
    contraseña: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    auth.login(login.correo, login.contraseña);
    if (auth.user) {
      dispatch(GET_CARRITO(user.uid))
      navigate("/home");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    await auth.loginWithGoogle();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img
          className="w-full h-full object-cover"
          src={
            "https://upload.wikimedia.org/wikipedia/commons/0/07/Riva_junior_Paris.jpg"
          }
          alt=""
        />
      </div>

      <div className="bg-gray flex flex-col justify-center">
        <form
          className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8"
          onSubmit={(r) => handleLogin(r)}
        >
          <h2 className="text-4xl dark:text-white font-bold text-center">
            Iniciar Sesion
          </h2>
          <div className="flex flex-col text-gray-400 py-4 mt-10">
            <label className="text-left">Correo Electronico</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
              name="correo"
              value={login.correo}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label className="text-left">Contraseña</label>
            <input
              className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
              name="contraseña"
              value={login.contraseña}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between text-gray-400 py-2"></div>
          <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
            ENTRAR
          </button>
          <button onClick={(e) => handleGoogle(e)} className="button">
            <div className="flex">
              <p className="mr-2">Inicia sesion con</p>
              <img src={googleicon} alt="google" width={20} height={20} />
            </div>
          </button>
          <p className="mb-2 mt-2 pt-1 text-sm font-semibold">
            ¿No tienes una cuenta?
            <a
              href="/register"
              className="text-danger ml-1 transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
            >
              Registrate
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
