import {handleActions} from 'redux-actions'
import {
    FETCH_EVENT_ID,
    FETCH_EVENTS_MENTOR,
    FETCH_EVENTS_MENTORSHIP,
    FETCH_EVENTS_USER,
    FETCH_FILES_EVENT, FETCH_TOTAL_EVENTS_USER,
    FETCH_USERS_EVENT
} from "../constants";

export const events = handleActions({
    [FETCH_EVENTS_MENTORSHIP]: (state, action) => action.payload
}, []);

export const events_mentor = handleActions({
    [FETCH_EVENTS_MENTOR]: (state, action) => action.payload
}, []);

export const events_user = handleActions({
    [FETCH_EVENTS_USER]: (state, action) => action.payload
}, []);

export const users_event = handleActions({
    [FETCH_USERS_EVENT]: (state, action) => action.payload
}, []);

export const files_event = handleActions({
    [FETCH_FILES_EVENT]: (state, action) => action.payload
}, []);


export const event_id = handleActions({
    [FETCH_EVENT_ID]: (state, action) => action.payload
}, []);

export const events_calendar = handleActions({
    [FETCH_TOTAL_EVENTS_USER]: (state, action) => action.payload
}, []);

