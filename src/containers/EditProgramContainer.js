import ProgramEdit from "../components/ProgramEdit/ProgramEdit";
import {withRouter} from 'react-router-dom';
import {setAlert} from "../actions/alert";
import {register} from "../actions/auth";
import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';

class EditProgramContainer extends Component {
    handleOnBack = () => {
        this.props.history.goBack();
    };

    handleSubmit = values => {
        if (values.confirm_password !== values.password) {
            this.props.setAlert("Password y Confirmar Password deben ser iguales", "danger")
        } else {
            this.props.editEvent(values)
        }
    };

    renderBody = () => (
        <ProgramEdit onSubmit={this.handleSubmit} onBack={this.handleOnBack}/>
    );

    render() {
        return (
            <Fragment>
                {this.renderBody()}
            </Fragment>
        )
    }
}

EditProgramContainer.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
};

export default withRouter(connect(null, {
    setAlert,
    register
})(EditProgramContainer));