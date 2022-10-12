import React, {useState, useEffect} from 'react'
import {Row, Col, Button, Divider, Card, Avatar, Tooltip} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {enquireScreen} from 'enquire-js';
import {Link} from "react-router-dom";
import { BsStarFill } from "react-icons/bs";


const CardMentor = ({mentor}) => {
    const [isMobile, setIsMobile] = useState(false);

    enquireScreen((b) => {
        return () => {
            setIsMobile(b);
        }
    })

    useEffect(() => {
        enquireScreen((b) => {
            setIsMobile(
                !!b
            );
        });
    }, [isMobile])

    return (
        <Col lg={8} md={12} xs={24} xl={8}>
            <Card className='mt-3' id="card-plan-emprendedor">
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} className="info-mentor">
                            <Col lg={3} md={3} xs={4} sm={3} xl={3} xxl={4}>
                                <Avatar>{mentor.img_usuario}</Avatar>                                
                            </Col>
                            <Col lg={20} md={20} xs={20} sm={20} xl={20} xxl={20}>
                                <Link to={`/mentors/mentors/${mentor.username}/data`}>
                                    <Tooltip placement='top' title={`${mentor.first_name} ${mentor.last_name}`}>
                                        <h5>{mentor.first_name} {mentor.last_name}</h5>
                                    </Tooltip>                                
                                </Link>
                            </Col>
                        </Row> 
                        <Divider/>
                        <Row >
                            <Col lg={24} md={24} xs={24} sm={24} xl={24} xxl={24}>
                                <h6><BsStarFill size={20} className='icons'/> <strong>4.69</strong></h6>
                                <div className='description-mentor-card'>
                                <p>{mentor.descripcion}</p>
                                </div>
                            </Col>
                        </Row>
                        <Divider/>
                        <Row>
                            <Col lg={24} md={24} xs={24} sm={24} xl={24} xxl={24}>
                                <Link to={`/mentors/mentors/${mentor.username}/data`}>
                                    <Button block className='btn-azul-basico'>Ver Perfil</Button>
                                </Link>
                            </Col>
                        </Row>
            </Card>
        </Col>
        
    )
}

export default CardMentor;