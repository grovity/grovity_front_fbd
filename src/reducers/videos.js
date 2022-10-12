import {
    VIDEOS, 
} from "../constants";

const InitialState = {
    videos_default: {},
}

export function videos(state = InitialState, action) {
    const {type, payload} = action;
    switch (type) {
        case VIDEOS:
            return {
                ...state,
                videos_default: payload,
            };

        default:
            return state;

         }
}