import RenderBarco from "../Barco/renderBarco";


export default function MostrarBarcos({barcos,paginaActual}){
    const barcosPorPagina = 9;
    const inicio = (paginaActual - 1) * barcosPorPagina;
    const fin = inicio + barcosPorPagina;

    const barcosPagina = barcos.slice(inicio, fin);


    return(
        <div className=" flex flex-wrap ml-8 w-fullp-16 mt-16 gap-8 p-16">
            {barcosPagina.map((barco,index)=>(
                <RenderBarco key={index} barco={barco} />
            ))}
        </div>
    )
}