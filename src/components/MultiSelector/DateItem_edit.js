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
        const {onChange, defaultValue} = this.props
        return (
            <div className="w-100 text-white">
                <mobiscroll.Datetime dateWheels="|D M d|" dateFormat={'yy-mm-dd'} timeFormat={'HH:ii'}
                                     value={defaultValue ? defaultValue : this.state.date}
                                     onSet={(a) => onChange(a.valueText)}
                                     lang='es'
                                     dayNames={['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado']}
                                     placeholder={this.props.placeholder}
                                     steps={{
                                         minute: 30,
                                         second: 1,
                                         zeroBased: true
                                     }}>
                    <div>
                        <Input className='w-100 mt-3' style={{background: 'border-box'}}
                               placeholder='Fecha y hora de inicio'/>
                    </div>
                </mobiscroll.Datetime>
            </div>

        );
    }
}

export default connect(null, null)(DateItem)