import {createAction} from "redux-actions";
import {FETCH_FILES_EVENT, FETCH_FILES_EVENTS, FETCH_FILES_USER} from "../constants";
import {getFilesbyEvent, getFilesbyUser, getFilesEventsAll} from "../api";


export const fetchFilesByEvent = createAction(FETCH_FILES_EVENT, (id) => getFilesbyEvent(id));
export const fetchFilesByUser = createAction(FETCH_FILES_USER, (id, status, username) => getFilesbyUser(id, status, username));
export const fetchFilesEventsAll = createAction(FETCH_FILES_EVENTS, (username) => getFilesEventsAll(username));