import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import './style.css'
import Checkbox from "../Checkbox/Checkbox";
import Checkbox_tarea from "../Checkbox/Checkbox_tarea";


const ListItem = ({first_name, last_name, email, asistencia, urlPath, username, id, id_sesion}) => {

    return (
        <tr>
            <td>
                <Link id="linkTables" to={`${urlPath}${username}`}>

                    {first_name ? first_name : email } {last_name ? last_name: ''}

                </Link>
            </td>

            <td>{email}</td>
            <td><Checkbox value={id} id_sesion={id_sesion} check={asistencia}/></td>
            {/*<td><Checkbox_tarea value={id} id_sesion={id_sesion}/></td>*/}
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
