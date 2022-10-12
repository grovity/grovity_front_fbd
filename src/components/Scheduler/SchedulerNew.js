import React, {useState, useEffect} from 'react'
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import {connect} from "react-redux";
import {Modal} from 'antd';
import BloqueDispoEdit from "../BloqueDispo/BloqueDispoEdit";


const SchedulerNew = ({disponibilidad, setDataScheduler, setFlag}) => {
    const [visible, setVisible] = useState(false);
    const [day, setDay] = useState(null)
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)

    const closeModal = () => {
        setVisible(false);
    }

    const onSetDate = (event, inst) => {
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

});


export default connect(mapStateToProps, {


})(SchedulerNew)