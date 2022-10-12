import React from "react";
import {Table} from "reactstrap";
import PropTypes from "prop-types";
import '../UserList/style.css'
import FuncionarioItem from "../ListItem/FuncionarioItem";
import Col from "reactstrap/es/Col";

const FuncionarioList = ({funcionarios, urlPath}) => {
    return (
        <Col>

            <Table id="tableUsers">
                <thead>
                <tr>
                    <th>Correo</th>
                    <th>Permisos</th>
                    <th>Eliminar</th>
                </tr>
                </thead>
                <tbody>

                {
                    funcionarios ?
                        funcionarios.map(c =>
                            <FuncionarioItem
                                key={c.id}
                                id={c.id}
                                first_name={c.first_name}
                                last_name={c.last_name}
                                username={c.username}
                                email={c.email}
                                programa_inscrito={c.programa_emprendedor ? c.programa_emprendedor[0].nombre : "Ningún programa"}
                                delAction={'eliminar'}
                                urlPath={urlPath}
                                username={c.username}>
                            </FuncionarioItem>
                        ) :
                        <p>No existen funcionarios en este momento</p>

                }
                </tbody>
            </Table>

        </Col>

    );
};

FuncionarioList.propTypes = {
    users: PropTypes.array.isRequired,
    urlPath: PropTypes.string.isRequired,

};

export default FuncionarioList;