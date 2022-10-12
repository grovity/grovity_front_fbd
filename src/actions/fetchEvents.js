import {createAction} from 'redux-actions';
import {
    FETCH_EVENT_ID,
    FETCH_EVENTS_MENTOR,
    FETCH_EVENTS_MENTORSHIP,
    FETCH_EVENTS_USER,
    FETCH_TOTAL_EVENTS_USER,
    VIDEOS, ARTICLES,
} from "../constants";
import {getEventbyId, getEventsbyMentor, getEventsbyMentorships} from "../api";
import {getEventsbyUser, getTotalEventsUser} from "../api/user";
import {getVideos, getArticles} from "../api/soporte";

// cuando se conecte con el api, como segundo paremetro se debe pasar la función que hace el fetch al api.
export const fetchSesionesbyMentorship = createAction(FETCH_EVENTS_MENTORSHIP, (id) => {
    return getEventsbyMentorships(id)
});
export const fetchEventsbyMentor = createAction(FETCH_EVENTS_MENTOR, (id) => {
    return getEventsbyMentor(id)
});

export const fetchEventsbyUser = createAction(FETCH_EVENTS_USER, () => {
    return getEventsbyUser()
});


export const fetchEventsbyId = createAction(FETCH_EVENT_ID, (id, bool) => {
    return getEventbyId(id, bool)
});


export const fetchVideos = createAction(VIDEOS, () => {
    return getVideos()
});

export const fetchArticles = createAction(ARTICLES, (value) => {
    return getArticles(value)
});

export const fetchTotalEventsUser = createAction(FETCH_TOTAL_EVENTS_USER, () => {
    return getTotalEventsUser()
});
