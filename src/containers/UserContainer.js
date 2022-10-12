import {fetchEmpresaEmprendedor, fetchEmpresaEmprendedorbyusername, fetchUsersbyId} from "../actions/fetchUsers";
import {Route, withRouter} from 'react-router-dom';
import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import UserEnEditForm from "../components/UserEdit/UserEnEdit";
import {getStatusEntidad, getUsername} from "../selectors/institutions";
import {editUser} from "../api";
import {loadUser} from "../actions/auth";
import {
    getEquipo, getIdUser,
    getIndicadoresEmpresa, getStatusEmpresa,
    getStatusEmpresa_desdementor,
    getStatusMentor, selectCurrentUser, selectEmpresa, selectIdEmpresa
} from "../selectors/users";
import {setAlert} from "../actions/alert";
import {fetchCalifiacionbyMentor} from "../actions/fetchMentors";
import {Spin} from "antd";
import PerfilEmprendedor from "../pages/PerfilEmprendedor/PerfilEmprendedor";
import PerfilMentor from "../pages/PerfilMentor/PerfilMentor";
import {fetchEventsbyMentor} from "../actions/fetchEvents";
import AppFrame from "../components/AppFrame/AppFrame";


class UserContainer extends Component {


    constructor(props) {
        super(props);

        this.state = {
            spinner: true,

        };
    }


    componentDidMount = async () => {
        await this.props.fetchUsersbyId(this.props.match.params.id);
        await this.props.fetchEmpresaEmprendedor(this.props.id_empresa)
        if (!this.props.status) {
            await this.props.fetchEmpresaEmprendedor(this.props.id_empresa)
        }

        if (this.props.status && this.props.username === this.props.match.params.id) {
            await this.props.fetchCalifiacionbyMentor(this.props.username)
            await this.props.fetchEventsbyMentor(this.props.match.params.id)
        }

        this.setState({
            spinner: false,
        })
    }

    async componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.setState({
                spinner: true,
            })

            await this.props.fetchUsersbyId(this.props.match.params.id);
            await this.props.fetchEmpresaEmprendedor(this.props.id_empresa)
            if (!this.props.status) {
                await this.props.fetchEmpresaEmprendedor(this.props.id_empresa)
            }

            setTimeout(this.props.loadUser(), 3000);
            if (this.props.status && this.props.username === this.props.match.params.id) {
                await this.props.fetchCalifiacionbyMentor(this.props.username)
                await this.props.fetchEventsbyMentor(this.props.match.params.id)

            }

            this.setState({
                spinner: false,
            })
        }
    }


    handleOnBack = () => {
        this.props.history.goBack();
    };

    handleSubmit = async (values) => {
        await this.props.editUser(values, localStorage.getItem('username'), this.props.setAlert)
    };


    // handleOnSubmitSuccess = async () => {
    //     loadUser()
    //     this.props.history.goBack();
    // };

    renderBody = (user, id, status, calificacion, events, username) => (
        <Route path="/user/:id/edit" children={
            ({match}) => (
                match ?
                    // toma las propiedades que tiene adentro user
                    <UserEnEditForm
                        {...this.props.user}
                        onSubmitSuccess={this.handleOnSubmitSuccess}
                        onSubmit={this.handleSubmit}
                        onBack={this.handleOnBack}
                        status={this.props.status}
                    />
                    :

                    !this.props.status ?
                        <PerfilEmprendedor user={this.props.user}
                                           status={this.props.status}
                                           empresa={this.props.empresa_info}
                                           indicadores={this.props.indicadores_empresa}
                                           empresa_status={this.props.empresa_status}
                                           programs={this.props.programs_user}
                                           equipo={this.props.equipo}
                                           id_empresa={this.props.id_empresa}/>
                        :
                        <PerfilMentor user={this.props.user}
                                      calificacion={this.props.calificacion}
                                      events={this.props.events}
                                      status={status}/>


            )
        }/>
    );

    render() {
        return (

            <AppFrame id='content' className='d-block'>

                {
                    !this.state.spinner ?
                        this.renderBody(this.props.user, this.props.id,
                            this.props.status, this.props.calificacion,
                            this.props.events, this.props.username) :
                        <div className='position-absolute d-flex justify-content-center align-items-center w-100 h-100'
                             style={{left: '0', top: '0'}}>
                            <Spin size='large' className='mt-5'/>
                        </div>
                }
            </AppFrame>

        )
    }
}

UserContainer.propTypes = {
    fetchUsersbyId: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    user: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
    user: selectCurrentUser(state),
    id_usuario: getIdUser(state),
    username: getUsername(state),
    status: getStatusMentor(state),
    entidad: getStatusEntidad(state),
    calificacion: state.calificacion_mentor,
    empresa: getStatusEmpresa_desdementor(state),
    empresa_status: getStatusEmpresa(state),
    equipo: getEquipo(state),
    indicadores_empresa: selectEmpresa(state),
    indicadores_mentor: getIndicadoresEmpresa(state),
    empresa_info: selectEmpresa(state),
    events: state.events_mentor,
    programs_user: state.programs_user,
    id_empresa: selectIdEmpresa(state)

});


export default withRouter(connect(mapStateToProps,
    {
        fetchUsersbyId,
        setAlert,
        editUser,
        loadUser,
        fetchCalifiacionbyMentor,
        fetchEmpresaEmprendedor,
        fetchEmpresaEmprendedorbyusername,
        fetchEventsbyMentor,
    })(UserContainer));