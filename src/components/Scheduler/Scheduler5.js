import React from 'react';
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import {fetchDisponibilidadMentorCompra} from "../../actions/marketplace";
import {connect} from "react-redux";
import {Spin, Row, Col} from "antd";


class Scheduler5 extends React.Component {
    constructor(props) {
        super(props);
        this.preventSet = false;
        this.state = {
            val: new Date(),
            myEvents: [],
            spinner: false,
            showModal: false,
            contentModal: null,
            events: [],
        };


    }

    componentDidMount = async () => {
        if (this.props.mentor) {
            this.setState({
                spinner: true
            })
            let date = this.state.val.getDate();
            let month = this.state.val.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
            let year = this.state.val.getFullYear();
            let dateStr = year + "-" + month + "-" + date;
            await this.props.fetchDisponibilidadMentorCompra(dateStr, this.props.mentor, this.props.entidad)
            this.setState({
                myEvents: this.props.dispo,
                spinner: false
            })

        }


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if ((prevProps.mentor !== this.props.mentor) || (prevProps.flag !== this.props.flag)) {
            this.setState({
                spinner: true
            })
            let date = this.state.val.getDate();
            let month = this.state.val.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
            let year = this.state.val.getFullYear();
            let dateStr = year + "-" + month + "-" + date;
            await this.props.fetchDisponibilidadMentorCompra(dateStr, this.props.mentor, this.props.entidad)
            this.setState({
                myEvents: this.props.dispo,
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
            this.props.setDate(event.date)
        }
        this.preventSet = false;
        this.props.setTime(false)
    }

    onEventSelect = (e) => {
        this.props.setHours(e.event)
        this.props.setTime(true)
        this.props.setHoraInicio(e.event.start)
        this.props.setHoraFin(e.event.end)
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


    render() {
        return (
            !this.state.spinner ?
                // <div className="mbsc-grid md-demo-synchronized-views">
                <>
                    <Row style={{marginTop: '2%'}}>
                        <Col lg={15} md={15} sm={22} xs={22}>
                            <mobiscroll.Eventcalendar
                                theme="mobiscroll"
                                themeVariant="light"
                                ref="monthCal"
                                display="inline"
                                view={{
                                    calendar: {type: 'month'}
                                }}
                                defaultValue={new Date(this.props.date_event)}
                                data={this.state.myEvents}
                                onSetDate={this.onSetDate}
                                lang={'es'}
                            />
                        </Col>
                        <Col lg={9} md={9} sm={22} xs={22}>
                            <mobiscroll.Eventcalendar
                                theme="mobiscroll"
                                defaultValue={new Date(this.props.date_event)}
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
                        </Col>
                    </Row>
                </> :
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
})(Scheduler5);