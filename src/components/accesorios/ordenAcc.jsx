import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CAMBIAR_ORDENAR_ACC, ORDENAR_ACC } from '../../redux/actions'
export default function Orden(){
    const orden = useSelector(state=>state.ordenAcc)
    const disptach = useDispatch()
    const ordenarPor = (e) =>{
        disptach(CAMBIAR_ORDENAR_ACC(e.target.value))
        disptach(ORDENAR_ACC())
    }
    console.log(orden,'aca')
    return(
        <div>
            <h1 className="bg-slate-200 text-2xl font-bold mb-5">ORDEN</h1>
            <div className="flex justify-between items-center p-2 ">
                <label className="ml-4 ">Ordenar por:</label>
                <select className='h-[20px] w-[100px] ml-8 ' onChange={ordenarPor} value={orden}>
                    <option value="-">-</option>
                    <option value="pasc">Menor precio</option>
                    <option value="pdes">Mayor precio</option>
                    <option value="-">Mas relevantes</option>
                </select>
            </div>
        </div>
    )
}