import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//redux
import { useDispatch, useSelector } from "react-redux";
import { GET_BARCOS } from './redux/actions';



function App() {
  const barcos = useSelector(state=>state.barcos)
  const dispatch = useDispatch();




  useEffect(()=>{
    dispatch(GET_BARCOS())
  },[])








  return (
    <>
        
      <h1>ESTO ES DESDE APP.jsx</h1>
      <h2>(FUNCIONA)</h2>
      {barcos.map(x=>{return(<h1 key={x.id}>{x.marcaBarco}</h1>)})}
      
    </>
  )
}

export default App
