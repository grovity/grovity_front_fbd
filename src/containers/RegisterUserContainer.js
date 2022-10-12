import UserRegisterForm from "../components/FormRegister/FormRegister";
import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import {setAlert} from "../actions/alert";
import {registerUser} from "../actions/auth";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {fetchUser} from "../actions/fetchUsers";
import {getCurrentUser} from "../selectors/users";

class RegisterContainer extends Component {
    handleOnBack = () => {
        this.props.history.goBack();
    };

    handleSubmit = values => {
        if (values.confirm_password !== values.password) {
            this.props.setAlert("Password y Confirmar Password deben ser iguales", "danger")
        } else {
            this.props.registerUser(values)
        }
    };

    handleOnSubmitSuccess = async () => {
        await this.props.history.goBack();


    };

    renderBody = () => (
        <UserRegisterForm onSubmit={this.handleSubmit} onBack={this.handleOnBack}
                          onSubmitSuccess={this.handleOnSubmitSuccess}/>
    );

    render() {
        return (
            <Fragment>
                {this.renderBody()}
            </Fragment>
        )
    }
}

RegisterContainer.propTypes = {
    setAlert: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({
    user: getCurrentUser(state, props)
});


export default withRouter(connect(mapStateToProps, {
    fetchUser,
    setAlert,
    registerUser
})(RegisterContainer));