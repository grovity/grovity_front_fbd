import {
    ARRAY_ASISTENTES,
    ARRAY_TAREA,
    FETCH_EMPRENDEDORES_MENTOR, FETCH_EMPRENDEDORES_PROGRAM, FETCH_EMPRENDEDORES_PROGRAMA,
    FETCH_EMPRESA_EMPRENDEDOR,
    FETCH_EMPRESA_EMPRENDEDOR_BY_USERNAME, FETCH_EMPRESA_INFO, FETCH_FUNC,
    FETCH_FUNC_EMPRENDEDOR, FETCH_INDICADORES_EMPRESA,
    FETCH_PROGRAMS_USER, FETCH_SECTORES,
    FETCH_USER, FETCH_USER_EMPRENDEDOR,
    FETCH_USERS,
    FETCH_USERS_EVENT
} from "../constants";
import {
    getEmprendedoresMentor,
    getEmprendedoresProgram, getFuncionariobyEntidad,
    getUser,
    getUserbyEntidad,
    getUserbyId, getUserFuncbyEntidad,
    getUsersPrograma
} from "../api";
import {createAction} from 'redux-actions';
import {
    getEmpresaEmprendedor,
    getEmpresaEmprendedorbyUsername, getEmpresaEmprendedorEdit,
    getIndicadoresSectores,
    getProgramsbyUser,
    getUserbyEvent
} from "../api/user";
import {getIndicadoresEmpresaApi} from "../api/empresa";

// cuando se conecte con el api, como segundo paremtro se debe pasar la función que hace el fetch al api.
export const fetchUsersbyId = createAction(FETCH_USER, (id) => getUserbyId(id));
export const fetchUsersbyEvent = createAction(FETCH_USERS_EVENT, (id) => getUserbyEvent(id));
export const fetchProgramsbyUser = createAction(FETCH_PROGRAMS_USER, (username) => getProgramsbyUser(username));
export const fetchUser = createAction(FETCH_USERS, getUser);
export const guardarArray = createAction(ARRAY_ASISTENTES, (arr2) => (arr2));
export const guardarArray_tarea = createAction(ARRAY_TAREA, (arr_tarea) => (arr_tarea));
export const fetchEmprendedor = createAction(FETCH_FUNC_EMPRENDEDOR, (id, next) => getUserbyEntidad(id, next));
export const fetchFuncionarioEmpren = createAction(FETCH_USER_EMPRENDEDOR, (id, next) => getUserFuncbyEntidad(id, next));
export const fetchFuncionarios = createAction(FETCH_FUNC, (id, next) => getFuncionariobyEntidad(id, next));
export const fetchEmprendedoresPrograma = createAction(FETCH_EMPRENDEDORES_PROGRAMA, (id) => getUsersPrograma(id));
export const fetchIndicadoresSectores = createAction(FETCH_SECTORES, () => getIndicadoresSectores());
export const fetchEmpresaEmprendedor = createAction(FETCH_EMPRESA_EMPRENDEDOR, (id) => getEmpresaEmprendedor(id));
export const fetchIndicadoresEmpresa = createAction(FETCH_INDICADORES_EMPRESA, (id) => getIndicadoresEmpresaApi(id));
export const fetchInfoEmpresa = createAction(FETCH_EMPRESA_INFO, () => getEmpresaEmprendedorEdit());
export const fetchEmprendedoresMentor = createAction(FETCH_EMPRENDEDORES_MENTOR, () => getEmprendedoresMentor());
export const fetchEmprendedoresbyProgram = createAction(FETCH_EMPRENDEDORES_PROGRAM, (idInstitucion, idPrograma) => getEmprendedoresProgram(idInstitucion, idPrograma));
export const fetchEmpresaEmprendedorbyusername = createAction(FETCH_EMPRESA_EMPRENDEDOR_BY_USERNAME, (username) => getEmpresaEmprendedorbyUsername(username));