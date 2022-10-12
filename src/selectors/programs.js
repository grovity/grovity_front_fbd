import {createSelector} from "reselect";

export const getPrograms = state => {
    if (state.auth.user !== null && state.auth.user[0] !== undefined) {
        return state.auth.user[0].entidad_entidad[0].programa;
    }

    return null
};

export const getProgramById = createSelector(
    (state, props) => state.programs.find(c => c.id === props.id),
    program => program
);

export const getProgramsUser = state => {
    if (state.programs_user) {
        return state.programs_user
    }

    return []
};