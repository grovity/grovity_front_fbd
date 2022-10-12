import {URL_BASE} from "../constants";
import {toast} from "react-toastify";
import getJsonStrError from "../helpers/handleJsonErrors";


export const deleteUsuario = async (username, status) => {
    try {
        const request = await fetch(`${URL_BASE}/usuario/desactivar/${username}/${status}/`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
                   });

        const json = await request.json()
        if (request.status === 200) {
            toast.success('Usuario eliminado correctamente')
            return json
        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
        }


    } catch (err) {
        console.log(err)
    }
}

