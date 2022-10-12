import React from 'react';
import {Row, Col,} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';


const OurClientsEco = (props) => {

    const {isMobile} = props;

    return (
        <div id='our-clients-eco-container'>
            <Row justify='center'>
                <Col xxl={20} xl={20} lg={20} md={22} sm={22} xs={22}>
                    <Row className='founders-titulo' justify='center'>
                        <h2>Entidades y empresas que ya utilizan Grovity</h2>
                    </Row>
                    <Row gutter={[16,16]} justify='center' align='middle'>
                        <Col className='cols-como-home-blanco' xxl={4} xl={4} lg={5} md={5} sm={8} xs={8}>
                            {
                                isMobile ?
                                    <img alt='Acopi' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/logos/acopi-05.png'}/>
                                :
                                    <img alt='Acopi' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/logos/acopi.png'}/>
                            }
                        </Col>
                        <Col className='cols-como-home-blanco' xxl={4} xl={4} lg={5} md={5} sm={8} xs={8}>
                            {
                                isMobile ?
                                    <img alt='Bancoldex' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/logos/bancoldex-05.png'}/>
                                :
                                    <img alt='Bancoldex' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/logos/bancoldex.png'}/>
                            }
                        </Col>
                        <Col className='cols-como-home-blanco' xxl={4} xl={4} lg={5} md={5} sm={8} xs={8}>
                            {
                                isMobile ?
                                    <img alt='cc Barranquilla' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/logos/ccbarranquilla-05.png'}/>
                                :
                                    <img alt='cc Barranquilla' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/logos/ccbarranquilla.png'}/>
                            }
                        </Col>
                        <Col className='cols-como-home-blanco' xxl={4} xl={4} lg={5} md={5} sm={8} xs={8}>
                            {
                                isMobile ?
                                    <img alt='cc Cali' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/logos/cccali-05.png'}/>
                                :
                                    <img alt='CC Cali' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/logos/cccali.png'}/>
                            }
                        </Col>
                        <Col className='cols-como-home-blanco' xxl={4} xl={4} lg={5} md={5} sm={8} xs={8}>
                            {
                                isMobile ?
                                    <img alt='Ecopetrol' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/logos/ecopetrol-05.png'}/>
                                :
                                    <img alt='Ecopetrol' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/logos/ecopetrol.png'}/>
                            }
                        </Col>                                                               
                        <Col className='cols-como-home-blanco' xxl={4} xl={4} lg={5} md={5} sm={8} xs={8}>
                            {
                                isMobile ?
                                    <img alt='Genie' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/logos/genie-05.png'}/>
                                :
                                    <img alt='Genie' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/logos/genie.png'}/>
                            }
                        </Col>
                        <Col className='cols-como-home-blanco' xxl={4} xl={4} lg={5} md={5} sm={8} xs={8}>
                            {
                                isMobile ?
                                    <img alt='Innpulsa' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/logos/innpulsa-05.png'}/>
                                :
                                    <img alt='Innpulsa' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/logos/innpulsa.png'}/>
                            }
                        </Col>
                        <Col className='cols-como-home-blanco' xxl={4} xl={4} lg={5} md={5} sm={8} xs={8}>
                            {
                                isMobile ?
                                    <img alt='Mintic' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/logos/mintic-05.png'}/>
                                :
                                    <img alt='Mintic' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/logos/mintic.png'}/>
                            }
                        </Col>
                        <Col className='cols-como-home-blanco' xxl={4} xl={4} lg={5} md={5} sm={8} xs={8}>
                            {
                                isMobile ?
                                    <img alt='PNUD' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/logos/pnud-05.png'}/>
                                :
                                    <img alt='PNUD' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/logos/pnud.png'}/>
                            }
                        </Col>
                        <Col className='cols-como-home-blanco' xxl={4} xl={4} lg={5} md={5} sm={8} xs={8}>
                            {
                                isMobile ?
                                    <img alt='Prom Peru' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/logos/promperu-05.png'}/>
                                :
                                    <img alt='Prom Peru' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/logos/promperu.png'}/>
                            }
                        </Col>                                                                                                                                                
                    </Row>
                </Col>
            </Row>
        </div>
    );

}

export default OurClientsEco;