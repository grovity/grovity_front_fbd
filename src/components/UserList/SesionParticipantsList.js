import React, {Fragment} from "react";
import {Table} from "reactstrap";
import PropTypes from "prop-types";
import ListItem from "../ListItem/ListItem";
import './style.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faCircle} from "@fortawesome/free-regular-svg-icons";

const SesionParticipantsList = ({users, urlPath, id, flag}) => {
    return (
        <Fragment>
            <div className="mb-5 mt-5">
                <h2 className="titulosListados mb-4 mt-4 d-inline">Lista de participantes</h2>
                {
                    flag ?

                        <FontAwesomeIcon icon={faCheckCircle}
                                         size={"2x"}
                                         style={{color:"green", size: "20%"}}
                                         title="Asistencia y envío de encuestas exitoso"
                                         className="ml-2"/> :
                        <FontAwesomeIcon icon={faCircle}
                                         size={"2x"}
                                         style={{color:"red"}}
                                         title="No se ha confirmado asistencia, no se ha enviado encuestas"
                                         className="ml-3 fa-w-13"/>

                }
            </div>
            <Table id="tableUsers">
                <thead>
                <tr>
                    <th>Nombre y apellido</th>
                    <th>Correo</th>
                    <th>Asistencia</th>
                    <th>Cumplimiento en tareas</th>
                </tr>
                </thead>
                <tbody>

                {

                    users && users.length !== undefined ?
                        users.map(c =>
                            <ListItem
                                id_sesion={id}
                                key={c.id}
                                id={c.id}
                                asistencia={c.asistencia}
                                email={c.email}
                                first_name={c.first_name}
                                last_name={c.last_name}
                                username={c.username}
                                delAction={'suspender'}
                                urlPath={urlPath}>
                            </ListItem>
                        ) :
                        <p>No hay inscritos</p>

                }
                </tbody>
            </Table>

        </Fragment>

    );
};

SesionParticipantsList.propTypes = {
    users: PropTypes.array.isRequired,
    urlPath: PropTypes.string.isRequired,

};

export default SesionParticipantsList;