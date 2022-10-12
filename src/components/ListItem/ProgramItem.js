import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './style.css'
import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/es';


const ProgramItem = ({nombre, fecha_fin, fecha_inicio, sesiones, emprendedores, mentores, urlPath, id, funcionario, editAction}) => {
    return (
        <tr>
            <td>
                <Link id="linkTables" to={`${urlPath}${id}`}>
                    {nombre}
                </Link>
            </td>

            <td>
                <Link id="linkTables" to={`/users`}>
                    {emprendedores}
                </Link>
            </td>

            <td>
                <Link id="linkTables" to={`/mentors/`}>{mentores}  </Link>
            </td>

            <td>
                <Moment format="MMMM DD YYYY">{moment.utc(fecha_inicio).locale('es')}</Moment>
            </td>
            {/*<td>{funcionario ? funcionario.first_name: "Agregar funcionario"}</td>*/}

            <td>
                <Link id="linkTables" to={`${urlPath}${id}/edit`}>
                    {editAction}
                </Link>
            </td>
        </tr>
    );
};

ProgramItem.propTypes = {
    editAction: PropTypes.string.isRequired,
    delAction: PropTypes.string.isRequired,
    urlPath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    dni: PropTypes.string.isRequired,
};

export default ProgramItem;
