import React, {useState} from 'react'
import {Row, Col, Button, Empty} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import PerfilGeneralUsuario from "../../components/PerfilGeneralUsuario/PerfilGeneralUsuario";
import CardProgramsAnt from "../../components/CardItemAnt/CardItemAnt";
import CardItemAntEvent from "../../components/CardItemEvent/CardItemAntEvent";
import {Link} from "react-router-dom";
import CalendarPruebas from '../../components/CalendarMobiPruebas/CalendarMobiPruebas';
import moment from 'moment';


const HomeUser = ({programs_user, events, id, status, empresa_emprendedor, entidad, user, username}) => {
    const [value, setValue] = useState(moment());
    
    return (
        <div id='home-user'>
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <PerfilGeneralUsuario id={id}
                                      empresa_emprendedor={empresa_emprendedor}
                                      entidad={entidad}
                                      status={status}
                                      user={user}
                                      username={username}>
                </PerfilGeneralUsuario>
                <Col lg={18} md={24} xs={24}>
                    <Row className='eventos-hoy'>
                        <Col xxl={12} xl={10} lg={8} xs={24} md={24} className='conecta-mentor calendar-week'>
                            <h1>Eventos de esta semana</h1>
                        </Col>
                        <Col xxl={12} xl={14} lg={16} xs={24} md={24}>
                            <Row gutter={[8]} justify='space-between'>
                                <Col className='conecta-mentor' xl={14} lg={16} xs={24} md={12}>
                                <Link to={'/marketplace'}>
                                        <Button size='large' className='btn-verde-basico mb-2' type='primary' block>
                                            Conecta con mentores expertos
                                        </Button>
                                    </Link>
                                </Col>
                                <Col className='conecta-mentor' xl={10} lg={8} xs={24} md={12}>
                                    <Link to={'/user/files'}>
                                        <Button size='large' className='btn-verde-basico' type='primary' block>
                                            Mis documentos
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                        
                    </Row>
                    <Row className='eventos-hoy'>
                        <CalendarPruebas events={events} status={status} value={value} onChange={setValue}/>
                     
                    </Row>
                    {events['eventos'].length !== 0 ?
                        <Row className='eventos-hoy'>
         
                            <CardItemAntEvent events={events} status={status} value={value} onChange={setValue}></CardItemAntEvent>
                        </Row>
                        :
                        <Row className='eventos-hoy-no'>
                            <Col>
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                                       description={
                                           <span>
                                        No tienes eventos esta semana aún <br/>
                                        <a href="/calendar">Ir a mi calendario</a>
                                    </span>
                                       }
                                />
                           
                            </Col>
                        </Row>
                    }
                    <Row className='eventos-hoy'>
                        <h1>Mis programas</h1>
                        <CardProgramsAnt programs_user={programs_user} status={status} entidad={entidad}></CardProgramsAnt>
                    </Row>

                </Col>

            </Row>
        </div>
    )
}

export default HomeUser