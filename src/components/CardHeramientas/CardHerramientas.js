import React, {useState, useEffect} from 'react'
import {Row, Col, Button, Divider, Card, Modal, Tooltip, Empty} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {enquireScreen} from 'enquire-js';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getStatusMentor} from "../../selectors/users";
import {getId} from "../../selectors/institutions";
import { MdEdit } from "react-icons/md";
import MentorshipEdit from '../MentorshipEdit/MentorshipEdit';
import CreateEventAntEntidad from '../CreateEventAnt/CreateEventAntEntidad';
import AllCountryWithTimeZone, {getTimeZone} from "../../helpers/countrys";
import  {TimeZonetoColTimeZone} from "../../helpers/timeZone.js";
import {
    convertUtcToTimeZone,
    convertTimeZoneToUtc,
    colTimeZonetoOtherTimeZone,
  } from "../../helpers/timeZone.js";

const CardHerramientas = (props) => {
    let timeZone = getTimeZone()
    let timeZoneLocal = AllCountryWithTimeZone.find( pais => pais.label === timeZone);
    const {entidad, status, mentorship, id_mentor, urlPath} = props
    const [isMobile, setIsMobile] = useState(false);
    const [visibleCrear, setVisibleCrear] = useState(false);
    const [visibleEditar, setVisibleEditar] = useState(false);
    const [loading, setLoading] = useState(false);

    //abre modal crear evento
    const showCrear = () => {
        setVisibleCrear(true)
    };
    //abre modal editar herramienta
    const showEditar = () => {
        setVisibleEditar(true)
    };

    // cierra modales
    const handleCancel = () => {
        if (visibleCrear === true) {
            setVisibleCrear(false);
        } else if (visibleEditar === true) {
            setVisibleEditar(false);
        }
    };

      //________________________________
    // procesa modales card herramienta

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
        <Col lg={12} md={12} xs={24} xl={8}>
                       <Row>
            <Col lg={24} md={24} sm={24} xs={24}>
         
                </Col>
            </Row>
            <Card className='mt-3' id="card-herramientas">
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} className="info-actividad">
                    <Col lg={24} md={24} xs={24} sm={24} xl={24} xxl={24}>
                        <Row>
                            <Col lg={22} md={22} xs={22} sm={22} xl={22} xxl={22}>
                                <Tooltip placement="topLeft" title={mentorship?.nombre}><h5>{mentorship?.nombre}</h5></Tooltip>
                            </Col>
                            {
                                entidad ?
                                    <Col lg={2} md={2} xs={2} sm={2} xl={2} xxl={2}>
                                        <Tooltip placement="topLeft" title='editar'>
                                            <h5 onClick={showEditar} style={{marginLeft: '4%'}}><MdEdit/></h5>
                                        </Tooltip>
                                        <Modal
                                        className="modales-plan"
                                        visible={visibleEditar}
                                        title="Editar Herramienta"
                                        onCancel={handleCancel}
                                        width={750}
                                        footer={[]}
                                    >
                                        <MentorshipEdit id={mentorship?.id} loading={loading} setVisible={setVisibleEditar}
                                                        setLoading={setLoading}
                                                        onCancel={handleCancel} mentorship={mentorship} />
                                    </Modal>
                                    </Col>
                                : 
                                    <></>
                            }
                        </Row>
                        
                        <Divider/>
                        <p><strong>Tipo: </strong>{mentorship?.tipo}</p>
                        <div className='description-activity'>
                            <p><strong>Descripción: </strong>{mentorship?.descripcion}</p>
                        </div>
                    </Col>
                </Row>
                <Divider/>
                <Row className='fechas-actividad'>
                    <Col lg={24} md={24} xs={24} sm={24} xl={24} xxl={24} className='lista-mentores'>
                        <p><strong>Mentores:</strong></p>
                        {
                            (Array.isArray(mentorship.mentor) && mentorship.mentor.length !== 0) ?
                                mentorship.mentor.map((mentor, i) => {
                                    return <p style={{marginBottom: '2%'}} key={i}>• {mentor.first_name} {mentor.last_name}</p>
                                })
                            :
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} 
                                    imageStyle={{
                                        height: 30,
                                    }}
                                    description={
                                        <span>No hay programas aún</span>
                            }>
                            </Empty>
                        }
                    </Col>
                </Row>
                {
                    entidad ?
                            <>
                                <Divider/>
                                <Row gutter={[4]} justify='space-between'>
                                    <Col lg={12} md={12} xs={12} sm={12} xl={12} xxl={12}>
                                        <Button type='primary' block 
                                                className='btn-azul-basico'  
                                                onClick={showCrear}>+ Crear sesión</Button>
                                    </Col>
                                    <Modal
                                        className="modales-plan"
                                        visible={visibleCrear}
                                        title="Crear Evento"
                                        onCancel={handleCancel}
                                        width={800}
                                        footer={[]}
                                    >
                                        <CreateEventAntEntidad setVisible={setVisibleCrear} idMentoria={mentorship?.id} onCancel={handleCancel}/>
                                    </Modal>
                                    <Col lg={12} md={12} xs={12} sm={12} xl={12} xxl={12}>
                                        <Link to={`${urlPath}${mentorship?.id}/data`}>
                                            <Button type='primary' block className='btn-azul-basico'>Ver detalle</Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </>
                        :
                        <></>
                }
                {
                    !entidad ?
                            <>
                                <Divider/>
                                <Row gutter={[4]} justify='space-between'>
                                    <Col lg={12} md={12} xs={12} sm={12} xl={12} xxl={12}>
                                        <Link to={`${urlPath}${mentorship?.id}/data`}>
                                            <Button type='primary' block className='btn-azul-basico'>Ver detalle</Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </>
                        :
                        <></>
                }
            </Card>
        </Col>
    )
}

const mapStateToProps = state => ({
    id_mentor: getId(state),
    id_plan: state.plan_user.id,
    status: getStatusMentor(state),
});

export default withRouter(connect(mapStateToProps, {
})(CardHerramientas));