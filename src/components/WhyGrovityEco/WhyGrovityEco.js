import React from "react";
import {Row, Col,} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';




const WhyGrovityEco = () => {

    return (
        <div id='why-eco-container'>
            <Row justify='space-around'>
                <Col xxl={16} xl={18} lg={20} md={22} sm={22} xs={22}>
                    <Row className='founders-titulo' justify='center'>
                        <h2>Con Grovity obtienes</h2>
                    </Row>
                    <Row justify='space-between' align='middle' className='row-obtienes'>
                        <Col className='cols-why-izq' xxl={12} xl={12} lg={12} md={10} sm={12} xs={12}>
                            <img alt='Ajusta tu tema' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/1.5x/marca-blanca.png'}/>
                            <a style={{color: 'gray', fontSize: '10%', position: 'absolute', top: '92%', left: '6%'}}
                                href="https://storyset.com/work">Illustration by Freepik Storyset</a>
                        </Col>
                        <Col className='cols-why-izq' xxl={12} xl={11} lg={12} md={14} sm={12} xs={12}>
                            <h3>Marca blanca</h3>
                            <p>Puedes usar Grovity como tu plataforma propia, utilizar tu branding 
                                y tener una apariencia más profesional</p>
                        </Col>
                    </Row>
                    <Row justify='space-between' align='middle'>
                        <Col className='cols-why-der' xxl={12} xl={11} lg={12} md={14} sm={12} xs={12}>
                            <h3>Recolección de datos</h3>
                            <p>Con el módulo de indicadores puedes seguir el avance real de los 
                                equipos del programa semana a semana</p>
                        </Col>
                        <Col className='cols-why-der' xxl={12} xl={12} lg={12} md={10} sm={12} xs={12}>
                            <img alt='reportes' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/1.5x/reportes.png'}/>
                            <a style={{color: 'gray', fontSize: '10%', position: 'absolute', top: '90%', left: '60%'}}
                                href="https://storyset.com/work">Illustration by Freepik Storyset</a>
                        </Col>
                    </Row>
                    <Row justify='space-between' align='middle'>
                        <Col className='cols-why-izq' xxl={12} xl={12} lg={12} md={10} sm={12} xs={12}>
                            <img alt='Agendar' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/1.5x/agendar.png'}/>
                            <a style={{color: 'gray', fontSize: '10%', position: 'absolute', top: '90%', left: '6%'}}href="https://storyset.com/business">Illustration by Freepik Storyset</a>
                        </Col>
                        <Col className='cols-why-izq' xxl={12} xl={12} lg={12} md={14} sm={12} xs={12}>
                            <h3>Agendamiento de mentorías</h3>
                            <p>Agenda rápidamente mentorías y asesorías para los mentores y 
                                emprendedores de los programas</p>
                        </Col>
                    </Row>
                    <Row justify='space-between' align='middle'>
                        <Col className='cols-why-der' xxl={12} xl={12} lg={12} md={14} sm={12} xs={12}>
                            <h3>Grabación de las sesiones</h3>
                            <p>Graba y almacena los videos de las mentorías para que los 
                                emprendedores y mentores puedan acceder cuando quieran </p>
                        </Col>
                        <Col className='cols-why-der' xxl={12} xl={12} lg={12} md={10} sm={12} xs={12}>
                            <img alt='Grabacion' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/1.5x/grabar.png'}/>
                            <a style={{color: 'gray', fontSize: '10%', position: 'absolute', top: '91%', left: '60%'}}
                                href="https://storyset.com/web">Illustration by Freepik Storyset</a>

                        </Col>
                    </Row>
                    <Row justify='space-between' align='middle'>
                        <Col className='cols-why-izq' xxl={12} xl={12} lg={12} md={10} sm={12} xs={12}>
                            <img alt='Perfil' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/1.5x/perfil.png'}/>
                            <a style={{color: 'gray', fontSize: '10%', position: 'absolute', top: '90%', left: '6%'}}
                                href="https://storyset.com/online">Illustration by Freepik Storyset</a>
                        </Col>
                        <Col className='cols-why-izq' xxl={12} xl={12} lg={12} md={14} sm={12} xs={12}>
                            <h3>Perfil de emprendedores</h3>
                            <p>Permite a lo mentores acceder a información valiosa de los 
                                emprendedores y la empresa para conocerlos mejor antes de cada sesión</p>
                        </Col>
                    </Row>
                    <Row justify='space-between' align='middle'>
                        <Col className='cols-why-der' xxl={12} xl={12} lg={12} md={14} sm={12} xs={12}>
                            <h3>Plataforma de videollamadas</h3>
                            <p>Con un solo click los emprendedores y mentores pueden unirse a 
                                las sesiones online</p>
                        </Col>
                        <Col className='cols-why-der' xxl={12} xl={12} lg={12} md={10} sm={12} xs={12}>
                            <img alt='Video llamadas' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/1.5x/videollamada.png'}/>
                            <a style={{color: 'gray', fontSize: '10%', position: 'absolute', top: '86%', left: '50%'}}
                                href="https://storyset.com/event">Illustration by Freepik Storyset</a>
                        </Col>
                    </Row>
                    <Row justify='space-between' align='middle'>
                        <Col className='cols-why-izq' xxl={12} xl={12} lg={12} md={10} sm={12} xs={12}>
                            <img alt='Actividades' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/1.5x/actividades.png'}/>
                            <a style={{color: 'gray', fontSize: '10%', position: 'absolute', top: '88%', left: '6%'}}
                                href="https://storyset.com/work">Illustration by Freepik Storyset</a>
                        </Col>
                        <Col className='cols-why-izq' xxl={12} xl={12} lg={12} md={14} sm={12} xs={12} styl={{color: 'red'}}>
                            <h3>Creación de actividades</h3>
                            <p>Ayuda a los mentores a asignar tareas y compromisos a los 
                                emprendedores y revisar sus avances en cualquier momento </p>
                        </Col>
                    </Row>
                    <Row justify='space-between' align='middle'>
                        <Col className='cols-why-der' xxl={12} xl={12} lg={12} md={14} sm={12} xs={12}>
                            <h3>Acta de asistencia</h3>
                            <p>Permite a los mentores  subir las actas</p>
                        </Col>
                        <Col className='cols-why-der' xxl={12} xl={12} lg={12} md={10} sm={12} xs={12}>
                            <img alt='Acta' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/1.5x/acta.png'}/>
                            <a style={{color: 'gray', fontSize: '10%', position: 'absolute', top: '91%', left: '45%'}}
                                href="https://storyset.com/work">Illustration by Freepik Storyset</a>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default WhyGrovityEco;