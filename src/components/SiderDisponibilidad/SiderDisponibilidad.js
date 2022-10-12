import React, {useState, useEffect} from 'react'
import {Col, Row, Card, Button, Modal} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {
    selectCurrentUser,
} from "../../selectors/users";
import {connect} from "react-redux";
import {enquireScreen} from 'enquire-js';
import {AiOutlinePlus} from "react-icons/ai";
import {getId} from "../../selectors/institutions";
import {getDispoMentorDay} from "../../api/marketplace";
import {fetchDisponibilidadMentor} from "../../actions/marketplace";
import SchedulerNew from '../Scheduler/SchedulerNew';
import BloqueDispoCreate from '../BloqueDispo/BloqueDispoCreate';


const SiderDisponibilidad = (props) => {
    const {user, id} = props
    const [isMobile, setIsMobile] = useState(false);
    const [dateScheduler, setDateScheduler] = useState(null);
    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [visible, setVisible] = useState(false);
    const [dispoMentor, setdispoMentor] = useState(null);

    let val = new Date()
    let date = val.getDate();
    let month = val.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    let year = val.getFullYear();
    let dateStr = year + "-" + month + "-" + date;


    const handleModal = () => {
        setVisible(true);
    }
    const closeModal = () => {
        setVisible(false);

    }

    enquireScreen((b) => {
        return () => {
            setIsMobile(b);
        }
    })


    useEffect(() => {
        enquireScreen((b) => {
            setIsMobile(
                !!b
            );
        });



    }, [isMobile])

    useEffect(()=>{
         (async () => {
            await props.fetchDisponibilidadMentor(id)
        })()
    },[flag])

    useEffect(()=>{
        if (dateScheduler !== null) {
            const dateformated = dateScheduler.toISOString().split('T')[0]
            getDispoMentorDay(dateformated, user.id).then(dispo => setdispoMentor(dispo))
        }
    },[dateScheduler?.getDate(), flag, flag2])

    return (
        <Row id='sider-schedule' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col lg={24} xs={24} md={24}>
                <Card style={{width: '100%'}}>
                    <Row style={{height: 'auto'}}>
                        <Col>
                            <SchedulerNew setDataScheduler={setDateScheduler} setFlag={setFlag}
                                          disponibilidad={dispoMentor} modalSchedule={false}/>
                            <Button type='primary' block size="medium" className="btn-azul-basico btn-agregar-disponibilidad "
                                    onClick={handleModal}>
                                            <AiOutlinePlus/> Agregar disponibilidad</Button>
                            <Modal
                                title="Agregar disponibilidad"
                                className='modales-plan'
                                centered
                                visible={visible}
                                onOk={() => setVisible(false)}
                                onCancel={() => setVisible(false)}
                                width={700}
                                footer={[]}
                            >
                                <BloqueDispoCreate dateScheduler={dateScheduler} setVisible={closeModal} setFlag={setFlag2} closeModal={closeModal}/>
                            </Modal>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state, props) => ({
    user: selectCurrentUser(state),
    id: getId(state),
    disponibilidad: state.disponibilidad_mentor
});

export default connect(mapStateToProps, {
    fetchDisponibilidadMentor
})(SiderDisponibilidad)