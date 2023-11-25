import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import photo1 from '../../../assets/photo1.jpg';
import photo2 from '../../../assets/photo2.jpg';
import photo3 from '../../../assets/photo3.jpg';
import styles from './LandingPage.module.css';

const photos = [photo1, photo2, photo3];

export default function LandingPage() {
    const [index, setIndex] = useState(0);

    const handleNext = () => {
        setIndex(index + 1);
        if (index === photos.length - 1) {
            setIndex(0);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Bienvenido a Nautica Ríos</h1>
            <h2>Ventas y Accesorios</h2>
            <p>Navega por nuestra página y encuentra el producto perfecto para tu barco.</p>
            <img className={styles.photo} src={photos[index]} alt="Barco" />
            <button onClick={handleNext}>Siguiente</button>
            <Link to="/home">
                <button>Home</button>
            </Link>
        </div>
    );
}