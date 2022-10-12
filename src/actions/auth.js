import axios from 'axios'
import {toast} from "react-toastify";

import {GET_USER_FAILED, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, URL_BASE, USER_LOADED,} from "../constants";
import getJsonStrError from "../helpers/handleJsonErrors";


const url = `${URL_BASE}/usuario/crear/entidad`;
const url_user = `${URL_BASE}/usuario/crear/usuario`;



// Load User
export const loadUser = () => async dispatch => {
    try {
        const request = await fetch(`${URL_BASE}/usuario/`, {
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`
            }),

            method: 'GET'
        });

        const json = await request.json();

        await dispatch({
            type: USER_LOADED,
            payload: json
        });
    } catch (err) {
        toast.error("Error al traer la información del usuario")
        if(localStorage.getItem('count') >= 6) {
            await dispatch({
                type: GET_USER_FAILED
            })
        }
        let reload = () => {
            window.location.reload()
        }
        setTimeout(reload, 2000)

    }
};

//login User
export const login = ({email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email, password});

    try {
        const res = await axios.post(`${URL_BASE}/usuario/login`, body, config);

        if (res.status === 200){
            await dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
            await dispatch(loadUser())

        }

    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

//Register user

export const register = ({first_name, last_name, email, telefono, password, confirm_password}, setAlert) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({first_name, last_name, email, password, confirm_password});

    try {
        const res = await axios.post(url, body, config);
        if (res.status === 201) {
            toast.success("Usuario creado exitosamente, por favor revise su correo electrónico");
            return true
        } else {
            let error = getJsonStrError(res);
            toast.error(error)
            return false
        }
    } catch (err) {
        if (err.response !== undefined && err.response.data.email !== undefined) {
            const errors = err.response.data.email[0];
            if (errors) {
                toast.error(errors);
            }
        } else {
            toast.error("La contraseña deben tener al  menos 8 caracteres, letra mayúsculas, minúsculas, un número y un símbolo");
            return false
        }


        dispatch({
            type: REGISTER_FAIL
        });
    }
    return false
};


export const registerUser = ({username, first_name, last_name, telefono, email, password, confirm_password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({username, first_name, last_name, email, password, confirm_password, telefono});
    try {
        const res = await axios.post(url_user, body, config);
        if (res.status === 201) {
            toast.success("Usuario creado exitosamente, por favor revise su correo electrónico");

            return true
        } else {
            let error = getJsonStrError(res);
            toast.error(error)
            return false
        }

    } catch (err) {
        if (err.response !== undefined && err.response.data.email !== undefined) {
            const errors = err.response.data.email[0];

            if (errors) {
                toast.error(errors);
            }
        } else {
            toast.error("La contraseña deben tener al  menos 8 caracteres, letra mayúsculas, minúsculas, un número y un símbolo");
            return false
        }

        dispatch({
            type: REGISTER_FAIL
        });
    }
    return false
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });

    setTimeout(() => {
        window.location.reload(true);
        window.localStorage.clear();
    }, 200)
};
