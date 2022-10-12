import {FETCH_PROGRAMS, FETCH_PROGRAMS_USER} from "../constants";
import {createAction} from 'redux-actions';
import {getProgram, getProgramsEntidad} from "../api";

// cuando se conecte con el api, como segundo paremtro se debe pasar la función que hace el fetch al api.
export const fetchProgram = createAction(FETCH_PROGRAMS, (id) => getProgram(id));
export const fetchPrograms_entidad = createAction(FETCH_PROGRAMS_USER, (id) => getProgramsEntidad(id));
