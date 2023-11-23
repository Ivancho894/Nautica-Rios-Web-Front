// import React, { useEffect, useState } from 'react';
// import { connect } from 'react-redux';
// import { GET_BARCOS, ADD_FILTER, SET_FILTER, GET_FILTERS } from '../../redux/actions';

// const Filtros = ({ barcos, ADD_FILTER, SET_FILTERS, GET_BARCOS }) => {
//     const [filtros, setFiltros] = useState({});

//     useEffect(() => {
//         GET_BARCOS();
//     }, []);

//     useEffect(() => {
//         // Propiedades específicas que deben incluir los filtros
//         const propiedadesDeseadas = ['tipo', 'marcaBarco', 'modelo', 'motor', 'precio', 'eslora', 'year', 'accesorios'];

//         // Actualiza los filtros cuando los barcos cambian
//         const nuevosFiltros = {};

//         barcos.forEach((barco) => {
//             Object.keys(barco).forEach((prop) => {
//                 if (propiedadesDeseadas.includes(prop)) {
//                     if (!nuevosFiltros[prop]) {
//                         nuevosFiltros[prop] = new Set([barco[prop]]);
//                     } else {
//                         nuevosFiltros[prop].add(barco[prop]);
//                     }
//                 }
//             });
//         });

//         setFiltros(nuevosFiltros);
//     }, [barcos]);

//     const handleFilter = (key, value) => {
//         ADD_FILTER({ key, value });
//     };

//     const applyFilters = () => {
//         console.log('Antes de aplicar los filtros:', filtros);
//         SET_FILTER(filtros);
//     };

//     return (
//         <div style={{ marginTop: '80px' }}>
//             {/* Itera sobre los filtros y crea controles de filtro dinámicamente */}
//             {Object.entries(filtros).map(([prop, valores], index) => (
//                 <div key={index}>
//                     <label>{prop}:</label>
//                     <select onChange={(e) => handleFilter(prop, e.target.value)}>
//                         <option value="">Todos</option>
//                         {[...valores].map((valor, idx) => (
//                             <option key={idx} value={valor}>
//                                 {valor}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             ))}

//             <button onClick={applyFilters}>Aplicar Filtros</button>
//         </div>
//     );
// };

// const mapStateToProps = (state) => ({
//     barcos: state.barcos,
// });

// export default connect(mapStateToProps, { GET_BARCOS, ADD_FILTER, SET_FILTER, GET_FILTERS })(Filtros);



import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase-config';

const Filtros = ({ barcos, onFiltrosChange }) => {
  const [filtros, setFiltros] = useState({});
  const [seleccion, setSeleccion] = useState({});

  useEffect(() => {
    const obtenerDatos = async () => {
      const barcosCollectionRef = collection(db, 'barcos');
      const datos = await getDocs(barcosCollectionRef);

      if (!datos.empty) {
        const nuevosFiltros = {};

        const propiedadesFiltros = ['tipo', 'marcaBarco', 'motor', 'precio', 'eslora', 'year', 'accesorios'];

        propiedadesFiltros.forEach((prop) => {
          const valoresUnicos = Array.from(new Set(datos.docs.map((doc) => doc.data()[prop])));
          nuevosFiltros[prop] = valoresUnicos;
        });

        setFiltros(nuevosFiltros);
      }
    };

    obtenerDatos();
  }, []);

  const handleFilter = (key, value) => {
    setSeleccion((prevSeleccion) => ({
      ...prevSeleccion,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    if (typeof onFiltrosChange === 'function') {
      const barcosFiltrados = barcos.filter((barco) => {
        return Object.entries(seleccion).every(([key, value]) => {
          return value === '' || barco[key] === value;
        });
      });

      onFiltrosChange(barcosFiltrados);
    }
  };

  return (
    <div style={{ marginTop: '80px' }}>
      {Object.entries(filtros).map(([prop, valores], index) => (
        <div key={index}>
          <label>{prop}:</label>
          <select onChange={(e) => handleFilter(prop, e.target.value)} value={seleccion[prop] || ''}>
            <option value="">Todos</option>
            {Array.isArray(valores) &&
              valores.map((valor, idx) => (
                <option key={idx} value={valor}>
                  {valor}
                </option>
              ))}
          </select>
        </div>
      ))}

      <button onClick={applyFilters}>Aplicar Filtros</button>
    </div>
  );
};

export default Filtros;

