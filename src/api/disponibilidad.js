import {URL_BASE, URL_MARKETPLACE} from "../constants";
import {toast} from "react-toastify";
import getJsonStrError from "../helpers/handleJsonErrors";

export const createDisponibilidad = async ({date, mentor_id, start_hour, end_hour, semanal}) => async dispatch => {
    let string_availability = [{
        'start_hour': start_hour,
        'end_hour': end_hour
    }]
    if(semanal === 'false'){
        semanal = false
    } else if(semanal === 'true'){
        semanal = true
    }
    try {
        const request = await fetch(`${URL_MARKETPLACE}/mentor_availability`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({date, mentor_id, string_availability, semanal}),
        });

        const json = await request.json()
        if (request.status === 201) {
            toast.success('Disponibilidad creada correctamente')
            return true
        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
        }


    } catch (err) {
        console.log(err)
    }
};


export const editDisponibilidad = async ({
                                             date,
                                             mentor_id,
                                             start_hour,
                                             end_hour,
                                             semanal,
                                             start_hour_actual,
                                             end_hour_actual
                                         }) => async dispatch => {

    if(start_hour.split('T')[1]){
        let temp = start_hour.split('T')[1]
        start_hour = temp.substr(0,5)
    }

    if(end_hour.split('T')[1]){
        let temp2 = end_hour.split('T')[1]
        end_hour = temp2.substr(0,5)
    }

    let string_availability = [
        {
            'start_hour': start_hour_actual,
            'end_hour': end_hour_actual
        },
        {
            'start_hour': start_hour,
            'end_hour': end_hour
        },

    ]
    if(semanal === 'false'){
        semanal = false
    } else if(semanal === 'true'){
        semanal = true
    }


    try {
        const request = await fetch(`${URL_MARKETPLACE}/mentor_availability`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({date, mentor_id, string_availability, semanal}),
        });

        const json = await request.json()
        if (request.status === 201) {
            toast.success('Disponibilidad editada correctamente')
            return true
        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
        }


    } catch (err) {
        console.log(err)
    }
};

export const deleteDisponibilidad = async ({
                                             date,
                                             mentor_id,
                                             semanal,
                                             start_hour_actual,
                                             end_hour_actual
                                         }) => async dispatch => {
    let string_availability = [
        {
            'start_hour': start_hour_actual,
            'end_hour': end_hour_actual
        },

    ]

    if(semanal === 'false'){
        semanal = false
    } else if(semanal === 'true'){
        semanal = true
    }
    try {
        const request = await fetch(`${URL_MARKETPLACE}/mentor_availability`, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({date, mentor_id, string_availability, semanal}),
        });

        if (request.status === 204) {
            toast.success('Disponibilidad eliminada correctamente')
            return true
        } else {

            toast.error('Error por favor intente nuevamente')
        }


    } catch (err) {
        console.log(err)
    }
};