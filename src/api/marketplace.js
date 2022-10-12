import {URL_BASE, URL_MARKETPLACE} from "../constants";
import getJsonStrError from "../helpers/handleJsonErrors";
import {toast} from "react-toastify";
import moment from "moment";


export const agregarDisponibilidadMentor = async ({day, mentor_id, fecha_inicio, fecha_fin}) => {
    let string_availability = []
    let horas = {"start_hour": fecha_inicio, "end_hour": fecha_fin}
    string_availability.push(horas)
    day = parseInt(day)
    try {
        const request = await fetch(`${URL_MARKETPLACE}/mentor_day`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`
            }),
            body: JSON.stringify({day, mentor_id, string_availability}),
        });

        const json = await request.json()

        if (request.status === 201) {
            toast.success('Disponibilidad agregada correctamente')
            return json

        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
        }


    } catch (err) {

    }
};

export const agregarDisponibilidadMentorDay = async ({date, mentor_id, fecha_inicio, fecha_fin}) => {
    let string_availability = []
    let horas = {"start_hour": fecha_inicio, "end_hour": fecha_fin}
    string_availability.push(horas)
    try {
        const request = await fetch(`${URL_MARKETPLACE}/mentor_date`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`
            }),
            body: JSON.stringify({date, mentor_id, string_availability}),
        });

        const json = await request.json()

        if (request.status === 201) {
            toast.success('Disponibilidad agregada correctamente')
            return json

        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
        }


    } catch (err) {

    }
};

export const editarDisponibilidadMentorDay = async ({date, mentor_id, fecha_inicio, fecha_fin}) => {
    let string_availability = []
    let horas = {"start_hour": fecha_inicio, "end_hour": fecha_fin}
    string_availability.push(horas)
    try {
        const request = await fetch(`${URL_MARKETPLACE}/mentor_date`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`
            }),
            body: JSON.stringify({date, mentor_id, string_availability}),
        });

        const json = await request.json()

        if (request.status === 200) {
            toast.success('Disponibilidad editada correctamente')
            return json

        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
        }


    } catch (err) {

    }
};

export const eliminarDisponibilidadMentorDay = async (id_mentor, date, inicio, fin) => {
    try {
        const request = await fetch(`${URL_MARKETPLACE}/mentor_date/${id_mentor}/${date}?inicio=${inicio}&fin=${fin}`, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`
            }),
        });

        if (request.status === 204) {
            toast.success('Disponibilidad eliminada correctamente')
            return true

        } else {

            toast.error('Error, por favor intenta nuevamente')
        }


    } catch (err) {
        console.log(err)
    }
};

export async function getDispoMentor(id) {
    const request = await fetch(`${URL_MARKETPLACE}/mentor_week/${id}`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        })
    });

    return await request.json();
}

export async function editDispoMentor(data, mentor_id) {
    let dataFinal = []
    for (let i = 0; i < data.length; i++) {
        let string_availability = []
        for (let j = 0; j < data[i].tags.length; j++) {
            if (data[i].tags[j][0] === ' ') {
                let fechas = data[i].tags[j].trimStart();
                let dataSplit = fechas.split(' ')
                string_availability.push({
                    start_hour: dataSplit[0],
                    end_hour: dataSplit[2]
                })
            } else {
                let dataSplit = data[i].tags[j].split(' ')
                string_availability.push({
                    start_hour: dataSplit[0],
                    end_hour: dataSplit[1]
                })
            }


        }
        dataFinal.push({
            day: data[i].key,
            mentor_id: mentor_id,
            string_availability: string_availability

        })
    }

    const request = await fetch(`${URL_MARKETPLACE}/mentor_week`, {
        method: 'PUT',
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),
        body: JSON.stringify(dataFinal),

    });

    const json = await request.json();
    if (request.status === 200) {
        toast.success("Disponibilidad editada correctamente")
        return json
    } else {
        let error = await getJsonStrError(json)
        toast.error(error)
    }
}

export async function getDispoMentorDay(date, mentor, entidad) {
    let url = `${URL_BASE}/usuario/synccalendar/sync/${mentor}/${date}`
    //let url = `http://127.0.0.1:8000/usuario/synccalendar/`
    if (entidad) {
        url = `${URL_MARKETPLACE}/entity/events/${mentor}/${date}/60`
    }
    try {
        const request = await fetch(`${URL_BASE}/usuario/synccalendar/sync/${mentor}/${date}`, {
            method: 'GET',
            headers: new Headers({})
        });
        //'Authorization': `Token ${localStorage.getItem("token")}`
        const json = await request.json();
        if (request.status === 200) {
            return json
        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
        }

        return []

    } catch (e) {
        console.log(e)
        return []
    }

}

export async function getDispoMentorSpecific(date, mentor) {
    const request = await fetch(`${URL_MARKETPLACE}/mentor/${mentor}/${date}/30`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        })
    });
    const json = await request.json();
    return json
}

export async function getMentorsMarketPlace(next) {
    let url = `${URL_BASE}/marketplace/mentores`
    if (next && next !== 1) {
        url = `${URL_BASE}/marketplace/mentores?page=${next}`
    }
    const request = await fetch(url, {
        method: 'GET',
        headers: new Headers({})
    });
    const json = await request.json()

    if (json) {
        return json
    }
    return []

}


export async function getMentorsSearch(skills, type, sort, rating, price) {
    let search = ''
    if (skills && skills.length !== 0) {
        for (let i = 0; i < skills.length; i++) {
            if (i !== skills.length - 1) {
                search += `skill=${skills[i]}&`
            } else {
                if ((sort && sort.length !== 0) || (rating && rating.length !== 0) || (price && price.length !== 0)) {
                    search += `skill=${skills[i]}&`
                } else {
                    search += `skill=${skills[i]}`
                }

            }
        }
    }
    if ((sort && sort.length !== 0) && ((rating && rating.length !== 0) || (price && price.length !== 0))) {
        search += `sort=${sort}&`
    } else if (sort && sort.length !== 0 && (rating && rating.length === 0) && (price && price.length === 0)) {
        search += `sort=${sort}`
    }

    if ((rating && rating.length !== 0) && (price && price.length !== 0)) {
        search += `rating=${rating}&`
    } else if (rating && rating.length !== 0 && (price && price.length === 0)) {
        search += `rating=${rating}`
    }

    if (price && price.length !== 0) {
        search += `price=${price}`
    }

    const request = await fetch(`${URL_BASE}/marketplace/mentores?${search}`, {
        method: 'GET',
        headers: new Headers({})
    });

    return await request.json();
}


export async function getMentorsSort(value) {
    let search = `sort=${value}`
    const request = await fetch(`${URL_BASE}/marketplace/mentores?${search}`, {
        method: 'GET',
        headers: new Headers({})
    });

    return await request.json();
}

export const createEventFromUser = async ({
                                              date,
                                              mentor_id,
                                              nombre,
                                              fecha_inicio,
                                              fecha_fin,
                                              usuario_individual,
                                              precio,
                                              tags,
                                              observaciones, cupon
                                          }) => async dispatch => {
    let usuario = parseInt(usuario_individual)
    let mentor = parseInt(mentor_id)
    try {
        const request = await fetch(`${URL_MARKETPLACE}/events`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`
            }),
            body: JSON.stringify({date, fecha_inicio, fecha_fin, precio, mentor, usuario, nombre, tags, observaciones, cupon}),
        });

        const json = await request.json()
        if (request.status === 201) {
            toast.success('Sesión creada correctamente')
            return json
        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
        }


    } catch (err) {

    }
};

export const createEventFromUserNormal = async ({
                                                    date,
                                                    mentor_id,
                                                    nombre,
                                                    fecha_inicio,
                                                    fecha_fin,
                                                    mentoria
                                                }) => async dispatch => {
    let mentor = parseInt(mentor_id)
    mentoria = parseInt(mentoria)
    date = moment(date).format('YYYY-MM-DD').split(' ')[0]
    fecha_inicio = date + ' ' + fecha_inicio
    fecha_inicio = moment(fecha_inicio).format('YYYY-MM-DD HH:mm')
    fecha_fin = date + ' ' + fecha_fin
    fecha_fin = moment(fecha_fin).format('YYYY-MM-DD HH:mm')
    try {
        const request = await fetch(`${URL_MARKETPLACE}/entity/events`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`
            }),
            body: JSON.stringify({date, fecha_inicio, fecha_fin, nombre, mentoria, mentor}),
        });

        const json = await request.json()
        if (request.status === 201) {
            toast.success('Sesión creada correctamente')
            return json
        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
        }

    } catch (err) {
        console.log(err)
    }
};

export const editEventFromUserNormal = async ({
                                                  date,
                                                  mentor_id,
                                                  nombre,
                                                  fecha_inicio,
                                                  fecha_fin,
                                                  mentoria,
                                                  usuario_individual
                                              }, slug) => async dispatch => {
    let mentor = parseInt(mentor_id)
    mentoria = parseInt(mentoria)
    date = moment(date).format('YYYY-MM-DD').split(' ')[0]

    fecha_inicio = date + ' ' + fecha_inicio
    fecha_inicio = moment(fecha_inicio).format('YYYY-MM-DD HH:mm')


    fecha_fin = date + ' ' + fecha_fin
    fecha_fin = moment(fecha_fin).format('YYYY-MM-DD HH:mm')


    try {
        const request = await fetch(`${URL_MARKETPLACE}/entity/events/${slug}`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`
            }),
            body: JSON.stringify({date, fecha_inicio, fecha_fin, nombre, mentoria, mentor, usuario_individual}),
        });

        const json = await request.json()
        if (request.status === 200) {
            toast.success('Sesión editada correctamente')
            return json
        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
        }


    } catch (err) {

    }
};


export const editEventFromUser = async ({
                                            date,
                                            mentor_id,
                                            nombre,
                                            fecha_inicio,
                                            fecha_fin,
                                            usuario
                                        }, event) => async dispatch => {
    let date2 = fecha_inicio.split(' ')
    if (date2.length > 1) {
        date = date2[0]
    }
    let mentor = parseInt(mentor_id)

    try {
        const request = await fetch(`${URL_MARKETPLACE}/events/${event}`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`
            }),
            body: JSON.stringify({date, mentor, nombre, fecha_fin, fecha_inicio, usuario}),
        });

        const json = await request.json()
        if (request.status === 200) {
            toast.success('Sesión editada correctamente')
            return json
        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
        }


    } catch (err) {

    }
};

export async function getEventsMarketPlace(date) {
    const request = await fetch(`${URL_BASE}/marketplace/evento/`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        })
    });

    return await request.json();
}
