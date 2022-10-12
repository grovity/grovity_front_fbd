import MentorshipData from "../components/MentorshipData/MentorshipData";
import {withRouter} from 'react-router-dom';
import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {getMentorshipById} from "../selectors/mentorships";
import {fetchSesionesbyMentorship} from "../actions/fetchEvents";
import {getmt, getStatusEntidad} from "../selectors/institutions";
import {Spin} from "antd";
import AppFrame from "../components/AppFrame/AppFrame";

class MentorshipContainerData extends Component {

    constructor(props) {
        super(props);

        this.state = {
            spinner: true,

        };
    }

    async componentDidMount() {
        await this.props.fetchSesionesbyMentorship(this.props.match.params.id)
        this.setState({
            spinner: false,
        })
    }

    handleOnBack = () => {
        this.props.history.goBack();
    };

    handleCalendar = () => {
        this.props.history.push('/calendar')
    };


    render() {
        return (
            <AppFrame>
                {
                    !this.state.spinner ?
                            <MentorshipData {...this.props.mentorship} eventos={this.props.eventos}
                                            id={this.props.id} onBack={this.handleOnBack}
                                            calendar={this.handleCalendar}

                                            entidad={this.props.entidad} urlPath={'mentors/'}
                                            mt_plural={this.props.mt_plural}/>
                        :
                        <div className='position-absolute d-flex justify-content-center align-items-center w-100 h-100'
                             style={{left: '0', top: '0'}}>
                            <Spin size='large' className='mt-5'/>
                        </div>
                }
            </AppFrame>
        )
    }
}

MentorshipContainerData.propTypes = {
    id: PropTypes.string.isRequired,
    mentorship: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
    id: props.match.params.id,
    mentorship: getMentorshipById(state, props),
    eventos: state.events,
    entidad: getStatusEntidad(state),
    mt_plural: getmt(state).replace('-', ''),
});

export default withRouter(connect(mapStateToProps, {
    fetchSesionesbyMentorship
})(MentorshipContainerData));
