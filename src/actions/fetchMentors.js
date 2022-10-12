import {
    FETCH_CALIFICACION_MENTOR,
    FETCH_MENTORS,
    FETCH_MENTORS_BY_MENTORSHIP,
    FETCH_MENTORS_BY_PROGRAM,
    FETCH_MENTORS_ENTIDAD
} from "../constants";
import {createAction} from 'redux-actions';
import {
    getCalificacionMentor,
    getMentors,
    getMentorsbyEntidad,
    getMentorsbymentorship,
    getMentorsByProgram
} from "../api";


export const fetchMentors = createAction(FETCH_MENTORS, (id, next) => getMentors(id, next));
export const fetchMentorsbyEntidad = createAction(FETCH_MENTORS_ENTIDAD, (id) => getMentorsbyEntidad(id));
export const fetchMentorsbyMentorship = createAction(FETCH_MENTORS_BY_MENTORSHIP, (id) => getMentorsbymentorship(id));
export const fetchCalifiacionbyMentor = createAction(FETCH_CALIFICACION_MENTOR, (username) => getCalificacionMentor(username));
export const fetchMentorsByProgram = createAction(FETCH_MENTORS_BY_PROGRAM, (id) => getMentorsByProgram(id));
