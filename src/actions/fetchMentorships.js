import {
    DELETE_MENTORSHIP, FETCH_MENTORS_by_MENTORSHIPS,
    FETCH_MENTORSHIPS,
    FETCH_MENTORSHIPS_by_MENTOR,
    FETCH_MENTORSHIPS_MENTOR
} from "../constants";
import {getMentoriasbyMentor, getMentoriasMentor, getMentorsbymentorship, getMentorshipsbyProgram} from "../api";
import {createAction} from 'redux-actions';


// cuando se conecte con el api, como segundo paremtro se debe pasar la función que hace el fetch al api.
export const fetchMentorshipsMentor = createAction(FETCH_MENTORSHIPS_MENTOR, (username) => getMentoriasMentor(username));
//esta es la que se usa para traer las mentorias de mentor, mentorshipsbymentor, la anterior creo que ya no se usa.
export const fetchMentorshipsbyMentor = createAction(FETCH_MENTORSHIPS_by_MENTOR, (username) => getMentoriasbyMentor(username));
export const fetchMentorsbymentorship = createAction(FETCH_MENTORS_by_MENTORSHIPS, (username) => getMentorsbymentorship(username));
export const fetchMentorships = createAction(FETCH_MENTORSHIPS, (id) => getMentorshipsbyProgram(id));

