import React from "react";
import {Row, Col, Card, Button} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import { BsCheckCircle} from "react-icons/bs";



const PricingEco = ({isMobile}) => {

    return (
        <div id='pricing-eco'>
            <Row justify='space-around'>
                <Col xxl={20} xl={20} lg={20} md={22} sm={22} xs={22}>
                    <h2>Precios</h2>
                    <Row justify='space-between' gutter={[16,16]} style={{marginTop: '7%'}}>
                        <Col className='cols-why-grovity' xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                            <Card className='cards-pricing'>
                                <Row justify="center">
                                    <Col xxl={22} xl={22} lg={22} md={24} sm={24} xs={24}>
                                        <h4>Basic</h4>
                                        <p className='numero'>1 a 300 mentorías</p>
                                        <h3>$28.800 COP</h3>
                                        <p className='numero'>por mentoría</p>
                                        <h6>Incluye</h6>
                                        <p>
                                            <BsCheckCircle color='green'/> Perfil para emprendedores <br/>
                                            <BsCheckCircle color='green'/> Perfil para mentores <br/>
                                            <BsCheckCircle color='green'/> Administradores ilimitados <br/>
                                            <BsCheckCircle color='green'/> Plataforma de video llamadas <br/>
                                        </p>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col className='cols-why-grovity' xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                            <Card className='cards-pricing'>
                                <Row justify="center">
                                    <Col xxl={22} xl={22} lg={22} md={24} sm={24} xs={24}>
                                        <h4>Expert</h4>
                                        <p className='numero'>301 a 2000 mentorías</p>
                                        <h3>$23.200 COP</h3>
                                        <p className='numero'>por mentoría</p>
                                        <h6>Incluye</h6>
                                        <p>
                                            <BsCheckCircle color='green'/> Todo lo de Basic <br/>
                                            <BsCheckCircle color='green'/> Marca blanca <br/>
                                            <BsCheckCircle color='green'/> Grabación y almacenamiento de las mentorías <br/>
                                        </p>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col className='cols-why-grovity' xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                            <Card className='cards-pricing'>
                                <Row justify="center">
                                    <Col xxl={22} xl={22} lg={22} md={24} sm={24} xs={24}>
                                        <h4>Unlimited</h4>
                                        <h3>2000+ mentorías</h3>
                                        <h6>Incluye</h6>
                                        <p>
                                            <BsCheckCircle color='green'/> Todo lo de Expert <br/>
                                            <BsCheckCircle color='green'/> Herramientas premium <br/>
                                            <BsCheckCircle color='green'/> Integraciones según tus necesidades (salesforce, hubspot, etc) <br/>
                                            <BsCheckCircle color='green'/> Lider de cuenta dedicado <br/>
                                        </p>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    <Row justify='center'>
                        <Col>
                            <a target='_blank'  href={`https://calendly.com/grovity/demogrovity?month=2021-03`}>
                                <Button className='btn-pricing' size={isMobile ? 'small' : 'large'} block>Agenda una demo ya</Button>
                            </a>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );

}

export default PricingEco;