import React, {useState, useEffect} from 'react'
import {Row, Col, Button, Divider, Card, Avatar, Progress, Tooltip} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {enquireScreen} from 'enquire-js';
import {Link} from "react-router-dom";


const CardPlanEmprendedor = ({emprendedor, id_institution, id_program}) => {
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

    const emprendedorName = `${emprendedor.first_name} ${emprendedor.last_name}`

    return (
        <Col lg={8} md={12} xs={24} xl={8} xxl={6}>
            <Card className='mt-3' id="card-plan-emprendedor">
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} className="info-actividad">
                            <Col lg={3} md={3} xs={4} sm={3} xl={3} xxl={4}>
                                <Avatar></Avatar>                                
                            </Col>
                            <Col lg={20} md={20} xs={20} sm={20} xl={20} xxl={20}>
                                {
                                    emprendedor.first_name !== "" ?
                                    <Link to={`/users/users/detail/${emprendedor.username}`}>
                                        <Tooltip placement="top" title={emprendedorName}>
                                            <h5>{emprendedor?.first_name} {emprendedor?.last_name}</h5>
                                        </Tooltip>
                                    </Link>
                                    :
                                    <h5 title={emprendedor.email}>{emprendedor.email}</h5>
                                }
                                {/* <p>Phoenix</p>*/}
                            </Col>
                        </Row> 
                        <Divider/>
                        <Row>
                            <Col lg={24} md={24} xs={24} sm={24} xl={24} xxl={24}>
                                <p><strong>Progreso</strong></p>
                                <Progress percent={emprendedor.progress.toFixed(0)} strokeColor='var(--primary-color)'/>
                            </Col>
                            <Divider type='vertical'/>
                        </Row>
                        <Row>
                            <Col lg={24} md={24} xs={24} sm={24} xl={24} xxl={24}>
                                <Link to={`/plan/${emprendedor.username}/${id_program}`}>
                                    <Button block type='primary' className='btn-azul-basico'>Plan de trabajo</Button>
                                </Link>
                            </Col>
                        </Row>
            </Card>
        </Col>
        
    )
}

export default CardPlanEmprendedor;