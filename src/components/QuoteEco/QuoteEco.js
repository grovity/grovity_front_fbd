import React from "react";
import {Row, Col,} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';



const QuoteEco = () => {

    return (
        <div id='quote-eco'>
            <Row justify='space-around'>
                <Col xxl={16} xl={18} lg={20} md={22} sm={20} xs={22}>
                    <h3>Enfócate en lo más importante y genera valor a los emprendedores
                        y mentores con una plataforma digital que te permite tener controladas 
                        las variables más importantes de tu programa.</h3>
                </Col>
            </Row>
        </div>
    );

}

export default QuoteEco;