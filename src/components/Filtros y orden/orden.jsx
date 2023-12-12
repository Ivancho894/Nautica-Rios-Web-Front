import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import tituloFyO from './TituloFiltros'
export default function Orden(){
    const fOrdenar = ['precio','year','eslora','capacidad']
    const orden = useSelector(state=>state.orden)
    const disptach = useDispatch()
    const ordenarPor = (e) =>{
        disptach({type:'CAMBIAR_ORDENAR',payload:{value:e.target.value,name:e.target.name}})
        disptach({type:'ORDENAR'})

    }
    return(
        <div>
            <h1 className="bg-slate-200 text-2xl font-bold mb-5">ORDEN</h1>
            {fOrdenar.map((or,i)=>
            {return (
                <div key={i} className="flex justify-between items-center p-2 ">
                    <label className="ml-4 ">{tituloFyO(or)}:</label>
                    <select className='h-[20px] w-[100px] ml-8 ' name={or} onChange={ordenarPor} value={orden.name===or?orden.value:'-'}>
                        <option value="-">-</option>
                        <option value="asc">Menor a mayor</option>
                        <option value="des">Mayor a menor</option>
                    </select>
                </div>
                )})}
        </div>
    )
}