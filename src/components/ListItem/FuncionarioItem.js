import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import './style.css'
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {URL_BASE} from "../../constants";
import {toast} from "react-toastify";

const FuncionarioItem = ({first_name, last_name, programa_inscrito, email, delAction, urlPath, username, id}, props) => {

    const onDelete = () => {

    }
    return (
        <tr>
            <td>{email}</td>
            <td>Creación y edición</td>
            <td><Fragment onClick={onDelete}><FontAwesomeIcon onClick={onDelete} icon={faTrash}
                                                              title="Eliminar usuario"/></Fragment></td>
        </tr>
    );
};

FuncionarioItem.propTypes = {
    editAction: PropTypes.string.isRequired,
    delAction: PropTypes.string.isRequired,
    urlPath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    dni: PropTypes.string.isRequired,
};

export default FuncionarioItem;
