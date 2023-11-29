import { useEffect, useState } from "react";

import "./App.css";

//redux
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Route, Routes } from "react-router-dom";
import { GET_BARCOS, GET_FILTERS } from "./redux/actions";
import Home from "./views/homePage";
import LandingPage from "./components/Landing/landingPage";
import Contactar from "./views/Nosotros/contactar";
import QuienesSomos from "./views/Nosotros/quienesSomos";
import Detalle from "./views/Barco/detalleBarcos";
import TodosLosBarcos from "./components/Todos_los_Barcos/todosLosBarcos";
import Navbar from "./components/navbar/Navbar";
// import DashboardView from "./components/Paginas/DashboardView";
// import EditProfileView from "./components/Paginas/EditProfileView";
// import SignOutView from "./components/Paginas/SignOutView";
// import PublicProfileView from "./components/Paginas/PublicProfileView";
// import ChooseUserNameView from "./components/Paginas/ChooseUserNameView";
// import LoginView from "./components/Paginas/LoginView";
import Accesorios from "./components/accesorios/Accesorios";
import DetalleAccesorios from "./components/accesorios/DetalleAccesorios"
import PublicarBarco from "./views/Administrador/publicarBarco";

import { AuthProvider } from "./context/AuthContext";
import FormsFirebase from "./components/acceso/Acceso";

function App() {
  const barcos = useSelector((state) => state.barcos);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(GET_BARCOS());
    dispatch(GET_FILTERS());
    // navigate('/home')
  }, []);

  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contactar" element={<Contactar />} />

          <Route path="/registro" element={<FormsFirebase />} />
          <Route path="/quienessomos" element={<QuienesSomos />} />
          <Route path="/detalle/:id" element={<Detalle />} />
          <Route path="/todoslosbarcos" element={<TodosLosBarcos />} />
          <Route path="/accesorios" element={<Accesorios />} />
          <Route path="/detalleaccesorio/:id" element={<DetalleAccesorios />} />
          {/* //*  mis rutas  */}
          {/* <Route path="/login" element={<LoginView />} /> */}
          {/* <Route path="/dashboard" element={<DashboardView />} /> */}
          {/* //* para configurar el perfil  */}
          {/* <Route path="/dashboard/profile" element={<EditProfileView />} /> */}
          {/* <Route path="/signout" element={<SignOutView />} /> */}
          {/* <Route path="/user/:username" element={<PublicProfileView />} /> */}
          {/* <Route path="/choose-username" element={<ChooseUserNameView />} /> */}
          <Route path="/publicarBarco" element={<PublicarBarco />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
