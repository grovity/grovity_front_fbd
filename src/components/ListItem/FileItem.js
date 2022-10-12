import PropTypes from 'prop-types';
import React from 'react';
import './style.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {URL_BASE} from "../../constants";
import {toast} from "react-toastify";



const onDelete = (id, tipo) => {
    return function f() {
        let url = `${URL_BASE}/archivos/evento/${id}/`;

        if (tipo === 'url') {
            url = `${URL_BASE}/urls/evento/${id}/`;
        }

        fetch(url, {
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            method: 'DELETE',
            body: JSON.stringify({
                'activo': false
            })
        })
            .then(function (r) {
                if (r.status === 204) {
                    toast.success(`${tipo} eliminado correctamente`)
                    let reload = () => {
                        window.location.reload()
                    }
                    setTimeout(reload, 3000)

                } else {
                    toast.error(`Error al eliminar el ${tipo}`)
                }

            })
    }

}

const FileItem = ({id, file, name, user, type, tipo}) => {
    return (
        <tr>
            <td>
                {name}
            </td>
            <td>
                <a href={file} target='_blank'>{type}</a>
            </td>
            <td>
                <div onClick={onDelete(id, tipo)}>
                    {user}
                    {
                        <FontAwesomeIcon title={`Eliminar ${tipo}`} className={'ml-2'} icon={faTrash}/>

                    }

                </div>


            </td>

        </tr>
    );
};

FileItem.propTypes = {
    editAction: PropTypes.string.isRequired,
    delAction: PropTypes.string.isRequired,
    urlPath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    dni: PropTypes.string.isRequired,
};

export default FileItem
