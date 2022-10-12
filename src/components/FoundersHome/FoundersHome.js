import React from "react";
import {Row, Col,} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';


const FoundersHome = () => {

    return (
        <div id='founders-home-container'>
            <Row justify='space-around'>
                <Col xxl={20} xl={20} lg={20} md={22} sm={22} xs={22}>
                    <Row className='founders-titulo'>
                        <h1>+</h1>
                        <h2>de 100 founders dispuestos a ayudarte</h2>
                    </Row>
                    <Row justify='space-between'>
                        <Col className='cols-founders-home-blanco' xxl={5} xl={7} lg={7} md={7} sm={22} xs={24}>
                            <Row justify='space-between' align='middle'>
                                <Col xxl={24} xl={24} lg={24} md={24} sm={11} xs={12}>
                                    <img alt='Andres Mejia' src={process.env.PUBLIC_URL + '/static/imgs/home3/andres.jpg'}/>
                                </Col>
                                <Col xxl={24} xl={24} lg={24} md={24} sm={13} xs={12}>
                                    <h3>Andrés Mejía</h3>
                                    <p>Fundador Genie Latam, empresa consultora de innovación con más 
                                        de 8 años en el mercado. Cofundador Grovity.</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col className='cols-founders-home' xxl={5} xl={7} lg={7} md={7} sm={22} xs={24}>
                            <Row justify='space-between' align='middle'>
                                <Col xxl={24} xl={24} lg={24} md={24} sm={11} xs={12}>
                                    <img alt='Gaby Munoz' src={process.env.PUBLIC_URL + '/static/imgs/home3/Gaby.jpg'}/>
                                </Col>
                                <Col xxl={24} xl={24} lg={24} md={24} sm={13} xs={12}>
                                    <h3>Gaby Muñoz</h3>
                                    <p>Cofundadora y CEO de Taxia Life, una app para solicitar taxi con 
                                        más de 100K usuarios en 10 ciudades de Colombia.</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col className='cols-founders-home-blanco' xxl={5} xl={7} lg={7} md={7} sm={22} xs={24}>
                            <Row justify='space-between' align='middle'>
                                <Col xxl={24} xl={24} lg={24} md={24} sm={11} xs={12}>
                                    <img alt='Hernando Varon' src={process.env.PUBLIC_URL + '/static/imgs/home3/hernando.jpg'}/>
                                </Col>
                                <Col xxl={24} xl={24} lg={24} md={24} sm={13} xs={12}>
                                    <h3>Hernando Varón</h3>
                                    <p>Founder de Peiky, una Startup que empodera el mundo del comercio 
                                        social para marcas, vendedores y compradores.</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );

}

export default FoundersHome;