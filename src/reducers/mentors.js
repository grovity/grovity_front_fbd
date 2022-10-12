import {handleActions} from 'redux-actions';
import {
    FETCH_CALIFICACION_MENTOR,
    FETCH_MENTORS,
    FETCH_MENTORS_BY_MENTORSHIP,
    FETCH_MENTORS_by_MENTORSHIPS,
    FETCH_MENTORS_BY_PROGRAM, FETCH_MENTORS_ENTIDAD,
    FETCH_USER
} from "../constants";

/*
const initialState = {
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case FETCH_MENTORS:
            return {
                ...state,
                ...payload
            };
            default:
            return state;
    }
}

*/


export const mentors = handleActions({
    [FETCH_MENTORS]: (state, action) => {
        return action.payload
    }
}, []);

export const mentors_entidad= handleActions({
    [FETCH_MENTORS_ENTIDAD]: (state, action) => {
        return action.payload
    }
}, []);



export const mentors_by_mentorships = handleActions({
    [FETCH_MENTORS_BY_MENTORSHIP]: (state, action) => {
        return action.payload
    }
}, []);

/*
export const mentors2 = handleActions({
    [FETCH_MENTORS2]: (state, action) => [...action.payload]
}, []);
*/

export const user = handleActions({
    [FETCH_USER]: (state, action) => action.payload
}, [])

export const calificacion_mentor = handleActions({
    [FETCH_CALIFICACION_MENTOR]: (state, action) => action.payload
}, [])

export const mentors_by_mentorship = handleActions({
    [FETCH_MENTORS_by_MENTORSHIPS]: (state, action) => action.payload
}, [])

export const mentors_by_program = handleActions({
    [FETCH_MENTORS_BY_PROGRAM]: (state, action) => action.payload
}, [])