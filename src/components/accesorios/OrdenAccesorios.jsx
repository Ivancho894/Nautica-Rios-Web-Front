import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function OrdenAccesorios(){
    const fOrdenar = ['precio','marca','tipo','material']
    const initialValues = {
        precio:'-',
        marca:'-',

    }
    const orden = useSelector(state=>state.ordenAcc)
    const [values,setValues] = useState(initialValues)
    const disptach = useDispatch()
    const ordenarPor = (e) =>{
        disptach({type:'CAMBIAR_ORDENAR_ACC',payload:{value:e.target.value,name:e.target.name}})
        disptach({type:'ORDENAR_ACC'})
        setValues(() => ({ ...initialValues, [e.target.name]: e.target.value }));
        console.log(values.precio,values.year,values.eslora,values.capacidad)
    }
    return(
        <div>
            <h1>Orden</h1>
            {fOrdenar.map((or,i)=>
            {return (
                <div key={i} className="flex-wrap justify-between items-center p-5 w-3/4">
                    <label>{or}</label>
                    <select name={or} onChange={ordenarPor} value={values[or]}>
                        <option value="-"></option>
                        <option value="asc">Menor a mayor</option>
                        <option value="des">Mayor a menor</option>
                    </select>
                </div>
                )})}
        </div>
    )
}
