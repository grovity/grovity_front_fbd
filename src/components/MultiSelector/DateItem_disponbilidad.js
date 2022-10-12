import React from "react";
import mobiscroll from "@mobiscroll/react";
import {connect} from 'react-redux'
import './style.css'
import Input from "reactstrap/lib/Input";

mobiscroll.settings = {
    lang: 'es'
};

class DateItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: null,
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
        const {onChange, defaultValue, placeholder, min, max} = this.props
        return (
            <div className="w-100">
                <mobiscroll.Time dateWheels="|d|" dateFormat={'yy-mm-dd'} timeFormat={'HH:ii'}
                                 value={defaultValue ? defaultValue : this.state.date}
                                 onSet={(a) => onChange(a.valueText)}
                                 min={min}
                                 max={max}
                                 lang='es'
                                 dayNames={['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado']}
                                 placeholder={this.props.placeholder}
                                 steps={{
                                     minute: 30,
                                     second: 1,
                                     zeroBased: true
                                 }}>
                    <div>
                        <Input className='w-100 mt-3 date-time-input' style={{background: 'border-box'}}
                               placeholder={placeholder}/>
                    </div>
                </mobiscroll.Time>
            </div>

        );
    }
}

export default connect(null, null)(DateItem)