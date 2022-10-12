import React, {useState, useEffect} from 'react'
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {
    getStatusMentor,
    selectCurrentUser,
} from "../../selectors/users";
import {connect} from "react-redux";
import {enquireScreen} from 'enquire-js';
import {
    Row,
    Col,
    Divider,
} from 'antd';
import {getId} from "../../selectors/institutions";
import NombreActividadEvento from '../NombreActividadEvento/NombreActividadEvento';
import moment from "moment";
import Moment from "react-moment";

const colors = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
    'magenta',
    'red',
    'volcano',
    'orange'

]

const ActaEntidad = (
    {
        users, event, id_user, entidad,
        acta_info, setVisible, setActaInfo, actividadesActa, setActividadesActa
    }) => {

    const [isMobile, setIsMobile] = useState(false);


    const [loading, setLoading] = useState(false);

    enquireScreen((b) => {
        return () => {
            setIsMobile(b);
        }
    })

    useEffect(() => {
        enquireScreen((b) => {
            setIsMobile(
                !!b
            );
        });
    }, [isMobile])

    return (
        <>
            <Row>
                <Col>
                    <h6>{event?.nombre}</h6>
                </Col>
            </Row>
            <Divider className='divider-sections'/>
            <Row>
                <Col>
                    <p><strong>Resumen de la sesión</strong></p>
                    <p>{acta_info?.summary}</p>
                    <p><strong>Fecha inicio: </strong>{<Moment format="YYYY-MM-DD HH:mm" utc
                                                                                                local>{moment(acta_info?.start_date).local('America/Bogota')}</Moment>}</p>
                    <p><strong>Fecha Fin: </strong>{<Moment format="YYYY-MM-DD HH:mm    " utc
                                                                                                local>{moment(acta_info?.end_date).local('America/Bogota')}</Moment>}</p>

                </Col>
            </Row>
            <Row>
                <Col>
                    <p><strong>Participantes</strong></p>
                    {
                        Array.isArray(acta_info?.assistants) && (
                            acta_info.assistants.map(assistant => {
                                return <p>- {assistant.first_name} {assistant.last_name}</p>
                            })
                        )
                    }
                </Col>
            </Row>
            <Row>Actividades</Row>
            <Row className='mb-4'>
                {
                    Array.isArray(actividadesActa) && (
                        actividadesActa.map(function (activity) {
                            return (
                                <Col key={activity.id}>

                                    <NombreActividadEvento
                                        setActaInfo={setActaInfo}
                                        setActividadesActa={setActividadesActa}
                                        activity={activity}
                                        event={event}
                                        acta={true}
                                        acta_info={acta_info}
                                        entidad={entidad}
                                        colors={colors}
                                    />
                                </Col>
                            )
                        })
                    )
                }
            </Row>
        </>

    );
};

const mapStateToProps = (state, props) => ({
    user: selectCurrentUser(state),
    id_user: getId(state),
    status: getStatusMentor(state)
});

export default connect(mapStateToProps, null)(ActaEntidad)