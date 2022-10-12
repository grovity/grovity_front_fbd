import React from 'react';
import './OurClients.scss'
import {Row, Col,} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';


const OurClients = () => {

    return (
        <div id='our-clients-container'>
            <Row justify='space-around'>
                <Col xxl={20} xl={20} lg={20} md={22} sm={22} xs={22}>
                    <Row className='founders-titulo'>
                        <h1>G</h1>
                        <h2>rovity ha ayudado a <br/>startups como</h2>
                    </Row>
                    <Row justify='space-between' align='middle'>
                        <Col className='cols-como-home-blanco' xxl={4} xl={4} lg={7} md={7} sm={12} xs={11}>
                            <img alt='Elige' src={process.env.PUBLIC_URL + '/static/imgs/home3/logo6.jpg'}/>
                        </Col>
                        <Col className='cols-como-home-blanco' xxl={4} xl={4} lg={7} md={7} sm={12} xs={11}>
                            <img alt='Elige' src={process.env.PUBLIC_URL + '/static/imgs/home3/logo8.jpg'}/>
                        </Col>
                        <Col className='cols-como-home-blanco' xxl={4} xl={4} lg={7} md={7} sm={12} xs={11}>
                            <img alt='Elige' src={process.env.PUBLIC_URL + '/static/imgs/home3/logo4.jpg'}/>
                        </Col>
                        <Col className='cols-como-home-blanco' xxl={4} xl={4} lg={12} md={12} sm={12} xs={11}>
                            <img alt='Elige' src={process.env.PUBLIC_URL + '/static/imgs/home3/logo2.jpg'}/>
                        </Col>
                        <Col className='cols-como-home-blanco' xxl={4} xl={4} lg={12} md={12} sm={12} xs={11}>
                            <img alt='Elige' src={process.env.PUBLIC_URL + '/static/imgs/home3/logo5.jpg'}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );

}

export default OurClients;