import React from 'react';
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import {getDispoMentorDay} from "../../api/marketplace";
import {Row, Col} from 'antd';

mobiscroll.settings = {
    theme: 'mobiscroll',
    themeVariant: 'light'
};

class Scheduler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val: new Date(),
            events: []
        };
    }

    componentDidMount = async () => {
        let date = this.state.val.getDate();
        let month = this.state.val.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
        let year = this.state.val.getFullYear();
        let dateStr = year + "-" + month + "-" + date;

        let disponibilidad = await getDispoMentorDay(dateStr)
        this.setState({
            events: disponibilidad,
        })
    }

    // componentDidUpdate = async (prevProps, prevState, snapshot) => {
    //     if (this.state.val !== prevState.val) {
    //         let array = this.state.val.split('/');
    //         let day = array[0]
    //         let month = array[1]
    //         let year = array[2]
    //         let dateStr = year + "-" + month + "-" + day;
    //
    //         let disponibilidad = await getDispoMentorDay(dateStr)
    //         this.setState({
    //             events: disponibilidad,
    //         })
    //     }
    // }

    show = () => {
        this.external.instance.show();
    }

    setExternal = (comp) => {
        this.external = comp;
    }

    setDate = () => {
        this.setState({
            val: this.state.val
        })
    }

    onChange = (e) => {
        // console.log(e)
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

    render() {
        // console.log(this.state.val)
        return (
            <div>
                <Row>
                    {/* <div className="mbsc-col-sm-12 mbsc-col-md-7"> */}
                    <Col>
                        <Row>
                            <mobiscroll.Eventcalendar
                                themeVariant="light"
                                display="inline"
                                theme="mobiscroll"
                                lang='es'
                                view={{
                                    calendar: {type: 'week'}
                                }}
                                onEventSelect={this.onEventSelect}
                                data={this.state.events}
                                onSetDate={this.onSetDate}
                            />
                        </Row>
                        <Row>
                            <mobiscroll.Eventcalendar
                                theme="mobiscroll"
                                themeVariant="light"
                                ref="dayCal"
                                display="inline"
                                view={{
                                    eventList: {type: 'day'}
                                }}
                                data={this.state.Events}
                                onPageChange={this.onPageChange}
                            />
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Scheduler