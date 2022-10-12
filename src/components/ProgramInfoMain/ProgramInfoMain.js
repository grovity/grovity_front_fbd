import React, {useEffect, useState} from 'react'
import {Col, Row, Card} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {connect} from "react-redux";
import {enquireScreen} from 'enquire-js';
import {getUsername} from "../../selectors/institutions";
import {getIndicadoresProgram} from "../../api/indicadores";
import { FaCalendarCheck } from "react-icons/fa";
import { BsFillClockFill } from "react-icons/bs";



const ProgramInfoMain = (props) => {
    const {nombre, descripcion, id, username, entidad, status} = props
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
            const response = await getIndicadoresProgram(id, username)
            if(response){
                setData(response)
            }
        })()
    }, [id, username])

    return (
        <Row id='program-info-main' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col lg={24} xs={24} md={24}>
                <Row className='nombre-editar-btn'>
                    <Col lg={24} xs={24} md={24} sm={24} xl={24} className='Nombre'>
                        <Row>
                            <h1>{nombre}</h1>
                        </Row>
                        <Row>
                            <Col lg={16} xs={23} md={23} sm={23} xl={16}>
                                <p>{descripcion}</p>
                            </Col>
                        </Row>
                        {
                            entidad || status ?
                            <></>
                            :
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
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state, props) => ({
    username: getUsername(state),
});

export default connect(mapStateToProps, {

})(ProgramInfoMain)