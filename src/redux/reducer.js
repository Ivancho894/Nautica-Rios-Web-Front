const initialState = {
    allBarcos:[],
    barcos: [],
    allFilters:[],
    filter: {},
    accesorios: [],
    allAccesorios: [],
    allFiltersAcc: [],
    filterAcc: {},
}

const storedState = JSON.parse(localStorage.getItem('myAppState')) || initialState;
const defaultState = { ...initialState, ...storedState };

export default function reducer(state=initialState,action){
    
    const saveState = (newState) => {
        localStorage.setItem('myAppState', JSON.stringify(newState));
        return newState;
    };

    switch(action.type){
        case 'GET_BARCOS':            
        return {barcos: action.payload,allBarcos:action.payload,filter:{},allFilters:[]}

        case 'ADD_FILTER':
            //AGREGA UN FILTRO AL OBJETO DE FILTROS
            //Paso de string a objeto si es preio o year
            action.payload.value = action.payload.value!='-' && (action.payload.name === 'year' || action.payload.name ==='precio')?JSON.parse(action.payload.value):action.payload.value
            //Agrego el filtro seleccionado al store
            const newFilter = {
                ...state.filter,
                [action.payload.name]:action.payload.value
            }
            //Si el valor del filtro seleccionado es - elimina ese filtro
            action.payload.value==='-'?delete newFilter[action.payload.name]:null;

            return saveState({ ...state, filter: newFilter });

        case 'SET_FILTER':

            //Agarra los filtros actuales del store y lo aplica
            let newBarcos = state.allBarcos
            Object.keys(state.filter).map(prop=>{
                switch(prop){
                    case 'precio': case 'year':
                        newBarcos = newBarcos.filter(b => {
                            //Filtro por precio o year
                            return b[prop]>state.filter[prop].min && b[prop]<state.filter[prop].max})
                        break
                        case 'marcaBarco': case 'tipo': 
                        //Filtro por marca o tipo
                        newBarcos = newBarcos.filter(b => {return b[prop] === state.filter[prop]})
                        break
           
            }})
            return saveState({ ...state, barcos: newBarcos });
        
        case 'GET_FILTERS':

            let filtros=[]

            //LLENA EL OBJETO FILTROS CON LOS DISPONIBLES CON LOS BARCOS ACTUALES, SE EJECUTA 1 VEZ
            const properties = ['tipo','marcaBarco','marcaMotor']
            properties.map(prop=>{
                let values=[]

                state.barcos.map(barco=>values.find(x=>x.toUpperCase()===barco[prop].toUpperCase())?null:values.push(barco[prop]))
                values.length>1?filtros.unshift({[prop]:values.sort()}):null;
            })


            //Para cargar Accesorios
            let values = []
            state.barcos.map(barco=>{
                barco.accesorios.split(/, |,/).map(accesorio=>{
                    values.find(x=>x===accesorio)?null:values.push(accesorio)
                })
            })
            values.length>1?filtros.push({accesorios: values.sort((a,b)=>{return a.min-b.min})}):null;


            //Para cargar los rangos de precios
            let rangos = []
            function newRange(precio){
                //Funcion que recibe un precio y te devuelve un rango cargado con min y max
                //del rango de ese precio
                rangos.push(
                    {min:10**(String(precio).length-1)*String(precio)[0]*1,
                        max: 10**(String(precio).length-1)*(1+(String(precio)[0]*1))
                    })
            }
            //Cargo el rango del barco 0
            newRange(state.barcos[0]?.precio)
            //Lleno los rangos con todos los precios
            state.barcos.map(barco=>{
                rangos.map(rango=>{
                        return rango.min<barco.precio?
                            rango.max>=barco.precio?
                            true
                            :false
                            :false
                }).find(x=>x)?null:newRange(barco.precio);
            })
            //Si hay al menos dos rangos
            console.log()
            rangos.length>1?filtros.push({precio : rangos.sort((a,b)=>{return a.min-b.min})}):null;


            //Year filter
            rangos = []
            //Funcion creadora de rangos
            function newYearRange(year){
                let min
                let max
                if(String(year)[String(year).length-1]>5){
                    min = year-String(year)[String(year).length-1]+5
                    max = year-String(year)[String(year).length-1]+10
                }else{
                    min = year-String(year)[String(year).length-1]
                    max = year-String(year)[String(year).length-1]+5
                    }
                rangos.find(x=>x.min===min)?null:rangos.push({min,max});
                
            }

            //Agrego por default el primer barco a los rangos de years
            newYearRange(state.barcos[0]?.year)
            //Agrego todos los rangos de los barcos que hay
            state.barcos.map(barco=>{
                rangos.map(rango=>{
                        rango.min<barco.year?
                            rango.max>=barco.year?
                                null
                            :newYearRange(barco.year)
                            :newYearRange(barco.year)
                })
            })
            //Chequeo que haya mas de un rango para filtrar si no directamente no existe el filtro years
            rangos.length>1?filtros.unshift({year : rangos.sort((a,b)=>{return a.min-b.min})}):null;

            return saveState({ ...state, allFilters: filtros });

        case 'GET_ACCESORIOS':
            return saveState({ ...state, accesorios: action.payload, allAccesorios: action.payload, filterAcc: {}, allFiltersAcc: [] });    
        
        case 'GET_FILTERS_ACC':
            const propertiesAcc = ['tipo', 'marca', 'material'];

            const accesorios = state.accesorios || [];

            // Lógica para obtener filtros basados en los accesorios
            let filtrosAcc = propertiesAcc.reduce((acc, prop) => {
                let values = [...new Set(accesorios.map(accesorio => accesorio[prop]))].filter(Boolean);

                if (values.length > 1) {
                    acc.unshift({ [prop]: values.sort() });
                }
                return acc;
            }, []);

            let rangosAcc = [];
            function newRangeAcc(precio) {
                rangosAcc.push({
                    min: 10 ** (String(precio).length - 1) * String(precio)[0] * 1,
                    max: 10 ** (String(precio).length - 1) * (1 + (String(precio)[0] * 1))
                });
            }

            newRangeAcc(state.accesorios[0]?.precio);
            // Lleno los rangos con todos los precios
            state.accesorios.map(accesorio => {
                rangosAcc.map(rango => {
                    return rango.min < accesorio.precio ?
                        rango.max >= accesorio.precio ?
                            true
                            : false
                        : false;
                }).find(x => x) ? null : newRangeAcc(accesorio.precio);
            });
            // Si hay al menos dos rangos
            rangosAcc.length > 1 ? filtrosAcc.push({ precio: rangosAcc.sort((a, b) => a.min - b.min) }) : null;

            return saveState({ ...state, allFiltersAcc: filtrosAcc });

        case 'ADD_FILTER_ACC':
            let parsedValue;

            try {
                parsedValue = JSON.parse(action.payload.value);
            } catch (error) {parsedValue = action.payload.value;}

            const newFilterAcc = {
                ...state.filterAcc,
                [action.payload.name]: parsedValue
            }
            // Si el valor del filtro seleccionado es '-' elimina ese filtro
            if (parsedValue === '-') {delete newFilterAcc[action.payload.name];}
            //console.log('ADD_FILTER',newFilterAcc);
            return saveState({ ...state, filterAcc: newFilterAcc });
    
        case 'SET_FILTER_ACC':
            console.log('Antes de filtrar', state.allAccesorios);
            console.log('Filtro Aplicado', state.filterAcc);
            let newAccesorios = state.allAccesorios;
            Object.keys(state.filterAcc).map(prop => {
                switch (prop) {
                    case 'precio':
                        newAccesorios = newAccesorios.filter(b => {
                        // Filtro por precio
                        return b[prop] > state.filterAcc[prop].min && b[prop] < state.filterAcc[prop].max;
                    });
                        break;
                    case 'marca':
                    case 'tipo':
                    case 'material':
                        // Filtro por marca o tipo
                        newAccesorios = newAccesorios.filter(b => b[prop] === state.filterAcc[prop]);
                        break;
                    }
            });
            console.log('Después de filtrar', state.allAccesorios);
            return saveState({ ...state, accesorios: newAccesorios });

        case 'SET_ORDER_ACC':
            let orderedAccesorios = [...state.allAccesorios];

            // Aplicar otros filtros si existen
            if (state.filterAcc) {
                Object.keys(state.filterAcc).forEach((prop) => {
                switch (prop) {
                    case 'precio':
                    orderedAccesorios = orderedAccesorios.filter(
                        (accesorio) =>
                        accesorio.precio > state.filterAcc.precio.min &&
                        accesorio.precio < state.filterAcc.precio.max
                    );
                    break;
                    case 'marca':
                    case 'tipo':
                    case 'material':
                    orderedAccesorios = orderedAccesorios.filter(
                        (accesorio) => accesorio[prop] === state.filterAcc[prop]
                    );
                    break;
                    default:
                    break;
                }
                });
            }

            if (action.payload === '-') {
                return { ...state, accesorios: orderedAccesorios, order: action.payload };
            }
            // Aplicar ordenamiento
            switch (action.payload) {
                case 'precioAsc':
                orderedAccesorios.sort((a, b) => a.precio - b.precio);
                break;
                case 'precioDesc':
                orderedAccesorios.sort((a, b) => b.precio - a.precio);
                break;
                default:
                break;
            }

            return saveState({ ...state, accesorios: orderedAccesorios, order: action.payload });
        
        default:
            return state
            
    }
}