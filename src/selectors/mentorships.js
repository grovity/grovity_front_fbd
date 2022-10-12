import {createSelector} from "reselect";

export const getMentorships = state => state.mentorships;

export const getMentorshipById = createSelector(
    (state, props) => state.mentorships.find(c => {
        return String(c.id) === String(props.match.params.id)
    }),
    mentor => mentor
);


export const getMentorshipsbyMentor = state => {
    if (state.mentorships_mentor !== null && state.mentorships_mentor[0] !== undefined) {
        return state.mentorships_mentor[0]
    }

    return []
};



export const getmentorshipsbymentor = state => {
    if (state.mentorshipsbymentor.length > 0) {
        return state.mentorshipsbymentor[0].nombre
    }

    return null
};