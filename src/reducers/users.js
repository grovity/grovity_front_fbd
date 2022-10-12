import {
    ARRAY_ASISTENTES,
    ARRAY_TAREA, FETCH_EMPRENDEDORES_MENTOR, FETCH_EMPRENDEDORES_PROGRAM,
    FETCH_EMPRESA_EMPRENDEDOR,
    FETCH_EMPRESA_EMPRENDEDOR_BY_USERNAME, FETCH_EMPRESA_INFO,
    FETCH_FILES_EVENTS,
    FETCH_FILES_USER, FETCH_FUNC,
    FETCH_FUNC_EMPRENDEDOR,
    FETCH_PROGRAMS_USER, FETCH_SECTORES,
    FETCH_USER, FETCH_USER_EMPRENDEDOR,
    FETCH_USERS
} from "../constants";
import {handleActions} from 'redux-actions'

export const users = handleActions({
    [FETCH_USERS]: (state, action) =>
        action.payload

}, []);

export const user = handleActions({
    [FETCH_USER]: (state, action) => action.payload
}, []);

export const programs_user = handleActions({
    [FETCH_PROGRAMS_USER]: (state, action) => action.payload
}, []);

export const emprendedores_entidad = handleActions({
    [FETCH_FUNC_EMPRENDEDOR]: (state, action) => action.payload
}, []);

export const funcionarios_emprendedores = handleActions({
    [FETCH_USER_EMPRENDEDOR]: (state, action) => action.payload
}, []);

export const funcionarios_entidad = handleActions({
    [FETCH_FUNC]: (state, action) => action.payload
}, []);

export const emprendedores_mentor = handleActions({
    [FETCH_EMPRENDEDORES_MENTOR]: (state, action) => action.payload
}, []);

export const emprendedores_program = handleActions({
    [FETCH_EMPRENDEDORES_PROGRAM]: (state, action) => action.payload
}, []);


export const array = handleActions({
    [ARRAY_ASISTENTES]: (state, action) => action.payload
}, []);

export const array_tarea = handleActions({
    [ARRAY_TAREA]: (state, action) => action.payload
}, []);

export const sectores = handleActions({
    [FETCH_SECTORES]: (state, action) => action.payload
}, []);

export const empresa_emprendedor = handleActions({
    [FETCH_EMPRESA_EMPRENDEDOR]: (state, action) => action.payload
}, []);

export const empresa_emprendedor_info = handleActions({
    [FETCH_EMPRESA_INFO]: (state, action) => action.payload
}, []);

export const empresa_emprendedor_desde_mentor = handleActions({
    [FETCH_EMPRESA_EMPRENDEDOR_BY_USERNAME]: (state, action) => action.payload
}, []);

export const files_users = handleActions({
    [FETCH_FILES_USER]: (state, action) => action.payload
}, []);

export const files_users_allEvents = handleActions({
    [FETCH_FILES_EVENTS]: (state, action) => action.payload
}, []);


