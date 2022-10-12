import React from "react";
import {Row, Col,} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import { GrTechnology } from "react-icons/gr";
import { SiGoogleclassroom } from "react-icons/si";
import { BiSupport } from "react-icons/bi";
import { IoMdInfinite} from "react-icons/io";



const SituacionesEco = () => {

    return (
        <div id='situaciones-eco'>
            <Row justify='space-around'>
                <Col xxl={20} xl={20} lg={20} md={22} sm={22} xs={22}>
                    <h2>¿Te identificas con alguna de estas situaciones?</h2>
                    <Row justify='space-between' gutter={[16,16]} style={{marginTop: '7%'}}>
                        <Col className='cols-why-grovity' xxl={6} xl={6} lg={5} md={11} sm={24} xs={24}>
                            <GrTechnology size={45} className='icons-why-grovity'/>
                            <p>Quieres correr tu <strong>programa de aceleración o incubación</strong> digital 
                                pero no tienes las herramientas tecnológicas necesarias.</p>
                        </Col>
                        <Col className='cols-why-grovity' xxl={6} xl={6} lg={5} md={11} sm={24} xs={24}>
                            <SiGoogleclassroom size={45} className='icons-why-grovity'/>
                            <p>Te diste cuenta que correr un programa de aceleración digital es <strong>mucho más que 
                                tener una cuenta de videollamadas</strong> y unas carpetas en la nube</p>
                        </Col>
                        <Col className='cols-why-grovity' xxl={6} xl={6} lg={5} md={11} sm={24} xs={24}>
                            <BiSupport size={45} className='icons-why-grovity'/>
                            <p>El <stong>desgaste logístico, tecnológico y de soporte al cliente</stong> te 
                                desenfoca de tus tareas más importantes</p>
                        </Col>
                        <Col className='cols-why-grovity' xxl={6} xl={6} lg={5} md={11} sm={24} xs={24}>
                            <IoMdInfinite size={45} className='icons-why-grovity'/>
                            <p>No puedes encontrar mentores o empresas para acompañar rápidamente y 
                                se vuelve una tarea infinita </p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );

}

export default SituacionesEco;