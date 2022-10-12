import React, {Component} from 'react';
import {Col, Row} from 'antd';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {ArrowLeftOutlined} from '@ant-design/icons'
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import ChangePassForm from './ChangePassForm';
import {setAlert} from "../../actions/alert";



class ChangePassSection extends Component {
    render() {
        return (
            <div className='fondo-changepass'>
                <Row style={{height:'12%'}} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                   <div className='back-arrow' onClick={() => this.props.history.goBack()}><ArrowLeftOutlined /></div>
                </Row>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='main-row'>
                    <Col lg='24' className="changepassContainer">
                        <Row className="secondary-row">
                            <Col md='7' lg='12' className='login-pic'>
                                <a href='/'><img className="logo-login" src={process.env.PUBLIC_URL + '/static/imgs/plataforma/1.5x/logo_azul_5@1.5x.png'} alt="logo"/></a>
                            </Col>

                            <Col md='5' lg='12' className='login-form-col'>
                            <ChangePassForm {...this.props} id={this.props.match.params.id}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}></Row>
            </div>
        );
    }
}

export default withRouter(connect(null, {
    setAlert,
})(ChangePassSection))
