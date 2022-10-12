import React from "react";
import mobiscroll from "@mobiscroll/react";
import {connect} from 'react-redux'
import './style.css'
import Input from "reactstrap/lib/Input";

mobiscroll.settings = {
    lang: 'es'
};

class DateItem_fin extends React.Component {
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
        const {input: {value, onChange}} = this.props
        return (
            <div>
                <mobiscroll.Datetime dateWheels="|M| |D| |d|" dateFormat={'yy-mm-dd'} timeFormat={'HH:ii'}
                                     value={value ? value : this.state.date}
                                     onSet={(a) => onChange(a.valueText)}
                                     lang='es'
                                     dayNames={['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado']}>
                    <div>
                        <Input className='w-100 mt-3 customInput3'  style={{background:'border-box'}}  placeholder='Fecha y hora final'/>
                    </div>
                </mobiscroll.Datetime>
            </div>

        );
    }
}

export default connect(null, null)(DateItem_fin)