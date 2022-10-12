import React, {Component} from 'react';
import {Col, Row} from 'antd';
import {withRouter} from 'react-router-dom';
import {ArrowLeftOutlined} from '@ant-design/icons'
import './SignUpSection-md.scss'
// import "./SignUpSection.scss";
import logo from "../../assets/images/login_singUp/1.5x/Artboard 13@1.5x.png"
import SignupForm from './SignUpForm';
//import MetaTags from 'react-meta-tags';


class SignupSection extends Component {
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
                                <h2>Conecta con mentores expertos y empieza a crecer tu empresa hoy</h2>
                                <p>Encuentra asesorías 1 a 1 en  finanzas, estrategias de negocio, Growth 
                                    Hacking, Marketing Digital, tecnología y todo lo que necesites para 
                                    multiplicar tus resultados</p>
                                <p><strong>Crea tu cuenta gratis</strong></p>
                            </Col>

                            <Col md='5' lg='12' className='login-form-col'>
                            <SignupForm/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}></Row>
            </div>
        );
    }
}

export default withRouter(SignupSection);