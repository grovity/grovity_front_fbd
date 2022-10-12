import React, {Component, Fragment} from 'react'
import 'react-table-filter/lib/styles.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import Moment from 'react-moment';
import moment from 'moment';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {fetchCalifiacionbyMentor} from "../../actions/fetchMentors";
import {URL_BASE} from "../../constants";
import {toast} from "react-toastify";
import {faVideo, faTv, faFile, faLink} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CheckAsistencia from "../CheckAsistencia/CheckAsistencia";
import ActFirm from "../ActaFirm/ActaFirm";
import {Button} from "react-bootstrap";
import BasicModal from "../BasicModal/BasicModal";
import {fetchUsersbyEvent} from "../../actions/fetchUsers";
import {Spin} from "antd";
import ModalFile from "../ModalEvent/ModalFIle";
import ModalUrl from "../ModalEvent/ModalUrl";
import ModalReviews from "../ModalEvent/ModalReviews";
import {Link} from "react-router-dom";
import sin_sesiones from "../../assets/images/sinSesiones.jpg";
import './Filter_table.scss'


const columns = [{
    dataField: 'nombre',
    text: 'Nombre de la sesión',
    sort: true,
    filter: textFilter()
}, {
    dataField: 'fecha_inicio',
    text: 'Fecha de la sesión',
    sort: true
}, {
    filter: textFilter(),
    dataField: 'mentor',
    text: 'Mentor',
    sort: true,
}, {
    dataField: 'url_zoom',
    text: 'Opciones del evento',
    sort: true,
}, {
    dataField: 'calificacion',
    text: 'Calificación',
    sort: true,
},

];

const columns_mentor = [{
    dataField: 'nombre',
    text: 'Mis sesiones',
    sort: true,
    filter: textFilter()
}, {
    dataField: 'fecha_inicio',
    text: 'Fecha de la sesión',
}, {
    dataField: 'url_zoom',
    text: 'Opciones del evento',
    sort: true,
}, {
    dataField: 'confirmar',
    text: 'Confirmación',
    sort: true,
},

];

class FilterTable_user extends Component {
    // rowEvents = {
    //     onClick: (e, row, rowIndex) => {
    //         window.location.href = `${this.props.urlPath}${row.username}`
    //     }
    // };

    constructor(props) {
        super(props);

        this.state = {
            calificacion: 1,
            modal: false,
            show: false,
            fill: 0,
            flag: 0,
            showModal: false,
            contentModal: null,
            showFile: false,
            modalFile: false,
            showUrl: false,
            modalUrl: false,
            evento: null,
            username: null,
            modalRws: false,
            showRws: false

        };
    }

    async componentDidMount() {
        let value = await this.props.fetchCalifiacionbyMentor(this.props.username)
        value = value.payload.calificacion

        this.setState({
            fill: value,
        })

        if (!value) {
            this.handleSubmit(value)
        }
    }

    handleSubmit = (values) => {
        if (this.state.flag) {
            this.setState({
                show: true,
                modal: true,
                calificacion: values,
            })
        }
        this.setState({
            flag: 1,
        })
    }

    toggle = () => {
        this.setState({
            show: false,
            modal: false
        })
    }

    link_zoom_create = (obj, status, id) => {
        if (status) {
            return async (e) => {
                const url_zoom = await fetch(`${URL_BASE}/calendario/evento/${id}/iniciar`, {
                    headers: new Headers({
                        'Authorization': `Token ${localStorage.getItem("token")}`
                    }),
                });
                const json = await url_zoom.json();

                if (url_zoom.status === 404) {
                    toast.error("Problemas con la red, por favor intenta de nuevo")
                }
                if (json.Error === false) {
                    window.open(`${json.url_mentor}`, "_blank")
                } else if (json.Msj === 'Este evento ya fue inicializado') {
                    window.open(`${json.url_mentor}`, "_blank")
                } else {
                    toast.error(`${json.Msj}: El inicio debe estar en un rango de 2 horas antes`)
                }

            }
        } else {
            return (e) => {
                if (obj.url_zoom) {
                    window.open(`${obj.url_zoom}`, "_blank")
                } else {
                    toast.error("La sesión aún no ha sido inicializada, por favor intente nuevamente en un momento")
                    let reload = () => {
                        window.location.reload()
                    }
                    setTimeout(reload, 3000)
                }
            }
        }

    }

    setShowModal = () => {
        this.setState({
            showModal: false
        })
    }
    openModal = async (content) => {
        await this.setState({
            showModal: true,
            contentModal: content,
        })

    };

    uploadActa = (id, users, slug) => {

        return async (e) => {
            let asistentes = await this.props.fetchUsersbyEvent(slug)
            if (asistentes.payload) {
                await this.openModal(<ActFirm id={id} slug={slug} users={asistentes.payload}
                ></ActFirm>)
            } else {
                await this.openModal(<Spin></Spin>)

            }

        }

    }
    toggle = (event, inst) => {
        this.setState({
            showFile: false,
            modalFile: false,
            showUrl: false,
            modalUrl: false,
            showRws: false,
            modalRws: false,
        })

    }

    openModalFile = async (id) => {
        await this.setState({
            showFile: true,
            modalFile: true,
            evento: id,
        })

    };

    uploadFiles = (id) => {
        return async (e) => {
            await this.openModalFile(id)
        }

    }

    openModalUrl = async (id) => {
        await this.setState({
            showUrl: true,
            modalUrl: true,
            evento: id
        })

    };


    uploadUrls = (id) => {
        return async (e) => {
            await this.openModalUrl(id)
        }

    }

    openModalRws = async (id, slug) => {
        await this.setState({
            showRws: true,
            modalRws: true,
            evento: id,
            username: slug
        })

    };

    uploaReviws = (id, slug) => {
        return async (e) => {
            await this.openModalRws(id, slug)
        }

    }


    render() {

        return (

            <div className='mt-5'>
                <BasicModal show={this.state.showModal} setShow={this.setShowModal}>
                    {this.state.contentModal}
                </BasicModal>
                <ModalFile show={this.state.showFile} modal={this.state.modalFile} toggle={this.toggle}
                           evento={this.state.evento}
                />
                <ModalUrl show={this.state.showUrl} modal={this.state.modalUrl} toggle={this.toggle}
                          evento={this.state.evento}/>
                <ModalReviews show={this.state.showRws} modal={this.state.modalRws} toggle={this.toggle}
                              evento={this.state.evento} username={this.state.username}></ModalReviews>
                <h3 className='mb-4 text-center titulosazul pt-5'>Sesiones de la semana actual</h3>
                {this.props.events['eventos'].length !== 0 ?
                    <BootstrapTable id="tableUsers mb-3" keyField='id'
                                    data={Array.isArray(this.props.events['eventos']) ? this.props.events['eventos'].map(c => (
                                            {
                                                nombre: `${c.nombre}`,
                                                fecha_inicio: <Fragment><p  className='d-inline mr-1'>
                                                    <strong>Inicio:</strong>
                                                </p><Moment format="YYYY/MM/DD h:mm A z" utc
                                                            local>{moment(this.props.status ? c.start : c.inicio).local('America/Bogota')}</Moment>
                                                    <p className='d-inline mr-1'><strong>Fin:</strong></p><Moment
                                                        format="YYYY/MM/DD h:mm A z" utc
                                                        local>{moment(this.props.status ? c.end : c.fin).local('America/Bogota')}</Moment>
                                                </Fragment>,
                                                url_zoom: <Fragment><strong className='btn btn-outline-success'
                                                                               title='Conectarse a la sesión'
                                                                               style={{color: 'black'}} name={c.id}
                                                                               onClick={this.link_zoom_create(c, this.props.status, c.slug)}><FontAwesomeIcon
                                                    icon={faVideo}/></strong>
                                                    <a className='btn btn-outline-dark m-2' target={"_blank"}
                                                       title='Usar tablero'
                                                       href={c.miro_url}>
                                                        <FontAwesomeIcon icon={faTv}/>
                                                    </a>
                                                    <a className='btn btn-outline-info'
                                                       href={`/calendar/event/files/${c.slug}`}>
                                                        Ver archivos
                                                    </a>
                                                </Fragment>
                                                ,
                                                confirmar: <Fragment><strong><a className='btn btn-outline-success'
                                                                                title='Adjuntar archivo'
                                                                                style={{color: 'black'}} name={c.id}
                                                                                onClick={this.uploadFiles(c.id)}><FontAwesomeIcon
                                                    icon={faFile}/></a></strong>
                                                    <a className='btn btn-outline-dark m-2' target={"_blank"}
                                                       title='Subir url'
                                                       onClick={this.uploadUrls(c.id)}>
                                                        <FontAwesomeIcon icon={faLink}/>
                                                    </a><a className='btn btn-outline-success'
                                                           style={{color: 'black'}}
                                                           onClick={this.uploadActa(c.id, this.props.users, c.slug)}>{"Confirmar"}</a>
                                                    <CheckAsistencia
                                                        id={c.slug}>
                                                    </CheckAsistencia>
                                                </Fragment>,
                                                mentor: `${c.nombre_mentor ? c.nombre_mentor : 'Grovity'}`,
                                                calificacion: <a className='btn btn-outline-success'
                                                                 onClick={this.uploaReviws(c.id, c.slug)}>
                                                    Calificar la sesión

                                                </a>,
                                            }
                                        )
                                    ) : []
                                    }
                                    columns={this.props.status ? columns_mentor : columns} filter={filterFactory()}
                                    pagination={paginationFactory()}/> :
                    <div className='text-center m-auto'>

                        <img id='sin-sesiones' src={sin_sesiones}/>

                    </div>

                }

                <Link to='/calendar'>
                    <Button className='mb-5 w-100'
                            style={{backgroundColor: '#05495c', border: 'none'}}>Ver más sesiones</Button>
                </Link>

            </div>

        )
    }

}

FilterTable_user.propTypes = {
    events: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => ({
    cal: state.calificacion_mentor.calificacion,
    users: state.users_event,
});

export default connect(mapStateToProps, {
    fetchCalifiacionbyMentor,
    fetchUsersbyEvent
})(FilterTable_user);