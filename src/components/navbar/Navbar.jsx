import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './nabvar.module.css'; 
import Logo from '../../assets/logo.png'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logoContainer}>
        <img src={Logo} alt="Logo" className={styles.logo} />
      </div>
      <ul>
        <li>
          <Link to="/todoslosbarcos" className={styles.link} disabled={!isLoggedIn}>
            Barcos
          </Link>
        </li>
        <li>
          <Link to="/" className={styles.link} disabled={!isLoggedIn}>
            Accesorios
          </Link>
        </li>
        <li>
          <Link to="/contactar"className={styles.link}>
            Contacto
          </Link>
        </li>
        <li>
          <Link to="/quienessomos"className={styles.link}>
            Nosotros
          </Link>
        </li>
      </ul>
      <div>
        {isLoggedIn ? (
          <button onClick={handleLogout} className={styles.button}>
            Cerrar Sesión
          </button>
        ) : (
          <button onClick={handleLogin} className={styles.button}>
            Iniciar Sesión
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;





