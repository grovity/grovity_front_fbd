import React, {useState, useEffect} from 'react'
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import {connect} from "react-redux";
import {Modal} from 'antd';
import BloqueDispoEdit from "../BloqueDispo/BloqueDispoEdit";
import { selectCurrentUser } from '../../selectors/users';
import { getDailyAvailability } from '../../api/user';


const SchedulerNew = ({setDataScheduler, setFlag, user}) => {
    const { id } = user
    const [visible, setVisible] = useState(false);
    const [day, setDay] = useState(null)
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    const [disponibilidad, setDisponibilidad] = useState([])

    const closeModal = () => {
        setVisible(false);
    }

    const onSetDate = async (event, inst) => {
        const day = event.date

        let val = new Date(day)
        let date = val.getDate();
        let month = val.getMonth() + 1;
        let year = val.getFullYear();
        let dateStr = year + "-" + month + "-" + date;

        const eventsDay = await getDailyAvailability(id, dateStr)

        setDisponibilidad((prev) => [
            ...eventsDay,
            ...prev,
        ])

        setDataScheduler(event.date)
    }

    const onSetEvent = (e) => {
        setDay(e.date)
        setStart(e.event.start)
        setEnd(e.event.end)
        setVisible(true)
    }

        return (
            <>
            <mobiscroll.Eventcalendar
                display="inline"
                data={disponibilidad}
                view={{
                    calendar: { type: 'month' },
                    eventList: { type: 'day', scrollable: true }
                }}
                theme="mobiscroll"
                themeVariant="light"
                lang='es'
                noEventsText= 'No hay disponibilidad'
                onEventSelect={onSetEvent}
                onSetDate={onSetDate}

            />
            <Modal
                title="Bloque de disponibilidad"
                className='modales-plan'
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={700}
                footer={[]}
            >
                <BloqueDispoEdit setFlag={setFlag} setVisible={setVisible} day={day} start={start} end={end} closeModal={closeModal}/>
            </Modal>
            </>
        );
    }

const mapStateToProps = (state) => ({
    user: selectCurrentUser(state),
});


export default connect(mapStateToProps, {


})(SchedulerNew)