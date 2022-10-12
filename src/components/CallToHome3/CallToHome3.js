import React from "react";
import {Row, Col, Button} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import {Link, withRouter} from 'react-router-dom';


const CallToHome3 = () => {

    return (
        <div id='call-to-home3'>
            <Row justify='space-around' align='center'>
                <Col xxl={20} xl={20} lg={20} md={22} sm={22} xs={22}>
                    <Row justify='center'>
                        <Col className='cols-why-grovity' xxl={12} xl={16} lg={18} md={18} sm={22} xs={22}>
                            <h3>Crece tu startup. Recibe Mentorias de 
                                founders expertos</h3>
                        </Col>
                    </Row>
                    <Row justify='center'>
                        <Col xxl={6} xl={6} lg={6} md={6} sm={8} xs={12}>
                            <Link to={`/marketplace`}>
                                <Button className='btn-call-to-home3' size='large' block>Buscar Mentores</Button>
                            </Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );

}

export default CallToHome3;