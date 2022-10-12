import React, {Fragment} from 'react'
import 'react-table-filter/lib/styles.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import {URL_BASE} from "../../constants";
import Moment from 'react-moment';
import moment from 'moment';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";


const columns = [
    {
        dataField: 'nombre_evento',
        text: 'Nombre del evento',
        sort: true,
        filter: textFilter()
    },
    {
        dataField: 'fecha_creacion',
        text: 'Fecha creación archivo',
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


const FilterTable_files = (props) => {
    const {allfiles} = props

    let archivos = []
    if (allfiles.archivos) {
        for (let i = 0; i < allfiles.archivos.length; i++) {
            let creador = `${allfiles.archivos[i].creador.first_name} ${allfiles.archivos[i].creador.last_name}`;

            archivos.push({
                'nombre': allfiles.archivos[i].nombre,
                'archivo': allfiles.archivos[i].archivo,
                'creador': creador,
                'nombre_evento': allfiles.archivos[i].evento,
                'fecha_creacion': <Moment format="YYYY/MM/DD h:mm A z" utc
                                          local>{moment(allfiles.archivos[i].fecha_creacion).local('America/Bogota')}</Moment>,
                'id': allfiles.archivos[i].id,
                'slug': allfiles.archivos[i].slug,
                'type': 1
            })
        }
    }

    if (allfiles.urls) {
        for (let i = 0; i < allfiles.urls.length; i++) {
            let creador = 'Grovity';

            if (allfiles.urls[i].creador)
                creador = `${allfiles.urls[i].creador.first_name} ${allfiles.urls[i].creador.last_name}`;

            archivos.push({
                'nombre': allfiles.urls[i].nombre,
                'archivo': allfiles.urls[i].url,
                'creador': creador,
                'nombre_evento': allfiles.urls[i].evento,
                'fecha_creacion': <Moment format="YYYY/MM/DD h:mm A z" utc
                                          local>{moment(allfiles.urls[i].fecha_creacion).local('America/Bogota')}</Moment>,
                'id': allfiles.urls[i].id,
                'slug': allfiles.urls[i].slug,
                'type': 2
            })
        }
    }


// rowEvents = {
//     onClick: (e, row, rowIndex) => {
//         window.location.href = `${this.props.urlPath}${row.username}`
//     }
// };

    const onDelete = (slug, type) => {
        return function f() {
            let url = `${URL_BASE}/archivos/usuario/${slug}/`;

            if (type === 2) {
                url = `${URL_BASE}/urls/usuario/${slug}/`;
            }

            fetch(url, {
                headers: new Headers({
                    'Authorization': `Token ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }),
                method: 'DELETE',
            })
                .then(function (r) {
                    if (r.status === 204) {
                        toast.success(`Archivo eliminado correctamente`)
                        let reload = () => {
                            window.location.reload()
                        }
                        setTimeout(reload, 3000)

                    } else {
                        toast.error(`Error al eliminar el Archivo`)
                    }

                })
        }
    }

    return (
        <Fragment>

            <BootstrapTable id="tableUsers mb-3" keyField='id'
                            data={archivos ? archivos.map(c => (
                                    {
                                        nombre_evento: c.nombre_evento ? c.nombre_evento : 'Archivo del usuario',
                                        fecha_creacion: c.fecha_creacion,
                                        nombre_archivo: c.nombre,
                                        file: <a href={c.archivo} target='_blank'
                                                 rel="noopener noreferrer">{c.type === 2 ? 'Ver url' : 'Ver archivo'}</a>,
                                        nombre_creador:
                                            <div>
                                                {c.creador}
                                                {
                                                    <FontAwesomeIcon title={`Eliminar ${c.url ? 'url' : 'archivo'}`}
                                                                     className={'ml-2'}
                                                                     icon={faTrash}
                                                                     onClick={onDelete(c.slug, c.type)}/>
                                                }

                                            </div>

                                    }
                                )
                            ) : []}
                            columns={columns} filter={filterFactory()}
                            />
        </Fragment>
    )


}

export default FilterTable_files;
