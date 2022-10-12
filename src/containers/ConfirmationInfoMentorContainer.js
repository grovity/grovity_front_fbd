import React, {Component, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';
import {fetchUsersbyEvent} from "../actions/fetchUsers";
import SesionParticipantsList from "../components/UserList/SesionParticipantsList";
import {setAlert} from "../actions/alert";
import ModalFile from "../components/ModalEvent/ModalFIle";
import {getEventbyId} from "../api";
import {fetchEventsbyId} from "../actions/fetchEvents";
import ModalUrl from "../components/ModalEvent/ModalUrl";
import BasicModal from "../components/BasicModal/BasicModal";
import ActFirm from "../components/ActaFirm/ActaFirm";
import {Button} from "react-bootstrap";
import {Spin} from "antd";


class ConfirmationInfoMentorContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            myEvents: [],
            show: false,
            modal: false,
            info: "",
            array_archivos: [],
            array_urls: [],
            show2: false,
            modal2: false,
            flag: false,
            showModal: false,
            contentModal: null,

        };
    }

    setShowModal = () => {
        this.setState({
            showModal: false
        })
    }
    openModal = (content) => {
        this.setState({
            showModal: true,
            contentModal: content,
        })

    };

    onEventSelect = (event, inst) => {
        this.setState({
            show: true,
            modal: true,
        })
    }

    onEventSelect2 = (event, inst) => {
        this.setState({
            show2: true,
            modal2: true,
        })
    }

    toggle = (event, inst) => {
        this.setState({
            show: false,
            modal: false,
            show2: false,
            modal2: false
        })
    }

    componentDidMount = async () => {
        let users = await this.props.fetchUsersbyEvent(this.props.match.params.id)
        await this.props.fetchEventsbyId(this.props.match.params.id)
        this.setState({
            array_archivos: await getEventbyId(this.props.match.params.id)['archivo']
        })
        users = (users.payload)
        for (let i = 0; i < Object.keys(users).length; i++) {
            if (users[i] && users[i].asistencia !== null) {
                this.setState({
                    flag: true
                })
                break;
            }
        }
    }

    handleAddNew = () => {
        this.props.history.push('users/new')
    };

    handleOnBack = () => {
        this.props.history.goBack();
    };

    uploadActa = async () => {
        this.openModal(<ActFirm goBack={this.handleOnBack} id={this.props.match.params.id}
                                array={this.props.array} array_tarea={this.props.array_tarea}
                                setShowModal={this.state.showModal}></ActFirm>)
    }
    handleSendArray = async () => {

    }

    renderBody = users => (
        <div id="content" className="d-block p-4 mentors-list text-center">
            {
                this.props.users ?
                    <SesionParticipantsList flag={this.state.flag} users={users} id={this.props.match.params.id}
                                            urlPath={'users/'}/>
                    :
                    <div id="content" className="text-center">
                        <Spin/>
                    </div>
            }

            <div className="text-center pt-3">
                <Button onClick={this.uploadActa}>
                    Confirmar evento
                </Button>
                <Button onClick={this.onEventSelect}>
                    Adjuntar documentación
                </Button>
                <Button onClick={this.onEventSelect2}>
                    Subir URLS
                </Button>
                <Link to={`/calendar/event/files/${this.props.match.params.id}`}>
                    <Button style={{backgroundColor: '#95C11F', border: '1px solid #95C11F'}}
                    className='mr-2'>
                        Ver archivos
                    </Button>
                </Link>
                <Link to={'/user'}>
                    <Button style={{backgroundColor: 'var(--secondary-color)', border: '1px solid #05495c'}}>
                        Volver
                    </Button>
                </Link>

                <ModalFile show={this.state.show} modal={this.state.modal} toggle={this.toggle}
                           info={this.state.info} entidad={this.props.entidad}
                           array_files={this.props.event ? this.props.event[0] : []} id={this.props.match.params.id}/>
                <ModalUrl show={this.state.show2} modal={this.state.modal2} toggle={this.toggle}
                          info={this.state.info} entidad={this.props.entidad}
                          array_urls={this.props.event ? this.props.event[0] : []} id={this.props.match.params.id}/>


            </div>
        </div>
    );

    render() {
        return (
            <Fragment>
                {this.renderBody(this.props.users)}
                <BasicModal show={this.state.showModal} setShow={this.setShowModal}>
                    {this.state.contentModal}
                </BasicModal>
            </Fragment>
        )
    }
}

ConfirmationInfoMentorContainer.propTypes = {
    users: PropTypes.array.isRequired,
};

ConfirmationInfoMentorContainer.defaultProps = {
    users: []
};

// para conectar users containers con el state:
const mapStateToProps = state => ({
    users: state.users_event,
    array: state.array,
    array_tarea: state.array_tarea,
    event: state.event_id
});

export default withRouter(connect(mapStateToProps,
    {
        fetchUsersbyEvent,
        setAlert,
        fetchEventsbyId
    })(ConfirmationInfoMentorContainer));