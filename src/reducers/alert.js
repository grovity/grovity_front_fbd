import {REMOVE_ALERT, SET_ALERT} from "../constants";

const initialstate = [];

export default function (state = initialstate, action) {
    const {type, payload} = action;

    switch (type) {
        case SET_ALERT:
            return [
                ...state,
                payload
            ];
        case REMOVE_ALERT:
            return [];
        default:
            return state
    }
}