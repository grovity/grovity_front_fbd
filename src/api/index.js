import {URL_BASE, URL_BASE_GOLANG, USER_LOADED} from "../constants";
import {loadUser} from "../actions/auth";
import {setAlert} from "../actions/alert";
import {fetchUsersbyEvent} from "../actions/fetchUsers";
import {fetchEventsbyId} from "../actions/fetchEvents";
import {toast} from "react-toastify";
import getJsonStrError from "../helpers/handleJsonErrors";
import {URL_MARKETPLACE} from "./marketplace";
import moment from "moment";

const url_calificacion = `${URL_BASE}/usuario/calificacion`;
const url_mentorias_mentor = `${URL_BASE}/programa/mentor`;
export const url_entidad = `${URL_BASE}/entidad`;
const url_program = `${URL_BASE}/programa`;
const url_user = `${URL_BASE}/usuario/`;
const url = `${URL_BASE}/usuario/`;
const url_eventos = `${URL_BASE}/calendario/evento`

export async function getUser() {
    const request = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        })
    });

    return await request.json();
}

export async function getFilesbyEvent(id) {
    let request = await fetch(`${URL_BASE}/archivos/evento/${id}`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        })
    });

    let archivos = await request.json();

    request = await fetch(`${URL_BASE}/urls/evento/${id}`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        })
    });

    let urls = await request.json()

    return {
        'archivos': archivos,
        'urls': urls,
    };
}

export async function getFilesbyUser(username, status, username2) {
    let url_files = `${URL_BASE}/archivos/usuario/`;
    let url_urls = `${URL_BASE}/urls/usuario/`;

    if (username !== username2) {
        url_files = `${URL_BASE}/archivos/mentor/usuario/${username}`
        url_urls = `${URL_BASE}/urls/mentor/usuario/${username}`
    }

    let request = await fetch(url_files, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        })
    });

    let archivos = await request.json();

    request = await fetch(url_urls, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        })
    });

    let urls = await request.json();

    return {
        'archivos': archivos,
        'urls': urls,
    };
}

export async function getFilesEventsAll(username) {
    let request = await fetch(`${URL_BASE}/archivos/evento/usuario/${username}`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        })
    });

    let archivos = await request.json();

    request = await fetch(`${URL_BASE}/urls/evento/usuario/${username}`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        })
    });

    let urls = await request.json()

    return {
        'archivos': archivos,
        'urls': urls,
    };
}


export async function getUserbyId(username) {
    const request = await fetch(`${url_user}${username}`, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),

        method: 'GET'
    });
    const json = await request.json()

    return json
}

export async function getProgram(id) {
    const request = await fetch(`${url_program}/${id}`, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),
        method: 'GET'
    });

    return await request.json()
}

export async function getProgramsEntidad(id) {
    const request = await fetch(`${URL_BASE}/programa/entidad/${id}`, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),
        method: 'GET'
    });

    return await request.json()
}


export async function getEventbyId(id, bool) {
    let url = `${URL_BASE}/calendario/evento/${id}`
    if (bool) {
        url = `${URL_BASE}/marketplace/evento/${id}/`
    }
    const request = await fetch(url, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),
        method: 'GET'
    });

    return await request.json()
}

export async function getUserbyEntidad(id, next) {
    let url = `${url_entidad}/${id}/emprendedor/`
    if (next && next !== 1) {
        url = `${url_entidad}/${id}/emprendedor/?page=${next}`
    }
    const request = await fetch(url, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),
        method: 'GET'
    });

    const json = await request.json()
    return json
}

export async function getUserFuncbyEntidad(id, next) {
    const request = await fetch(`${url_entidad}/${id}/funcionario/emprendedor`, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),
        method: 'GET'
    });

    const json = await request.json()
    return json
}

export async function getFuncionariobyEntidad(id, next) {
    let url = `${url_entidad}/${id}/funcionario/`
    if (next && next !== 1) {
        url = `${url_entidad}/${id}/funcionario/?page=${next}`
    }
    const request = await fetch(`${url_entidad}/${id}/funcionario/`, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),
        method: 'GET'
    });

    const json = await request.json()
    return json
}

export async function getEmprendedoresMentor() {
    try {
        const request = await fetch(`${URL_BASE}/usuario/mentor/emprendedores`, {
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`
            }),
            method: 'GET'
        });

        const json = await request.json()

        const request_market = await fetch(`${URL_BASE}/marketplace/mentor/emprendedores`, {
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`
            }),
            method: 'GET'
        });

        const json_market = await request_market.json()
        if (request_market.status === 200 && json_market.length > 0) {
            const json_total = [...json, ...json_market]
            return json_total
        } else {
            return json
        }

    } catch (e) {

    }

}


export async function getEmprendedoresProgram(id_entidad, id_program) {
    const request = await fetch(`${URL_BASE}/usuario/entidad/${id_entidad}/${id_program}`, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),
        method: 'GET'
    });
    const json = await request.json()
    if (request.status === 200) {
        return json
    }

    return []
}

export async function getUsersPrograma(id_program) {

    const request = await fetch(`${URL_BASE}/programa/${id_program}/emprendedores`, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),
        method: 'GET'
    });

    const json = await request.json()
    return json
}

export async function getMentors(id, next) {
    let url = `${url_entidad}/${id}/mentor/`
    if (next && next !== 1) {
        url = `${url_entidad}/${id}/mentor/?page=${next}`
    }
    const request = await fetch(url, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),
        method: 'GET'
    });
    const json = await request.json()
    if (json) {
        return json
    }
    return []

}


export async function getMentorsbyEntidad(id) {
    try {
        const request = await fetch(`${url_entidad}/${id}/mentores/`, {
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`
            }),
            method: 'GET'
        });
        const json = await request.json()
        if (request.status === 200) {
            return json
        }

        return []


    } catch (err) {
        return []
    }

}


export async function getEmprendedores(id) {
    const request = await fetch(`${url_entidad}/${id}/emprendedor/`, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),
        method: 'GET'
    });
    const json = await request.json()
    if (json) {
        return json
    }
    return []

}

export async function getMentorsbymentorship(id) {
    const request = await fetch(`${URL_BASE}/entidad/mentor/mentoria/${id}`, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),
        method: 'GET'
    });
    const json = await request.json()
    return json
}

export async function getMentorsByProgram(id) {
    const request = await fetch(`${URL_BASE}/programa/mentores/${id}`, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),
        method: 'GET'
    });
    const json = await request.json()
    return json
}


export async function getEntities(id) {
    const request = await fetch(`${url_entidad}/`, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),
        method: 'GET'
    });

    return await request.json()
}

export async function getMentorshipsbyProgram(id) {
    const request = await fetch(`${url_program}/${id}/mentoria`, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),

        method: 'GET'
    });

    const json = await request.json();

    return json
}

export async function getEventsbyMentorships(id) {
    const request = await fetch(`${url_eventos}/mentoria/${id}`, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),

        method: 'GET'
    });

    const json = await request.json();
    return json
}

export async function getEventsbyMentor(id, status) {
    const request = await fetch(`${url_eventos}/mentor/${id}`, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),

        method: 'GET'
    });

    const json = await request.json();
    if (Array.isArray(json)) {
        json.map(c => {
                c.start = c['fecha_inicio']
                c.end = c['fecha_fin']
                c.text = c['nombre']
            }
        )
    }

    const marketplace = await fetch(`${URL_BASE}/marketplace/evento/?semana=true`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        })
    })

    const json2 = await marketplace.json();
    if (Array.isArray(json) && Array.isArray(json2)) {
        const events_total = [...json, ...json2]
        return events_total
    }
    return []


}


export async function getCalificacionMentor(username) {
    const request = await fetch(`${url_calificacion}/${username}`, {
        method: 'GET'
    });

    const json = await request.json();
    return json
}

export async function getMentoriasMentor(username) {
    const request = await fetch(`${url_mentorias_mentor}/${username}`, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),

        method: 'GET'
    });

    return await request.json()
}

export async function getMentoriasbyMentor() {
    const request = await fetch(`${url_eventos}/mentoria/mentor`, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),

        method: 'GET'
    });

    return await request.json()
}


export const editUser = ({
                             first_name, last_name,
                             email, password,
                             telefono,
                             descripcion,
                             img_usuario, reside, titulo,
                             linkedin, twitter, instagram, skills,
                             precio
                         }, username, setAlert, avatarFile) => async dispatch => {
    try {
        if (skills && skills[0] && skills[0].tag.name) {
            let skills_format = []
            if (Array.isArray(skills)) {
                skills.map(skill =>
                    skill.tag.id ?
                        skills_format.push({
                            description: skill.description,
                            tag: skill.tag.id,
                            name: skill.tag.name,
                        }) :
                        skills_format.push({
                            description: skill.description,
                            tag: skill.tag,
                            name: skill.name,
                        })
                )
            }
            skills = skills_format
        }
        var data = new FormData()
        if (avatarFile) {
            data.append('img_usuario', avatarFile)
        }
        data.append('first_name', first_name)
        if (email) {
            data.append('email', email)
        }
        data.append('last_name', last_name)
        data.append('password', password)
        if (telefono) {
            data.append('telefono', telefono)
        }
        data.append('descripcion', descripcion)
        data.append('reside', reside)
        data.append('titulo', titulo)
        data.append('linkedin', linkedin)
        if (instagram) {
            data.append('instagram', instagram)
        }
        if (twitter) {
            data.append('twitter', twitter)
        }
        // data.append('skills', JSON.stringify(skills))
        if (skills) {
            skills.map(c =>
                data.append('skills', JSON.stringify(c))
            )
        }
        data.append('precio', precio)

        const request = await fetch(`${URL_BASE}/usuario/actualizar/${username}`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }),
            body: data
        });
        const json = await request.json();
        if (request.status === 200) {
            setAlert("Usuario editado correctamente", 'success')
            dispatch(loadUser());
            return json
        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
            return;
        }

    } catch (err) {

    }
};

export const editInstitution = ({
                                    razon_social,
                                    direccion,
                                    nit,
                                    descripcion,
                                    emprendedor_tipo,
                                    mentor_tipo
                                }, id, file, secure_emails) => async dispatch => {

    try {
        var data = new FormData()
        if (file) {
            data.append('logo', file)
        }
        data.append('razon_social', razon_social)
        data.append('direccion', direccion)
        data.append('nit', nit)
        data.append('descripcion', descripcion)
        data.append('emprendedor_tipo', emprendedor_tipo)
        data.append('mentor_tipo', mentor_tipo)
        data.append('secure_emails', secure_emails)
        const request = await fetch(`${URL_BASE}/entidad/editar/${id}`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }),
            body: data,
        });
        const json = await request.json();
        if (request.status === 200) {
            toast.success("La entidad ha sido editada correctamente")
            dispatch(loadUser());
            return true
        } else {
            let error = await getJsonStrError(json)
            toast.error(error)

        }

    } catch (err) {

    }
};

export const inviteMentor = ({mentor, first_name, last_name}) => async dispatch => {
    try {
        const request = await fetch(`${URL_BASE}/entidad/mentor/agregar`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({mentor, first_name, last_name}),
        });
        const json = await request.json()
        if (request.status === 200) {
            toast.success("Usuario creado correctamente: Se ha enviado un correo electrónico al invitado para que complete su perfil")
            return json
        } else {
            toast.error("Error al enviar la invitación, por favor intente nuevamente")
        }

    } catch (err) {
        console.log(err)
    }
};

export const inviteMentorFile = ({file_mentors}) => async dispatch => {
    try {
        var data = new FormData()
        data.append('file_users', file_mentors.file)
        const request = await fetch(`${URL_BASE}/entidad/usuario/agregar/mentor`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }),
            body: data,
        });

        if (request.status === 200) {
            toast.success("Te enviaremos un correo con el status de invitaciones")
            return true
        } else {
            toast.error("Error al enviar las invitaciones, por favor intente nuevamente")
        }


    } catch (err) {

    }
};

export const editProgram = ({
                                nombre, funcionario,
                                emprendedor, descripcion
                            }, id, img_programa) => async dispatch => {

    try {
        var data = new FormData()
        if (img_programa) {
            data.append('img_programa', img_programa)
        }
        data.append('nombre', nombre)
        data.append('descripcion', descripcion)
        if (funcionario) {
            funcionario.map(c =>
                data.append('funcionario', JSON.stringify(c))
            )
        }
        if (emprendedor) {
            emprendedor.map(c =>
                data.append('emprendedor', JSON.stringify(c))
            )
        }
        const request = await fetch(`${URL_BASE}/programa/actualizar/${id}`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }),
            body: data,
        });

        const json = await request.json();
        if (request.status === 200) {
            toast.success("El programa ha sido editado exitosamente")
            return true
        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
        }

        dispatch({
            type: USER_LOADED,
            payload: json
        });
    } catch (err) {

    }
};

export const editMentorship = ({
                                   nombre,
                                   descripcion,
                                   mentor,
                                   tipo
                               }, id) => async dispatch => {
    try {
        const request = await fetch(`${URL_BASE}/programa/actualizar/mentoria/${id}`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({nombre, descripcion, mentor, tipo}),
        });
        const json = await request.json();
        if (request.status === 200) {
            toast.success("La herramienta ha sido editado exitosamente")
            return json
        } else {
            toast.error("Error al crear la herramienta, por favor intente nuevamente")
        }

    } catch (err) {
        console.log(err)
    }
};


export const createProgram = ({nombre, funcionario, emprendedor, descripcion}, img_programa) => async dispatch => {
    try {
        var data = new FormData()
        if (img_programa !== undefined) {
            data.append('img_programa', img_programa)
        }
        data.append('nombre', nombre)

        data.append('descripcion', descripcion)
        if (funcionario) {
            funcionario.map(c =>
                data.append('funcionario', JSON.stringify(c))
            )
        }
        if (emprendedor) {
            emprendedor.map(c =>
                data.append('emprendedor', JSON.stringify(c))
            )
        }
        const request = await fetch(`${URL_BASE}/programa/crear`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }),
            body: data
        });
        const json = await request.json();

        if (request.status === 201) {
            toast.success("El programa ha sido creado exitosamente")
            return true
        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
        }
    } catch (err) {
        console.log(err)
    }
};

export const deleteProgram = async (id) => async dispatch => {
    try {
        const request = await fetch(`${URL_BASE}/programa/eliminar/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),

        });
        if (request.status === 204) {
            toast.success('Programa eliminado correctamente')
            return true
        } else {

            toast.error('Error, por favor intenta nuevamente')
        }


    } catch (err) {
        console.log(err)
    }
};


export const deleteMentorship = async (id) => async dispatch => {

    try {
        const request = await fetch(`${URL_BASE}/programa/eliminar/mentoria/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),

        });
        if (request.status === 204) {
            toast.success('Mentoría eliminada correctamente')
            return true
        } else {

            toast.error('Error, por favor intenta nuevamente')
        }


    } catch (err) {
        console.log(err)
    }
};


export const createMentorship = ({
                                     nombre,
                                     mentor,
                                     descripcion,
                                     tipo
                                 }, id) => async dispatch => {
    try {
        const request = await fetch(`${URL_BASE}/programa/crear/mentoria/${id}`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({nombre, mentor, descripcion, tipo}),
        });
        const json = await request.json();
        if (request.status === 201) {
            toast.success("Herramienta creada exitosamente")
            return json
        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
        }

    } catch (err) {
        console.log(err)
    }
};

export const createEvent = ({
                                nombre, mentor, tipo,
                                tema, asistentes_max,
                                usuario_individual, sub_grupo, mentores,fecha_inicio, fecha_fin,
                            }, mentoria) => async dispatch => {
     fecha_inicio = moment(fecha_inicio).format('YYYY-MM-DD HH:mm')
    fecha_fin = moment(fecha_fin).format('YYYY-MM-DD HH:mm')
    try {
        mentoria = parseInt(mentoria)
        usuario_individual = parseInt(usuario_individual)
        mentor = parseInt(mentor)

        const request = await fetch(`${URL_BASE_GOLANG}/zoom_master/event`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                nombre,
                mentor,
                fecha_inicio,
                fecha_fin,
                mentoria,
                tipo,
                tema: 'Consultoría',
                asistentes_max,
                usuario_individual,
                sub_grupo,
                mentores,
            }),
        });
        const json = await request.json();
        if (request.status === 201) {
            toast.success('Evento creado exitosamente')
            return json
        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
            return json
        }

    } catch (err) {
        console.log(err)
    }
};


export const editEvent = ({
                              nombre, mentor, fecha_inicio, fecha_fin, tipo, tema,
                              asistentes_max, sub_grupo, usuario_individual, mentores, mentoria
                          }, slug, id, getJsonStrError, cuenta_zoom) => async dispatch => {

    fecha_inicio = moment(fecha_inicio).format('YYYY-MM-DD HH:mm')
    fecha_fin = moment(fecha_fin).format('YYYY-MM-DD HH:mm')
    try {
        usuario_individual = parseInt(usuario_individual)
        const request = await fetch(`${URL_BASE_GOLANG}/zoom_master/event/${slug}`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),

            body: JSON.stringify({
                nombre,
                mentor,
                fecha_inicio,
                fecha_fin,
                tipo,
                tema,
                asistentes_max,
                sub_grupo,
                usuario_individual, mentores,
                mentoria,
                cuenta_zoom
            }),

        });
        const json = await request.json();
        if (request.status === 200) {
            dispatch(setAlert('Evento editado exitosamente', 'success'))
            dispatch(fetchEventsbyId(slug))
            return json
        } else {
            let error = await getJsonStrError(json)
            toast.error(error)
            return json
        }
        dispatch({
            type: USER_LOADED,
            payload: json
        });
    } catch (err) {

    }
};


export const inviteEmprendedor = ({emprendedor, first_name, last_name}) => async dispatch => {
    try {
        const request = await fetch(`${URL_BASE}/entidad/emprendedor/agregar`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({emprendedor, first_name, last_name}),
        });
        const json = await request.json();
        if (request.status === 200) {
            toast.success("Participante creado correctamente: Se ha enviado un correo electrónico al invitado para que complete su perfil")
            return json
        } else {
            toast.error("Error al enviar la invitación al perticioante, por favor intente nuevamente")
        }
    } catch (err) {
        console.log(err)
    }
};
export const inviteEmprendedorFile = ({file_emprendedores}) => async dispatch => {
    try {
        var data = new FormData()
        data.append('file_users', file_emprendedores[0])
        const request = await fetch(`${url_entidad}/usuario/agregar/emprendedor`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }),
            body: data,
        });

        if (request.status === 200) {
            toast.success("Te enviaremos un correo electrónico con el status de tus envíos")
            return true
        } else {
            toast.error("Error al enviar las invitaciones, por favor intente nuevamente", 'error')
        }

    } catch (err) {

    }
};

export const inviteFuncionarioFile = ({file_funcionario}, id, loadUser, setAlert) => async dispatch => {
    try {
        const file = document.querySelector("input[type='file']").files[0]
        var data = new FormData()
        data.append('file_users', file, file_funcionario)
        const request = await fetch(`${url_entidad}/usuario/agregar/funcionario`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }),
            body: data,
        });

        if (request.status === 200) {
            setAlert("Usuarios creados correctamente: Se ha enviado un correo electrónico a los invitados para que completen su perfil", 'success')
        } else {
            setAlert("Error al enviar la invitación a los usuarios, por favor intente nuevamente", 'error')
        }
        loadUser();


    } catch (err) {

    }
};


export const inviteFuncionario = ({funcionario, first_name, last_name}) => async dispatch => {
    try {
        const request = await fetch(`${URL_BASE}/entidad/funcionario/agregar`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({funcionario, first_name, last_name}),
        });
        const json = await request.json();
        if (request.status === 200) {
            toast.success("Usuario creado correctamente: Se ha enviado un correo electrónico al invitado para que complete su perfil")
            return json
        } else {
            toast.error("Error al invitar al usuari, por favor intente nuevamente")
        }

    } catch (err) {
        console.log(err)
    }
};

export const zoom_cuentas = () => async dispatch => {
    try {
        const request = await fetch(`${URL_BASE}/zoom/`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`
            })
        });

        const json = await request.json();
        return json
    } catch (err) {

    }
}

export const tipos_usuarios = () => async dispatch => {
    try {
        const request = await fetch(`${URL_BASE}/entidad/mentor/emprendedor`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`
            })
        });
        const json = await request.json();
        return json
    } catch (err) {

    }
}

export const getTags = async () => {
    try {
        const request = await fetch(`${URL_BASE}/usuario/tags`, {
            method: 'GET',
        });
        let json = await request.json();

        function compare(a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        }

        json = json.sort(compare);
        return json
    } catch (err) {

    }
}

export const soporte = ({solicitud, archivo}, id, setAlert) => async dispatch => {
    try {
        const imagen = document.querySelector("input[type='file']").files[0]
        var data = new FormData()
        if (imagen !== undefined) {
            data.append('archivo', imagen, archivo)
        }
        data.append('solicitud', solicitud)
        const request = await fetch(`${URL_BASE}/soporte/crear`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }),
            body: data,
        });
        const json = await request.json();
        if (request.status === 200) {
            setAlert("Ticket enviado correctamente, pronto nos comunicaremos con usted", 'success')
        }
        return json
    } catch (err) {

    }
};

export const sendAsistencia = (asistente, file, id) => async dispatch => {
    let acta = undefined
    if (file) {
        acta = document.querySelector("input[type='file']").files[0]
    }
    var data = new FormData()
    if (acta !== undefined) {
        data.append('acta', acta, file)
    }
    if (asistente) {
        asistente.map(c =>
            c !== "" && (data.append('asistente', JSON.stringify(c)))
        )
    } else {
        data.append('asistente', JSON.stringify([]))
    }
    // if (array_tarea) {
    //     array_tarea.map(c =>
    //         data.append('tarea', JSON.stringify(c))
    //     )
    // } else {
    //     data.append('tarea', JSON.stringify([]))
    // }
    const request = await fetch(`${URL_BASE}/calendario/evento/${id}/asistencia/emprendedor`, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`,
        }),
        method: 'PUT',
        body: data,
    })
    const json = await request.json();
    if (request.status / 100 === 2) {
        dispatch(setAlert("Se ha enviado correctamente la asistencia", "success"))
        await fetchUsersbyEvent(id)

    } else {
        let error = await getJsonStrError(json)
        toast.error(error)
        return json
    }
    return json
}

export const EnviarDatoDesdeMentor = async (key, row) => {
    let fecha_dato = ''
    let valor = ''
    if (row && row.dato && row.fecha) {
        fecha_dato = row.fecha
        valor = row.dato
    }
    try {
        const request = await fetch(`${URL_BASE}/empresa/mentor/${key}/actualizar `, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({fecha_dato, valor}),
        });
        const json = await request.json();
        if (request.status === 200) {
            toast.success("Dato enviado correctamente")
        } else {
            let error = getJsonStrError(json)
            toast.error(error)
        }
    } catch (err) {
        console.log(err)
    }
}

export const EnviarDatoDesdeEmprendedor = async (key, row) => {
    const {linea_base, meta, eje_x, eje_y} = row
    try {
        const request = await fetch(`${URL_BASE}/empresa/emprendedor/${key}/actualizar `, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({linea_base, meta, eje_x, eje_y}),
        });
        const json = await request.json();
        if (request.status === 200) {
            toast.success("Información enviada correctamente")
        } else {
            let error = getJsonStrError(json)
            toast.error(error)
        }

    } catch (err) {
        console.log(err)
    }
}

export const cambioConfirmacionPassword = async (formData) => {
    try {
        const request = await fetch(`${URL_BASE}/usuario/confirmar_cambiar_pwd`, {
            body: JSON.stringify(formData),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'PUT'
        })
        if (request.status === 204) {
            toast.success("Contraseña actualizada correctamente, dirígete a la sección de login")
            localStorage.removeItem('confirmar');
            return true
        } else {
            const json = await request.json();
            let error = getJsonStrError(json)
            toast.error(error)
        }


    } catch (e) {

    }
}

export const cambioPassword = async (formData) => {
    try {
        const request = await fetch(`${URL_BASE}/usuario/cambiar_pwd`, {
            body: JSON.stringify(formData),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'POST'
        })

        if (request.status === 201) {
            toast.success("Por favor consulta tu correo electrónico")
            localStorage.setItem('confirmar', '1');
            return true
        } else {
            const json = await request.json();
            let error = getJsonStrError(json)
            toast.error(error)
        }
    } catch (e) {

    }
}

export const cambioPassword2 = ({password2, new_password}) => async dispatch => {
    const password = password2
    try {
        const request = await fetch(`${URL_BASE}/usuario/password`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({password, new_password}),
        });
        const json = await request.json();
        if (request.status === 200) {
            toast.success('Contraseña actualizada correctamente')
            return true

        } else {
            let error = getJsonStrError(json)
            toast.error(error)
            return
        }
    } catch (err) {

    }
};