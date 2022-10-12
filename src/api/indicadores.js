import {URL_BASE} from "../constants";
import {toast} from "react-toastify";
import getJsonStrError from "../helpers/handleJsonErrors";

import React from "react";


export const addValueIndicator = async ({value, date_created_at}, indicator) => async dispatch => {
    const date = date_created_at.format('YYYY-MM-DD HH:mm')
    try {
        const request = await fetch(`${URL_BASE}/company/value/`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({indicator, value, date_created_at: date}),
        });

        const json = await request.json()
        if (request.status === 201) {
            toast.success('Valor agregado correctamente')
            return json
        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
        }

    } catch (err) {
        console.log(err)
    }
};

export const editValueIndicator = async ({value, date_created_at}, id) => async dispatch => {
    const date = date_created_at.format('YYYY-MM-DD HH:mm')
    try {
        const request = await fetch(`${URL_BASE}/company/value/${id}/`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ value, date_created_at: date}),
        });

        const json = await request.json()
        if (request.status === 200) {
            toast.success('Valor editado correctamente')
            return json
        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
        }


    } catch (err) {
        console.log(err)
    }
};


export const deleteValueIndicator = async (id) => async dispatch => {
    try {
        const request = await fetch(`${URL_BASE}/company/value/${id}/`, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),

        });
        if (request.status === 204) {
            toast.success('Valor eliminado correctamente')
            return true
        } else {

            toast.error('Error, por favor intenta nuevamente')
        }


    } catch (err) {
        console.log(err)
    }
};


export const getIndicadoresValues = async (id) => {
    try {
        const request = await fetch(`${URL_BASE}/company/value/${id}/`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }),
        });

        const json = await request.json()
        if (request.status === 200) {
            return json
        } else {
            let error = await getJsonStrError(json)
            console.log(error)

        }
        return []


    } catch (err) {
        console.log(err)
        return []
    }
};

export const getIndicator = async (id) => {
    try {
        const request = await fetch(`${URL_BASE}/company/indicator/${id}/`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }),
        });

        const json = await request.json()
        if (request.status === 200) {
            return json
        } else {
            let error = await getJsonStrError(json)
            console.log(error)

        }
        return []


    } catch (err) {
        console.log(err)
        return []
    }
};

export const getIndicadoresProgram = async (id, username) => {
    try {
        const request = await fetch(`${URL_BASE}/dashboard/${username}/${id}/`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }),
        });

        const json = await request.json()
        if (request.status === 200) {
            return json
        } else {
            let error = await getJsonStrError(json)
            console.log(error)

        }
        return []


    } catch (err) {
        console.log(err)
        return []
    }
};

export const getInformeEmprendedoresPorPrograma = async (id, username) => {
    let url = `${URL_BASE}/programa/descargar/reporte-emprendedores/${id}/`
    if(username){
        url = `${URL_BASE}/programa/descargar/reporte-emprendedor/${username}/`
    }
    fetch(url, {
        method: 'GET',
        headers: new Headers({
            "Authorization": `Token ${localStorage.getItem("token")}`
        })
    })
        .then(response => {
            if (response.status === 200) {
                return response.blob()
            } else {
                toast.error('Error al descargar el archivo')
            }
        })
        .catch((e) => {
            console.log(e)
        })
        .then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = "reporte_emprendedores_por_programa.xlsx";
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();
            a.remove();  //afterwards we remove the element again
        }).catch((e) => {
        console.log(e)
    })


};