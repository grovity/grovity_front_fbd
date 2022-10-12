import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {soporte} from "../api";
import {loadUser} from "../actions/auth";
import SoporteForm from "../components/Soporte/Soporte";
import {setAlert} from "../actions/alert";
import AppFrame from "../components/AppFrame/AppFrame";

class SoporteContainer extends Component {


    handleOnSubmitSuccess = () => {
        this.props.history.goBack();
    };

    handleOnBack = () => {
        this.props.history.goBack();
    };

    handleSubmit = values => {
        this.props.soporte(values, this.props.id_institution, setAlert);
    };


    renderBody = () => {

        return <SoporteForm
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

SoporteContainer.propTypes = {
    createEvent: PropTypes.func.isRequired,
};
const mapStateToProps = (state, props) => ({});
export default withRouter(connect(mapStateToProps, {
    soporte,
    setAlert,
    loadUser,
})(SoporteContainer));