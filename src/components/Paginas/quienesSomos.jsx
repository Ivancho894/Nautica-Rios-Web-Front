import React from 'react';
import styles from './quienesSomos.module.css';
import Logo from '../../assets/logo.png';

export default function QuienesSomos(){
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Sobre Nosotros</h1>
                <h2 className={styles.subtitle}>Somos una empresa apasionada por brindar soluciones náuticas. Desde el 2001 nos dedicamos a la comercialización de embarcaciones nuevas y usadas, representando a los astilleros Génesis y Segue.
                </h2>
                <h3 className={styles.values}>Contamos con experiencia internacional en el rubro. Nuestro conocimiento comercial y técnico sobre la construcción de barcos, nos posiciona como un socio ideal para concretar tu operación de la forma más segura posible.

                    Nuestros valores son la seriedad, el compromiso y la confidencialidad.
                </h3>
            </div>
            <img src={Logo} alt="Nautica Rios" />
        </div>
    )
}