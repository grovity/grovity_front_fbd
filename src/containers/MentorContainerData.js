import UserData from "../components/UserData/UserData";
import {withRouter} from 'react-router-dom';
import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {fetchEventsbyMentor} from "../actions/fetchEvents";
import {fetchCalifiacionbyMentor} from "../actions/fetchMentors";
import {getCurrentUser, getIdUser, selectUser} from "../selectors/users";
import {fetchUsersbyId} from "../actions/fetchUsers";
import {Spin} from "antd";
import AppFrame from "../components/AppFrame/AppFrame";
import PerfilMentor from "../pages/PerfilMentor/PerfilMentor";
import {getStatusEntidad} from "../selectors/institutions";


class MentorContainerData extends Component {

    constructor(props) {
        super(props);

        this.state = {
            new_mentor: this.props.mentor,
            new_events: this.props.events,
            new_calificacion: this.props.calificacion,
            new_id: this.props.id,
            spinner: true,

        };
    }

    async componentDidMount() {
        await this.props.fetchUsersbyId(this.props.match.params.id)
        await this.props.fetchCalifiacionbyMentor(this.props.match.params.id)
        await this.props.fetchEventsbyMentor(this.props.match.params.id)
        this.setState({
            spinner: false,
        })

    }

    async componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.setState({
               new_mentor: null,
                new_events: null,
                new_calificacion: null,
                new_id: null,
                spinner: true,
            })

            await this.props.fetchUsersbyId(this.props.match.params.id)
            await this.props.fetchCalifiacionbyMentor(this.props.match.params.id)
            await this.props.fetchEventsbyMentor(this.props.match.params.id)

            this.setState({
               new_mentor: this.props.mentor,
                new_events: this.props.events,
                new_calificacion: this.props.calificacion,
                new_id: this.props.id,
            })
            this.setState({
               spinner: false,
            })
        }
    }


    handleOnBack = () => {
        this.props.history.goBack();
    };

    renderBody = (mentor, calificacion, events) => (
        <Fragment>
            {
                (mentor && this.state.new_mentor && !this.state.spinner) ?
                    <Fragment>
                        <PerfilMentor user={mentor} current_user={this.props.current_user} entidad={this.props.entidad} calificacion={calificacion} onBack={this.handleOnBack}
                                  events={events}/>
                    </Fragment>
                    :
                    <div className="spinner">
                        <Spin size="large"/>
                    </div>
            }
        </Fragment>
    );

    render() {
        return (
            <AppFrame>
                {this.renderBody(this.props.mentor, this.props.calificacion, this.props.events)}
            </AppFrame>
        )
    }
}

MentorContainerData.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.object,
    events: PropTypes.array,
    calificacion: PropTypes.array
};

MentorContainerData.defaultProps = {
    events: [],
    calificacion: []
};

const mapStateToProps = (state, props) => ({
    mentor: selectUser(state),
    events: state.events_mentor,
    calificacion: state.calificacion_mentor,
    id: getIdUser(state),
    current_user: getCurrentUser(state),
    entidad: getStatusEntidad(state),
});

export default withRouter(connect(mapStateToProps, {
    fetchEventsbyMentor,
    fetchCalifiacionbyMentor,
    fetchUsersbyId,
})(MentorContainerData));
