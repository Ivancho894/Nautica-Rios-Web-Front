import RenderBarco from "../Barco/renderBarco";


export default function MostrarBarcos({barcos,paginaActual}){
    const barcosPorPagina = 9;
    const inicio = (paginaActual - 1) * barcosPorPagina;
    const fin = inicio + barcosPorPagina;

    const barcosPagina = barcos.slice(inicio, fin);


    return(
        <div className=" ml-8 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-16 mt-16">
            {barcosPagina.map((barco,index)=>(
                <RenderBarco key={index} barco={barco} />
            ))}
        </div>
    )
}