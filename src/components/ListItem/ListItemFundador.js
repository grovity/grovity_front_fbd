import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import './style.css'


const ListItem = ({first_name, last_name, programa_inscrito, asistencia, tareas, delAction, urlPath, username, id, id_sesion}) => {

    return (
        <tr>
            <th scope="row">{id}</th>
            <td>
                <Link id="linkTables" to={`${urlPath}${username}`}>

                    {first_name} {last_name}

                </Link>
            </td>

            <td>{programa_inscrito}</td>
            <td>{asistencia}</td>
            <td>{tareas}</td>
            <td>{delAction}</td>
        </tr>
    );
};


ListItem.propTypes = {
    editAction: PropTypes.string.isRequired,
    delAction: PropTypes.string.isRequired,
    urlPath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    dni: PropTypes.string.isRequired,
};

export default ListItem;
