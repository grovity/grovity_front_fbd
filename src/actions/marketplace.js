import {createAction} from "redux-actions";
import {
    GET_DISPONIBILIDAD_MENTOR, GET_DISPONIBILIDAD_MENTOR_COMPRA, GET_DISPONIBILIDAD_MENTOR_DIA,
    GET_EVENTS_MARKETPLACE,
    GET_MENTORS_MARKETPLACE,
    SET_AREAS, SET_PRICE, SET_RATING,
    SET_SORT
} from "../constants";
import {
    getDispoMentor, getDispoMentorDay, getDispoMentorSpecific,
    getEventsMarketPlace,
    getMentorsMarketPlace,
    getMentorsSearch,
    getMentorsSort
} from "../api/marketplace";

export const fetchDisponibilidadMentor = createAction(GET_DISPONIBILIDAD_MENTOR, (id,date) => {
    return getDispoMentor(id,date)
});

export const fetchDisponibilidadMentorCompra = createAction(GET_DISPONIBILIDAD_MENTOR_COMPRA, (date, mentor, entidad) => {
    return getDispoMentorDay(date, mentor, entidad)
});

export const fetchDisponibilidadMentorDia = createAction(GET_DISPONIBILIDAD_MENTOR_DIA, (date, mentor) => {
    return getDispoMentorSpecific(date, mentor)
});

export const fetchMentorsMarketPlace = createAction(GET_MENTORS_MARKETPLACE, (next) => {
    return getMentorsMarketPlace(next)
});

export const fetchMentorsMarketPlaceSort = createAction(GET_MENTORS_MARKETPLACE, (value) => {
    return getMentorsSort(value)
});

export const fetchMentorsMarketPlaceSearch = createAction(GET_MENTORS_MARKETPLACE, (skills, type, sort, rating, price) => {
    return getMentorsSearch(skills, type, sort, rating, price)
});

export const fetchEventsMarketplace = createAction(GET_EVENTS_MARKETPLACE, () => {
    return getEventsMarketPlace()
});

export const setAreas = createAction(SET_AREAS, (e) => {
    return e
});

export const setSort = createAction(SET_SORT, (value) => {
    return value
});

export const setRating = createAction(SET_RATING, (value) => {
    return value
});

export const setPrice = createAction(SET_PRICE, (value) => {
    return value
});