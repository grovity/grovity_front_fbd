import React from "react";
import mobiscroll from "@mobiscroll/react";
import {connect} from 'react-redux'
import './style.css'
import Input from "reactstrap/lib/Input";

mobiscroll.settings = {
    lang: 'es'
};

class DateItem_indicadorMentor extends React.Component {
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
        const {className, id} = this.props
        return (
            <div className= {className}>
                <mobiscroll.Date dateWheels="|M| |D| |d|" dateFormat={'yy-mm-dd'} timeFormat={'HH:ii'}
                                 lang='es'
                                 dayNames={['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado']}
                                 placeholder={this.props.placeholder}

                >
                    <div>
                        <Input style={{background: 'border-box', color: 'black'}} name={this.props.name}
                               className='w-100 mt-3' placeholder='📆' id={id} title='Ingresa la fecha del indicador'/>
                    </div>
                </mobiscroll.Date>
            </div>

        );
    }
}

export default connect(null, null)(DateItem_indicadorMentor)