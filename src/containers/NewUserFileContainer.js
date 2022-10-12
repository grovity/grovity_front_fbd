import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {inviteMentorFile} from "../api";
import {getIdInstitution} from "../selectors/institutions";
import {loadUser} from "../actions/auth";
import InvitaMentorFileForm from "../components/InvitaMentor/InvitaMentorFile";
import {setAlert} from "../actions/alert";
import AppFrame from "../components/AppFrame/AppFrame";

class NewUserFileContainer extends Component {


    handleOnSubmitSuccess = () => {
        this.props.history.goBack();

    };

    handleOnBack = () => {
        this.props.history.goBack();
    };

    handleSubmit = async values => {
        this.props.inviteMentorFile(values, this.props.id_institution, this.props.loadUser, this.props.setAlert);
    };


    renderBody = () => {

        return <InvitaMentorFileForm
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

NewUserFileContainer.propTypes = {
    createEvent: PropTypes.func.isRequired,
};
const mapStateToProps = (state, props) => ({
    id_institution: getIdInstitution(state)
});
export default withRouter(connect(mapStateToProps, {
    inviteMentorFile,
    loadUser,
    setAlert,
})(NewUserFileContainer));