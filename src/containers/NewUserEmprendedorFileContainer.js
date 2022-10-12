import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {inviteEmprendedorFile} from "../api";
import {loadUser} from "../actions/auth";
import InvitaEmprendedorFileForm from "../components/InvitaMentor/InvitaEmprendedorFile";
import {setAlert} from "../actions/alert";
import App from "../App";
import AppFrame from "../components/AppFrame/AppFrame";

class NewUserEmprendedorFileContainer extends Component {


    handleOnSubmitSuccess = () => {
        this.props.history.goBack();
    };

    handleOnBack = () => {
        this.props.history.goBack();
    };

    handleSubmit = values => {
        this.props.inviteEmprendedorFile(values, this.props.id_institution,
                                        this.props.loadUser, this.props.setAlert);
    };


    renderBody = () => {

        return <InvitaEmprendedorFileForm
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

NewUserEmprendedorFileContainer.propTypes = {
    createEvent: PropTypes.func.isRequired,
};
const mapStateToProps = (state, props) => ({

});
export default withRouter(connect(mapStateToProps, {
    inviteEmprendedorFile,
    loadUser,
    setAlert,
})(NewUserEmprendedorFileContainer));