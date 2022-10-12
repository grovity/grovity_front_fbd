import React, {useState, useEffect} from 'react'
import {Col, Row, Card, Button, Modal, Divider} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {
    selectCurrentUser,
} from "../../selectors/users";
import {connect} from "react-redux";
import {enquireScreen} from 'enquire-js';
import ConfirmacionCompra from '../ConfirmacionCompra/ConfirmacionCompra';
//import ConfirmacionCompraPago from '../ConfirmacionCompraPago/ConfirmacionCompraPago';

const SiderAgendar = ({user, id, empresa_emprendedor, entidad, status}) => {

    const [isMobile, setIsMobile] = useState(false);
    const [visible, setVisible] = useState(false);
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = newSchedule => {
        setSchedule({ schedule: newSchedule })
      }

    const handleModal = () => {
        setVisible(true); 
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
        <Row id='sider-agendar' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col lg={24} xs={24} md={24}>
                <Card style={{ width: '100%' }}>
                    <Row style={{height: 'auto'}}>
                        <Col lg={24} xs={24} md={24}>
                            <h6>Resumen</h6>
                            <Row>    
                                <Col lg={15} xs={15} md={15} className="inicio">
                                <p>No. de horas</p>
                                </Col>
                                <Col lg={7} xs={7} md={7} className="final">
                                <p>2</p>
                                </Col>
                            </Row>
                            <Divider/>
                            <Row>
                                <Col lg={15} xs={15} md={15} className="inicio">
                                <p><strong>Total</strong></p>
                                </Col>
                                <Col lg={7} xs={7} md={7} className="final">
                                <p><strong>$120,000</strong></p>
                                </Col>
                            </Row>
                            <Button block size="large" onClick={handleModal}>AGENDAR AHORA</Button>
                        </Col>
                    </Row> 
                    <Modal
                        title="Confirma y paga"
                        centered
                        visible={visible}
                        onOk={() => setVisible(false)}
                        onCancel={() => setVisible(false)}
                        width={1000}
                        footer={[
                            <Button key="back" onClick={() => setVisible(false)}>
                              Seguir comprando
                            </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                              Pagar
                            </Button>,
                          ]}
                    >
                        {/* <Row>
                            <Col> */}
                                <ConfirmacionCompra/>
                            {/* </Col>
                            <Col> */}
                                {/* <ConfirmacionCompraPago/> */}
                            {/* </Col>
                        </Row> */}
                    </Modal>
                </Card>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state, props) => ({
   user: selectCurrentUser(state)
});

export default connect(mapStateToProps, null)(SiderAgendar)