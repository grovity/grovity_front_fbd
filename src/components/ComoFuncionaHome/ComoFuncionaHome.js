import React from "react";
import {Row, Col,} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';




const ComoFuncionaHome = () => {

    return (
        <div id='como-funciona-home-container'>
            <Row justify='space-around'>
                <Col xxl={20} xl={20} lg={20} md={22} sm={22} xs={22}>
                    <Row className='founders-titulo'>
                        <h1>¿</h1>
                        <h2>Cómo funciona?</h2>
                    </Row>
                    <Row justify='space-between' align='middle'>
                        <Col className='cols-como-home-blanco' xxl={12} xl={8} lg={6} md={6} sm={12} xs={12}>
                            <img alt='Elige' src={process.env.PUBLIC_URL + '/static/imgs/home3/1x/choose.png'}/>
                        </Col>
                        <Col className='cols-como-home-blanco' xxl={12} xl={16} lg={18} md={18} sm={12} xs={12}>
                            <Row justify='end' align='middle'>
                                <Col xxl={2} xl={2} lg={2} md={2} sm={2} xs={2}>
                                    <h1>1</h1>
                                </Col>
                                <Col className='cols-text' xxl={12} xl={12} lg={14} md={12} sm={20} xs={20}>
                                    <h3>Elige el mentor que necesites</h3>
                                    <p>Filtra por temas de interés como Growth, levantamiento 
                                        de capital, finanzas y más. </p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row justify='space-between' align='middle'>
                        <Col className='cols-como-home' xxl={16} xl={14} lg={16} md={16} sm={12} xs={12}>
                            <Row justify='start' align='middle'>
                                <Col xxl={2} xl={2} lg={2} md={2} sm={2} xs={2}>
                                    <h1>2</h1>
                                </Col>
                                <Col className='cols-text' xxl={8} xl={10} lg={14} md={11} sm={20} xs={20}>
                                    <h3>Agenda una sesión 1 a 1</h3>
                                    <p>Contácta al mentor y cuéntale los temas de los que te gustaría hablar.</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col className='cols-como-home' xxl={8} xl={7} lg={7} md={8} sm={12} xs={12}>
                            <img alt='Agenda' src={process.env.PUBLIC_URL + '/static/imgs/home3/1x/schedule.png'}/>
                        </Col>
                    </Row>
                    <Row justify='space-between' align='middle'>
                        <Col className='cols-como-home-blanco' xxl={12} xl={8} lg={6} md={8} sm={12} xs={12}>
                            <img alt='Paga' src={process.env.PUBLIC_URL + '/static/imgs/home3/1x/pay.png'}/>
                        </Col>
                        <Col className='cols-como-home-blanco' xxl={12} xl={12} lg={18} md={12} sm={12} xs={12}>
                            <Row justify='end' align='middle'>
                                <Col xxl={2} xl={2} lg={2} md={2} sm={2} xs={2}>
                                    <h1>3</h1>
                                </Col>
                                <Col className='cols-text' xxl={12} xl={16} lg={16} md={16} sm={20} xs={20}>
                                    <h3>Accede a la mentoría</h3>
                                    <p>Realiza el pago por PayU y accede desde la plataforma de 
                                        Grovity a la sesión con el Mentor. </p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );

}

export default ComoFuncionaHome;