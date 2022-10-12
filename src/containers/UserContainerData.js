import {
    fetchEmpresaEmprendedor,
    fetchEmpresaEmprendedorbyusername,
    fetchProgramsbyUser,
    fetchUsersbyId
} from "../actions/fetchUsers";
import {withRouter} from 'react-router-dom';
import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {getStatusEntidad, getUsername} from "../selectors/institutions";
import {editUser} from "../api";
import {loadUser} from "../actions/auth";
import {
    getIdCompany, getIdUser,
     getStatusEmpresa_desdeOtroPerfil,
    getStatusMentor, selectCurrentUser,
} from "../selectors/users";
import {setAlert} from "../actions/alert";
import {fetchCalifiacionbyMentor} from "../actions/fetchMentors";
import {Spin} from "antd";
import PerfilEmprendedor from "../pages/PerfilEmprendedor/PerfilEmprendedor";
import AppFrame from "../components/AppFrame/AppFrame";


class UserContainerData extends Component {


    constructor(props) {
        super(props);

        this.state = {
            spinner: true,

        };
    }


    componentDidMount = async () => {
        await this.props.fetchUsersbyId(this.props.match.params.id);
        if(this.props.id_empresa_desdeotrousuario){
            await this.props.fetchEmpresaEmprendedor(this.props.id_empresa_desdeotrousuario)
        }

        await this.props.fetchProgramsbyUser(this.props.match.params.id)

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
            await this.props.fetchProgramsbyUser(this.props.match.params.id)

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

    renderBody = (user) => (

        <PerfilEmprendedor user={this.props.user}
                           indicadores={this.props.indicadores_empresa}
                           empresa_status={this.props.empresa_status}
                           params_id={this.props.match.params.id}
                           current_user={this.props.current_user}
                           empresa={this.props.empresa}
                           programs={this.props.programs_user}
                           status={this.props.status}
                           entidad={this.props.entidad}
                            id_empresa={this.props.id_empresa_desdeotrousuario}/>

    );

    render() {
        return (

            <AppFrame>

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

UserContainerData.propTypes = {
    fetchUsersbyId: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    user: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
    user: state.user[0],
    current_user: selectCurrentUser(state),
    id_usuario: getIdUser(state),
    username: getUsername(state),
    status: getStatusMentor(state),
    entidad: getStatusEntidad(state),
    empresa: state.empresa_emprendedor,
    empresa_status: getStatusEmpresa_desdeOtroPerfil(state),
    indicadores: state.indicadores_empresa,
    programs_user: state.programs_user,
    id_empresa_desdeotrousuario: getIdCompany(state),
});


export default withRouter(connect(mapStateToProps,
    {
        fetchUsersbyId,
        setAlert,
        editUser,
        loadUser,
        fetchCalifiacionbyMentor,
        fetchEmpresaEmprendedor,
        fetchProgramsbyUser,
    })(UserContainerData));