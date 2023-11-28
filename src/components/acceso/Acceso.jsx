import { useState } from "react";
import { NavLink } from "react-router-dom";
import googleicon from "../../assets/google-icon.svg";
import { useAuth } from "../../context/AuthContext";

function FormsFirebase() {
  const auth = useAuth();
  const { displayName } = auth.user;
  // console.log(displayName);
  /* A hook that allows you to use state in (formsRegister). */
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  /* A hook that allows you to use state in t(formsLogin). */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = (e) => {
    e.preventDefault();
    auth.register(emailRegister, passwordRegister);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    auth.login(email, password);
  };
  const handleGoogle = (e) => {
    e.preventDefault();
    auth.loginWithGoogle();
  };
  const handleLogout = () => {
    auth.logout();
  };
  return (
    <div>
      {displayName && <h5>welcome : {displayName}</h5>}
      <form>
        <h3>Register</h3>
        <br />
        <input
          onChange={(e) => setEmailRegister(e.target.value)}
          className="input"
          type="email"
        />
        <br />
        <br />
        <input
          onChange={(e) => setPasswordRegister(e.target.value)}
          className="input"
          type="password"
        />
        <br />
        <button onClick={(e) => handleRegister(e)} className="button">
          submit
        </button>
        <br />
      </form>
      <form>
        <h3>Login</h3>
        <br />
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          type="email"
        />
        <br />
        <br />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          type="password"
        />
        <br />
        <button onClick={(e) => handleLogin(e)} className="button">
          submit
        </button>
        <br />
        <button onClick={(e) => handleGoogle(e)} className="button">
          Google
        </button>
      </form>
      <br />
      <button onClick={() => handleLogout()} className="button">
        Logout
      </button>
    </div>
  );
}

export default FormsFirebase;
