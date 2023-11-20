const initialState = {
    barcos: []
}


export default function reducer(state=initialState,action){
    switch(action.type){
        case 'GET_BARCOS':            
            return {barcos: action.payload}

        default:
            return state
    }
}