import React from 'react'
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'

mobiscroll.settings = {
    theme: 'ios',
    themeVariant: 'light'
};

class CalendarWeek extends React.Component {
    render() {
        return (
            <div className='form-week'>
                <mobiscroll.Form>
                    <mobiscroll.FormGroup>
                            <mobiscroll.FormGroupTitle id='month'>Septiembre</mobiscroll.FormGroupTitle>
                        <mobiscroll.Calendar lang='es' weeks={1} display="inline" type="hidden"/>
                    </mobiscroll.FormGroup>
                </mobiscroll.Form>
            </div>

        );
    }
}

export default CalendarWeek
