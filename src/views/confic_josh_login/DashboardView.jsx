import AuthProvider from "../../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DashboardWrapper from "../../components/Paginas/DashboardWrapper";
const DashboardView = () => {
  const navigate = useNavigate();
  const [curretUser, setCurrentUser] = useState({});
  const [state, setState] = useState(0);

  function handleUserLoggedIn(user) {
    setCurrentUser(user);
    setState(2);
  }
  function handleUserNotRegistered(user) {
    navigate("/login");
  }
  function handleUserNotLoogedIn() {
    navigate("login");
  }

  if (state === 0) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoogedIn={handleUserNotLoogedIn}
        onUserNotRegistered={handleUserNotRegistered}
      ></AuthProvider>
    );
  }
  return (
    <div>
      {/* <DashboardWrapper> */}
      <div>
        <h1>Dashboard</h1>
      </div>
      {/* </DashboardWrapper> */}
    </div>
  );
};

export default DashboardView;
