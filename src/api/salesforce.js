import {URL_BASE} from "../constants";
import {toast} from "react-toastify";


export const salesforce = async (id) => {
    try {
        const request = await fetch(`${URL_BASE}/usuario/confirmar/${id}`, {
            method: 'DELETE'
        })
        const json = await request.json()
        if (request.status === 404) {
            toast.error('Error al cargar el usuario')
        } else {
            localStorage.setItem('token', json.token);
            localStorage.setItem('theme', 'davivienda');
            return json
        }

    } catch (e) {
        console.log(e)
    }


}