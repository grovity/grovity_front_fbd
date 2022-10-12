import ProgramRegister from "../components/ProgramRegister/ProgramRegister";
import {withRouter} from 'react-router-dom';
import {setAlert} from "../actions/alert";
import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {createProgram} from "../api";
import {loadUser} from "../actions/auth";
import getJsonStrError from "../helpers/handleJsonErrors";

class RegisterProgramContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: false };
      }

    handleOnSubmitSuccess = () => {
        setTimeout(this.props.onCancel(), 10000)
    };
    handleOnBack = () => {
        this.props.history.goBack();
    };

    handleSubmit = async values => {
        await this.props.createProgram(values, this.props.setAlert, this.props.loadUser, this.getJsonStrError)
    };

    renderBody = () => (
        <ProgramRegister onSubmit={this.handleSubmit} onBack={this.handleOnBack}
                             onSubmitSuccess={this.handleOnSubmitSuccess} loading={this.state.loading}/>
    );

    render() {
        return (
            <>
                {this.renderBody()}
           </>
        )
    }
}

RegisterProgramContainer.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({});

export default withRouter(connect(mapStateToProps, {
    setAlert,
    createProgram,
    loadUser,
    getJsonStrError,
})(RegisterProgramContainer));
