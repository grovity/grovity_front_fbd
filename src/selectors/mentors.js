import {createSelector} from "reselect";
import {mentors_entidad} from "../reducers/mentors";

export const getMentors = state => {
    if(state.mentors_entidad){
        return state.mentors_entidad
    }

    return []
};

export const getMentorships_mentor = state => {
    if (state.mentors_by_mentorship !== null) {
        return  state.mentors_by_mentorship;
    }

    return []
};

export const getType = state => {
    if (state.form.EventEdit) {
        return state.form.EventEdit.values.tipo;
    }

    return ''
};

export const getMentorById = createSelector(
    (state, props) => state.auth.user[0].entidad_entidad[0].mentor.find(c => {
        return String(c.id) === String(props.match.params.id)

    }),
    mentor => mentor
);

export const getUsernameMentor = createSelector(
    (state, props) => state.auth.user[0].entidad_entidad[0].mentor.find(c => {
        if (String(c.id) === String(props.match.params.id)) {
            return c.username
        }

        return null
    }),
    username_mentor => username_mentor
);
