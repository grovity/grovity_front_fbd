import React from 'react';
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import EventCreateUsuarioForm from "../EventCreateForm/EventCreateUsuarioForm";
import BasicModal from "../BasicModal/BasicModal";
import {fetchDisponibilidadMentorDia} from "../../actions/marketplace";
import {connect} from "react-redux";
import {Spin} from "antd";
import {getStatusMentor} from "../../selectors/users";
import EditarDisponibilidadDia from "../AgregarDisponibilidad/EditarDisponibilidadDia";


class Scheduler4 extends React.Component {
    constructor(props) {
        super(props);
        this.preventSet = false;
        this.state = {
            val: new Date(),
            myEvents: [],
            spinner: false,
            showModal: false,
            contentModal: null,
            events: []
        };


    }

    componentDidMount = async () => {
        this.setState({
            spinner: true
        })
        let date = this.state.val.getDate();
        let month = this.state.val.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
        let year = this.state.val.getFullYear();
        let dateStr = year + "-" + month + "-" + date;
        await this.props.fetchDisponibilidadMentorDia(dateStr, this.props.mentor)
        this.setState({
            myEvents: this.props.dispo_dia,
            spinner: false
        })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.dispo_dia !== prevProps.dispo_dia){
            this.setState({
            myEvents: this.props.dispo_dia,
            spinner: false
        })
        }

    }


    onPageChange = (event, inst) => {
        this.preventSet = true;
        this.navigate(this.refs.monthCal.instance, event.firstDay);
    }

    onSetDate = (event, inst) => {
        if (!this.preventSet && this.refs.dayCal != undefined) {
            this.navigate(this.refs.dayCal.instance, event.date);
        }
        this.preventSet = false;
    }

    navigate = (inst, val) => {
        if (inst) {
            inst.navigate(val);
        }
    }

    openModal = (content) => {
        this.setState({
            showModal: true,
            contentModal: content,
        })
    };
    closeModal = () => {
        this.setState({
            showModal: false,
        })
    };

    onEventSelect = (event) => {
        this.openModal(<EditarDisponibilidadDia
            event={event}
            setShowModal={this.closeModal}
            dateStr={this.props.dateStr}
            setdispoMentor={this.props.setdispoMentor}
        ></EditarDisponibilidadDia>)

    }


    render() {
        return (
            !this.state.spinner ?
                <div className="mbsc-grid md-demo-synchronized-views">
                    <BasicModal show={this.state.showModal} setShow={this.closeModal}>
                        {this.state.contentModal}
                    </BasicModal>
                    <div className="mbsc-row mbsc-no-padding">
                        <div className="mbsc-col-md-4 mbsc-col-12">
                            <mobiscroll.Eventcalendar
                                theme="mobiscroll"
                                themeVariant="light"
                                ref="monthCal"
                                display="inline"
                                view={{
                                    calendar: {type: 'month'}
                                }}
                                data={this.state.myEvents}
                                onSetDate={this.onSetDate}
                                lang={'es'}
                            />
                        </div>
                        <div className="mbsc-col-md-8 mbsc-col-12 md-col-right">
                            <mobiscroll.Eventcalendar
                                theme="mobiscroll"
                                themeVariant="light"
                                ref="dayCal"
                                display="inline"
                                view={{
                                    eventList: {type: 'day'}
                                }}
                                data={this.state.myEvents}
                                onPageChange={this.onPageChange}
                                onEventSelect={this.onEventSelect}
                                lang={'es'}
                                noEventsText= 'No hay disponibilidad'
                            />
                        </div>
                    </div>
                </div> :
                <div className={'text-center'}>
                    <Spin/>
                </div>

        );
    }
}

const mapStateToProps = state => ({
    dispo_dia: state.disponibilidad_mentor_dia,
    status: getStatusMentor(state),


});
export default connect(mapStateToProps, {
    fetchDisponibilidadMentorDia
})(Scheduler4);