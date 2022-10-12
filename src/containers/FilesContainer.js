import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';
import {getIdInstitution, getStatusEntidad} from "../selectors/institutions";
import {loadUser} from "../actions/auth";
import FilesList from "../components/FIlesList/FIlesList";
import {fetchFilesByEvent} from "../actions/files";
import {getStatusMentor} from "../selectors/users";
import {Spin, Button, Layout, Divider, Col, Row} from "antd";
import ModalFile from "../components/ModalEvent/ModalFIle";
import ModalUrl from "../components/ModalEvent/ModalUrl";
import {getEventId} from "../selectors/events";
import {fetchEventsbyId} from "../actions/fetchEvents";
import AppFrame from "../components/AppFrame/AppFrame";

const {Header, Content} = Layout;

class FilesContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showFile: false,
            modalFile: false,
            showUrl: false,
            modalUrl: false,
            evento: this.props.match.params.id,
            loading: false,
        };
    }

    async componentDidMount() {
        this.setState({
            loading: true,
        })
        await this.props.fetchFilesByEvent(this.props.match.params.id)
        await this.props.fetchEventsbyId(this.props.match.params.id)
        this.setState({
            loading: false,
        })
    }

    toggle = async (event, inst) => {
        this.setState({
            showFile: false,
            modalFile: false,
            showUrl: false,
            modalUrl: false,
            showRws: false,
            modalRws: false,
        })

       await this.props.fetchFilesByEvent(this.props.match.params.id)
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
            await this.openModalFile(this.props.event_id)
        }

    }

    openModalUrl = async (id) => {
        await this.setState({
            showUrl: true,
            modalUrl: true,
            evento: this.props.event_id
        })

    };


    uploadUrls = () => {
        return async (e) => {
            await this.openModalUrl(this.state.evento)
        }

    }


    renderBody = files => (
        <>   
            <ModalFile show={this.state.showFile} modal={this.state.modalFile} toggle={this.toggle}
                       evento={this.props.event_id} event_id={this.props.event_id}/>
            <ModalUrl show={this.state.showUrl} modal={this.state.modalUrl} toggle={this.toggle}
                      evento={this.state.evento}/>

        {this.state.loading && (
            <div className='position-absolute d-flex justify-content-center align-items-center w-100 h-100'
                style={{left: '0', top: '0'}}>
                <Spin size='large' className='mt-5'/>
            </div>
        )}
        {
            !this.state.loading && (
                <Layout id='program-emprendedor'>
                    <Header>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>    
                            <Col lg={13} md={10} xs={24} xl={15}>
                                <h3>Archivos de la sesión</h3>
                            </Col>
                            <Col lg={4} md={5} xs={10} xl={3} className='btns-header'>
                                    <Button className='btn-verde-basico' block onClick={this.uploadFiles()}>
                                        Subir archivos
                                    </Button>
                            </Col>
                            <Col lg={4} md={5} xs={7} xl={3} className='btns-header'>
                                    <Button className='btn-verde-basico' block onClick={this.uploadUrls()}>
                                        Subir URLs
                                    </Button>
                            </Col>

                            <Col lg={3} md={4} xs={7} xl={3} className='btns-header'>
                                <Button className='btn-verde-basico' block
                                        onClick={() => this.props.history.goBack()}>
                                    Volver
                                </Button>
                            </Col>
                            <Divider className='header-marketplace'/>
                        </Row>
                    </Header>
                    <Content style={{overflow: 'hidden'}} className='calendar-container'>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col lg={24} md={24} xs={24}>
                                <FilesList id_evento={this.props.match.params.id} files={files} status={this.props.status} entidad={this.props.entidad}/>
                            </Col>
                        </Row>
                    </Content>
            </Layout>
        )
    }
    </>   
    );

    render() {
        return (
            <AppFrame>
                {this.renderBody(this.props.files)}
            </AppFrame>
        )
    }
}

FilesContainer.propTypes = {
    files: PropTypes.array.isRequired,
};

FilesContainer.defaultProps = {
    files: []
};

const mapStateToProps = state => ({
    files: state.files_event,
    id_institution: getIdInstitution(state),
    status: getStatusMentor(state),
    entidad: getStatusEntidad(state),
    event_id: getEventId(state)
});

export default withRouter(connect(mapStateToProps, {
    fetchFilesByEvent,
    loadUser,
    fetchEventsbyId
})(FilesContainer));
