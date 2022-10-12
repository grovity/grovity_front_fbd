import React, {useEffect, useState} from 'react'
import {Card, Col, Row, Button, Tag, Modal} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './CardItemAntEvent.scss'
import {faVideo, faTv, faFile} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Moment from 'react-moment';
import moment from 'moment';
import {getStatusMentor} from "../../selectors/users";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import link_zoom_create from "../../helpers/zoom";
import ModalReviews from "../ModalEvent/ModalReviews";
import CheckAsistencia from "../CheckAsistencia/CheckAsistencia";
import ModalFile from "../ModalEvent/ModalFIle";
import ActFirm from "../ActaFirm/ActaFirm";
import {fetchUsersbyEvent} from "../../actions/fetchUsers";
import {toast} from "react-toastify";
import BasicModalWhite from "../BasicModalWhite/BasicModalWhite";
import {getStatusEntidad} from "../../selectors/institutions";
import {URL_BASE} from "../../constants";
import ActaEntidad from "../ActaForm/ActaEntidad";
import ActaForm from "../ActaForm/ActaForm";
import ActaFormEdit from "../ActaForm/ActaFormEdit";
import useFetch from "../../hooks/useFetch";
import {fetchEventsbyId} from "../../actions/fetchEvents";
import {
    convertUtcToTimeZone,
    convertTimeZoneToUtc,
    colTimeZonetoOtherTimeZone,
  } from "../../helpers/timeZone";
import AllCountryWithTimeZone, {getTimeZone} from "../../helpers/countrys";
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


const CardItemEvent = (props) => {
    const {event, status, users, key, entidad} = props
    const [showRws, setShowRws] = useState(false)
    const [modalRws, setModalRws] = useState(false)
    const [showFile, setShowFile] = useState(false)
    const [modalFile, setModalFile] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [contentModal, setContentModal] = useState(null)
    const [evento_id, setEventoId] = useState(null)
    const [slug, setSlug] = useState(null)
    const [showActa, setShowActa] = useState(false);
    const [showActaEdit, setShowActaEdit] = useState(false);
    const [actaEntidad, setActaEntidad] = useState(false);
    const [acta_info, setActaInfo] = useState(null)
    const [actividadesActa, setActividadesActa] = useState(null)
    const [idsAsistentes, setIdsAsistentes] = useState(null);
    const [eventMarket, setEventMarket] = useState(false);
    const [eventInfo, setEventInfo] = useState(false);

    let timeZone = getTimeZone()
    timeZone  = AllCountryWithTimeZone.find( pais => pais.label === timeZone);
    const {get} = useFetch(URL_BASE)

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
        const eventData = async () => {
            let event_info;
            if (event.slug && !event.marketplace) {
                event_info= await props.fetchEventsbyId(event.slug, false)
                setEventInfo(event_info.payload[0])
            } else if (event.slug && event.marketplace) {
              event_info=await props.fetchEventsbyId(event.slug, true)

                setEventInfo(event_info.payload)
            }


        }

        eventData()


    }, [props.fetchEventsbyId, event.slug])

    useEffect(() => {
        if (acta_info?.assistants) {
            let arr = []
            acta_info.assistants.forEach(asistente => {
                arr.push(asistente.id)
            })
            setIdsAsistentes(() => arr)
        }
    }, [acta_info])

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

    const openModalRws = async (id, slug) => {
        setShowRws(true)
        setModalRws(true)
        setEventoId(id)
        setSlug(slug)
    };

    const uploadReviews = (id, slug) => {
        return async (e) => {
            await openModalRws(id, slug)
        }

    }


    const toggle = () => {
        setShowRws(false)
        setModalRws(false)
        setShowFile(false)
        setModalFile(false)
    }

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

    const openModalFile = async (slug) => {
        setShowFile(true)
        setModalFile(true)
        setEventoId(slug)

    };

    const uploadFiles = (slug) => {
        return async (e) => {
            await openModalFile(slug)
        }

    }

    const openModal = async (content) => {
        setShowModal(true)
        setContentModal(content)

    };


    return (
        <Col xl={12} lg={24} xs={24} md={24} style={{paddingRight: 0}} key={key}>
            <ModalReviews show={showRws} modal={modalRws} toggle={toggle}
                          evento={evento_id} marketplace={event && event.marketplace} username={slug}
            setEventMarket={setEventMarket}></ModalReviews>
            <ModalFile show={showFile} modal={modalFile} toggle={toggle}
                       evento={evento_id}
            />
            {/* <BasicModal show={showModal} setShow={setShowModal}>
                {contentModal}
            </BasicModal> */}
            <BasicModalWhite show={showModal} setShow={setShowModal}>
                {contentModal}
            </BasicModalWhite>
            <Card>
                <Row>
                    <Col xl={24} lg={24} xs={24} md={24} id='col-events-name'>
                        <h5>{(status && !event.marketplace) && event && event.nombre}</h5>

                        {
                            (event.marketplace && !event.comprador) && (
                                <h5 title={event.observaciones}> Usuario
                                    - {(status && event.marketplace && !event.comprador) && event && event.usuario}</h5>
                            )
                        }


                        {
                            (status && event.marketplace && event.comprador) && (
                                <h5>Grovity
                                    - {(status && event.marketplace && event.comprador) && event && event.mentor}</h5>
                            )
                        }

                        <h5>{(!status) && event && event.nombre}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col xl={11} lg={12} xs={24} md={12} id='col-events'>
                        <p><strong>Mentor: </strong>
                            {
                                event.marketplace ?
                                    event && event.mentor :
                                    event && event.nombre_mentor
                            }

                        </p>
                        <p><strong>Inicio: </strong>
                            {
                                event.marketplace ?
                                    <Moment format="DD/MM  h:mm A z" utc
                                            local>{moment( colTimeZonetoOtherTimeZone(status ? event && event.fecha_inicio : event && event.fecha_inicio, timeZone.value)).local('America/Bogota')}</Moment> :
                                    <Moment format="DD/MM  h:mm A z" utc
                                            local>{moment(colTimeZonetoOtherTimeZone(status ? event && event.start : event && event.inicio, timeZone.value)).local('America/Bogota')}</Moment>


                            }

                        </p>
                        <p><strong>Fin: </strong>
                            {
                                event.marketplace ?
                                    <Moment format="DD/MM  h:mm A z" utc
                                            local>{moment(colTimeZonetoOtherTimeZone(status ? event && event.fecha_fin : event && event.fecha_fin, timeZone.value)).local('America/Bogota')}</Moment> :
                                    <Moment format="DD/MM  h:mm A z" utc
                                            local>{moment(colTimeZonetoOtherTimeZone(status ? event && event.end : event && event.fin, timeZone.value)).local('America/Bogota')}</Moment>


                            }

                        </p>
                        {
                            ((!status && event?.marketplace && !event?.estado) || (status && event?.marketplace && !event?.estado && event?.comprador)) ?
                                <a href={`${URL_BASE}/payu/compra/${event.slug}`} target="_blank"
                                   rel="noopener noreferrer">
                                    <Button title='Ir a pay u' type='primary'
                                            className='btn-verde-basico mt-2'>Pagar</Button>
                                </a>
                                :
                                <span></span>
                        }


                    </Col>
                    <Col xl={13} lg={12} xs={24} md={12} id='col-programs'>
                        <Row justify={!event.marketplace ? 'start' : 'center'} gutter={[8, 8]}>
                            <Col xl={11} lg={11} xs={11} md={11} style={{marginBottom: '0%'}}>
                                <Button block
                                    // className={!event.marketplace ? 'btn-verde-basico' : 
                                    //             ((!status && event?.marketplace) || (status && event?.marketplace && !event?.estado && event?.comprador)) ? 'button-card-market btn-verde-basico' : 'button-card-market btn-verde-basico'}
                                        className='btn-verde-basico'
                                        onClick={link_zoom_create(event, status, entidad)} type='primary'
                                        title='Ir a zoom'>
                                    <FontAwesomeIcon className='icon-white'
                                                     icon={faVideo}></FontAwesomeIcon>
                                </Button>
                            </Col>
                            {
                                !event.marketplace ?
                                    <Col xl={11} lg={11} xs={11} md={11} style={{marginBottom: '0%'}}>
                                        <Link to={`/calendar/event/files/${event && event.slug}`}>
                                            <Button className='btn-verde-basico' block
                                                    title='Ver documentos de la sesión' type='primary'>
                                                <FontAwesomeIcon className='icon-white' icon={faFile}></FontAwesomeIcon>
                                            </Button>
                                        </Link>
                                    </Col> :
                                    <span style={{height: '0px'}}></span>
                            }
                        </Row>
                        <Row>
                            <Col xl={22} lg={22} xs={22} md={22}>
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
                                              slug={event.slug} users={users}
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
                                                  slug={event.slug} users={users}
                                                  acta_info={acta_info}
                                                  setVisible={setShowActaEdit}
                                                  setActaInfo={setActaInfo}
                                                  actividadesActa={actividadesActa}
                                                  setActividadesActa={setActividadesActa}
                                                  idsAsistentes={idsAsistentes}

                                    />
                                </Modal>
                                {
                                    eventInfo && !eventInfo.marketplace && status ?
                                        <Button className='btn-azul-basico' type='primary' block justify='start'
                                                onClick={!status ? uploadReviews(event && event.id, event && event.slug) : handleActa}>
                                            {
                                                status && (
                                                    <CheckAsistencia
                                                id={event && event.slug}
                                                status={status}
                                                event={event}>
                                            </CheckAsistencia>)


                                            }</Button>
                                            :
                                        (!status  || (status && eventInfo.comprador)) ?
                                            !eventInfo?.calificado ?
                                                <Button className='btn-azul-basico' type='primary' block
                                                        justify='center'
                                                        onClick={!status ? uploadReviews(event && event.id, event && event.slug) : handleActa}>
                                                    Calificar Evento</Button> :
                                                <Button disabled={true} className='btn-azul-basico' type='primary' block
                                                        justify='center'
                                                        onClick={!status ? uploadReviews(event && event.id, event && event.slug) : handleActa}>
                                                    Evento calificado</Button>

                                            :

                                            <span></span>
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row id={'tags-sesion'}>
                    {
                        (event?.marketplace &&
                            Array.isArray(event.tags) && (
                                event.tags.map(tag =>
                                    <Tag
                                        color={colors[Math.floor(Math.random() * 15)]}
                                    >{tag.name}</Tag>
                                )
                            )
                        )
                    }
                </Row>
            </Card>
        </Col>


    )

}

const mapStateToProps = state => ({
    status: getStatusMentor(state),
    users: state.users_event,
    entidad: getStatusEntidad(state),
});

export default withRouter(connect(mapStateToProps, {
    fetchUsersbyEvent,
    fetchEventsbyId
})(CardItemEvent));

