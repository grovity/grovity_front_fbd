import {withRouter} from 'react-router-dom';
import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {fetchEventsbyMentor, fetchEventsbyUser} from "../actions/fetchEvents";
import {getId, getStatusEntidad, getUsername} from "../selectors/institutions";
import {fetchEmpresaEmprendedor, fetchInfoEmpresa, fetchProgramsbyUser} from "../actions/fetchUsers";
import {
    getIndicadoresEmpresa, getStatusBot,
    getStatusEmpresa_desdementor,
    getStatusMentor, selectCurrentUser,
    selectEmpresa,
    selectEmpresaInfo
} from "../selectors/users";
import {Spin} from "antd";
import AppFrame from "../components/AppFrame/AppFrame";
import HomeUser from "../pages/HomeUser/HomeUser";
import {getProgramsUser} from "../selectors/programs";

import HomeUserMentor from "../pages/HomeUserMentor/HomeUserMentor";


class HomeUserContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            spinner: true,
            showModal: false,
            contentModal: null,
        };
    }

    async componentDidMount() {
       await  localStorage.setItem('mentor', this.props.status_mentor)
        let events = this.props.events['eventos']
        if (this.props.status) {
            events = this.props.events_mentor['eventos']
        }
        //if (events.length === 0) {
            this.props.status ?
                await this.props.fetchEventsbyMentor(this.props.username, this.props.status) :
                await this.props.fetchEventsbyUser()
        //}

        if (this.props.programs_user.length === 0 || this.props.programs_user.length === undefined) {
            await this.props.fetchProgramsbyUser(this.props.username)
        }

        this.setState({
            spinner: false,
        })
    }

    openModal = (content) => {
        this.setState({
            showModal: true,
            contentModal: content,
        })
    };
    closeModal = () => {
        this.setState({
            showModal: false,
        })
    };


    renderBody = (programs_user, events, id, status, empresa_emprendedor, entidad) => (

        <div>
            {
                (!this.state.spinner) ?
                    !this.props.status ?
                        <HomeUser
                            user={this.props.user}
                            programs_user={programs_user}
                            events={events}
                            id={id}
                            status={status}
                            empresa_emprendedor={empresa_emprendedor}
                            entidad={entidad}
                            username={this.props.username}
                        ></HomeUser>
                        :
                        <HomeUserMentor
                            user={this.props.user}
                            programs_user={programs_user}
                            events={events}
                            id={id}
                            status={status}
                            entidad={entidad}
                            username={this.props.username}
                        ></HomeUserMentor> :

                    <div className='position-absolute d-flex justify-content-center align-items-center w-100 h-100'
                         style={{left: '0', top: '0'}}>
                        <Spin size='large' className='mt-5'/>
                    </div>
            }
        </div>


    );

    render() {
        return (
            <AppFrame>
                {this.renderBody(this.props.programs_user, this.props.status ? this.props.events_mentor :
                    this.props.events,
                    this.props.id,
                    this.props.status,
                    this.props.empresa_emprendedor,
                    this.props.entidad,
                )}
            </AppFrame>
        )
    }
}

HomeUserContainer.propTypes = {

    fetchEventsbyUser: PropTypes.func.isRequired,
    fetchEventsbyMentor: PropTypes.func.isRequired,
    events: PropTypes.object.isRequired,
};

HomeUserContainer.defaultProps = {
    mentorships: [],
    events: [],
    mentors: [],

};

// para conectar users containers con el state:
const mapStateToProps = state => ({
    user: selectCurrentUser(state),
    username: getUsername(state),
    programs_user: getProgramsUser(state),
    events: {"eventos": state.events_user},
    events_mentor: {"eventos": state.events_mentor},
    id: getId(state),
    status: getStatusMentor(state),
    empresa_emprendedor: selectEmpresa(state),
    empresa_emprendedor_info: selectEmpresaInfo(state),
    entidad: getStatusEntidad(state),
    calificacion: state.calificacion_mentor,
    empresa: getStatusEmpresa_desdementor(state),
    indicadores_mentor: getIndicadoresEmpresa(state),
    status_mentor: getStatusBot(state),
});

export default withRouter(connect(mapStateToProps, {
    fetchProgramsbyUser,
    fetchEventsbyUser,
    fetchEventsbyMentor,
    fetchEmpresaEmprendedor,
    fetchInfoEmpresa
})(HomeUserContainer));