import { useEffect, useState } from "react";

import "./App.css";

//redux
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Route, Routes, useLocation } from "react-router-dom";
import { GET_BARCOS, GET_FILTERS } from "./redux/actions";
import Home from "./views/homePage";
import LandingPage from "./components/Landing/landingPage";
import Contactar from "./views/Nosotros/contactar";
import QuienesSomos from "./views/Nosotros/quienesSomos";
import Detalle from "./views/Barco/detalleBarcos";
import TodosLosBarcos from "./components/Todos_los_Barcos/todosLosBarcos";
import Navbar from "./components/navbar/Navbar";
// import { ProductList } from "./components/Carrito/ProducList";
// import  Header  from "./components/Carrito/Headers";
// import DashboardView from "./components/Paginas/DashboardView";
// import EditProfileView from "./components/Paginas/EditProfileView";
// import SignOutView from "./components/Paginas/SignOutView";
// import PublicProfileView from "./components/Paginas/PublicProfileView";
// import ChooseUserNameView from "./components/Paginas/ChooseUserNameView";
// import LoginView from "./components/Paginas/LoginView";
import TodosLosAccesorios from "./components/accesorios/TodosLosAccesorios";
import DetalleAccesorios from "./components/accesorios/DetalleAccesorios";
import ListaAccesorios from "./components/Borrado Logico/ListaAccesorios";
import ListaBarcos from "./components/Borrado Logico/ListaBarcos";

import PublicarBarco from "./views/Administrador/publicarBarco";
import { Login } from "./components/acceso/login";
import { Registro } from "./components/acceso/registro";
import { useAuth } from "./context/AuthContext";
import ListaDeDeseos from "./components/Usuario/ListaDeDeseos";

import { AuthProvider } from "./context/AuthContext";
import FormsFirebase from "./components/acceso/Acceso";

import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../firebase-config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import DetalleCompra from "./views/Detalle_Compra/DetalleCompra";
import SuccessPage from "./views/Detalle_Compra/Succes";
import PublicarAccesorio from "./views/Administrador/publicarAccesorio";
// import { Toaster,toast } from "sonner";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import ListaUsuarios from "./components/Borrado Logico/ListaUsuarios";
import PaginaError from "./views/Detalle_Compra/PaginaError";
import ListaAcceso from "./components/Borrado Logico/Acceso/ListaAcceso";
import NoAcceso from "./components/Usuario/NoAcceso";

function App() {
  // const [allProducts, setAllProducts] = useState([]);
  // const [total, setTotal] = useState(0);
  // const [countProducts, setCountProducts] = useState(0);
  const { pathname } = useLocation();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const barcos = useSelector((state) => state.barcos);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  useEffect(() => {
    const auth = getAuth();
    dispatch(GET_BARCOS());
    dispatch(GET_FILTERS());
    onMessage(messaging, (message) => {
      console.log("tu mensaje: ", message);
      console.log(message.data);
      toast(
        <div>
          <span>{message.notification.title}</span>
          <br />
          <span>{message.notification.body}</span>
          <br />
          <a href="/accesorios">ir</a>
          {/* <button onClick={() => navigate("/accesorios")}>ir</button> */}
        </div>
        //   message.notification.title, {
        //   description: message.notification.body,
        // }
      );
    });

    const checkAdminPermissions = async (uid) => {
      try {
        const userDocRef = doc(db, "usuarios", uid); // Ajusta 'usuarios' al nombre de tu colección
        const docSnapshot = await getDoc(userDocRef);

        if (docSnapshot.exists()) {
          const permisosAdmin = docSnapshot.data().permisosAdmin;

          // Verifica los permisos y redirige según sea necesario
          if (permisosAdmin === true) {
            // El usuario tiene permisos de administrador, permite el acceso a la ruta DashboardAdmin
            // Puedes agregar aquí la lógica de redirección o permitir el acceso a la ruta
          }
        } else {
          console.error("El documento de usuario no existe en Firestore");
        }
      } catch (error) {
        console.error("Error al obtener el documento de usuario:", error);
      }
    };

    // navigate('/home')
    return;
  }, []);

  const activarMensages = async () => {
    const token = await getToken(messaging, {
      vapidKey:
        "BMxA7zOyu_6lvgEZsRM_b-_k6YBXr50M7o6W-1hqTodVf4Kl0y5pCSUC7xRu4nqp-xbmVpm-qF0nEQ4DRKor_KE",
    }).catch((error) => console.log("tuviste un error al generar el token"));
    if (token) console.log("tu token: ", token);
    if (!token) console.log("no tienes token");
  };

  return (
    <div className="r">
      <ToastContainer />

      {pathname !== "/" ? (
        <Navbar />
      ) : (
        <div className="bg-gray-800"></div>
      )}
      <Routes>
        <Route
          path="/"
          element={<LandingPage activarMensages={activarMensages} />}
        />

        <Route path="/home" element={<Home />} />
        <Route path="/contactar" element={<Contactar />} />

        <Route element={<ProtectedRoutes authorizedUser="visitor" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registro />} />
        </Route>

        <Route element={<ProtectedRoutes authorizedUser="regularUser" />}>
          <Route path="/listaDeDeseos" element={<ListaDeDeseos />} />
          <Route path="/detalleCompra" element={<DetalleCompra />} />
          <Route path="/paginaerror" element={<PaginaError />} />
        </Route>

        <Route path="/noAcceso" element={<NoAcceso />} />

        <Route element={<ProtectedRoutes authorizedUser="admin" />}>
          <Route path="/gestionAccesorios" element={<ListaAccesorios />} />
          <Route path="/gestionBarcos" element={<ListaBarcos />} />
          <Route path="/publicarBarco" element={<PublicarBarco />} />
          <Route path="/publicarAccesorio" element={<PublicarAccesorio />} />
          <Route path="/gestionUsuarios" element={<ListaUsuarios />} />
          <Route path="/accesoUsuarios" element={<ListaAcceso />} />
        </Route>

        <Route path="/quienessomos" element={<QuienesSomos />} />
        <Route path="/detalle/:id" element={<Detalle />} />
        <Route path="/todoslosbarcos" element={<TodosLosBarcos />} />
        <Route path="/accesorios" element={<TodosLosAccesorios />} />
        <Route path="/succes/:id" element={<SuccessPage />} />
        <Route path="/fail" element={<PaginaError />} />
        <Route path="/detalleaccesorio/:id" element={<DetalleAccesorios />} />
        {/* //*  mis rutas  */}
        {/* <Route path="/login" element={<LoginView />} /> */}
        {/* <Route path="/dashboard" element={<DashboardView />} /> */}
        {/* //* para configurar el perfil  */}
        {/* <Route path="/dashboard/profile" element={<EditProfileView />} /> */}
        {/* <Route path="/signout" element={<SignOutView />} /> */}
        {/* <Route path="/user/:username" element={<PublicProfileView />} /> */}
        {/* <Route path="/choose-username" element={<ChooseUserNameView />} /> */}
        {/* <Route path="/list" element={<ProductList />} /> */}
      </Routes>
    </div>
  );
}

export default App;
