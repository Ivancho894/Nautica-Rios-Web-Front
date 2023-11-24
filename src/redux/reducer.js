const initialState = {
    allBarcos:[],
    barcos: [],
    allFilters:[],
    filter: {}
}


export default function reducer(state=initialState,action){
    
    switch(action.type){
        case 'GET_BARCOS':            
            return {barcos: action.payload,allBarcos:action.payload,filter:{},allFilter:{}}

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
                state.barcos.map(barco=>values.find(x=>x===barco[prop])?null:values.push(barco[prop]))
                values.length>1?filtros.unshift({[prop]:[...values]}):null;
            })


            //Para cargar Accesorios
            let values = []
            state.barcos.map(barco=>{
                barco.accesorios.split(/, |,/).map(accesorio=>{
                    values.find(x=>x===accesorio)?null:values.push(accesorio)
                })
            })
            values.length>1?filtros.unshift({accesorios:[...values]}):null;


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
                        return rango.min<barco.precio?
                            rango.max>=barco.precio?
                            true
                            :false
                            :false
                }).find(x=>x)?null:newRange(barco.precio);
            })
            //Si hay al menos dos rangos
            rangos.length>1?filtros.push({precio : rangos}):null;


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
                rangos.find(x=>x.min===min)?null:rangos.unshift({min,max});
                
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
            rangos.length>1?filtros.unshift({year : [...rangos]}):null;

            return {...state,allFilters:filtros}
        default:
            return state
    }
}
