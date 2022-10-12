import React from "react";
import {Table} from "reactstrap";
import PropTypes from "prop-types";
import '../UserList/style.css'
import FileItem from "../ListItem/FileItem";

const FilesList = ({files, status, entidad, id_evento}) => {
    return (
        <div className="w-100">

            <Table id="tableUsers">
                <thead>
                <tr>
                    <th>Nombre del archivo</th>
                    <th>URL descarga</th>
                    <th>Creador</th>

                </tr>
                </thead>
                <tbody>

                {
                    Array.isArray(files.archivos) ?
                        files.archivos.map(c =>
                            <FileItem
                                key={c.id}
                                id={c.slug}
                                file={c.archivo}
                                name={c.nombre}
                                user={`${c.creador ? c.creador.first_name : 'Grovity'} ${c.creador ? c.creador.last_name : ''}`}
                                type="Descargar Archivo"
                                tipo='archivo'
                                status={status}
                                entidad={entidad}
                                id_evento={id_evento}
                            />
                        ) :
                        <span>No hay archivos para esta sesión</span>

                }

                {
                    Array.isArray(files.urls) ?
                        files.urls.map(c =>
                            <FileItem
                                key={c.id}
                                id={c.slug}
                                file={c.url}
                                name={c.nombre}
                                user={`${c.creador ? c.creador.first_name : 'Grovity'} ${c.creador ? c.creador.last_name : ''}`}
                                type="Abrir Url"
                                tipo='url'
                                status={status}
                                entidad={entidad}
                                id_evento={id_evento}
                            />
                        ) :
                        <span></span>
                }

                </tbody>
            </Table>

        </div>

    );
};

FilesList.propTypes = {
    users: PropTypes.array.isRequired,
    urlPath: PropTypes.string.isRequired,

};

export default FilesList;
