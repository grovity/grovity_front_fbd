import {FETCH_MENTORSHIPS, FETCH_MENTORSHIPS_by_MENTOR, FETCH_MENTORSHIPS_MENTOR} from "../constants";
import {handleActions} from 'redux-actions'

export const mentorships = handleActions({
    [FETCH_MENTORSHIPS]: (state, action) => action.payload

}, []);

export const mentorshipsbymentor = handleActions({
    [FETCH_MENTORSHIPS_MENTOR]: (state, action) => [
        action.payload
    ]
}, []);

export const mentorships_mentor = handleActions({
    [FETCH_MENTORSHIPS_by_MENTOR]: (state, action) => [
        action.payload
    ]
}, []);