import { auth } from "../../firebase-config";
import { useAuth } from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoutes = () => {
  
  const auth = useAuth()

  if (!auth.user) {
    return <Outlet/>;
  }
  return <Navigate to="/home"/>
};
