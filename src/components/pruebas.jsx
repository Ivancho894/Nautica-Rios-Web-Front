import { useSelector } from "react-redux"



export default function precios(){
    const barcos = useSelector(state=>state.barcos)

    let rangos = []
    function newRange(precio){
        rangos.unshift(
            {min:10**(String(precio).length-1)*String(precio)[0],
                max: 10**(String(precio).length-1)*(1+(String(precio)[0]*1))
            })
    }
    newRange(barcos[0]?.precio)
    barcos.map(barco=>{
        rangos.map((rango,i)=>{
                rango.min<barco.precio?
                    rango.max>=barco.precio?
                        null
                    :newRange(barco.precio)
                    :newRange(barco.precio)
        })
    })
    
}