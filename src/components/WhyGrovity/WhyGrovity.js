import React from "react";
import {Row, Col,} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import { FaUserFriends, FaLaptop } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";




const WhyGrovity = () => {

    return (
        <div id='why-grovity'>
            <Row justify='space-around'>
                <Col xxl={20} xl={20} lg={20} md={22} sm={22} xs={22}>
                    <Row justify='space-between'>
                        <Col className='cols-why-grovity' xxl={7} xl={7} lg={7} md={11} sm={24} xs={24}>
                            <FaUserFriends size={45} className='icons-why-grovity'/>
                            <h3>Mentorías personalizadas</h3>
                            <p>Puedes tener sesiones 1 a 1 con founders expertos
                             que resolverán tus dudas e impulsarán el crecimiento de tu Startup</p>
                        </Col>
                        <Col className='cols-why-grovity' xxl={7} xl={7} lg={7} md={11} sm={24} xs={24}>
                            <RiMoneyDollarCircleFill size={45} className='icons-why-grovity'/>
                            <h3>Paga por sesión</h3>
                            <p>Paga únicamente por sesiones individuales, sin contratos ni suscripciones</p>
                        </Col>
                        <Col className='cols-why-grovity' xxl={7} xl={7} lg={7} md={24} sm={24} xs={24}>
                            <FaLaptop size={45} className='icons-why-grovity'/>
                            <h3>Dónde quieras, cuándo quieras</h3>
                            <p>Recibe mentoría de founders expertos desde tu oficina, casa o donde sea que estés</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );

}

export default WhyGrovity;