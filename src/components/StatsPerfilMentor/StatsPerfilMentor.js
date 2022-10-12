import React, {useState, useEffect} from 'react'
import {Col, Row, Card, Progress} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {
    selectCurrentUser,
} from "../../selectors/users";
import {connect} from "react-redux";
import {enquireScreen} from 'enquire-js';


const { Meta } = Card;

const StatsPerfilMentor = ({calificacion}) => {

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
        <Row id='stats-perfil-mentor' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col lg={24} xs={24} md={24}>
                <Card
                    style={{ width: '100%' }}
                >
                <Row>
                    <Col>
                        <h3>Estadísticas</h3>
                    </Col>
                </Row>
                <Row>
                    <Col lg={8} md={8} sm={24} xs={24}>
                        <Row className="titulo-sesiones">
                            <Col>
                                <h4>148</h4>
                                <Meta title="Sesiones impartidas"/>
                            </Col>
                        </Row>
                        <Row className='stats-numero-sesiones'>
                            <Col lg={8} md={7} sm={24} xs={24}>
                                <Progress type="dashboard" percent={70} format={percent => `${percent}`} width={70} strokeColor='#242728' strokeWidth='10'/>
                                <p>Aug</p>
                            </Col>
                            <Col lg={8} md={7} sm={24} xs={24}>
                                <Progress type="dashboard" percent={30} format={percent => `${percent}`} width={70} strokeColor='#242728' strokeWidth='10'/>
                                <p>Sep</p>
                            </Col>
                            <Col lg={8} md={7} sm={24} xs={24}>
                                <Progress type="dashboard" percent={40} format={percent => `${percent}`} width={70} strokeColor='#95c11f' strokeWidth='10'/>
                                <p>Oct</p>
                            </Col>
                        </Row>                  
                    </Col>
                    <Col lg={16} md={16} sm={24} xs={24}>
                        <Row className="titulo-valoraciones">
                            <Col>
                                <h4><img src={process.env.PUBLIC_URL + '/static/imgs/plataforma/icons/estrella-detalle-mentor.png'} alt="valoracion"/>{calificacion ? calificacion.calificacion.toFixed(2): 0}</h4>
                                <Meta title="Valoraciones"/>
                            </Col>
                        </Row>
                        <Row className='stats-numero-valoraciones'>
                            <Col lg={10} md={10} sm={11} xs={24}>
                                <p>Puntualidad</p>
                                <Progress percent={30} strokeColor='#242728'/>
                            </Col>
                            <Col lg={10} md={10} sm={11} xs={24}>
                                <p>Precio</p>
                                <Progress percent={30} strokeColor='#242728'/>
                            </Col>
                        </Row>
                        <Row className='stats-numero-valoraciones'>
                            <Col lg={10} md={10} sm={11} xs={24}>
                                <p>Metodología</p>
                                <Progress percent={30} strokeColor='#242728'/>
                            </Col>
                            <Col lg={10} md={10} sm={11} xs={24}>
                                <p>Comunicación</p>
                                <Progress percent={30} strokeColor='#242728'/>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                    
                </Card>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state, props) => ({
   user: selectCurrentUser(state)
});

export default connect(mapStateToProps, null)(StatsPerfilMentor)