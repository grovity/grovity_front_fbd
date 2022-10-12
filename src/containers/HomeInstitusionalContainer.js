import {getet, getId, getInstitutions, getmt, getStatusEntidad, gitIdInstitution} from "../selectors/institutions";
import {withRouter} from 'react-router-dom';
import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import './style.css';
import {fetchEmprendedor, fetchFuncionarioEmpren, fetchFuncionarios} from "../actions/fetchUsers";
import {loadUser} from "../actions/auth";
import AppFrame from "../components/AppFrame/AppFrame";
import HomeUserEntidad from "../pages/HomeUserEntidad/HomeUserEntidad";
import {selectCurrentUser} from "../selectors/users";

class HomeInstitusionalContainer extends Component {

    async componentDidMount() {
        await localStorage.setItem('entidad', true)
        await this.props.fetchEmprendedor(this.props.id_institution)
        await this.props.fetchFuncionarioEmpren(this.props.id_institution)
        await this.props.fetchFuncionarios(this.props.id_institution)
        await this.props.loadUser()
    }

    render() {
        return (
            <AppFrame id='institution'>
                <HomeUserEntidad  institution={this.props.institutions} user={this.props.user}/>
            </AppFrame>

        )
    }
}

HomeInstitusionalContainer.propTypes = {
    fetchInstitutions: PropTypes.func.isRequired,
    institutions: PropTypes.array.isRequired,
};


const mapStateToProps = state => ({
    institutions: getInstitutions(state),
    idInstitution: getId(state),
    id_institution: gitIdInstitution(state),
    mt: getmt(state),
    et: getet(state),
    user: selectCurrentUser(state),
});

export default withRouter(connect(mapStateToProps, {
    fetchEmprendedor,
    fetchFuncionarios,
    fetchFuncionarioEmpren,
    loadUser,
})(HomeInstitusionalContainer));
