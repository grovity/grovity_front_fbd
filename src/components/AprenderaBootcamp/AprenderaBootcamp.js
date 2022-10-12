import React from 'react';
import {Row, Col} from 'antd';
import {CheckOutlined} from '@ant-design/icons'
import './AprenderaBootcamp.scss'

class AprenderaBootcamp extends React.PureComponent {

    render() {
        const {aprendera1, aprendera2, aprendera3, aprendera4, aprendera5, aprendera6} = this.props;
        return (
            <Row className='aprendera-bootcamp' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col className="containerBootcamp" span={24}>
                <Row className='title'>
                    <h2>Aprenderás</h2>
                    <hr/>
                </Row>
                <Row>
                <Col md={12} xs={24}>
                    <p><CheckOutlined/> {aprendera1}</p>
                    <p><CheckOutlined/> {aprendera2}</p>
                    <p><CheckOutlined/> {aprendera3}</p>
                </Col>
                <Col md={12} xs={24}>
                    <p><CheckOutlined/> {aprendera4}</p>
                    <p><CheckOutlined/> {aprendera5}</p>
                    <p><CheckOutlined/> {aprendera6}</p>
                </Col>
                </Row>
                </Col>
            </Row>
        );
    }
}

export default AprenderaBootcamp;