import React from "react";
import {Row, Col, Button} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';


const CallToHomeEco = (props) => {

    const {isMobile} = props;
    return (
        <div id='call-to-home-eco'>
            <Row justify='space-around' align='center'>
                <Col xxl={18} xl={18} lg={18} md={18} sm={22} xs={22}>
                    <Row justify='start'>
                        <Col xxl={6} xl={6} lg={9} md={9} sm={8} xs={13}>
                            <a target='_blank'  href={`https://calendly.com/grovity/demogrovity?month=2021-03`}>
                                <Button className='btn-call-to-home3' size={isMobile ? 'small' : 'large'} block>Agenda una demo ya</Button>
                            </a>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );

}

export default CallToHomeEco;