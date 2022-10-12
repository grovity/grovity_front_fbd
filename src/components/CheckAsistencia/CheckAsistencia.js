import React, {Component} from "react"
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {fetchUsersbyEvent} from "../../actions/fetchUsers";
import {setAlert} from "../../actions/alert";
import {fetchEventsbyId} from "../../actions/fetchEvents";
import './CheckAsistencia.scss'
import {getStatusMentor} from "../../selectors/users";


class CheckAsistencia extends Component {

    constructor(props) {
        super(props);

        this.state = {
            flag: false,
            flag2: false,

        };
    }

    componentDidMount = async () => {
        if (!this.props.status) {
            await this.props.fetchEventsbyId(this.props.id)
            if (this.props.event && this.props.event[0] && this.props.event[0].calificado) {
                this.setState({
                    flag2: true
                })
            }
        }
        let users = await this.props.fetchUsersbyEvent(this.props.id)
        users = (users.payload)
        if (users) {
            for (let i = 0; i < Object.keys(users).length; i++) {
                if (users[i] && users[i]?.asistencia !== null) {
                    this.setState({
                        flag: true
                    })
                    break;
                }
            }
        }

    }

    async componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            if (!this.props.status) {
                await this.props.fetchEventsbyId(this.props.id)
                if (this.props.event && this.props.event[0] && this.props.event[0].calificado) {
                this.setState({
                    flag2: true
                })
            }
            }
            let users = await this.props.fetchUsersbyEvent(this.props.id)
            users = users.payload

            for (let i = 0; i < Object.keys(users).length; i++) {
                if (users && users[i]?.asistencia !== null) {
                    this.setState({
                        flag: true
                    })
                    break;
                }
            }
        }
    }

    render() {
            return (
                <span>
                {
                    this.state.flag ?
                        <p className='mb-0' id='calificar-evento'>Editar acta</p> :
                        <p className='mb-0' id='calificar-evento'>Registrar acta </p>
                }
            </span>
            )
    }
}

// para conectar users containers con el state:
const mapStateToProps = state => ({
    users: state.users_event,
    array: state.array,
    array_tarea: state.array_tarea,
    event: state.event_id,
    status: getStatusMentor(state)
});

export default withRouter(connect(mapStateToProps,
    {
        fetchUsersbyEvent,
        setAlert,
        fetchEventsbyId
    })(CheckAsistencia));