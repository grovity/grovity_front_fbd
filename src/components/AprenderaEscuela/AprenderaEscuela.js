import React from 'react';
import {Row, Col} from 'antd';
import {CheckOutlined} from '@ant-design/icons'
import './AprenderaEscuela.scss'


class AprenderaEscuela extends React.PureComponent {

    render() {
        const {aprendera1, aprendera2, aprendera3, aprendera4, aprendera5, aprendera6, aprendera7, 
                aprendera8, aprendera9, aprendera10, aprendera11, aprendera12} = this.props;
        return (
            <Row className='aprendera-escuela' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col className="containerAprendera" span={24}>
                <Row className='title'>
                    <h2>Aprenderá</h2>
                    <hr/>
                </Row>
                <Row>
                <Col md={12} xs={24}>
                    <p><CheckOutlined/> {aprendera1}</p>
                    <p><CheckOutlined/> {aprendera2}</p>
                    <p><CheckOutlined/> {aprendera3}</p>
                    <p><CheckOutlined/> {aprendera4}</p>
                    <p><CheckOutlined/> {aprendera5}</p>
                    <p><CheckOutlined/> {aprendera6}</p>
                </Col>
                <Col md={12} xs={24}>
                    <p><CheckOutlined/> {aprendera7}</p>
                    <p><CheckOutlined/> {aprendera8}</p>
                    <p><CheckOutlined/> {aprendera9}</p>
                    <p><CheckOutlined/> {aprendera10}</p>
                    <p><CheckOutlined/> {aprendera11}</p>
                    <p><CheckOutlined/> {aprendera12}</p>
                </Col>
                </Row>
                </Col>
            </Row>
        );
    }
}

export default AprenderaEscuela;