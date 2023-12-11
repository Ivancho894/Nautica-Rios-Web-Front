import React from 'react';



export default function paginacion({paginaActual, totalPaginas, cambioPag }){
    const paginasCerca = 3;
    const paginas = Array.from({length: totalPaginas}, (_, i) => i + 1);
    const inicio = Math.max(paginaActual - paginasCerca, 0);
    const fin = Math.min(paginaActual + paginasCerca*2, totalPaginas);

    const paginasMostrar = paginas.slice(inicio, fin);


    return(
        <div className="list-none flex justify-center items-center p-0 bg-gray-500">
            <ul className="flex flex-row">
                <li onClick={()=>cambioPag(paginaActual-1)}
                 className="m-0 mx-5 cursor-pointer text-base transition duration-300 ease-in-out py-2 px-5 rounded-lg"
                 >&#9665;</li>
                {paginasMostrar.map(pagina =>(
                    <li 
                        key={pagina}
                        className={paginaActual === pagina ? 'm-0 mx-5 cursor-pointer text-base transition duration-300 ease-in-out py-2 px-5 rounded-lg bg-blue-500 text-white' : "m-0 mx-5 cursor-pointer text-base transition duration-300 ease-in-out py-2 px-5 rounded-lg"}
                        onClick={()=>cambioPag(pagina)
                        }>{pagina}</li>
                    ))}
                <li onClick={()=> cambioPag(paginaActual+1)}
                    className="m-0 mx-5 cursor-pointer text-base transition duration-300 ease-in-out py-2 px-5 rounded-lg"
                    >&#9655;</li>
            </ul>
        </div>
        )

}