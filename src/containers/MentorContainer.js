import UserEdit from "../components/UserEdit/UserEdit";
import {getMentorById} from "../selectors/mentors";
import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import {getMentoriasMentor} from "../api";
import {connect} from "react-redux";
import PropTypes from 'prop-types';


class MentorContainer extends Component {
    handleOnBack = () => {
        this.props.history.goBack();
    };

    render() {
        return (
            <Fragment>
                <UserEdit
                    {...this.props.mentorias}
                    {...this.props.mentor}

                    onSubmitSuccess={this.handleOnSubmitSuccess}
                    onSubmit={this.handleSubmit}
                    onBack={this.handleOnBack}
                />
            </Fragment>
        )
    }
}

MentorContainer.propTypes = {
    id: PropTypes.string.isRequired,
    mentor: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
    mentorias: getMentoriasMentor(props.mentor.username),
    mentor: getMentorById(state, props)
});

export default withRouter(connect(mapStateToProps, null)(MentorContainer));
