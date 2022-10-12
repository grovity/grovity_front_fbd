import {URL_BASE} from "../constants";
import {toast} from "react-toastify";
import getJsonStrError from "../helpers/handleJsonErrors";

export const createIndicator = async ({name, description, measure, base_line, goal, x_axis, y_axis}, trend, company) => async dispatch => {
    try {
        const request = await fetch(`${URL_BASE}/company/indicator/ `, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({name, description, measure, base_line, goal, trend, x_axis, y_axis, company}),
        });

        const json = await request.json()
        if (request.status === 201) {
            toast.success('Indicador Creado correctamente')
            return json
        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
        }


    } catch (err) {
        toast.error('Error, por favor intenta nuevamente')
    }
};

export const editIndicator = async ({name, description, measure, base_line, goal, x_axis, y_axis}, id_indicador, trend) => async dispatch => {
    try {
        const request = await fetch(`${URL_BASE}/company/indicator/${id_indicador}/`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({name, description, measure, base_line, goal, trend, x_axis, y_axis}),
        });

        const json = await request.json()
        if (request.status === 200) {
            toast.success('Indicador Editado correctamente')
            return json
        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
        }


    } catch (err) {
        toast.error('Error, por favor intenta nuevamente')
    }
};

export const editTeamEmpresa = async (team, id_empresa) => async dispatch => {
    let array = []
    for (let i=0; i < team.length ; i++) {
        array.push(team[i].id)
    }

    try {
        const request = await fetch(`${URL_BASE}/company/company/${id_empresa}/`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({'team': array}),
        });

        const json = await request.json()
        if (request.status === 200) {
            toast.success('Equipo Editado correctamente')
            return json
        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
        }


    } catch (err) {
        toast.error('Error, por favor intenta nuevamente')
    }
};


export const getIndicadoresEmpresaApi = async (id) => {
    try {
        const request = await fetch(`${URL_BASE}/company/${id}/indicator/`, {
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

export const addEquipo = async ({first_name, last_name, email}, company) => async dispatch => {
    try {
        const request = await fetch(`${URL_BASE}/company/${company}/team/partner/ `, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({first_name, last_name, email}),
        });

        const json = await request.json()
        if (request.status === 201) {
            toast.success('Persona agragada correctamente')
            return json
        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
        }


    } catch (err) {
        toast.error('Error, por favor intenta nuevamente')
    }
};

export const deleteEmpresaEmprendedor = (id_empresa) => async dispatch => {
    try {
        let request = await fetch(`${URL_BASE}/company/company/${id_empresa}/`, {
                method: 'DELETE',
                headers: new Headers({
                    'Authorization': `Token ${localStorage.getItem("token")}`,
                }),

            }
        );
        if (request.status === 204) {
            toast.success("Empresa eliminada correctamente", "success")
            return true
        } else {
            toast.error('Error, por favor intenta de nuevo')
        }

    } catch (e) {
        console.log(e)
    }
}

export const deleteIndicador = (id_indicador) => async dispatch => {
    try {
        let request = await fetch(`${URL_BASE}/company/indicator/${id_indicador}/`, {
                method: 'DELETE',
                headers: new Headers({
                    'Authorization': `Token ${localStorage.getItem("token")}`,
                }),

            }
        );
        if (request.status === 204) {
            toast.success("Indicador eliminado correctamente", "success")
            return true
        } else {
            toast.error('Error, por favor intenta de nuevo')
        }

    } catch (e) {
        console.log(e)
    }


}


