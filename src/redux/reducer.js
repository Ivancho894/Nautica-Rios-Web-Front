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
            //LLENA EL OBJETO FILTROS CON LOS DISPONIBLES CON LOS BARCOS ACTUALES, SE EJECUTA 1 VEZ

        default:
            return state
    }
}
