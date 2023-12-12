import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import googleicon from "../../assets/google-icon.svg";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function FormsFirebase() {
  const nav = useNavigate();
  const auth = useAuth();
  const { displayName } = auth.user;
  // console.log(displayName);
  console.log(auth.user);
  useEffect(() => {
    if (auth.user) {
      setTimeout(() => nav("/home"), 2000);
    }
  }, [auth.user]);
  /* A hook that allows you to use state in (formsRegister). */
  const [register, setRegister] = useState({
    registerEmail: "",
    registerPassword: "",
    registerUserName: "",
  });
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  /* A hook that allows you to use state in t(formsLogin). */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterChange = (e) => {
    e.preventDefault();
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { registerEmail, registerPassword, registerUserName } = register;
    auth.register(registerEmail, registerPassword, registerUserName);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    auth.login(email, password);
  };
  const handleGoogle = (e) => {
    e.preventDefault();
    auth.loginWithGoogle();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    auth.logout();
  };

  return (
    <div className="border-4 border-amber-800 rounded-xl">
      {displayName && <h5>welcome : {displayName}</h5>}
      <form>
        <h3>Register</h3>
        <br />
        <input
          name="registerEmail"
          value={register.registerEmail}
          onChange={handleRegisterChange}
          className="input"
          type="email"
        />
        <br />
        <br />
        <input
          name="registerPassword"
          value={register.registerPassword}
          onChange={handleRegisterChange}
          className="input"
          type="password"
        />
        <br />
        <br />
        <input
          name="registerUserName"
          value={register.registerUserName}
          onChange={handleRegisterChange}
          className="input"
          type="text"
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
          onChange={(e) => {
            setEmail(e.target.value);
          }}
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
          <img src={googleicon} alt="google" width={20} height={20} />
        </button>
      </form>
      <br />
      <button onClick={(e) => handleLogout(e)} className="button">
        Logout
      </button>
    </div>
  );
}

export default FormsFirebase;
