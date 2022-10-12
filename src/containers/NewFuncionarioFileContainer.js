import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {inviteFuncionarioFile} from "../api";
import {getIdInstitution} from "../selectors/institutions";
import {loadUser} from "../actions/auth";
import InvitaFuncionarioFileForm from "../components/InvitaMentor/InvitaFuncionarioFile";
import {setAlert} from "../actions/alert";
import AppFrame from "../components/AppFrame/AppFrame";

class NewUserContainer extends Component {


    handleOnSubmitSuccess = () => {
        this.props.history.goBack();

    };

    handleOnBack = () => {
        this.props.history.goBack();
    };

    handleSubmit = async values => {
        this.props.inviteFuncionarioFile(values, this.props.id_institution, this.props.loadUser,
        this.props.setAlert);
    };


    renderBody = () => {

        return <InvitaFuncionarioFileForm
            onSubmitSuccess={this.handleOnSubmitSuccess}
            onSubmit={this.handleSubmit}
            onBack={this.handleOnBack}
        />
    };

    render() {
        return (
            <AppFrame>
                {this.renderBody()}
            </AppFrame>
        );
    }
}

NewUserContainer.propTypes = {
    createEvent: PropTypes.func.isRequired,
};
const mapStateToProps = (state, props) => ({
    id_institution: getIdInstitution(state)
});
export default withRouter(connect(mapStateToProps, {
    inviteFuncionarioFile,
    loadUser,
    setAlert,
})(NewUserContainer));