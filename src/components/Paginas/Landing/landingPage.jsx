import { Link } from 'react-router-dom';
export default function LandingPage(){
    return (
        <div>
            <h1>Bienvenido a Nautica Ríos</h1>
            <h2>Ventas y Accesorios</h2>
            <p>Navega por nuestra página y encuentra el producto perfecto para tu barco.</p>
            <Link to="/home">
                <button>Home</button>
            </Link>
        </div>
    )
}