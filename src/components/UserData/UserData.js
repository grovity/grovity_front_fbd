import {fetchMentorshipsMentor} from "../../actions/fetchMentorships";
import {getmentorshipsbymentor} from "../../selectors/mentorships";
import {withRouter} from 'react-router-dom';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {Col, Row} from 'reactstrap';
import './style.css'
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.scss';
import Moment from 'react-moment';
import moment from 'moment';

class UserData extends Component {
    componentDidMount() {
        this.props.fetchMentorshipsMentor(this.props.mentor.username)
    }

    render() {
        return (
            <div id="content">
                <div className="container">
                    <Row className='align-items-center'>
                        <Col id="colmentoriadetail" className="col-md-6 text-center">
                            <div className='d-inline-block text-center'>
                                <img id="mentor_img" src={this.props.mentor.img_usuario}
                                     className="iconshome_institution" alt=""/>

                                <h5 className="nombrementor2">{this.props.mentor.first_name} {this.props.mentor.last_name}</h5>
                                <h5 className="nombrementor2">{this.props.mentor.email}</h5>
                                <mobiscroll.Rating disabled
                                                   value={this.props.calificacion ? this.props.calificacion.calificacion : 0}>
                                </mobiscroll.Rating>
                                {
                                    this.props.calificacion.calificaciones ?
                                        this.props.calificacion.calificaciones.slice(-4).map(c =>
                                            <p>{c}</p>
                                        ) :
                                        []
                                }
                            </div>
                        </Col>

                        <Col className="col-md-6">
                            <h4 className="text-left ml-4 mt-4">Perfil:</h4>
                            <p className="text-left ml-4 mt-0 mr-2" style={{maxHeight: "7.5rem", overflow:"hidden", textOverflow:"clip", wordWrap:"break-word"}} title={this.props.mentor.descripcion}>{this.props.mentor.descripcion}</p>
                            <ul>
                                <p className="text-left ml-4 mr-2">{this.props.mentorias}</p>
                            </ul>
                            <h4 className="text-left ml-4 mt-4">Sesiones disponibles:</h4>
                            <ul>
                                {
                                    Array.isArray(this.props.events) ?
                                        this.props.events.slice(0,3).map(c =>
                                            <li className="text-left ml-4 mr-2"> {c.nombre} - <Moment format="YYYY/MM/DD h:mm A z" utc local>{moment(c.fecha_inicio).local('America/Bogota')}</Moment></li>
                                        ) :
                                        "Este mentor aún no tiene sesiones"
                                }
                            </ul>
                        </Col>

                        <Col md='12' className='text-center mt-5'>
                            <button id="uservolver" onClick={this.props.onBack}>
                                Volver
                            </button>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state, props) => ({
    mentorias: getmentorshipsbymentor(state),
    events: state.events_mentor
});

export default withRouter(connect(mapStateToProps, {fetchMentorshipsMentor})(UserData));
