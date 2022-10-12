export let URL_BASE = "https://api-desarrollo.grovity.co"
// export let URL_BASE = "https://api.grovity.co"

//export let URL_BASE = 'http://127.0.0.1:8000'

export let URL_BASE_GOLANG = "https://zoom-events-desarrollo.grovity.co"


export let URL_MARKETPLACE = "https://mentor-marketplace-desarrollo.grovity.co"



//producción marketplace https://mentor-marketplace.grovity.co


if (process.env.REACT_APP_SERVER === "desarrollo") {
    URL_BASE = "https://api-desarrollo.grovity.co"
    URL_MARKETPLACE = "https://mentor-marketplace-desarrollo.grovity.co"
    URL_BASE_GOLANG = "https://zoom-events-desarrollo.grovity.co"

} else if(process.env.REACT_APP_SERVER === "fndbolivar") {
    URL_BASE = "https://api-fundacion-bolivar.grovity.co"
    URL_MARKETPLACE = "https://mentor-marketplace-fundacion-bolivar.grovity.co"
    URL_BASE_GOLANG = "https://zoom-events-fundacion-bolivar.grovity.co"     
} else if(process.env.REACT_APP_SERVER==="local"){
    URL_BASE = 'http://127.0.0.1:8000'
    URL_MARKETPLACE = "http://127.0.0.1:8080"
    URL_BASE_GOLANG = "https://zoom-events-fundacion-bolivar.grovity.co"  
}
export const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtceKKoOSDIVhtZzuUn5C
qFOnBJSbezU1EBv5fe/Xa6QyKTTFAhNOJ0U0ehRUP2aVKvzxW4OroGacXEooMn19
bzMQ0tsuYkP280AoafqnQXiY9PUJDTksoDoyQm8zJAvKIyDNfkS6z/VWOZ1w075P
RQxU+UfuKashkhyYusqF9W2WHMzeJCvbye/LFpSOgP2zo1sr8csViIR4IVV/YoMB
kPVjCc8OQOQ1l3CJyGArmEeqBmIl//87wVm9/cVUjbmZtAv/faTv+/L0mkXdCPrG
QD3nNi+wufoWd8S7xV0qLYQPzGV6N2Rl/8qIvl9MYbCLuzoK5ze7hJi89Cqv7h0n
JQIDAQAB
-----END PUBLIC KEY-----`
export const FETCH_MENTORSHIPS_MENTOR = 'FETCH_MENTORSHIPS_MENTOR';
export const FETCH_MENTORSHIPS_by_MENTOR = 'FETCH_MENTORSHIPS_by_MENTOR,';
export const FETCH_MENTORSHIPS = 'FETCH_MENTORSHIPS';
export const DELETE_MENTORSHIP = 'DELETE_MENTORSHIP';
export const FETCH_FILES_EVENTS = 'FETCH_FILES_EVENTS';
export const FETCH_EMPRENDEDORES_MENTOR = 'FETCH_EMPRENDEDORES_MENTOR'
export const FETCH_EMPRENDEDORES_PROGRAM = 'FETCH_EMPRENDEDORES_PROGRAM'
export const FETCH_EMPRENDEDORES_PROGRAMA = 'FETCH_EMPRENDEDORES_PROGRAMA'
export const FETCH_EMPRESA_INFO = 'FETCH_EMPRESA_INFO'

export const FETCH_MENTORS = 'FETCH_MENTORS';
export const FETCH_MENTORS_ENTIDAD = 'FETCH_MENTORS_ENTIDAD';
export const FETCH_MENTORS_BY_MENTORSHIP = 'FETCH_MENTORS_BY_MENTORSHIP';
export const FETCH_MENTORS_by_MENTORSHIPS = 'FETCH_MENTORS_by_MENTORSHIPS';
export const FETCH_CALIFICACION_MENTOR = 'FETCH_CALIFICACION_MENTOR';
export const FETCH_MENTORS_BY_PROGRAM = 'FETCH_MENTORS_BY_PROGRAM';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USER = 'FETCH_USER';
export const FETCH_USERS_EVENT = 'FETCH_USER_EVENT';
export const FETCH_TOTAL_EVENTS_USER = 'FETCH_TOTAL_EVENTS_USER';
export const FETCH_FUNC_EMPRENDEDOR = 'FETCH_FUNC_EMPRENDEDOR'
export const FETCH_USER_EMPRENDEDOR = 'FETCH_USER_EMPRENDEDOR'
export const FETCH_FUNC = 'FETCH_FUNC'
export const FETCH_SECTORES = 'FETCH_SECTORES'
export const FETCH_EMPRESA_EMPRENDEDOR = 'FETCH_EMPRESA_EMPRENDEDOR'
export const FETCH_INDICADORES_EMPRESA = 'FETCH_INDICADORES_EMPRESA'
export const FETCH_EMPRESA_EMPRENDEDOR_BY_USERNAME = 'FETCH_EMPRESA_EMPRENDEDOR_BY_USERNAME'


export const FETCH_PROGRAMS = 'FETCH_PROGRAMS';
export const FETCH_PROGRAMS_USER = 'FETCH_PROGRAMS_USER';

export const FETCH_EVENTS_MENTORSHIP = 'FETCH_EVENTS_MENTORSHIP';
export const FETCH_EVENTS_MENTOR = 'FETCH_EVENTS_MENTORSHIP';
export const FETCH_EVENTS_USER = 'FETCH_EVENTS_USER';


export const FETCH_ENTITIES = 'FETCH_ENTITIES';

export const FETCH_INSTITUTIONS = 'FETCH_INSTITUTIONS';


export const REMOVE_ALERT = 'REMOVE_ALERT';
export const SET_ALERT = 'SET_ALERT';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const USER_LOADED = 'USER_LOADED';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const GET_USER_FAILED= 'GET_USER_FAILED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGOUT = ' LOGOUT';
export const FETCH_FILES_EVENT = 'FETCH_FILES_EVENT';
export const FETCH_FILES_USER = 'FETCH_FILES_USER';
export const FETCH_EVENT_ID = 'FETCH_EVENT_ID';

export const ACCOUNT_DELETED = 'ACCOUNT_DELETED';


export const ARRAY_ASISTENTES = 'ARRAY_ASISTENTES';
export const ARRAY_TAREA = 'ARRAY_TAREA';

export const FETCH_POSTS = 'FETCH_POSTS';
export const ADD_POST = 'ADD_POST';
export const POST_ERROR = 'POST_ERROR';
export const UPDATE_LIKES = 'UPDATE_LIKES';
export const DELETE_POST = 'DELETE_POST';
export const GET_POST = 'GET_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export const VIDEOS = 'VIDEOS';
export const ARTICLES = 'ARTICLES';

export const GET_DISPONIBILIDAD_MENTOR = 'GET_DISPONIBILIDAD_MENTOR';
export const GET_DISPONIBILIDAD_MENTOR_COMPRA = 'GET_DISPONIBILIDAD_MENTOR_COMPRA';
export const GET_DISPONIBILIDAD_MENTOR_DIA = 'GET_DISPONIBILIDAD_MENTOR_DIA';
export const GET_MENTORS_MARKETPLACE = 'GET_MENTORS_MARKETPLACE';
export const GET_EVENTS_MARKETPLACE = 'GET_EVENTS_MARKETPLACE';
export const SET_AREAS = 'SET_AREAS';
export const SET_SORT = 'SET_SORT';
export const SET_RATING = 'SET_RATING';
export const SET_PRICE = 'SET_PRICE';


export const PLAN_TRABAJO = 'PLAN_TRABAJO';
