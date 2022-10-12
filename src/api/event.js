import {URL_BASE_GOLANG, URL_MARKETPLACE} from "../constants";
import {toast} from "react-toastify";


export const deleteEvent = async (id) => async dispatch => {
    try {
        const request = await fetch(`${URL_MARKETPLACE}/entity/delete/event/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),

        });
        if (request.status === 204) {
            toast.success('Evento eliminado correctamente')
            return true
        } else {

            toast.error('Error, por favor intenta nuevamente')
        }


    } catch (err) {
        console.log(err)
    }
};

export const deleteEventEntidad = async (id) => async dispatch => {
    try {
        const request = await fetch(`${URL_BASE_GOLANG}/zoom_master/event/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),

        });
        if (request.status === 204) {
            toast.success('Evento eliminado correctamente')
            return true
        } else {

            toast.error('Error, por favor intenta nuevamente')
        }


    } catch (err) {
        console.log(err)
    }
};

