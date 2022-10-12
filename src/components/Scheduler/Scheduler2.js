import React from 'react';
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import EventCreateUsuarioForm from "../EventCreateForm/EventCreateUsuarioForm";
import BasicModal from "../BasicModal/BasicModal";
import {fetchDisponibilidadMentorCompra} from "../../actions/marketplace";
import {connect} from "react-redux";
import {Spin} from "antd";
import BasicModalWhite from '../BasicModalWhite/BasicModalWhite';


class Scheduler2 extends React.Component {
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
        await this.props.fetchDisponibilidadMentorCompra(dateStr, this.props.mentor)
        this.setState({
            myEvents: this.props.dispo,
            spinner: false
        })
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

    onEventSelect = (event, inst) => {
        this.openModal(<EventCreateUsuarioForm
            showModal={this.state.showModal}
            mentorias={this.props.mentorships}
            setShowModal={this.closeModal}
            first_name={this.props.first_name}
            last_name={this.props.last_name}
            id_usuario={this.props.user}
            id_mentor={this.props.mentor}
            event={event}
            precio={this.props.precio}
            date={this.state.val}
            setVisible={this.props.setVisible}
            areas={this.props.areas}
        ></EventCreateUsuarioForm>)

    }


    render() {
        return (
                !this.state.spinner ?
            <div className="mbsc-grid md-demo-synchronized-views">
                <BasicModalWhite show={this.state.showModal} setShow={this.closeModal}>
                    {this.state.contentModal}
                </BasicModalWhite>
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
                        />
                    </div>
                </div>
            </div>:
                    <div className={'text-center'}>
                        <Spin/>
                    </div>

        );
    }
}

const mapStateToProps = state => ({
    dispo: state.disponibilidad_mentor_day


});
export default connect(mapStateToProps, {
    fetchDisponibilidadMentorCompra
})(Scheduler2);