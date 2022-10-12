import {withRouter} from 'react-router-dom';
import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {loadUser} from "../actions/auth";
import MentorAddInfoForm from "../components/MentorAddInfo/MentorAddInfo";
import {editUser} from "../api";


class InfoAditionalMentorContainer extends Component {
    componentDidMount() {
        loadUser()
    }

    handleOnBack = () => {
        this.props.history.goBack();
    };

    handleSubmit = async (values) => {
        await this.props.editUser(values, localStorage.getItem('username'))
    };

    handleOnSubmitSuccess = async () => {
        loadUser()
        this.props.history.goBack();
    };

    renderBody = () => (

        <MentorAddInfoForm
            onSubmitSuccess={this.handleOnSubmitSuccess}
            onSubmit={this.handleSubmit}
            onBack={this.handleOnBack}
        />
    )


    render() {
        return (
            <Fragment>
                {this.renderBody()}
            </Fragment>
        )
    }
}

InfoAditionalMentorContainer.propTypes = {
    id: PropTypes.string.isRequired,
    fetchInstitutions: PropTypes,
};

const mapStateToProps = (state, props) => ({});

export default withRouter(connect(mapStateToProps, {editUser})(InfoAditionalMentorContainer));