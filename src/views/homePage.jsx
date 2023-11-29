// ACA VA LA PAGINA HOME
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GET_BARCOS, GET_FILTERS } from "../redux/actions";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(GET_FILTERS())
    // dispatch(GET_BARCOS())
  }, []);
  return (
    <div>
      <h1>Esta es la Home page</h1>
      <button
        onClick={() => {
          navigate("/todoslosbarcos");
        }}
      >
        VER BARCOS
      </button>
    </div>
  );
}
