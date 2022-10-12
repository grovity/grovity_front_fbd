import React from 'react';
import './CallToActionEscuela.scss';
import {Row, Col, Button} from 'antd';
import { Link } from 'react-scroll';


export default function CallToActionServicios(props) {
    const {accede, cupos, boton} = props;
    return (
        <div className='fondo-call-escuela'>
            <div className='mentores-section2'>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col lg={16} xs={20}>
                        <h4>{cupos}</h4>
                        <h1>{accede}</h1>
                    </Col>
                </Row>
                <Row className='call-to-action-escuela'>
                    {/* <Link className="menu-item" 
                    activeClass="active"    
                    to="https://biz.payulatam.com/L0d77fb411CD3E8" 
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}> */}
                    <a target="_blank" rel="noopener noreferrer" className="menu-item"
                            href="https://checkout.wompi.co/l/dwE21n">
                        <Button type="success" className='button-call'>
                        {boton}
                    </Button></a>
                    {/* </Link> */}
                </Row>
            </div>
        </div>

    );
}