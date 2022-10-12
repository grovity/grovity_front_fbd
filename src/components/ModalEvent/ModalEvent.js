import React, {useState, useEffect} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {Button, Col, Row, Divider, Spin} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/es';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faCircle} from "@fortawesome/free-regular-svg-icons";
import {faVideo} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {getStatusMentor} from "../../selectors/users";
import BasicModal from "../BasicModal/BasicModal";
import EventEditForm from "../EventEditForm/EventEditForm";
import {fetchEventsbyId, fetchTotalEventsUser} from "../../actions/fetchEvents";
import {selectEventId} from "../../selectors/events";
import ActFirm from "../ActaFirm/ActaFirm";
import {fetchUsersbyEvent} from "../../actions/fetchUsers";
import ModalReviews from "./ModalReviews";
import CheckAsistencia from "../CheckAsistencia/CheckAsistencia";
import link_zoom_create from "../../helpers/zoom";
import EventEditUsuarioForm from "../EventEditForm/EventEditUsuarioForm";
import {URL_BASE} from "../../constants";
import BasicModalWhite from '../BasicModalWhite/BasicModalWhite';
import EventEditUsuarioNormalForm from "../EventEditForm/EventEditUsuarioNormalForm";
import {getUrlVideo} from "../../api/video";
import EventEditMentorForm from "../EventEditForm/EventEditMentorForm";


// import ActaForm from '../ActaForm/ActaForm';
import CalendarEventInfo from '../CalendarEventInfo/CalendarEventInfo';


// import ActaForm from '../ActaForm/ActaForm';
import CalendarEventInfo from '../CalendarEventInfo/CalendarEventInfo';

import Scheduler5 from "../Scheduler/Scheduler5";
import PopConfirm from "../PopConfirm/PopConfirm";
import {deleteEvent} from "../../api/event";
import {fetchEventsMarketplace} from "../../actions/marketplace";



const ModalEvent = (props) => {
    const {
        className,
        show,
        modal,
        toggle,
        info,
        entidad,
        mt,
        et,
        status,
        event,
        fetchEventsbyId,
        event_marketplace,
    } = props;
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showRws, setShowRws] = useState(false);
    const [modalRws, setModalRws] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const [evento, setEvento] = useState(null);
    const [username, setUsername] = useState(null);
    const [editar, setEditar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showActa, setShowActa] = useState(false);
    const [loading2, setLoading2] = useState(false);

    useEffect(() => {
        const eventData = async () => {
            setLoading(true)
            if (info.slug && !info.marketplace) {
                await props.fetchEventsbyId(info.slug, false)
                await props.fetchUsersbyEvent(info.slug)
            } else if (info.slug && info.marketplace) {
                await props.fetchEventsbyId(info.slug, true)
            }
            setLoading(false)

        }

        eventData()


    }, [fetchEventsbyId, info.slug, editar]);

    const handleActa = () => {
        setShowActa(true)
    }

    const openModal = (content) => {
        setShowModal(true);
        setContentModal(content);
    };

    const openModalEdit = (content) => {
        setShowModalEdit(true);
        setContentModal(content);
    };

    const openModalRws = async (id, slug) => {
        await setModalRws(true)
        await setShowRws(true)
        await setEvento(id)
        await setUsername(slug)

    };

    const uploaReviws = (id, slug) => {
        return async (e) => {
            await openModalRws(id, slug)
        }

    }

    const toggle2 = async () => {
        await setModalRws(false)
        await setShowRws(false)
    }

    const downloadVid = async () => {
        setLoading(true);
        await getUrlVideo(info.slug, info.marketplace);
        setLoading(false);
    }


    // const sendMail = async () => {
    //     await fetch(`${URL_BASE}/calendario/evento/${info.id}/correo`, {
    //         headers: new Headers({
    //             'Authorization': `Token ${localStorage.getItem("token")}`,
    //             'Content-Type': 'application/json'
    //         }),
    //         method: 'POST',
    //     })
    //         .then(function (r) {
    //             if (r.status === 200) {
    //                 alert("Correo enviado correctamente")
    //
    //             } else {
    //                 alert("Error al enviar el mail. Por favor intente de nuevo")
    //             }
    //
    //         })
    //
    // }

    const closeModal = () => {
        setShowModalEdit(false)
    };

    async function handleEliminar () {
        setLoading2(true)
        const response = await props.deleteEvent(event.slug)
        if(response){
            toggle()
            await props.fetchTotalEventsUser()
            await props.fetchEventsMarketplace()
        }
         setLoading2(false)

    }

    if (loading) {
        return (
            <div>
                <Modal isOpen={modal} className={className} show={show} toggle={toggle}>
                    <ModalHeader id='titulo-modales-blancos' toggle={toggle} title={event.cuenta_zoom}><strong>Detalles
                        del evento </strong>
                    </ModalHeader>
                    <ModalBody className={'mb-5'}>
                        <div className='position-absolute d-flex justify-content-center align-items-center w-100 h-100'
                             style={{left: '0', top: '0'}}>
                            <Spin size='default' className='mt-5'/>
                        </div>
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                    <spin></spin>
                </Modal>
            </div>
        )
    }
    return (

        <div>
            <Modal isOpen={modal} className={className} show={show} toggle={toggle}>
                <ModalReviews show={showRws} modal={modalRws} toggle={toggle2}
                              evento={evento} marketplace={info && info.marketplace} username={username}></ModalReviews>
                {

                    entidad ?
                        <ModalHeader id='titulo-modales-blancos' toggle={toggle} title={event.cuenta_zoom}><strong>Detalles
                            del evento </strong>
                            {/*<div*/}
                            {/*    className='text-right align-content-end d-inline'>*/}
                            {/*    <FontAwesomeIcon onClick={sendMail}*/}
                            {/*                     icon={faEnvelopeOpen}*/}
                            {/*                     title="Envía alerta a los participantes"/>*/}
                            {/*</div>*/}
                        </ModalHeader> :
                        <ModalHeader toggle={toggle}><strong className='mr-1' style={{color: 'black'}}>Detalles del
                            evento</strong>
                        </ModalHeader>
                }


                <ModalBody>

                    {
                        (info && event.length !== 0 && !info.marketplace) ?
                            <div>
                                <Row>
                                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                        <Row>
                                            <Col xl={15} lg={15} md={15} sm={15} xs={15}>
                                                <p><strong>{info.text}</strong></p>
                                            </Col>
                                            <Col xl={9} lg={9} md={9} sm={9} xs={9}>
                                                {entidad ?
                                                    <span/>
                                                    :
                                                    <div
                                                        className='text-right align-content-end d-inline'>
                                                        {
                                                            (status && !entidad && !info.comprador) ?
                                                                info && !info.marketplace ?
                                                                    <Button
                                                                        style={{
                                                                            backgroundColor: '#95c11f',
                                                                            color: 'white',
                                                                            borderRadius: '4px'
                                                                        }}
                                                                        onClick={() =>
                                                                            openModal(<ActFirm event={event}
                                                                                               id={info.id}
                                                                                               slug={info.slug}
                                                                                               users={props.users}
                                                                                               setShowModal={setShowModal}></ActFirm>)
                                                                        }>
                                                                        <CheckAsistencia
                                                                            id={info.slug}></CheckAsistencia>
                                                                    </Button> :
                                                                    <span></span>
                                                                :
                                                                (event?.calificado === true || event_marketplace?.calificado === true) ?
                                                                    (event?.comprador || event_marketplace?.comprador || !status) ?
                                                                        <Button
                                                                            disabled
                                                                            className='btn-verde-basico'
                                                                            onClick={uploaReviws(info.id, info.slug)
                                                                            }>

                                                                            <FontAwesomeIcon
                                                                                icon={(event?.calificado === true || event_marketplace?.calificado) ? faCheckCircle : faCircle}
                                                                                style={(event?.calificado === true || event_marketplace?.calificado) === true ? {
                                                                                    color: "green",
                                                                                    size: "20%"
                                                                                } : {color: "red"}}
                                                                                title={(event?.calificado === true || event_marketplace?.calificado) === true ? "Este evento ya ha sido calificado" : "Califica esta sesión"}

                                                                                title="Califica la sesión"/> Sesión
                                                                            calificada

                                                                        </Button> :
                                                                        <span/> :
                                                                    (event?.comprador || event_marketplace?.comprador || !status) ?
                                                                        <Button
                                                                            className='btn-verde-basico'
                                                                            onClick={uploaReviws(info.id, info.slug)
                                                                            }>

                                                                            <FontAwesomeIcon
                                                                                icon={(event?.calificado === true || event_marketplace?.calificado) === true ? faCheckCircle : faCircle}
                                                                                style={(event?.calificado === true || event_marketplace?.calificado) === true ? {
                                                                                    color: "green",
                                                                                    size: "20%"
                                                                                } : {color: "red"}}
                                                                                title={(event?.calificado === true || event_marketplace?.calificado) === true ? "Este evento ya ha sido calificado" : "Califica esta sesión"}

                                                                                title="Califica la sesión"/> Calificar
                                                                            sesión

                                                                        </Button> :
                                                                        <span/>
                                                        }
                                                    </div>
                                                }

                                            </Col>
                                        </Row>
                                        <Divider style={{marginBottom: '1%', marginTop: '1%'}}/>
                                        <Row>
                                            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                                <p><strong>Tema</strong></p>
                                                <p>{event && event.tema ? event.tema : 'Sesión de avance'}</p>
                                            </Col>
                                        </Row>
                                        <Divider style={{marginBottom: '1%', marginTop: '1%'}}/>
                                        <Row>
                                            <Col xl={11} lg={11} md={11} sm={11} xs={11}>
                                                <p><strong>Tipo</strong></p>
                                                <p>{event && event.tipo ? event.tipo : 'Individual'}</p>
                                            </Col>
                                            <Divider type='vertical' style={{height: '90px'}}/>
                                            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                                <p><strong>Hora</strong></p>
                                                <p><Moment format="h:mm A z" utc
                                                           local>{moment(event.inicio).local('America/Bogota')}</Moment> - <Moment
                                                    format="h:mm A z" utc
                                                    local>{moment(event.fin).local('America/Bogota')}</Moment></p>
                                            </Col>
                                        </Row>
                                        <Divider style={{marginBottom: '1%', marginTop: '1%'}}/>
                                        <Row>
                                            <Col xl={11} lg={11} md={11} sm={11} xs={11}>
                                                <p><strong>{et} </strong></p>
                                                <p>{event.nombre_usuario_individual
                                                && event.nombre_usuario_individual !== " " ? event.nombre_usuario_individual : info.text}
                                                </p>
                                            </Col>
                                            <Divider type='vertical' style={{height: '90px'}}/>
                                            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                                <p><strong>{mt}</strong></p>
                                                <p>{event.mentor ? event.nombre_mentor : ''}</p>
                                            </Col>
                                        </Row>
                                        <Divider style={{marginBottom: '1%', marginTop: '2%'}}/>

                                        {/* <p>Asistentes máximos - {info.asistentes_max}</p>*/}
                                        <Row justify='end' align='middle'>
                                            <Button className='btn-verde-basico' title={"Ir a zoom"}
                                                    onClick={link_zoom_create(event, status, entidad)}>
                                                <FontAwesomeIcon icon={faVideo}/></Button>
                                        </Row>
                                    </Col>
                                </Row>

                            </div> :

                            (info && info.marketplace) ?
                                <div>
                                    <Row>
                                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                            <Row>
                                                <Col xl={15} lg={16} md={15} sm={16} xs={16}>
                                                    <p><strong>{info.text}</strong></p>
                                                </Col>
                                                <Col xl={9} lg={8} md={9} sm={8} xs={8}>
                                                    <div
                                                        className='text-right align-content-end d-inline'>
                                                        {
                                                            info.calificado === true ?
                                                                (info.comprador || !status) ?
                                                                    <Button
                                                                        disabled
                                                                       className='btn-verde-basico'
                                                                        onClick={uploaReviws(info.id, info.slug)
                                                                        }>

                                                                        <FontAwesomeIcon
                                                                            icon={info.calificado === true ? faCheckCircle : faCircle}
                                                                            style={info.calificado === true ? {
                                                                                color: "#95c11f",
                                                                                size: "20%",
                                                                                paddingRight: '1%'
                                                                            } : {color: "red"}}
                                                                            title={info.calificado === true ? "Este evento ya ha sido calificado" : "Califica esta sesión"}

                                                                            title="Califica la sesión"/> Sesión
                                                                        calificada

                                                                    </Button> :
                                                                    <span/> :
                                                                (info.comprador || !status) ?
                                                                    <Button
                                                                        className='btn-verde-basico'
                                                                        onClick={uploaReviws(info.id, info.slug)
                                                                        }>

                                                                        <FontAwesomeIcon
                                                                            icon={info.calificado === true ? faCheckCircle : faCircle}
                                                                            style={info.calificado === true ? {
                                                                                color: "#95c11f",
                                                                                size: "20%",
                                                                                marginRight: '1%'
                                                                            } : {color: "red"}}
                                                                            title={info.calificado === true ? "Este evento ya ha sido calificado" : "Califica esta sesión"}

                                                                            title="Califica la sesión"/> Calificar
                                                                        sesión

                                                                    </Button> :
                                                                    <span/>
                                                        }
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Divider/>
                                            <Row>
                                                <Col xl={11} lg={11} md={11} sm={11} xs={11}>
                                                    <p><strong>Marketplace</strong></p>
                                                </Col>
                                                <Divider type='vertical' style={{height: '40px'}}/>
                                                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                                    <p><strong>Hora </strong>- <Moment format="h:mm A z" utc
                                                                                       local>{moment(event_marketplace.fecha_inicio).local('America/Bogota')}</Moment> - <Moment
                                                        format="h:mm A z" utc
                                                        local>{moment(event_marketplace.fecha_fin).local('America/Bogota')}</Moment>
                                                    </p>
                                                </Col>
                                            </Row>
                                            <Divider style={{marginBottom: '2%', marginTop: '1%'}}/>
                                            <Row>
                                                <Col xl={11} lg={11} md={11} sm={11} xs={11}>
                                                    <p><strong>{et}</strong></p>
                                                    <p>{event_marketplace ? event_marketplace.usuario : info.text}</p>
                                                </Col>
                                                <Divider type='vertical' style={{height: '60px'}}/>
                                                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                                    <p><strong>{mt}</strong></p>
                                                    <p>{event_marketplace.mentor ? event_marketplace.mentor : ''}</p>
                                                </Col>
                                            </Row>
                                            <Divider style={{marginBottom: '2%', marginTop: '1%'}}/>
                                        </Col>
                                    </Row>


                                    <div className='text-right'>
                                        <button className='btn btn-verde-basico' title={"Ir a zoom"}
                                                style={{color: 'white'}}
                                                onClick={link_zoom_create(event_marketplace, status, entidad)}>
                                            <FontAwesomeIcon icon={faVideo}/></button>
                                    </div>
                                </div> :
                                <span></span>


                    }

                </ModalBody>
                <ModalFooter>
                    <BasicModal show={showModalEdit} setShow={setShowModalEdit}>
                        {contentModal}
                    </BasicModal>
                    <BasicModalWhite show={showModal} setShow={setShowModal}>
                        {contentModal}
                    </BasicModalWhite>
                    {entidad ?
                        <Button
                            className='btn-azul-basico'
                            onClick={() => {
                                openModalEdit(<EventEditForm event={event} id={info.slug}
                                                             setShowModal={setShowModalEdit}></EventEditForm>)
                            }

                            }
                        >Editar
                        </Button> :
                        <span></span>

                    }

                    {
                        status ?
                            <Button
                                style={{backgroundColor: '#00495d', color: 'white', borderRadius: '4px'}}
                                color='info'
                                onClick={() => {
                                    if (info && info.marketplace) {
                                        openModalEdit(<EventEditUsuarioForm event={event_marketplace} id={info.slug}
                                                                            setShowModal={setShowModalEdit}></EventEditUsuarioForm>)
                                    } else if (event && event.tema === '') {
                                        openModalEdit(<EventEditUsuarioNormalForm event={event} id={info.slug}
                                                                                  setShowModal={setShowModalEdit}></EventEditUsuarioNormalForm>)
                                    } else {
                                        openModalEdit(<EventEditMentorForm event={event} id={info.slug}
                                                                           setShowModal={setShowModalEdit}></EventEditMentorForm>)
                                    }
                                }

                                }
                            >
                                Editar
                            </Button> :
                            <span></span>

                    }

                    {
                        !status && !entidad && (info?.marketplace || event?.tema === '') ?
                            <Button
                                className="btn-azul-basico"
                                color='info'
                                onClick={() => {
                                    if (info && info.marketplace) {
                                        openModalEdit(<EventEditUsuarioForm event={event_marketplace} id={info.slug}
                                                                            setShowModal={setShowModalEdit}></EventEditUsuarioForm>)
                                    } else if (event && event.tema === '') {
                                        openModal(<Scheduler5
                                            showModal={setShowModal}
                                            formData={event}
                                            setShowModal={closeModal}
                                            mentor={event.mentor}
                                            modalSchedule={true}
                                            edit={true}
                                            event={event}
                                        ></Scheduler5>)
                                    }
                                }

                                }
                            >
                                Editar
                            </Button> :
                            <span></span>

                    }
                    {
                        ((!status && info?.marketplace && !info?.estado )|| (status && info?.marketplace && !info?.estado && info.comprador)) ?
                            <a href={`${URL_BASE}/payu/compra/${info.slug}`} target="_blank" rel="noopener noreferrer">
                                <Button title='Ir a pay u'
                                        className='btn-verde-basico'
                                        onClick={toggle}>Pagar</Button>
                            </a> :
                            <span></span>
                    }

                    {
                        !info?.marketplace ?
                            <Link to={`/calendar/event/files/${info.slug}`}>
                                <Button className='btn-azul-basico'
                                        onClick={toggle}>Archivos de la
                                    sesión</Button>
                            </Link> :
                            <span></span>
                    }


                    <Button className='btn-azul-basico'

                            onClick={downloadVid} loading={loading}><strong>Descargar video</strong></Button>
                    <Row className='w-100' style={{justifyContent:'center'}}>
                        {
                            ( !status && !entidad && !info?.marketplace && event?.tema === '') && (
                                loading2 ?
                                    <Spin></Spin>:
                                <p className={'text-center'} style={{cursor: 'pointer'}} onClick={handleEliminar}>¿Eliminar?</p>
                            )
                        }
                    </Row>

                </ModalFooter>
                <CalendarEventInfo info={info}/>
            </Modal>
            {/* <ActaForm users={props.users}/> */}
            
        </div>
    );
}

const mapStateToProps = state => ({
    status: getStatusMentor(state),
    event: selectEventId(state),
    users: state.users_event,
    event_marketplace: state.event_id,
});

export default withRouter(connect(mapStateToProps,
    {
        fetchEventsbyId,
        fetchUsersbyEvent,
        fetchTotalEventsUser,
        fetchEventsMarketplace,
        deleteEvent
    })(ModalEvent));