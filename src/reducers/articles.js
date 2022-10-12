import {
    ARTICLES, 
} from "../constants";

const InitialState = {
    articles_default: {},
}

export function articles(state = InitialState, action) {
    const {type, payload} = action;
    switch (type) {
        case ARTICLES:
            return {
                ...state,
                articles_default: payload,
            };

        default:
            return state;
         }
}