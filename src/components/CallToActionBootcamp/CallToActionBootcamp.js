import React from 'react';
import './CallToActionBootcamp.scss';
import {Row, Col, Button} from 'antd';
import {Card} from 'antd';
import { Link } from 'react-scroll';

const {Meta} = Card;


export default function CallToActionBootcamp(props) {
    const {accede, cupos, boton} = props;
    return (
        <div className='fondo-call-bootcamp'>
            <div className='mentores-section2'>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col lg={16} xs={20}>
                        <h4>{cupos}</h4>
                        <h1>{accede}</h1>
                    </Col>
                </Row>
                <Row className='call-to-action-bootcamp'>
                    <Link className="menu-item" 
                    activeClass="active"    
                    to="banner-bootcamp" 
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}><Button type="success" className='button-call'>
                        {boton}
                    </Button></Link>
                </Row>
            </div>
        </div>

    );
}