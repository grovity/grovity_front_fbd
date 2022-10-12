import React from "react";
import {Row, Col,} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import { GoDatabase } from "react-icons/go";
import { BiTimer} from "react-icons/bi";
 


const MentoresNecesariosEco = (props) => {

    const {isMobile} = props;

    return (
        <div id='mentores-necesarios-eco'>
            <Row justify='space-around'>
                <Col xxl={20} xl={20} lg={20} md={22} sm={22} xs={22}>
                    <h2>¿El programa empieza pronto y aún no {isMobile ? "" : <br/>} 
                        tienen los mentores necesarios?</h2>                  
                    <Row justify='center' gutter={[32,16]} style={{marginTop: '5%'}}>
                        <Col className='cols-why-grovity' xxl={8} xl={8} lg={10} md={11} sm={11} xs={22}>
                            <BiTimer size={45} className='icons-why-grovity'/>
                            <p>Te ayudamos a encontrar los perfiles de mentores y asesores 
                                que necesites para tus programas <strong>en menos de 48 horas.</strong></p>
                        </Col>
                        <Col className='cols-why-grovity' xxl={8} xl={8} lg={10} md={11} sm={11} xs={22}>
                            <GoDatabase size={40} className='icons-why-grovity'/>
                            <p>No importa que tan específico sea el perfil, 
                                tenemos <strong>una base de datos de miles de mentores</strong> que pueden ayudarte.</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );

}

export default MentoresNecesariosEco;