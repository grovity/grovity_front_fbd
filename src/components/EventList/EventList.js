import EventItem from "../EventItem/EventItem";
import PropTypes from "prop-types";
import {Table} from "reactstrap";
import React, {Fragment} from "react";
import './style.css'
import {Link} from "react-router-dom";

const EventList = ({events, urlPath, id, status, username}) => {
    return (
        <div className='col text-center'>
            {
                status ?
                    <h3 className="titulosazul mb-4 mt-4">Tus sesiones</h3> :
                    <h3 className="titulosazul mb-4 mt-4">Tus sesiones</h3>
            }

            <Table id="tableUsers">
                <thead>
                <tr>
                    <th>Nombre de la sesión</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    {
                        status ?
                            <Fragment/> :
                            <th>Mentor</th>

                    }

                    <th>Link para conectarte</th>
                    {
                        status ?
                            <th>Confirmación</th> :
                            <th>Calificación</th>

                    }

                </tr>
                </thead>

                <tbody>
                {
                    Array.isArray(events['eventos']) ?
                        events['eventos'].map(c =>
                            <EventItem
                                status={status}
                                inicio={c.inicio}
                                fin={c.fin}
                                fecha_inicio={status ? c.start : c.inicio}
                                fecha_fin={status ? c.end : c.fin}
                                nombre={c.text}
                                id={c.id}
                                url_zoom={c.url_zoom}
                                mentor={`${c.mentor.first_name} ${c.mentor.last_name}`}
                                username={c.mentor.username}
                                urlPath={urlPath}
                                key={c.id}
                            />
                        ) :
                        <p>No tiene eventos en este momento</p>
                }
                </tbody>
            </Table>
            <Link to={`user/${username}`}>
                <button className="botones mt-3">Resumen</button>
            </Link>

        </div>
    );
};

EventList.propTypes = {
    urlPath: PropTypes.string.isRequired,
    events: PropTypes.array.isRequired,
};

export default EventList;