import React, {useState, useEffect} from 'react';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
//import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import {Row, Col} from 'antd';


function CalendarPruebas({events, status, value, onChange}) {
    const [weekCalendar, setWeekCalendar] = useState([]);
    //const [value, setValue] = useState(moment());

    const startDay = value.clone().startOf('week');
    const endDay = value.clone().endOf('week');
    
    useEffect(() => {
        const day = startDay.clone().subtract(1, 'day');
        const a = [];
        while (day.isBefore(endDay, 'day')){
            a.push (
                Array(7).fill(0).map(() => day.add(1, 'day').clone())
            );
        }
        setWeekCalendar(a);
    }, [value])
    
    function isSelected(day, value) {
        return value.isSame(day, 'day');
    }
    
    function isToday(day) {
        return day.isSame(new Date(), 'day');
    }

    function dayStyles(day, value) {
        if (isSelected(day, value)) 
        return 'selected'
        if (isToday(day))
        return 'today'
        return "else"
    }

    function currMonthName() {
        return value.format('MMMM');
    }
    function currYear() {
        return value.format('YYYY');
    }

    // function prevWeek() {
    //     return value.clone().subtract(1, 'week');
    // }
    // function nextWeek() {
    //     return value.clone().add(1, 'week');
    // }

    return (
            <Col className='calendar-week-events' xl={14} lg={18} md={24} sm={24} xs={24}>
                <Row className='cal-header'>
                    {/* <Col xl={2} lg={2} md={2} sm={2} xs={2} className='prev' onClick={() => onChange(prevWeek())}><LeftOutlined/></Col> */}
                    <Col xl={20} lg={20} md={20} sm={20} xs={20} className='current'><h5>{currMonthName()} {currYear()}</h5></Col>
                    {/* <Col xl={4} lg={4} md={4} sm={2} xs={2} className='next' onClick={() => onChange(nextWeek())}><RightOutlined/></Col> */}
                </Row>
                <Row className="calendar-week">
                    {["Lu", "Ma", "Mi", "Ju", "Vi", 'Sa', 'Do'].map((d, i) => (
                        <Col key={i} xl={3} lg={3} md={3} sm={3} xs={3}>
                            <h5 >{d}</h5>
                        </Col>
                    ))}
                </Row>
               {
               weekCalendar.map((week, i) => (
                   <Row className="calendar-week" key={i}>
                       {week.map((day, i) =>(
                           <Col key={i} xl={3} lg={3} md={3} sm={3} xs={3} className='calendar-day' 
                           onClick={() => onChange(day)}>
                               <div className={dayStyles(day, value)}>
                                   {day.format("D")}</div>
                            </Col>
                       ))}
                   </Row>
               ))}
            </Col>
    )
}
export default CalendarPruebas;