import {
    ACCOUNT_DELETED,
    AUTH_ERROR, GET_USER_FAILED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED
} from '../constants';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case USER_LOADED:
            localStorage.setItem('username', payload[0].username);
            return {
                ...state,

                isAuthenticated: true,
                loading: false,
                user: payload
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            localStorage.setItem('theme', 'davivienda');

            return {
                ...payload,
                ...state,

                isAuthenticated: true,
                token: payload.token,
                loading: false
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:

            if (type === LOGOUT) {
                localStorage.clear();
                localStorage.setItem('count', 0)
                localStorage.setItem('flag', 0)
            }


            return {
                ...state,

                isAuthenticated: false,
                loading: false,
                token: null
            };
        case ACCOUNT_DELETED:
            return {
                ...state,

                isAuthenticated: false,
                loading: false,
                token: null,
                user: null
            };
        case GET_USER_FAILED :


            localStorage.clear();
            localStorage.setItem('count', 0)
            localStorage.setItem('flag', 0)
            window.location.href = `http://${window.location.host}/login`


            return {
                ...state,

                isAuthenticated: false,
                loading: false,
                token: null
            };

        default:
            return state;
    }
}