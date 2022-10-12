import React, {Component} from 'react';
import {Col, Row} from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons'
import "../../components/LoginSection/LoginSection.scss";
import logo from "../../assets/images/login_singUp/1.5x/Artboard 13@1.5x.png"
import LoginForm from './LoginForm';
import {getCurrentUser} from "../../selectors/users";
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";


class LoginSection extends Component {

    render() {
        return (
            <div className='fondo-login'>
                <Row style={{height:'12%'}} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                   <div className='back-arrow' onClick={() => this.props.history.goBack()}><ArrowLeftOutlined /></div>
                </Row>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='main-row'>
                    <Col lg='24' className="loginContainer">
                        <Row className="secondary-row">
                            <Col md='7' lg='12' className='login-pic'>
                                <a href='/'><img className="logo-login" src={logo} alt='logo'/></a>
                                <h2>¡Hola, que bueno volver a verte!</h2>
                            </Col>

                            <Col md='5' lg='12' className='login-form-col'>
                            <LoginForm/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}></Row>
            </div>
        );
    }
}

LoginSection.propTypes = {

};

const mapStateToProps = (state, props) => ({
    user: getCurrentUser(state, props)
});

export default withRouter(connect(mapStateToProps, {

})(LoginSection));