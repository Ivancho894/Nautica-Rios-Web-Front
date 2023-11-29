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


export default function reducer(state=initialState,action){
    
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

            return {...state,filter:newFilter}

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
            return {...state,barcos:newBarcos}
        
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

            return {...state,allFilters:filtros}


        case 'GET_ACCESORIOS':
            //console.log('GET_ACCESORIOS', state.accesorios);
            return {accesorios: action.payload,allAccesorios:action.payload,filterAcc:{},allFiltersAcc:[]};
    

            case 'GET_FILTERS':

            let filtrosAcc=[]

            //LLENA EL OBJETO FILTROS CON LOS DISPONIBLES CON LOS BARCOS ACTUALES, SE EJECUTA 1 VEZ
            const propertiesAcc = ['tipo','marca','material']
            propertiesAcc.map(prop=>{
                let values=[]

                state.accesorios.map(accesorio=>values.find(x=>x.toUpperCase()===accesorio[prop].toUpperCase())?null:values.push(accesorio[prop]))
                values.length>1?filtrosAcc.unshift({[prop]:values.sort()}):null;
            })


            //Para cargar los rangos de precios
            let rangosAcc = []
            function newRangeAcc(precio){
                //Funcion que recibe un precio y te devuelve un rango cargado con min y max
                //del rango de ese precio
                rangosAcc.push(
                    {min:10**(String(precio).length-1)*String(precio)[0]*1,
                        max: 10**(String(precio).length-1)*(1+(String(precio)[0]*1))
                    })
            }
            //Cargo el rango del accesorio 0
            newRangeAcc(state.accesorios[0]?.precio)
            //Lleno los rangos con todos los precios
            state.accesorios.map(accesorio=>{
                rangosAcc.map(rango=>{
                        return rango.min<accesorio.precio?
                            rango.max>=accesorio.precio?
                            true
                            :false
                            :false
                }).find(x=>x)?null:newRangeAcc(accesorio.precio);
            })
            //Si hay al menos dos rangos
            console.log()
            rangosAcc.length>1?filtrosAcc.push({precio : rangosAcc.sort((a,b)=>{return a.min-b.min})}):null;
            console.log('Filtros accesorios',state.allFiltersAcc);
            return {...state,allFiltersAcc:filtrosAcc}
              

        case 'ADD_FILTER_ACC':
            action.payload.value = action.payload.value!='-' && (action.payload.name ==='precio' || action.payload.name ==='tipo')?JSON.parse(action.payload.value):action.payload.value
            const newFilterAcc = {
                ...state.filterAcc,
                [action.payload.name]:action.payload.value
            }
            //Si el valor del filtro seleccionado es - elimina ese filtro
            action.payload.value==='-'?delete newFilterAcc[action.payload.name]:null;

            return {...state,filterAcc:newFilterAcc}

        case 'SET_FILTER_ACC':
            console.log('Antes de filtrar', state.accesorios);
            console.log('Filtro Aplicado', state.filterAcc);
            let newAccesorios = state.accesorios
            Object.keys(state.filterAcc).map(prop=>{
                switch(prop){
                    case 'precio':
                        newAccesorios = newAccesorios.filter(b => {
                            //Filtro por precio o year
                            return b[prop]>state.filterAcc[prop].min && b[prop]<state.filterAcc[prop].max})
                        break
                        case 'marca': case 'tipo': 
                        //Filtro por marca o tipo
                        newAccesorios = newAccesorios.filter(b => {return b[prop] === state.filterAcc[prop]})
                        console.log('new',newAccesorios);
                        break
           
            }})
            console.log('Despues de filtrar', state.accesorios);
            return {...state,accesorios:newAccesorios}


        case 'GET_ACCESORIOS_SUCCESS':
            return {
                ...state,
                accesorios: action.payload,
                allAccesorios: action.payload,
                filtrosAcc: {},
                allFiltersAcc: [],
            };



        default:
            return state
    }
}
