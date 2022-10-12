import {FETCH_EMPRENDEDORES_PROGRAMA, FETCH_PROGRAMS} from "../constants";
import {handleActions} from 'redux-actions'

export const programs = handleActions({
    [FETCH_PROGRAMS]: (state, action) => action.payload
}, []);



export const emprendedores_programa = handleActions({
    [FETCH_EMPRENDEDORES_PROGRAMA]: (state, action) => action.payload
}, []);