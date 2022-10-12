import {URL_BASE, USER_LOADED} from "../constants";
import {setAlert} from "../actions/alert";

export async function getPosts() {
    const request = await fetch(`${URL_BASE}/foro/post/`, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),

        method: 'GET'
    });

    const json = await request.json();
    return json
}

export const createPost = ({contenido, me_gusta}) => async dispatch => {
    try {
        const request = await fetch(`${URL_BASE}/foro/post/crear `, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({contenido, me_gusta}),
        });
        const json = await request.json();
        if (request.status === 201) {
            dispatch(setAlert("Post creado correctamente", 'success'))
        }
        dispatch({
            type: USER_LOADED,
            payload: json
        });
    } catch (err) {

    }
};