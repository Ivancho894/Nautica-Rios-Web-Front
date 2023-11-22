// ACA VA LA PAGINA HOME
import { useNavigate } from "react-router-dom";



export default function Home(){
    const navigate = useNavigate()
    return (
        <div>
            <h1>Esta es la Home page</h1>
            <button onClick={()=>{navigate('/todoslosbarcos')}}>VER BARCOS</button>

        </div>
    )
}