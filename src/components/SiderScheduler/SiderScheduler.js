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
import Scheduler from '../Scheduler/Scheduler';
import ContactarMentor from '../ContactarMentor/ContactarMentor';


const SiderScheduler = ({user, id, empresa_emprendedor, entidad, status}) => {

    const [isMobile, setIsMobile] = useState(false);
    const [visible, setVisible] = useState(false);
    const [schedule, setSchedule] = useState([]);
    const [modalSchedule, setModalSchedule] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = newSchedule => {
        setSchedule({ schedule: newSchedule })
      }

    const handleModalSchedule = () => {
        setVisible(true); 
        setModalSchedule(true);
    }

    const handleModal = () => {
        setVisible(true); 
        setModalSchedule(false);
    }

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setVisible(false);
        }, 3000);
      };

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


    return (
        <Row id='sider-schedule' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col lg={24} xs={24} md={24}>
                <Card style={{ width: '100%' }}>
                    <Row style={{height: 'auto'}}>
                        <Col>
                            <Scheduler modalSchedule={false}/>
                            <Button  block size="medium" onClick={handleModalSchedule}>Comprobar Disponibilidad</Button>
                            <Button  classname='contactar-mentor' type='link' block size="medium" onClick={handleModal}>Contactar al mentor</Button>
                        </Col>
                    </Row>
                    {modalSchedule ?
                         <Modal
                            title="Escoge tu hora de preferencia "
                            centered
                            visible={visible}
                            onOk={() => setVisible(false)}
                            onCancel={() => setVisible(false)}
                            width={1000}
                            footer={[
                                <Button key="back" onClick={() => setVisible(false)}>
                                  Cancelar
                                </Button>,
                                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                                  Agendar
                                </Button>,
                              ]}
                        >
                            <Scheduler modalSchedule={true}/>
                        </Modal>
                    :
                        <Modal
                            title="Escribe tu mensaje"
                            centered
                            visible={visible}
                            onOk={() => setVisible(false)}
                            onCancel={() => setVisible(false)}
                            width={1000}
                            footer={[
                                <Button key="back" onClick={() => setVisible(false)}>
                                  Cancelar
                                </Button>,
                                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                                  Enviar
                                </Button>,
                              ]}
                        >
                            <ContactarMentor/>
                        </Modal> 
                    } 
                   
                </Card>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state, props) => ({
   user: selectCurrentUser(state)
});

export default connect(mapStateToProps, null)(SiderScheduler)