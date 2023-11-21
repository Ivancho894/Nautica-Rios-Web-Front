import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//redux
import { useDispatch, useSelector} from "react-redux";
import { useNavigate,Route,Routes } from "react-router-dom";
import { GET_BARCOS } from './redux/actions';
import Home from './components/Paginas/homePage';
import LandingPage from './components/Paginas/landingPage';
import Contactar from './components/Paginas/contactar';
import QuienesSomos from './components/Paginas/quienesSomos';
import Detalle from './components/Barco/detalleBarcos';
import TodosLosBarcos from './components/Paginas/todosLosBarcos';



function App() {
  const barcos = useSelector(state=>state.barcos)
  const dispatch = useDispatch();
  // const navigate = useNavigate();



  useEffect(()=>{
    dispatch(GET_BARCOS())
    // navigate('/home')
  },[])


  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/landingpage' element={<LandingPage/>}/>
        <Route path='/contactar' element={<Contactar/>}/>
        <Route path='/quienessomos' element={<QuienesSomos/>}/>
        <Route path='/detalle/:id' element={<Detalle/>}/>
        <Route path='/todoslosbarcos' element={<TodosLosBarcos/>}/>
      </Routes>
      
    </div>
  )
}

export default App
