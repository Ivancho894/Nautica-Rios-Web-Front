import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

//redux
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Route, Routes } from "react-router-dom";
import { GET_BARCOS, GET_FILTERS } from "./redux/actions";
import Home from "./components/Paginas/homePage";
import LandingPage from "./components/Paginas/Landing/landingPage";
import Contactar from "./components/Paginas/contactar";
import QuienesSomos from "./components/Paginas/quienesSomos";
import Detalle from "./components/Barco/detalleBarcos";
import TodosLosBarcos from "./components/Paginas/todosLosBarcos";
import Navbar from "./components/navbar/Navbar";
import DashboardView from "./components/Paginas/DashboardView";
import EditProfileView from "./components/Paginas/EditProfileView";
import SignOutView from "./components/Paginas/SignOutView";
import PublicProfileView from "./components/Paginas/PublicProfileView";
import ChooseUserNameView from "./components/Paginas/ChooseUserNameView";
import LoginView from "./components/Paginas/LoginView";
import Accesorios from "./components/Paginas/Accesorios";

function App() {
  const barcos = useSelector((state) => state.barcos);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(GET_BARCOS());
    // navigate('/home')
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contactar" element={<Contactar />} />
        <Route path="/quienessomos" element={<QuienesSomos />} />
        <Route path="/detalle/:id" element={<Detalle />} />
        <Route
          path="/todoslosbarcos"
          element={<TodosLosBarcos barcos={barcos} />}
        />
        <Route path="/accesorios" element={<Accesorios />} />
        {/* //*  mis rutas  */}
        <Route path="/login" element={<LoginView />} />
        <Route path="/dashboard" element={<DashboardView />} />
        {/* //* para configurar el perfil  */}
        <Route path="/dashboard/profile" element={<EditProfileView />} />
        <Route path="/signout" element={<SignOutView />} />
        <Route path="/user/:username" element={<PublicProfileView />} />
        <Route path="/choose-username" element={<ChooseUserNameView />} />
      </Routes>
    </div>
  );
}

export default App;
