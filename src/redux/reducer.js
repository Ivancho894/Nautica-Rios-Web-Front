const initialState = {
    allBarcos:[],
    barcos: [],
    allFilters:{},
    filter: {}
}


export default function reducer(state=initialState,action){
    
    switch(action.type){
        case 'GET_BARCOS':            
            return {barcos: action.payload,allBarcos:action.payload,filter:{},allFilter:{}}

        case 'ADD_FILTER':
            //AGREGA UN FILTRO AL OBJETO DE FILTROS
            const newFilter = {
                ...state.filter,
                [action.payload]:action.payload.value
            }
            return {...state,filter:newFilter}

        case 'SET_FILTER':
            let barcosFilt = barcos
            Object.keys(filter).map(prop=>{
                //NO LO PROBE, DEBERIA HACER UN FILTRO ACA
                // barcosFilt = barcosFilt.filter(barco=>barco[prop]===filter[prop])
            })
            return {...state,barcos:barcosFilt}
        case 'GET_FILTERS':

            let filtros=[]

            //LLENA EL OBJETO FILTROS CON LOS DISPONIBLES CON LOS BARCOS ACTUALES, SE EJECUTA 1 VEZ
            const properties = ['tipo','marcaBarco','marcaMotor','accesorios']
            properties.map(prop=>{
                let values=[]
                state.barcos.map(barco=>values.push(barco[prop]))
                console.log(state.barcos,'nofuncs')
                values.length>1?filtros.unshift({[prop]:[...values]}):null;
            })
            console.log(filtros,'seee')

            //Para cargar los rangos de precios
            let rangos = []
            function newRange(precio){
                //Funcion que recibe un precio y te devuelve un rango cargado con min y max
                //del rango de ese precio
                rangos.unshift(
                    {min:10**(String(precio).length-1)*String(precio)[0]*1,
                        max: 10**(String(precio).length-1)*(1+(String(precio)[0]*1))
                    })
            }
            //Cargo el rango del barco 0
            newRange(state.barcos[0]?.precio)
            //Lleno los rangos con todos los precios
            state.barcos.map(barco=>{
                rangos.map(rango=>{
                        rango.min<barco.precio?
                            rango.max>=barco.precio?
                                null
                            :newRange(barco.precio)
                            :newRange(barco.precio)
                })
            })
            //Si hay al menos dos rangos
            console.log(rangos)
            rangos>1?filtros.push({precios : [...rangos]}):null;


            //Year filter
            rangos = []
            function newYearRange(year){
                rangos.unshift(
                    {min:year-String(year)[String(year).length-1],
                        max: year-String(year)[String(year).length-1]+5
                    })
            }

            newYearRange(state.barcos[0]?.year)
            state.barcos.map(barco=>{
                rangos.map(rango=>{
                        rango.min<barco.year?
                            rango.max>=barco.year?
                                null
                            :newRange(barco.precio)
                            :newRange(barco.precio)
                })
            })

            rangos>1?filtros.unshift({years : [...rangos]}):null;

            return {...state,allFilters:filtros}
        default:
            return state
    }
}
