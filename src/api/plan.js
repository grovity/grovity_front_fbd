import {URL_BASE} from "../constants";
import {toast} from "react-toastify";
import getJsonStrError from "../helpers/handleJsonErrors";


export const createPlan = async ({description}, user, program) => async dispatch => {
    try {
        const request = await fetch(`${URL_BASE}/workplan/workplan/ `, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({description, user, program}),
        });

        const json = await request.json()
        if (request.status === 201) {
            toast.success('Plan Creado correctamente')
            return json
        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
        }


    } catch (err) {
        toast.error('Error, por favor intenta nuevamente')
    }
};

export const editPlan = async ({description}, user, program, id_plan) => async dispatch => {
    try {
        const request = await fetch(`${URL_BASE}/workplan/workplan/${program}/`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({description, user, program}),
        });

        const json = await request.json()
        if (request.status === 200) {
            toast.success('Plan editado correctamente')
            return json
        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
        }


    } catch (err) {
        toast.error('Error, por favor intenta nuevamente')
    }
};

export const deletePlan = async (id) => async dispatch => {
    try {
        const request = await fetch(`${URL_BASE}/workplan/workplan/${id}/`, {
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`
            }),
            method: 'DELETE'
        });

        if (request.status === 204) {
            toast.success('Plan eliminado correctamente')
            return true
        } else {
            toast.error('Error al eliminar el plan, por favor intente nuevamente')
        }

    } catch (e) {
        console.log(e)
    }

}


export const getPlan = async (id) => {
    try {
        const request = await fetch(`${URL_BASE}/workplan/workplan/${id}/`, {
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

export const getPlanFromMentor = async (id_program, id_user) => {
    try {
        const request = await fetch(`${URL_BASE}/workplan/workplan/${id_program}/${id_user}/`, {
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


export const createActivity = async ({description, mentor, start, end, name}, workplan, id, status, acta, acta_id, mentor_id) => async dispatch => {
    if (status) {
        mentor = id
    } else if(acta){
        mentor = mentor_id
    }

    let url = `${URL_BASE}/workplan/activities/`
    if (acta){
        url = `${URL_BASE}/acts/acts/${acta_id}/activities/`
    }
    try {
        const request = await fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({description, mentor, start, end, name, workplan}),
        });

        const json = await request.json()
        if (request.status === 201) {
            toast.success('Actividad creada correctamente')
            return json
        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
        }
        return null


    } catch (err) {
        return null
    }
};

export const editActivity = async ({description, mentor, start, end, name, done}, workplan, id, status, id_activity) => async dispatch => {

    if (status) {
        mentor = id
    }
    try {
        const request = await fetch(`${URL_BASE}/workplan/activities/${id_activity}/`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({description, mentor, start, end, name, workplan, done}),
        });

        const json = await request.json()
        if (request.status === 200) {
            toast.success('Actividad editada correctamente')
            return json
        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
        }
        return null


    } catch (err) {
        return null
    }
};

export const deleteActivity = async (id) => async dispatch => {
    try {
        const request = await fetch(`${URL_BASE}/workplan/activities/${id}/`, {
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`
            }),
            method: 'DELETE'
        });

        if (request.status === 204) {
            toast.success('Actividad eliminada correctamente')
            return true
        } else {
            toast.error('Error al eliminar la actividad, por favor intente nuevamente')
        }

    } catch (e) {
        console.log(e)
    }

}

export async function deleteObservation (id) {
    try {
        const request = await fetch(`${URL_BASE}/workplan/observations/${id}/`, {
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`
            }),
            method: 'DELETE'
        });

        if (request.status === 204) {
            toast.success('Observación eliminada correctamente')
            return true
        } else {
            toast.error('Error al eliminar la Observación, por favor intente nuevamente')
        }

    } catch (e) {
        console.log(e)
    }

}





export const getActivity = async (id) => {
    try {
        const request = await fetch(`${URL_BASE}/workplan/activities/${id}/`, {
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
            toast.error(error)
        }
        return {}


    } catch (err) {
        console.log(err)
    }
};


export const createObservacion = async ({text, title}, activity, creator) => async dispatch => {
    try {
        const request = await fetch(`${URL_BASE}/workplan/observations/ `, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({text, title, activity, creator}),
        });

        const json = await request.json()
        if (request.status === 201) {
            toast.success('Observación creada correctamente')
            return json
        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
        }


    } catch (err) {

    }
};

export const getObservations = async (id) => {
    try {
        const request = await fetch(`${URL_BASE}/workplan/activities/${id}/observations/`, {
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
            toast.error(error)
        }
        return {}


    } catch (err) {
        console.log(err)
    }
};