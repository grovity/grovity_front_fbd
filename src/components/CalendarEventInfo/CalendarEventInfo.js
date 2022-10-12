import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Button, Col, Row, Divider, Spin, Modal} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/es';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVideo} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {getStatusMentor} from "../../selectors/users";
import EventEditForm from "../EventEditForm/EventEditForm";
import {fetchEventsbyId} from "../../actions/fetchEvents";
import {selectEventId} from "../../selectors/events";
import {fetchUsersbyEvent} from "../../actions/fetchUsers";
import ModalReviews from "../ModalEvent/ModalReviews";
import link_zoom_create from "../../helpers/zoom";
import EventEditUsuarioForm from "../EventEditForm/EventEditUsuarioForm";
import {URL_BASE} from "../../constants";
import BasicModalWhite from '../BasicModalWhite/BasicModalWhite';
import EventEditUsuarioNormalForm from "../EventEditForm/EventEditUsuarioNormalForm";
import {getUrlVideo} from "../../api/video";
import EventEditMentorForm from "../EventEditForm/EventEditMentorForm";
import {BsCheckCircle, BsCircle} from "react-icons/bs";
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import ActaForm from '../ActaForm/ActaForm';
import ActaFormEdit from "../ActaForm/ActaFormEdit";
import useFetch from "../../hooks/useFetch";
import ActaEntidad from '../ActaForm/ActaEntidad';



const CalendarEventInfo = (props) => {
    const {
        toggle,
        info,
        entidad,
        mt,
        et,
        status,
        event,
        users,
        fetchEventsbyId,
        event_marketplace,
        closeModal,
        setVisibleEventInfo
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
    const [showActaEdit, setShowActaEdit] = useState(false);
    const [actaEntidad, setActaEntidad] = useState(false);
    const [acta_info, setActaInfo] = useState(null)
    const [actividadesActa, setActividadesActa] = useState(null)
    const [idsAsistentes, setIdsAsistentes] = useState(null);
    const [showModalEditAntiguo, setShowModalEditAntiguo] = useState(false);
    const [showModalEditMentor, setShowModalEditMentor] = useState(false);
    const [showModalEditMentor1, setShowModalEditMentor1] = useState(false);
    const [showModalEditEmprendedor, setShowModalEditEmprendedor] = useState(false);
    const [eventMarket, setEventMarket] = useState(event_marketplace?.calificado);

    const {get} = useFetch(URL_BASE)

        useEffect(()=>{
            setEventMarket(event_marketplace?.calificado)
        }, [eventMarket, event_marketplace])

    useEffect(() => {
        (async () => {
            if (event?.act) {
                const response = await get(`/acts/acts/${event?.act}/`)
                if (response) {
                    setActaInfo(response)
                }
            }
        })();

    }, [event])

    useEffect(() => {
        (async () => {
            let arr = []
            for (let i = 0; i < acta_info?.activities?.length; i++) {
                const response2 = await get(`/acts/acts/${event?.act}/activities/${acta_info?.activities[i]}/`)
                if (response2) {
                    arr.push(response2)
                }
            }
            setActividadesActa(arr)
        })();
    }, [acta_info])

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

    useEffect(() => {
        if (acta_info?.assistants) {
            let arr = []
            acta_info.assistants.forEach(asistente => {
                arr.push(asistente.id)
            })
            setIdsAsistentes(() => arr)
        }
    }, [acta_info])

    const handleActa = () => {
        if (event?.act) {
            setShowActaEdit(true)
        } else {
            setShowActa(true)
        }

        if (entidad) {
            setActaEntidad(true)
        }
    }


    const openModalEdit = () => {
        setShowModalEdit(true);
    };
    const openModalEditMentor = () => {
        setShowModalEditMentor(true);
        // setContentModal(content);
    };
    const openModalEditMentor1 = () => {
        setShowModalEditMentor1(true);
        // setContentModal(content);
    };
    const openModalEditEmprendedor = () => {
        setShowModalEditEmprendedor(true);
        // setContentModal(content);
    };

    const openModalEditAntiguo = (content) => {
        setShowModalEditAntiguo(true);
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

    if (loading) {
        return (
            <Row justify='center'>
                <Spin/>
            </Row>
        )
    }

    return (

        <Row justify='center' id="calendar-event-info">
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <ModalReviews show={showRws} modal={modalRws} toggle={toggle2}
                              evento={evento} marketplace={info && info.marketplace} username={username}
                setEventMarket={setEventMarket}></ModalReviews>

                <Row>
                    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                        {
                            (info && event.length !== 0 && !info.marketplace) ?
                                <div>
                                    <Row>
                                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                            <Row align='middle'>
                                                <Col xl={21} lg={21} md={21} sm={21} xs={20}>
                                                    {
                                                        entidad ?
                                                            <h6 title={event.cuenta_zoom}><strong>{info.text}</strong>
                                                            </h6> :
                                                            <h6><strong>{info.text}</strong></h6>
                                                    }
                                                </Col>
                                                <Col xl={3} lg={3} md={3} sm={3} xs={4}>
                                                    <Button className='btn-verde-basico' block title={"Ir a zoom"}
                                                            onClick={link_zoom_create(event, status, entidad)}>
                                                        <FontAwesomeIcon icon={faVideo}/>
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <Divider style={{marginBottom: '2%', marginTop: '2%'}}/>
                                            <Row>
                                                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                                    <p><strong>Tema</strong></p>
                                                    <p>{event && event.tema ? event.tema : 'Sesión de avance'}</p>
                                                </Col>
                                            </Row>
                                            <Divider style={{marginBottom: '2%', marginTop: '0%'}}/>
                                            <Row>
                                                <Col xl={11} lg={11} md={11} sm={11} xs={11}>
                                                    <p><strong>Tipo</strong></p>
                                                    <p>{event && event.tipo ? event.tipo : 'Individual'}</p>
                                                </Col>
                                                <Divider type='vertical' style={{height: '90px'}}/>
                                                <Col xl={12} lg={12} md={12} sm={11} xs={11}>
                                                    <p><strong>Fecha - Hora</strong></p>
                                                    <p><Moment format="ddd MMMM D YYYY" utc
                                                               local>{moment(event.inicio).local('America/Bogota')}</Moment>
                                                    </p>
                                                    <p><Moment format="h:mm A z" utc
                                                               local>{moment(event.inicio).local('America/Bogota')}</Moment> - <Moment
                                                        format="h:mm A z" utc
                                                        local>{moment(event.fin).local('America/Bogota')}</Moment></p>
                                                </Col>
                                            </Row>
                                            <Divider style={{marginBottom: '2%', marginTop: '0%'}}/>
                                            <Row>
                                                <Col xl={11} lg={11} md={11} sm={11} xs={11}>
                                                    <p><strong>{et} </strong></p>
                                                    <p>{event.nombre_usuario_individual
                                                    && event.nombre_usuario_individual !== " " ? event.nombre_usuario_individual : info.text}
                                                    </p>
                                                </Col>
                                                <Divider type='vertical' style={{height: '90px'}}/>
                                                <Col xl={12} lg={12} md={12} sm={11} xs={11}>
                                                    <p><strong>{mt}</strong></p>
                                                    <p>{event.mentor ? event.nombre_mentor : ''}</p>
                                                </Col>
                                            </Row>
                                            <Divider style={{marginBottom: '3%', marginTop: '2%'}}/>

                                            {entidad ?

                                                <Row justify='end'>

                                                    {
                                                        event?.act ?
                                                            <Col>
                                                                <Button className='btn-azul-basico'
                                                                        onClick={handleActa}>Ver acta</Button>
                                                            </Col> :
                                                            <Button className='btn-azul-basico'>Evento sin acta</Button>

                                                    }
                                                    <Modal
                                                        title="Acta del evento"
                                                        centered
                                                        visible={actaEntidad}
                                                        onOk={() => setActaEntidad(false)}
                                                        onCancel={() => setActaEntidad(false)}
                                                        width={600}
                                                        footer={[
                                                            <Button className='btn-danger-basico' type='primary' danger
                                                                    onClick={() => setActaEntidad(false)}>Cerrar</Button>
                                                        ]}
                                                    >
                                                        <ActaEntidad event={event} id={event?.id}
                                                                     slug={info.slug} users={users}
                                                                     acta_info={acta_info}
                                                                     actividadesActa={actividadesActa}
                                                                     setActividadesActa={setActividadesActa}
                                                                     setVisible={setShowActaEdit}
                                                                     setActaInfo={setActaInfo}
                                                                     idsAsistentes={idsAsistentes}
                                                        />
                                                    </Modal>
                                                </Row>
                                                :
                                                <>
                                                    <Row justify='end' align='middle' gutter={[8, 8]}>
                                                        <Col>
                                                            {
                                                                (status && !entidad && !info.comprador) ?
                                                                    <></>
                                                                    :
                                                                    (event?.calificado === true || event_marketplace?.calificado === true) ?
                                                                        (event?.comprador || event_marketplace?.comprador || !status) ?
                                                                            <Button className='btn-calificar-sesion'
                                                                                    disabled
                                                                                    onClick={uploaReviws(info.id, info.slug)
                                                                                    }>
                                                                                {
                                                                                    (event?.calificado === true || event_marketplace?.calificado || eventMarket) ?
                                                                                        <BsCheckCircle color='green'
                                                                                                       className='mr-2'/>
                                                                                        :
                                                                                        <BsCircle color='red'
                                                                                                  className='mr-2 mb-1'/>
                                                                                }
                                                                                Sesión calificada
                                                                            </Button>
                                                                            :
                                                                            <span/>

                                                                        :
                                                                        (event?.comprador || event_marketplace?.comprador || !status) ?
                                                                            <Button className='btn-calificar-sesion'
                                                                                    onClick={uploaReviws(info.id, info.slug)
                                                                                    }>
                                                                                {
                                                                                    (event?.calificado === true || event_marketplace?.calificado || eventMarket) ?
                                                                                        <BsCheckCircle color='green'
                                                                                                       className='mr-2'/>
                                                                                        :
                                                                                        <BsCircle color='red'
                                                                                                  className='mr-2 mb-1'/>
                                                                                }
                                                                                Calificar sesión
                                                                            </Button>
                                                                            :
                                                                            <span/>
                                                            }
                                                        </Col>
                                                        <Col>
                                                            {
                                                                info && !info.marketplace ?
                                                                    <Button
                                                                        className='btn-azul-basico'
                                                                        onClick={handleActa}>
                                                                        {event?.act ? 'Editar acta' : 'Registrar acta'}
                                                                    </Button> :
                                                                    <span></span>
                                                            }
                                                        </Col>
                                                        <Modal
                                                            className='modales-plan'
                                                            title="Registrar acta"
                                                            centered
                                                            visible={showActa}
                                                            onOk={() => setShowActa(false)}
                                                            onCancel={() => setShowActa(false)}
                                                            width={600}
                                                        >
                                                            <ActaForm event={event} id={event?.id}
                                                                      slug={info.slug} users={users}
                                                                      setVisible={setShowActa}/>
                                                        </Modal>
                                                        <Modal
                                                            className='modales-plan'
                                                            title="Editar acta"
                                                            centered
                                                            visible={showActaEdit}
                                                            onOk={() => setShowActaEdit(false)}
                                                            onCancel={() => setShowActaEdit(false)}
                                                            width={600}
                                                        >
                                                            <ActaFormEdit event={event} id={event?.id}
                                                                          slug={info.slug} users={users}
                                                                          acta_info={acta_info}
                                                                          setVisible={setShowActaEdit}
                                                                          setActaInfo={setActaInfo}
                                                                          actividadesActa={actividadesActa}
                                                                          setActividadesActa={setActividadesActa}
                                                                          idsAsistentes={idsAsistentes}

                                                            />
                                                        </Modal>
                                                    </Row>
                                                </>
                                            }

                                        </Col>
                                    </Row>
                                </div> :

                                (info && info.marketplace) ?
                                    <div>
                                        <Row>
                                            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                                <Row>
                                                    <Col xl={20} lg={20} md={20} sm={20} xs={19}>
                                                        <h6><strong>{info.text}</strong></h6>
                                                    </Col>
                                                    <Col xl={4} lg={4} md={4} sm={4} xs={5}>
                                                        {
                                                            (!status && info?.marketplace && !info?.estado || status && info?.marketplace && !info?.estado && info.comprador) ?
                                                                <a href={`${URL_BASE}/payu/compra/${info.slug}`}
                                                                   target="_blank" rel="noopener noreferrer">
                                                                    <Button title='Ir a pay u'
                                                                            className='btn-verde-basico' block
                                                                            onClick={toggle}>Pagar</Button>
                                                                </a> :
                                                                <Button className='btn-verde-basico' block
                                                                        title={"Ir a zoom"}
                                                                        onClick={link_zoom_create(event_marketplace, status, entidad)}>
                                                                    <FontAwesomeIcon icon={faVideo}/>
                                                                </Button>
                                                        }
                                                    </Col>
                                                </Row>
                                                <Divider/>
                                                <Row gutter={[8, 8]}>
                                                    <Col xl={11} lg={11} md={11} sm={11} xs={11}>
                                                        <p><strong>Marketplace</strong></p>
                                                    </Col>
                                                    <Divider type='vertical' style={{height: '40px'}}/>
                                                    <Col xl={12} lg={12} md={12} sm={11} xs={11}>
                                                        <p><strong>Hora </strong> <br/> <Moment format="h:mm A z" utc
                                                                                                local>{moment(event_marketplace.fecha_inicio).local('America/Bogota')}</Moment> - <Moment
                                                            format="h:mm A z" utc
                                                            local>{moment(event_marketplace.fecha_fin).local('America/Bogota')}</Moment>
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <Divider style={{marginBottom: '2%', marginTop: '1%'}}/>
                                                <Row gutter={[8, 8]}>
                                                    <Col xl={11} lg={11} md={11} sm={11} xs={11}>
                                                        <p><strong>{et}</strong></p>
                                                        <p>{event_marketplace ? event_marketplace.usuario : info.text}</p>
                                                    </Col>
                                                    <Divider type='vertical' style={{height: '60px'}}/>
                                                    <Col xl={12} lg={12} md={12} sm={11} xs={11}>
                                                        <p><strong>{mt}</strong></p>
                                                        <p>{event_marketplace.mentor ? event_marketplace.mentor : ''}</p>
                                                    </Col>
                                                </Row>

                                            </Col>
                                        </Row>

                                        <Row justify='end' gutter={[8, 8]}>
                                            <Col className='text-right align-content-end d-inline'>
                                                {
                                                    info.calificado === true ?
                                                        (info.comprador || !status) ?
                                                            <>
                                                                <Divider style={{marginBottom: '2%', marginTop: '1%'}}/>
                                                                <Button className='btn-calificar-sesion'
                                                                        disabled
                                                                        onClick={uploaReviws(info.id, info.slug)
                                                                        }>
                                                                    {
                                                                        info.calificado === true || eventMarket || event_marketplace?.calificado ?
                                                                            <BsCheckCircle color='green'
                                                                                           className='mr-2'/>
                                                                            :
                                                                            <BsCircle color='red'
                                                                                      className='mr-2 mb-1'/>
                                                                    }
                                                                    Sesión calificada
                                                                </Button>
                                                            </> :
                                                            <span/> :
                                                        (info.comprador || !status) ?
                                                            <>
                                                                <Divider style={{marginBottom: '2%', marginTop: '1%'}}/>
                                                                <Button className='btn-calificar-sesion'
                                                                        onClick={uploaReviws(info.id, info.slug)
                                                                        }>
                                                                    {
                                                                        info.calificado === true || eventMarket || event_marketplace?.calificado ?
                                                                            <BsCheckCircle color='green'
                                                                                           className='mr-2'/>
                                                                            :
                                                                            <BsCircle color='red'
                                                                                      className='mr-2 mb-1'/>
                                                                    }
                                                                    Calificar sesión
                                                                </Button>
                                                            </> :
                                                            <span/>
                                                }

                                            </Col>
                                        </Row>
                                    </div> :
                                    <span></span>
                        }
                    </Col>
                </Row>
                <Divider style={{marginBottom: '2%', marginTop: '2%'}}/>
                <Row gutter={[8, 8]} justify='end'>
                    <BasicModalWhite show={showModal} setShow={setShowModal}>
                        {contentModal}
                    </BasicModalWhite>
                    <BasicModalWhite show={showModalEditAntiguo} setShow={setShowModalEditAntiguo}>
                        {contentModal}
                    </BasicModalWhite>

                    <Col xl={8} lg={8} md={8} sm={!info?.marketplace ? 10 : 0} xs={!info?.marketplace ? 13 : 0}>
                        {
                            !info?.marketplace ?
                                <Link to={`/calendar/event/files/${info.slug}`}>
                                    <Button className='btn-azul-basico' block
                                            onClick={toggle}>
                                        Archivos de la sesión
                                    </Button>
                                </Link> :
                                <span></span>
                        }
                    </Col>
                    <Col xl={7} lg={7} md={8} sm={8} xs={11}>
                        <Button className='btn-azul-basico' block
                                onClick={downloadVid} loading={loading}>Descargar video</Button>
                    </Col>

                    {
                        entidad ?
                            event && event.tema !== '' ?
                            <Col xl={4} lg={4} md={4} sm={5} xs={7}>
                                <Button className='btn-azul-basico' block
                                        onClick={openModalEdit}
                                >Editar
                                </Button>
                            </Col>:
                                <span/>
                            :
                            <></>
                    }

                    <Modal
                        className='modales-plan'
                        title="Editar evento"
                        centered
                        visible={showModalEdit}
                        onOk={() => setShowModalEdit(false)}
                        onCancel={() => setShowModalEdit(false)}
                        width={700}
                    >
                        {
                            // desde la entidad
                            entidad ?
                                <EventEditForm setVisibleEventInfo={setVisibleEventInfo} setVisibleEdit={setShowModalEdit} event={event} id={info.slug}/>
                                :
                                <></>
                        }
                    </Modal>
                    {
                        status ?

                                    event && event.tema !== '' ?
                                    <Col xl={4} lg={4} md={4} sm={5} xs={7}>
                                        <Button
                                            className='btn-azul-basico' block
                                            onClick={() => {
                                                if (info && info.marketplace) {
                                                    openModalEditAntiguo(<EventEditUsuarioForm event={event_marketplace}
                                                                                               id={info.slug}
                                                                                               setShowModal={setShowModalEditAntiguo}></EventEditUsuarioForm>)
                                                } else if (event && event.tema === '') {
                                                    openModalEditMentor()
                                                } else {
                                                    openModalEditMentor()
                                                }
                                            }
                                            }
                                        >
                                            Editar
                                        </Button>
                                         </Col>:
                                        <span></span>
                            :
                            <span></span>

                    }
                    <Modal
                        className='modales-plan'
                        title="Editar evento"
                        centered
                        visible={showModalEditMentor}
                        onOk={() => setShowModalEditMentor(false)}
                        onCancel={() => setShowModalEditMentor(false)}
                        width={700}
                    >
                        <EventEditMentorForm event={event} closeModal={closeModal} id={info.slug} setVisibleEventInfo={setVisibleEventInfo}
                                             program_id={event?.programa} setVisible2={setShowModalEditMentor}/>
                    </Modal>
                    <Modal
                        className='modales-plan'
                        title="Editar evento"
                        centered
                        visible={showModalEditMentor1}
                        onOk={() => setShowModalEditMentor1(false)}
                        onCancel={() => setShowModalEditMentor1(false)}
                        width={700}
                    >
                        <EventEditUsuarioNormalForm event={event} id={info.slug}
                                                    setVisble={setShowModalEditMentor1}></EventEditUsuarioNormalForm>
                    </Modal>

                    {

                        !status && !entidad && (info?.marketplace || event?.tema === '') ?
                            <Col xl={4} lg={4} md={4} sm={5} xs={7}>
                                <Button
                                    className='btn-azul-basico' block
                                    onClick={() => {
                                        if (info && info.marketplace) {
                                            openModalEditAntiguo(<EventEditUsuarioForm event={event_marketplace}
                                                                                       id={info.slug}
                                                                                       setShowModal={setShowModalEditAntiguo}></EventEditUsuarioForm>)
                                        } else if (event && event.tema === '') {
                                            openModalEditEmprendedor()
                                        }
                                    }
                                    }
                                >
                                    Editar
                                </Button>
                            </Col> :
                            <span></span>

                    }
                    <Modal
                        className='modales-plan'
                        title="Editar evento"
                        centered
                        visible={showModalEditEmprendedor}
                        onOk={() => setShowModalEditEmprendedor(false)}
                        onCancel={() => setShowModalEditEmprendedor(false)}
                        width={700}
                    >
                        <EventEditUsuarioNormalForm event={event}
                                                    id={info.slug} setVisible={setShowModalEditEmprendedor}
                                                    closeModal={closeModal}
                                                    setEditar={setEditar}></EventEditUsuarioNormalForm>
                    </Modal>
                </Row>
            </Col>
        </Row>
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
    })(CalendarEventInfo));