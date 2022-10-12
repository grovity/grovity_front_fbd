import {URL_BASE} from "../constants";
import {toast} from "react-toastify";
import {loadUser} from "../actions/auth";
import getJsonStrError from "../helpers/handleJsonErrors";

export async function getProgramsbyUser(username) {
    const request = await fetch(`${URL_BASE}/programa/usuario/${username}`, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),
        method: 'GET'
    });

    const json = await request.json();

    return json
}

export async function getEventsbyUser() {
    const request = await fetch(`${URL_BASE}/calendario/evento/emprendedor`, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),

        method: 'GET'
    });

    const json = await request.json();
    const marketplace = await fetch(`${URL_BASE}/marketplace/evento/?semana=true`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        })
    })

    const json2 = await marketplace.json();
    const events_total = [...json, ...json2]
    return events_total
}

export async function getTotalEventsUser() {
    try {
        const calendar = await fetch(`${URL_BASE}/calendario/`, {
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`
            }),
            method: 'GET'
        });
        const events = await calendar.json();

        const request = await fetch(`${URL_BASE}/marketplace/evento/`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`
            })
        });

        const events_market = await request.json()
        const events_total = [...events, ...events_market]

        return events_total
    } catch (e) {
        toast.error("Error al traer los eventos")
    }

}

export async function getUserbyEvent(id) {
    const request = await fetch(`${URL_BASE}/calendario/evento/${id}/asistencia`, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),

        method: 'GET'
    });

    const json = await request.json();

    return json
}

export async function getIndicadoresSectores() {
    const request = await fetch(`${URL_BASE}/company/sectors/`, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),

        method: 'GET'
    });

    const json = await request.json();

    return json
}

export async function getEmpresaEmprendedor(id) {
    const request = await fetch(`${URL_BASE}/company/company/${id}/`, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),

        method: 'GET'
    });

    const json = await request.json();

    return json
}

export async function getEmpresaEmprendedorEdit() {
    const request = await fetch(`${URL_BASE}/empresa/info`, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),

        method: 'GET'
    });

    const json = await request.json();

    return json
}

export async function getEmpresaEmprendedorbyUsername(username) {
    const request = await fetch(`${URL_BASE}/empresa/${username}`, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),

        method: 'GET'
    });

    const json = await request.json();

    return json
}


/*
export async function PostAsitenciayTareas(setAlert, loading, onBack, array, array_tarea, id) {
    const request = await fetch(`${URL_BASE}/calendario/evento/${id}/asistencia/emprendedor`, {
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            }),
            method: 'PUT',
            body: JSON.stringify({'asistente': array, 'tarea': array_tarea}),
        })
            .then(function (r) {
                if (r.status === 200){
                     setAlert("Asistencia enviada correctamente", "success")
                 }
                const json = r.json
            })
            .then(r => r)
}
*/

export const createEmpresaEmprendedor = ({name, n_employees, sector, goal}, image, creator) => async dispatch => {
    try {
        var data = new FormData()
        if (image) {
            data.append('image', image)
        }
        data.append('name', name)
        data.append('n_employees', n_employees)
        data.append('sector', sector)
        data.append('goal', goal)
        data.append('creator', creator)
        let request = await fetch(`${URL_BASE}/company/company/`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Token ${localStorage.getItem("token")}`,
                }),
                body: data,

            }
        );
        const json = await request.json();
        if (request.status === 201) {
            toast.success("Empresa creada correctamente", "success")
            return json
        } else {
           const error = await getJsonStrError(json)
            toast.error(error)
        }

    } catch (e) {
        console.log(e)
    }


}

export const editEmpresaEmprendedor2 = ({name, n_employees, sector, goal}, image, id_empresa) => async dispatch => {
    try {
        var data = new FormData()
        if (image) {
            data.append('image', image)
        }
        data.append('name', name)
        data.append('n_employees', n_employees)
        data.append('sector', sector)
        data.append('goal', goal)
        let request = await fetch(`${URL_BASE}/company/company/${id_empresa}/`, {
                method: 'PUT',
                headers: new Headers({
                    'Authorization': `Token ${localStorage.getItem("token")}`,
                }),
                body: data,

            }
        );
        const json = await request.json();
        if (request.status === 200) {
            toast.success("Empresa editada correctamente", "success")
            return json
        } else {
           const error = await getJsonStrError(json)
            toast.error(error)
        }

    } catch (e) {
        console.log(e)
    }


}

export const editEmpresaEmprendedor = ({nombre, n_empleados, meta, sector, indicador, equipo}, id) => async dispatch => {
    let request = await fetch(`${URL_BASE}/empresa/${id}`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({nombre, n_empleados, meta, sector, indicador, equipo}),

        }
    );
    const json = await request.json();
    if (request.status === 200) {
        toast.success("Te hemos enviado un email con el estado actual de tu equipo")
        dispatch(loadUser())
        return json
    } else {
        if (request.status !== 500) {
            if (typeof (json[Object.keys(json)[0]]) === 'string') {
                toast.error(json[Object.keys(json)[0]])
            } else {
                let llave = Object.keys(json)[0]
                toast.error(llave + ": " + String(json[Object.keys(json)[0]]))
            }
        } else {
            toast.error("Error al editar la empresa, por favor intente nuevamente")
        }
    }

}

export const editEmpresaEmprendedorIndicador = (valor, fecha_dato, id_punto) => async dispatch => {

    let request = await fetch(`${URL_BASE}/empresa/actualizar/valor/${id_punto}`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({valor, fecha_dato}),

        }
    );
    const json = await request.json();

    if (request.status === 200) {
        toast.success("Valor actualizado correctamente", "success")
    } else {
        if (request.status !== 500) {
            toast.error(json[Object.keys(json)[0]])
        } else {
            toast.error('Error al editar el valor, por favor intente nuevamente', 'danger')
        }
    }
    return json
}


export const enviarDatoIndicador = async (valor, fecha_dato, id) => {
        try {
            if (id) {
                const request = await fetch(`${URL_BASE}/empresa/mentor/${id}/actualizar `, {
                    method: 'PUT',
                    headers: new Headers({
                        'Authorization': `Token ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({valor, fecha_dato}),
                });
                const json = await request.json();

                if (request.status === 200) {
                    toast.success("Dato enviado correctamente")
                    return json
                } else {
                    toast.error("Error al enviar el dato, por favor intente nuevamente")
                }

            } else {
                toast.error("Error al enviar el dato, por favor intente nuevamente")

            }

        } catch (err) {
            toast.error("Error al enviar el dato, asegurese que todos los campos esten completos y por favor intente nuevamente")
        }

    }
;

export async function getPaises() {
    const request = await fetch('https://restcountries.eu/rest/v2/all?fields=name', {
        method: 'GET'
    });

    const json = await request.json();

    return json
}





