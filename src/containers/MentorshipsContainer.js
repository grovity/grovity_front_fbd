// import MentorshipList from "../components/MentorshipList/MentorshipList";
import {fetchMentorships} from "../actions/fetchMentorships";
import {withRouter} from 'react-router-dom';
import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {loadUser} from "../actions/auth";
import {getmt, getStatusEntidad} from "../selectors/institutions";
import {getStatusMentor} from "../selectors/users";
import {Spin} from "antd";
import {Button, Col, Row} from 'antd';
import HerramientasView from "../pages/HerramientasView/HerramientasView";
import AppFrame from "../components/AppFrame/AppFrame";

class MentorshipsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
        };
    }

    async componentDidMount() {
        this.setState({
            spinner: true,
        })
        await this.props.fetchMentorships(this.props.match.params.id)

        this.setState({
            spinner: false,
        })
    }

    handleOnBack = () => {
        this.props.history.goBack();
    };

    handleAddNew = () => {
        this.props.history.push(`mentorships/new/${this.props.match.params.id}`)
    };

    renderBody = mentorships => (
        <>
        <HerramientasView entidad={this.props.entidad} mentorships={this.props.mentorships}
                                urlPath={'mentorships/'} mt_plural={this.props.mt_plural}
                                status={this.props.status}/>
        </>
    );

    render() {
        return (
           <AppFrame>
                {!this.state.spinner ? this.renderBody(this.props.mentorships) :
                    <div className='position-absolute d-flex justify-content-center align-items-center w-100 h-100'
                            style={{left: '0', top: '0'}}>
                        <Spin size='large' className='mt-5'/>
                    </div>}
            </AppFrame>
        )
    }
}

MentorshipsContainer.propTypes = {
    fetchMentorships: PropTypes.func.isRequired,
    mentorships: PropTypes.array.isRequired
};

MentorshipsContainer.defaultProps = {
    mentorships: []
};

// para conectar users containers con el state:
const mapStateToProps = state => ({
    mentorships: state.mentorships,
    entidad: getStatusEntidad(state),
    mt_plural: getmt(state).replace('-', ''),
    status: getStatusMentor(state),
});

export default withRouter(connect(mapStateToProps, {
    fetchMentorships,
    loadUser,
})(MentorshipsContainer));
