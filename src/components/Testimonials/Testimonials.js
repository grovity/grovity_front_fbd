import React from "react";
import {Row, Col, Card} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';



const Testimonials = () => {

    return (
        <div id='testimonials-home-container'>
            <Row justify='space-around'>
                <Col xxl={20} xl={20} lg={20} md={22} sm={22} xs={22}>
                    <Row className='founders-titulo'>
                        <h1>+</h1>
                        <h2>de 950 emprendedores han tomado  
                            mentorias en Grovity</h2>
                    </Row>
                    <Row justify='center' align='middle'>
                        <Col className='cols-como-home' xxl={8} xl={10} lg={10} md={10} sm={12} xs={22}>
                            <Row justify='center'>
                                <Col>
                                    <Card className='card-testimonials'>
                                        <img alt='Elige' src={process.env.PUBLIC_URL + '/static/imgs/home3/Gina.jpg'}/>
                                        <div className='text-card-testimonials'>
                                            <h1 className='quotes'>"</h1>
                                            <p>Gracias a los mentores de Grovity y su amplia experiencia, 
                                            logramos re estructurar nuestra área financiera en la empresa y 
                                            realizar interesantes proyecciones.</p>
                                            <p className='nom-testimonial'>GINA RODRIGUEZ</p>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                            <Row justify='center'>
                                <Col>
                                    <Card className='card-testimonials'>
                                        <img alt='Elige' src={process.env.PUBLIC_URL + '/static/imgs/home3/franck.jpg'}/>
                                        <div className='text-card-testimonials'>
                                            <h1 className='quotes'>"</h1>
                                            <p>Excelente. Estamos muy agradecidos, ha sido la mejor 
                                                asesoría hasta el momento.</p>
                                            <p className='nom-testimonial'>FRANCK FAJARDO</p>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                        <Col className='cols-como-home' xxl={8} xl={10} lg={10} md={10} sm={12} xs={22}>
                            <Row justify='center'>
                                <Col style={{height: '250px'}} xxl={8} xl={10} lg={10} md={10} sm={0} xs={0}></Col>
                            </Row>
                            <Row justify='center'>
                                <Col>
                                    <Card className='card-testimonials'>
                                        <img alt='Elige' src={process.env.PUBLIC_URL + '/static/imgs/home3/adolfo.jpg'}/>
                                        <div className='text-card-testimonials'>
                                            <h1 className='quotes'>"</h1>
                                            <p>Los mentores de Grovity son muy objetivos y claros, me han 
                                                ayudado a crear procesos específicos en mi empresa.</p>
                                            <p className='nom-testimonial'>ADOLFO GÓMEZ</p>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                            <Row justify='center'>
                                <Col>
                                    <Card className='card-testimonials'>
                                        <img alt='Elige' src={process.env.PUBLIC_URL + '/static/imgs/home3/valeria.jpg'}/>
                                        <div className='text-card-testimonials'>
                                            <h1 className='quotes'>"</h1>
                                            <p>Muy buenos aportes, interesante la mentoría, con buena energía.</p>
                                            <p className='nom-testimonial'>VALERIA DE ROSA GARZÓN</p>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Testimonials;