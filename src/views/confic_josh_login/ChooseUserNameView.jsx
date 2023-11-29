import AuthProvider from "../../components/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { existsUsername, updateUser } from "../../../firebase-config";

const ChooseUserNameView = () => {
  const [state, setState] = useState(0);
  const [curretUser, setCurrentUser] = useState({});
  const [username, setUserName] = useState("");
  const navigate = useNavigate();

  function handleUserLoggedIn(user) {
    navigate("/dashboard");
  }
  function handleUserNotRegistered(user) {
    setCurrentUser(user);
    setState(3);
  }
  function handleUserNotLoogedIn() {
    navigate("login");
  }
  function handleInputUserName(e) {
    setUserName(e.target.value);
  }
  async function handleContinue() {
    if (username !== "") {
      const exists = await existsUsername(username);
      if (exists) {
        setState(5);
      } else {
        const tmp = { ...curretUser };
        tmp.username = username;
        tmp.processCompleted = true;
        await updateUser(tmp);
        setState(6);
      }
    }
  }
  if (state === 3 || state === 5) {
    return (
      <div>
        <h1>Bienvenido {curretUser.displayName}</h1>
        <p> Para terminar el proceso elije un nómbre de usuario</p>
        {state === 5 ? (
          <p>el nombre de usuario ya existe, por favor escoje otro</p>
        ) : (
          ""
        )}
        <div>
          <input type="text" onChange={handleInputUserName} />
        </div>
        <div>
          <button onClick={handleContinue}>continue</button>
        </div>
      </div>
    );
  }
  if (state === 6) {
    return (
      <div>
        <h1>Felicidades ya puedes ir al dashboard a crear post </h1>
        <Link to="/dashboard">Continuar</Link>
      </div>
    );
  }
  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoogedIn={handleUserNotLoogedIn}
    ></AuthProvider>
  );
};
export default ChooseUserNameView;
