const initialState = {
  // totalPagar: 0,
  notificaciones: false,
  allBarcos: [],
  barcos: [],
  allFilters: [],
  filter: {},
  orden: {
    name: "",
    value: "",
  },
  accesorios: [],
  allAccesorios: [],
  allFiltersAcc: [],
  filterAcc: {},
  ordenAcc: "",
  carrito: [],
  uid:""
};
const storedState =
  JSON.parse(localStorage.getItem("myAppState")) || initialState;
const defaultState = { ...initialState, ...storedState };

export default function reducer(state = initialState, action) {
  const saveState = (newState) => {
    localStorage.setItem("myAppState", JSON.stringify(newState));
    return newState;
  };

  switch (action.type) {

    case "GET_USUARIO_FIRESTORE":
      return {...state, usuario: action.payload}

    case "GET_BARCOS":
      return { ...state, barcos: action.payload, allBarcos: action.payload };

    case "ADD_FILTER":
      //AGREGA UN FILTRO AL OBJETO DE FILTROS
      //Paso de string a objeto si es preio o year
      action.payload.value =
        action.payload.value != "-" &&
        (action.payload.name === "year" || action.payload.name === "precio")
          ? JSON.parse(action.payload.value)
          : action.payload.value;
      //Agrego el filtro seleccionado al store
      const newFilter = {
        ...state.filter,
        [action.payload.name]: action.payload.value,
      };
      //Si el valor del filtro seleccionado es - elimina ese filtro
      action.payload.value === "-"
        ? delete newFilter[action.payload.name]
        : null;

      return { ...state, filter: newFilter };

    case "SET_FILTER":
      //Agarra los filtros actuales del store y lo aplica
      let newBarcos = state.allBarcos;
      Object.keys(state.filter).map((prop) => {
        switch (prop) {
          case "precio":
          case "year":
            newBarcos = newBarcos.filter((b) => {
              //Filtro por precio o year
              return (
                b[prop] > state.filter[prop].min &&
                b[prop] < state.filter[prop].max
              );
            });
            break;
          case "marcaBarco":
          case "tipo":
            //Filtro por marca o tipo
            newBarcos = newBarcos.filter((b) => {
              return b[prop] === state.filter[prop];
            });
            break;
        }
      });
      return { ...state, barcos: newBarcos };

    case "GET_FILTERS":
      let filtros = [];

      //LLENA EL OBJETO FILTROS CON LOS DISPONIBLES CON LOS BARCOS ACTUALES, SE EJECUTA 1 VEZ
      const properties = ["tipo", "marcaBarco", "marcaMotor"];
      properties.map((prop) => {
        let values = [];

        state.allBarcos.map((barco) =>
          values.find((x) => x.toUpperCase() === barco[prop].toUpperCase())
            ? null
            : values.push(barco[prop])
        );
        values.length > 1 ? filtros.unshift({ [prop]: values.sort() }) : null;
      });

      //Para cargar Accesorios
      let values = [];
      state.allBarcos.map((barco) => {
        barco.accesorios.split(/, |,/).map((accesorio) => {
          values.find((x) => x === accesorio) ? null : values.push(accesorio);
        });
      });
      values.length > 1
        ? filtros.push({
            accesorios: values.sort((a, b) => {
              return a.min - b.min;
            }),
          })
        : null;

      //Para cargar los rangos de precios
      let rangos = [];
      function newRange(precio) {
        //Funcion que recibe un precio y te devuelve un rango cargado con min y max
        //del rango de ese precio
        rangos.push({
          min: 10 ** (String(precio).length - 1) * String(precio)[0] * 1,
          max: 10 ** (String(precio).length - 1) * (1 + String(precio)[0] * 1),
        });
      }
      //Cargo el rango del barco 0
      newRange(state.barcos[0]?.precio);
      //Lleno los rangos con todos los precios
      state.allBarcos.map((barco) => {
        rangos
          .map((rango) => {
            return rango.min < barco.precio
              ? rango.max >= barco.precio
                ? true
                : false
              : false;
          })
          .find((x) => x)
          ? null
          : newRange(barco.precio);
      });
      //Si hay al menos dos rangos
      rangos.length > 1
        ? filtros.push({
            precio: rangos.sort((a, b) => {
              return a.min - b.min;
            }),
          })
        : null;

      //Year filter
      rangos = [];
      //Funcion creadora de rangos
      function newYearRange(year) {
        let min;
        let max;
        if (String(year)[String(year).length - 1] > 5) {
          min = year - String(year)[String(year).length - 1] + 5;
          max = year - String(year)[String(year).length - 1] + 10;
        } else {
          min = year - String(year)[String(year).length - 1];
          max = year - String(year)[String(year).length - 1] + 5;
        }
        rangos.find((x) => x.min === min) ? null : rangos.push({ min, max });
      }

      //Agrego por default el primer barco a los rangos de years
      newYearRange(state.barcos[0]?.year);
      //Agrego todos los rangos de los barcos que hay
      state.allBarcos.map((barco) => {
        rangos.map((rango) => {
          rango.min < barco.year
            ? rango.max >= barco.year
              ? null
              : newYearRange(barco.year)
            : newYearRange(barco.year);
        });
      });
      //Chequeo que haya mas de un rango para filtrar si no directamente no existe el filtro years
      rangos.length > 1
        ? filtros.unshift({
            year: rangos.sort((a, b) => {
              return a.min - b.min;
            }),
          })
        : null;

      return { ...state, allFilters: filtros };

    case "RESET_FILTERS":
      return {
        ...state,
        orden: { name: "", value: "" },
        filter: {},
        barcos: state.allBarcos,
        filterAcc: {},
        ordenAcc: "",
        accesorios: state.allAccesorios,

      };
    case "ORDENAR":
      const name = state.orden.name;
      const value = state.orden.value;
      const ordenados =
        value === ""
          ? state.barcos
          : value === "asc"
          ? [...state.barcos].sort((a, b) => {
              return a[name] - b[name];
            })
          : [...state.barcos].sort((a, b) => {
              return b[name] - a[name];
            });

      return { ...state, barcos: ordenados };
    case "CAMBIAR_ORDENAR":
      const theValue = action.payload.value === "-" ? "" : action.payload.value;
      const theName = action.payload.name === "-" ? "" : action.payload.name;
      return { ...state, orden: { name: theName, value: theValue } };

    case "GET_ACCESORIOS":
      return saveState({
        ...state,
        accesorios: action.payload,
        allAccesorios: action.payload,
        filterAcc: {},
        allFiltersAcc: [],
      });


    case "GET_FILTERS_ACC":
      const propertiesAcc = ["tipo", "marca", "material"];

      const accesorios = state.accesorios || [];

      // Lógica para obtener filtros basados en los accesorios
      let filtrosAcc = propertiesAcc.reduce((acc, prop) => {
        let values = [
          ...new Set(accesorios.map((accesorio) => accesorio[prop])),
        ].filter(Boolean);

        if (values.length > 1) {
          acc.unshift({ [prop]: values.sort() });
        }
        return acc;
      }, []);

      let rangosAcc = [];
      function newRangeAcc(precio) {
        rangosAcc.push({
          min: 10 ** (String(precio).length - 1) * String(precio)[0] * 1,
          max: 10 ** (String(precio).length - 1) * (1 + String(precio)[0] * 1),
        });
      }

      newRangeAcc(state.accesorios[0]?.precio);
      // Lleno los rangos con todos los precios
      state.accesorios.map((accesorio) => {
        rangosAcc
          .map((rango) => {
            return rango.min < accesorio.precio
              ? rango.max >= accesorio.precio
                ? true
                : false
              : false;
          })
          .find((x) => x)
          ? null
          : newRangeAcc(accesorio.precio);
      });
      // Si hay al menos dos rangos
      rangosAcc.length > 1
        ? filtrosAcc.push({ precio: rangosAcc.sort((a, b) => a.min - b.min) })
        : null;

      return saveState({ ...state, allFiltersAcc: filtrosAcc });

    case "ADD_FILTER_ACC":
      let parsedValue;

      try {
        parsedValue = JSON.parse(action.payload.value);
      } catch (error) {
        parsedValue = action.payload.value;
      }

      const newFilterAcc = {
        ...state.filterAcc,
        [action.payload.name]: parsedValue,
      };
      // Si el valor del filtro seleccionado es '-' elimina ese filtro
      if (parsedValue === "-") {
        delete newFilterAcc[action.payload.name];
      }
      return saveState({ ...state, filterAcc: newFilterAcc });

    case "SET_FILTER_ACC":
      let newAccesorios = state.allAccesorios;
      Object.keys(state.filterAcc).map((prop) => {
        switch (prop) {
          case "precio":
            newAccesorios = newAccesorios.filter((b) => {
              // Filtro por precio
              return (
                b[prop] > state.filterAcc[prop].min &&
                b[prop] < state.filterAcc[prop].max
              );
            });
            break;
          case "marca":
          case "tipo":
          case "material":
            // Filtro por marca o tipo
            newAccesorios = newAccesorios.filter(
              (b) => b[prop] === state.filterAcc[prop]
            );
            break;
        }
      });
      return saveState({ ...state, accesorios: newAccesorios });
    

    case "ORDENAR_ACC":
      const valueOr = state.ordenAcc;
      const ordenadosOr =
        valueOr === ""
          ? state.accesorios
          : valueOr === "pasc"
          ? [...state.accesorios].sort((a, b) => {
              return a.precio - b.precio;
            })
          : [...state.accesorios].sort((a, b) => {
              return b.precio - a.precio;
            });

      return { ...state, accesorios: ordenadosOr };
    case "CAMBIAR_ORDENAR_ACC":
      const theValueOr = action.payload === "-" ? "" : action.payload;
      return { ...state, ordenAcc:theValueOr };

    case "NOTIFICACIONES":
      state.notificaciones = action.payload;
      return {
        ...state,
      };
    case "GET_CARRITO":
      return {
        ...state,
        carrito: action.payload,
      }

    case "AGREGAR_CARRITO":
      
      return {
        ...state,
        carrito: [...state.carrito, action.payload],
      };

    case "BORRAR_UNIDAD":
      let borrado = false;
      const carrito = state.carrito.filter((x) => {
        if (borrado) {
          borrado = true;
          return true;
        }
        if (x.id !== action.payload.id) {
          return true;
        }
        borrado = true;
        return false;
      });
      return {
        ...state,
        carrito,
      };
    case "BORRAR_PRODUCTO":
      const carrito2 = state.carrito.filter((x) => x.id != action.payload.id);
      return {
        ...state,
        carrito: carrito2,
      };

    case "VACIAR_CARRITO":
      return {
        ...state,
        carrito: [],
      };
    // case "TOTAL_PAGAR":
    //   state.totalPagar = action.payload;
    //   let totalPagar = state.totalPagar;
    //   return {
    //     ...state,
    //     totalPagar,
    //   };
    case "SET_UID":
      return{
        ...state,
        uid:action.payload
      }
    default:
      return state;
  }
}
