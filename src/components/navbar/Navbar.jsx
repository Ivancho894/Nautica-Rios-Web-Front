import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './nabvar.module.css'; 

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
      <ul>
        <li>
          <Link to="/" className={styles.link}>
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/barcos" className={styles.link} disabled={!isLoggedIn}>
            Agregar Barcos
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





