import React, {Fragment} from 'react'
import 'react-table-filter/lib/styles.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import Moment from 'react-moment';
import moment from 'moment';


const columns = [
    {
        dataField: 'nombre_evento',
        text: 'Nombre del evento',
        sort: true,
        filter: textFilter()
    },
    {
        dataField: 'fecha_evento',
        text: 'Fecha del evento',
    },
    {
        dataField: 'nombre_archivo',
        text: 'Nombre del archivo',
        sort: true,
        filter: textFilter()
    },
    {
        dataField: 'file',
        text: 'Url/descarga',

    }, {
        dataField: 'nombre_creador',
        text: 'Creador',
        sort: true,
        filter: textFilter()
    }

];


const FilterTable_filesAll = (props) => {
    const {allfiles} = props
    let archivos = []
    if (allfiles.archivos) {
        for (let i = 0; i < allfiles.archivos.length; i++) {
            archivos.push({
                'nombre': allfiles.archivos[i].nombre,
                'archivo': allfiles.archivos[i].archivo,
                'creador': `${allfiles.archivos[i].creador ? allfiles.archivos[i].creador.first_name + ' ' + allfiles.archivos[i].creador.last_name : 'Grovity'}`,
                'nombre_evento': allfiles.archivos[i].evento,
                'fecha_inicio': <Moment format="YYYY/MM/DD h:mm A z" utc
                                        local>{moment(allfiles.archivos[i].fecha_inicio).local('America/Bogota')}</Moment>,
            })
        }
    }


    if (allfiles.urls) {
        for (let i = 0; i < allfiles.urls.length; i++) {
                archivos.push({
                    'nombre': allfiles.urls[i].nombre,
                    'archivo': allfiles.urls[i].url,
                    'creador': `${allfiles.urls[i].creador ? allfiles.urls[i].creador.first_name + ' ' + allfiles.urls[i].creador.last_name : 'Grovity'}`,
                    'nombre_evento': allfiles.urls[i].evento,
                    'fecha_inicio': <Moment format="YYYY/MM/DD h:mm A z" utc
                                            local>{moment(allfiles.urls[i].fecha_inicio).local('America/Bogota')}</Moment>,
                    'url': true,
                })
        }
    }


// rowEvents = {
//     onClick: (e, row, rowIndex) => {
//         window.location.href = `${this.props.urlPath}${row.username}`
//     }
// };

    // const onDelete = (c) => {
    //     return function f() {
    //         fetch(`${URL_BASE}/usuario/desactivar/${c.username}`, {
    //             headers: new Headers({
    //                 'Authorization': `Token ${localStorage.getItem("token")}`,
    //                 'Content-Type': 'application/json'
    //             }),
    //             method: 'PUT',
    //             body: JSON.stringify({
    //                 'is_active': false
    //             })
    //         })
    //             .then(function (r) {
    //                 if (r.status === 200) {
    //                     alert("Usuario eliminado correctamente")
    //
    //                 } else {
    //                     alert("Error al eliminar el usuario. Por favor intente nuevamente")
    //                 }
    //
    //             })
    //     }
    // }

    return (
        <Fragment>

            <BootstrapTable id="tableUsers mb-3" keyField='id'
                            data={archivos ? archivos.map(c => (
                                    {
                                        nombre_evento: c.nombre_evento,
                                        fecha_evento: c.fecha_inicio,
                                        nombre_archivo: c.nombre,
                                        file: <a href={c.archivo} target='_blank'
                                                 rel="noopener noreferrer">{c.url ? 'Ver url' : 'Ver archivo'}</a>,
                                        nombre_creador: c.creador,

                                    }
                                )
                            ) : []}
                            columns={columns} filter={filterFactory()}
                            // pagination={paginationFactory()}
                            />
        </Fragment>
    )


}

export default FilterTable_filesAll;