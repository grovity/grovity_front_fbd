import React from "react";
import {Table} from "reactstrap";
import PropTypes from "prop-types";
import './style.css'
import ListItemFundador from "../ListItem/ListItemFundador";

const UserList = ({users, urlPath}) => {
    return (
        <div id="content" className="p-md-4 align-items-start text-center">

            <div className="container">
                <h3 className="titulosListados mb-4 mt-4">Lista de fundadores participantes</h3>
                <Table id="tableUsers">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre y apellido</th>
                        <th>Programa</th>
                        <th>Asistencia</th>
                        <th>Cumplimiento en tareas</th>
                        <th>Suspender</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        users.map(c =>
                            <ListItemFundador
                                key={c.id}
                                id={c.id}
                                first_name={c.first_name}
                                last_name={c.last_name}
                                username={c.username}
                                programa_inscrito={c.programa_emprendedor[0] ? c.programa_emprendedor[0].nombre : "No tiene programas"}
                                asistencia={c.asistencia}
                                tareas={c.tareas}
                                delAction={'suspender'}
                                urlPath={urlPath}>
                            </ListItemFundador>
                        )

                    }
                    </tbody>
                </Table>
            </div>

        </div>

    );
};

UserList.propTypes = {
    users: PropTypes.array.isRequired,
    urlPath: PropTypes.string.isRequired,

};

export default UserList;