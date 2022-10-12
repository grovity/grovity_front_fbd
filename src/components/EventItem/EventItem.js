import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import mobiscroll from "@mobiscroll/react";
import ModalReviews from "../ModalEvent/ModalReviews";
import {connect} from "react-redux";
import {fetchCalifiacionbyMentor} from "../../actions/fetchMentors";
import Moment from 'react-moment';
import moment from 'moment';


class EventItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            calificacion: 1,
            modal: false,
            show: false,
            fill: 0,
            flag: 0
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

    render() {
        return (
            <tr>
                <td>{this.props.nombre}</td>
                <td>
                    <Moment format="YYYY/MM/DD h:mm A z" utc
                            local>{moment(this.props.fecha_inicio).local('America/Bogota')}</Moment>
                </td>
                <td>
                    <Moment format="YYYY/MM/DD h:mm A z" utc
                            local>{moment(this.props.fecha_fin).local('America/Bogota')}</Moment>
                </td>
                {
                    this.props.status ?
                        <Fragment/> :
                        <td>{this.props.mentor}</td>

                }

                <td>
                    <a href={this.props.url_zoom}>
                       <strong>{"Ir a mi sesión"}</strong>  <br/>
                    </a>
                    <a className='btn' target={"_blank"}
                       href={`http://www.google.com/calendar/event?action=TEMPLATE&text=${this.props.nombre}&details=das&location=${this.props.url_zoom}&dates=${this.props.inicio}/${this.props.fin}`}>
                        Agregar google calendar
                    </a>

                </td>


                {
                    this.props.status ?
                        <td>
                            <Link to={`/confirmation/${this.props.id}`}>{"Confirmar"}</Link>
                        </td> :
                        <td>
                            <mobiscroll.Rating onChange={this.handleSubmit} value={this.state.fill}/>
                            <ModalReviews show={this.state.show} modal={this.state.modal}
                                          toggle={this.toggle} calificacion={this.state.calificacion}
                                          username={this.props.username} id={this.props.id}/>
                        </td>
                }
            </tr>
        )
    }
}


EventItem.propTypes = {
    editAction: PropTypes.string.isRequired,
    delAction: PropTypes.string.isRequired,
    urlPath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    dni: PropTypes.string.isRequired,
};
const mapStateToProps = (state, props) => ({
    cal: state.calificacion_mentor.calificacion
});

export default connect(mapStateToProps, {fetchCalifiacionbyMentor})(EventItem);
