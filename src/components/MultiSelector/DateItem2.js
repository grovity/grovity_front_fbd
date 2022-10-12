import React from "react";
import mobiscroll from "@mobiscroll/react";
import {connect} from 'react-redux'
import './style.css'

mobiscroll.settings = {
    lang: 'es'
};

class DateItem2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
            iso: null,
            locale: null,
            moment: null,
            retDate: '',
            retISO: '',
            retLocale: '',
            retMoment: ''
        };
    }


    render() {
        const {input: {value, onChange}} = this.props
        return (
            <div className="w-100 text-white">
                <mobiscroll.Datetime display="center"
                                     buttons={['set', 'cancel']}
                                     onSet={(a) => onChange(a.valueText)}
                                     dateWheels="|M| |d|" dateFormat={'yy-mm-dd'} timeFormat={'HH:ii'}
                                     value={value ? value : this.state.date}
                                     lang="es"
                                     touchUi={false}>
                    <mobiscroll.Input placeholder="Please Select...">Set/Cancel</mobiscroll.Input>
                </mobiscroll.Datetime>
            </div>

        );
    }
}

export default connect(null, null)(DateItem2)