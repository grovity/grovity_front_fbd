
import React from 'react'
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import {connect} from "react-redux";


class Scheduler3 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            myEvents: []
        };
    }

    render() {
        return (
            <mobiscroll.Eventcalendar
                display="inline"
                data={this.props.disponibilidad}
                view={{
                    calendar: { type: 'month' },
                    eventList: { type: 'day', scrollable: true }
                }}
                theme="mobiscroll"
                themeVariant="light"
                lang='es'
                noEventsText= 'No hay disponibilidad'
            />
        );
    }
}

const mapStateToProps = (state) => ({

});


export default connect(mapStateToProps, {


})(Scheduler3)