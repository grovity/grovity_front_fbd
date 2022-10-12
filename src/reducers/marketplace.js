import {handleActions} from "redux-actions";
import {
    GET_DISPONIBILIDAD_MENTOR, GET_DISPONIBILIDAD_MENTOR_COMPRA, GET_DISPONIBILIDAD_MENTOR_DIA,
    GET_EVENTS_MARKETPLACE,
    GET_MENTORS_MARKETPLACE,
    SET_AREAS, SET_PRICE, SET_RATING,
    SET_SORT
} from "../constants";

export const disponibilidad_mentor = handleActions({
    [GET_DISPONIBILIDAD_MENTOR]: (state, action) => action.payload
}, []);

export const disponibilidad_mentor_day = handleActions({
    [GET_DISPONIBILIDAD_MENTOR_COMPRA]: (state, action) => action.payload
}, []);

export const disponibilidad_mentor_dia = handleActions({
    [GET_DISPONIBILIDAD_MENTOR_DIA]: (state, action) => action.payload

}, []);

export const mentores_marketplace = handleActions({
    [GET_MENTORS_MARKETPLACE]: (state, action) => action.payload
}, []);


export const eventos_marketplace = handleActions({
    [GET_EVENTS_MARKETPLACE]: (state, action) => action.payload
}, []);

export const areas = handleActions({
    [SET_AREAS]: (state, action) => action.payload
}, []);

export const sort = handleActions({
    [SET_SORT]: (state, action) => action.payload
}, []);

export const rating = handleActions({
    [SET_RATING]: (state, action) => action.payload
}, []);

export const price = handleActions({
    [SET_PRICE]: (state, action) => action.payload
}, []);