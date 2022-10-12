import React, {useEffect, useState} from 'react'
import {Col, Row, Button, Card} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {connect} from "react-redux";
import {enquireScreen} from 'enquire-js';
import {Link} from "react-router-dom";
import {getIndicadoresProgram} from "../../api/indicadores";
import {getUsername} from "../../selectors/institutions";
import { FaCalendarCheck } from "react-icons/fa";
import { BsFillClockFill } from "react-icons/bs";


const PlanTrabajoInfoMain = ({user, program, id}) => {
    const [isMobile, setIsMobile] = useState(false);
    const [data, setData] = useState(null);


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

    useEffect(()=>{
        (async ()=>{
            const response = await getIndicadoresProgram(id, user.username)
            if(response){
                setData(response)
            }
        })()
    }, [id, user.username])

    return (
        <Row id='program-info-main' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col lg={24} xs={24} md={24}>
                <Row className='nombre-editar-btn'>
                    <Col lg={24} xs={24} md={24} sm={24} xl={24} className='Nombre'>
                        <Row justify='space-between' gutter={[12,12]}>
                            <Col lg={19} xs={14} md={18} sm={14} xl={20}>
                                <h1>{user?.first_name} {user?.last_name}</h1>
                            </Col>
                            <Col lg={5} xs={10} md={6} sm={10} xl={4}>
                                {/* <p>Phoenix</p> */}
                                <Link to={`/user/detail/${user.username}`}>
                                    <Button type='primary' block className="btn-verde-basico btn-ver-perfil">Ver perfil</Button>
                                </Link>
                            </Col>
                        </Row>
                        <Row>
                            <p className='info-program'>
                            <strong>Programa:</strong> {program.nombre} <br/>
                            <strong>Descripción:</strong> {program.descripcion} <br/></p>
                        </Row>
                        <Row gutter={[12,12]}>
                            <Col xxl={7} xl={10} lg={12} md={12} sm={12} xs={24}>
                                <Card className='datos-emprendedor'>
                                    <Row gutter={[12,12]}>
                                    <Col xxl={18} xl={18} lg={18} md={18} sm={18} xs={18}>
                                        <p>Asistencia</p>
                                        <p><strong>{data?.attendance_percentage ? data?.attendance_percentage?.toFixed(2) : '0.00'}%</strong></p>
                                    </Col>
                                    <Col xxl={6} xl={6} lg={6} md={6} sm={6} xs={6}>
                                        <FaCalendarCheck className='icons' size={isMobile? 40 : 45}/>
                                    </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col xxl={7} xl={10} lg={12} md={12} sm={12} xs={24}>
                                <Card className='datos-emprendedor'>
                                    <Row gutter={[12,12]}>
                                    <Col xxl={18} xl={18} lg={18} md={18} sm={18} xs={18}>
                                        <p>Horas recibidas</p>
                                        <p><strong>{data?.hours_received ? data?.hours_received?.toFixed(2) : '0.00'}</strong></p>
                                    </Col>
                                    <Col xxl={6} xl={6} lg={6} md={6} sm={6} xs={6}>
                                        <BsFillClockFill className='icons' size={isMobile? 40 :45}/>
                                    </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state, props) => ({
    program: state.programs,
    username: getUsername(state),
});

export default connect(mapStateToProps, null)(PlanTrabajoInfoMain)