import {withRouter} from 'react-router-dom';
import {Spin} from 'antd';
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';
import {fetchEmprendedoresMentor, fetchEmprendedor} from "../actions/fetchUsers";
import {getet, getIdInstitution, getStatusEntidad} from "../selectors/institutions";
import {getStatusMentor} from "../selectors/users";
import EmprendedoresMenEnti from '../pages/EmprendedoresMenEnti/EmprendedoresMenEnti';

class UsersContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            spinner: true,

        };
    }

    async componentDidMount() {
        this.setState({
            spinner: true,
        })
        if (this.props.status) {
            await this.props.fetchEmprendedoresMentor()
        } else {
            if (!this.props.users) {
                await this.props.fetchEmprendedor(this.props.id_institution)
            }

        }

        this.setState({
            spinner: false,
        })
    }

    handleAddNew = () => {
        this.props.history.push('users/new')
    };
    handleAddNewFile = () => {
        this.props.history.push('users/file/new')
    };

    handleOnBack = () => {
        this.props.history.goBack();
    };


    renderBody = (users, users_mentor) => (
        <Fragment>
             {
                !this.state.spinner ?
                <>
                    <EmprendedoresMenEnti users={!this.props.status ? users : users_mentor} 
                                        id_institution={this.props.id_institution}
                                        urlPath={!this.props.status ? 'users/detail/' : 'user/detail/'} 
                                        status={this.props.status} entidad={this.props.entidad}/>
                </>
                :
                    <div className="spinner">
                        <Spin size="large"/>
                    </div>
            }
        </Fragment>
    );

    render() {
        return (
            <>
                {!this.state.spinner ? this.renderBody(this.props.users, this.props.users_mentor) :
                    <div className='position-absolute d-flex justify-content-center align-items-center w-100 h-100'
                         style={{left: '0', top: '0'}}>
                        <Spin size='large' className='mt-5'/>
                    </div>}
            </>
        )
    }
}

UsersContainer.propTypes = {
    users: PropTypes.array,
    users_mentor: PropTypes.array,
};

UsersContainer.defaultProps = {
    users: null
};

// para conectar users containers con el state:
const mapStateToProps = state => ({
    users: state.emprendedores_entidad.results,
    users_mentor: state.emprendedores_mentor,
    id_institution: getIdInstitution(state),
    et: getet(state).split('-')[0],
    et_plural: getet(state).replace('-', ''),
    status: getStatusMentor(state),
    entidad: getStatusEntidad(state),
});

export default withRouter(connect(mapStateToProps, {
    fetchEmprendedor,
    fetchEmprendedoresMentor
})(UsersContainer));
