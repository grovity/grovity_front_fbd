import React, {Component} from 'react';
import {Col, Row} from 'antd';
import {withRouter} from 'react-router-dom';
import {ArrowLeftOutlined} from '@ant-design/icons'
import './SignUpSection-md.scss'
// import "./SignUpSection.scss";
import logo from "../../assets/images/login_singUp/1.5x/Artboard 13@1.5x.png"
import SignupFormProgramas from './SignupFormProgramas';
//import MetaTags from 'react-meta-tags';


class SignupSectionProgramas extends Component {
    render() {
        return (
            <div className='fondo-signup'>
                {/* <MetaTags>
                    <title>Grovity - conecta con los mejores mentores</title>
                    <meta property="og:url" content="https://bit.ly/2UOihD6" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="Grovity - conecta con los mejores mentores" />
                    <meta property="og:description" content="Somos una plataforma que conecta a emprendedores y empresas con mentores de toda Latinoamérica que acompañan las distintas etapas de crecimiento de los negocios" />
                    <meta property="og:image" content="../../assets/images/promo-mentorias.jpg" />
                </MetaTags> */}
                <Row style={{height:'12%'}} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                   <div className='back-arrow' onClick={() => this.props.history.goBack()}><ArrowLeftOutlined /></div>
                </Row>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='main-row'>
                    <Col lg='24' className="loginContainer">
                        <Row className="secondary-row">
                            <Col md='7' lg='12' className='login-pic'>
                                <a href='/'><img className="logo-login" src={logo}/></a>
                                {/* <h2>¡Bienvenido, que bueno tenerte aquí!</h2> */}
                                <h2>Si recibiste invitación para participar en un programa, crea tu cuenta e inicia ahora mismo</h2>
                                <p>Crea tu perfil y encuentra todo lo que necesitas para conectar con asesores, consultores, mentores y participantes del programa</p>
                                <p><strong>Crea tu cuenta gratis</strong></p>
                            </Col>

                            <Col md='5' lg='12' className='login-form-col'>
                            <SignupFormProgramas/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}></Row>
            </div>
        );
    }
}

export default withRouter(SignupSectionProgramas);