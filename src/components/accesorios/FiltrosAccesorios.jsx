import { useDispatch, useSelector } from 'react-redux';
import { getAccesorios, ADD_FILTER_ACC, SET_FILTER_ACC, getFiltersAcc, SET_ORDER_ACC ,RESET_FILTERS} from '../../redux/actions';
import { useEffect } from 'react';
import getNombreFiltro from './getNombreFiltro';

export default function FiltrosAcce() {
  const allFilters = useSelector(state => state.allFiltersAcc);
  const dispatch = useDispatch();
  const filtrosAplicados = useSelector(state => state.filterAcc);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAccesorios());
      await dispatch(getFiltersAcc());
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    dispatch(ADD_FILTER_ACC({ name: event.target.name, value: event.target.value }));
    dispatch(SET_FILTER_ACC());
  };

  const handleChangeOrder = (event) => {
    dispatch(SET_ORDER_ACC(event.target.value));
    
  };
  
  const handleResetChange = () => {
    dispatch(RESET_FILTERS())

  }
  return (
    <div className="text-black-200 flex-cols">
      <br/>
      <button className="bg-[#3b82f6] text-white mt-8" onClick={handleResetChange}>RESET</button>

    <h1 className="bg-slate-200 w-full text-2xl font-bold mb-5 mt-4">FILTRAR</h1>

      <div className="flex flex-col">

        {allFilters?.map((filtro, i) => {
          let prop = Object.keys(filtro)[0];
          switch (prop) {
            case 'precio':
              {
                return (
                  <div key={i} className="flex flex-row justify-between mt-4 ml-2">
                    <label className="ml-4">{getNombreFiltro(prop)}:</label>
                    <select className="ml-4 h-[20px] w-[100px] mr-2" onChange={(event) => handleChange(event)} value={filtrosAplicados[prop]?`{"min":${filtrosAplicados[prop].min},"max":${filtrosAplicados[prop].max}}`:'-'} name={prop} >
                      <option value="-">-</option>

                      {filtro[prop].map((rango, i) => {
                        return <option className="text-black" value={`{"min":${rango.min},"max":${rango.max}}`} key={i}>{rango.min}-{rango.max}</option>;
                      })}
                    </select>
                  </div>
                );
              }
            case 'marca':
            case 'tipo':
            case 'material':
              {
                return (
                  <div key={i} className="flex flex-row justify-between mt-4 ml-2">
                    <label className="ml-4 ">{getNombreFiltro(prop)}:</label>
                    <select className="ml-4 h-[20px] w-[100px] mr-2" onChange={(event) => handleChange(event)} value={filtrosAplicados[prop]?filtrosAplicados[prop]:'-'} name={prop}>
                      <option value="-">-</option>

                      {filtro[prop].map((value, i) => {
                        return <option className="text-black" value={value} key={i}>{value}</option>;
                      })}
                    </select>
                  </div>
                );
              }
          }
        })}
      </div>



    </div>
  );
}
