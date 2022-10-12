import React, {Component, Fragment} from 'react'
import 'react-table-filter/lib/styles.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import {URL_BASE} from "../../constants";
import {fetchEmprendedor} from "../../actions/fetchUsers";
import {toast} from "react-toastify";


const columns = [
    {
        dataField: 'ir',
        text: 'Ver más',
    },
    {
        dataField: 'first_name',
        text: 'Nombre y apellido',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'programa_emprendedor',
        text: 'Programa',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'asistencia',
        text: 'Asistencia',
        sort: true,
    },

];

const columns_mentor = [
    {
        dataField: 'ir',
        text: 'Ver más',
    },
    {
        dataField: 'first_name',
        text: 'Nombre y apellido',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'email',
        text: 'Correo Electrónico',
        sort: true,
        filter: textFilter()
    },

];


class FilterTable extends Component {

    // rowEvents = {
    //     onClick: (e, row, rowIndex) => {
    //         window.location.href = `${this.props.urlPath}${row.username}`
    //     }
    // };

    onDelete = (c, id) => {
        return function f() {
            fetch(`${URL_BASE}/usuario/desactivar/${c.username}`, {
                headers: new Headers({
                    'Authorization': `Token ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }),
                method: 'PUT',
                body: JSON.stringify({
                    'is_active': false
                })
            })
                .then(function (r) {
                    if (r.status === 200) {
                        toast.success("Usuario eliminado correctamente")
                        fetchEmprendedor(id)


                    } else {
                        toast.error("Error al eliminar el usuario. Por favor intente nuevamente")
                    }

                })
        }
    }

    render() {
        return (
            <Fragment>

                <BootstrapTable id="tableUsers mb-3" keyField='id'
                                data={Array.isArray(this.props.users) ? this.props.users.map(c => (
                                        {
                                            ir: <Fragment>
                                                <a href={this.props.urlPath + c.username}> Ver perfil del empresario</a>
                                                {
                                                    this.props.entidad ?
                                                        <div style={{cursor: 'pointer'}} className='mt-2 text-danger '
                                                             onClick={this.onDelete(c, this.props.id_institution)}>¿Eliminar usuario?</div> :
                                                        <span></span>
                                                }


                                            </Fragment>,
                                            first_name: `${c.first_name ? c.first_name : c.email} ${c.last_name ? c.last_name : ''}`,
                                            email: `${c.email}`,
                                            programa_emprendedor: c.programa_emprendedor && c.programa_emprendedor[0] ?
                                                c.programa_emprendedor[0].nombre : "no tiene programas",
                                            asistencia:
                                                <div>
                                                    <p><strong>Eventos
                                                        programados: </strong>{c.pasistencia && c.pasistencia.numero_eventos}
                                                    </p>
                                                    <p>
                                                        <strong>Asistencia: </strong>{c.pasistencia && c.pasistencia.asistencia}
                                                    </p>
                                                    <p className='m-0'>
                                                        <strong>Porcentaje: </strong>{c.pasistencia && c.pasistencia.porcentaje + "%"}
                                                    </p>

                                                </div>
                                            ,
                                            username: c.username

                                        }
                                    )
                                ) : []}
                                columns={!this.props.status ? columns : columns_mentor} filter={filterFactory()}
                                pagination={paginationFactory()}/>
            </Fragment>
        )
    }

}

export default FilterTable