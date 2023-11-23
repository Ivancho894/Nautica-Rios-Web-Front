import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//redux
import { useDispatch, useSelector} from "react-redux";
import { useNavigate,Route,Routes } from "react-router-dom";
import { GET_BARCOS, GET_FILTERS } from './redux/actions';
import Home from './components/Paginas/homePage';
import LandingPage from './components/Paginas/landingPage';
import Contactar from './components/Paginas/contactar';
import QuienesSomos from './components/Paginas/quienesSomos';
import Detalle from './components/Barco/detalleBarcos';
import TodosLosBarcos from './components/Paginas/todosLosBarcos';
import Navbar from './components/navbar/Navbar';
import Filtros from './components/Filtros y orden/filtro';




function App() {
  const barcos = useSelector(state=>state.barcos)
  const dispatch = useDispatch();
   const navigate = useNavigate();



  useEffect(()=>{
    dispatch(GET_BARCOS())
    // navigate('/home')
  },[])

  const handleFilterChange = (barcosFiltrados) => {
    console.log('Barcos filtrados:', barcosFiltrados);
    // Navegar a una página que muestra los barcos filtrados
    navigate('/todoslosbarcos', { state: { barcosFiltrados } });
  };


  return (
    <div>
      <Filtros barcos={barcos} onFiltrosChange={handleFilterChange}/>
        <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/landingpage' element={<LandingPage/>}/>
        <Route path='/contactar' element={<Contactar/>}/>
        <Route path='/quienessomos' element={<QuienesSomos/>}/>
        <Route path='/detalle/:id' element={<Detalle/>}/>
        <Route path='/todoslosbarcos' element={<TodosLosBarcos barcos={barcos}/>}/>
      </Routes>
      
    </div>
  )
}

export default App
