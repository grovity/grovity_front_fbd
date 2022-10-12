import React, {useState, useEffect} from 'react'
import {Row, Col, Button, Divider, Card, Checkbox, Modal, Tooltip} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {enquireScreen} from 'enquire-js';
import {withRouter} from "react-router-dom";
import FormReportarActividad from '../FormReportarActividad/FormReportarActividad';
import Observaciones from '../Observaciones/Observaciones';
import FormEditarActividad from '../FormEditarActividad/FormEditarActividad';
import {connect} from "react-redux";
import {editActivity, getActivity} from "../../api/plan";
import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/es';
import {getStatusMentor} from "../../selectors/users";
import {getId} from "../../selectors/institutions";
import {fetchPlanbyId, fetchPlanbyIdMentor} from "../../actions/fetchPlan";


const CardActividad = (props) => {
    const {activity, entidad, status, id_plan, id_mentor, id_program, id_user} = props
    const [actividad, setActividad] = useState(null)
    const [isMobile, setIsMobile] = useState(false);
    const [completada, setCompletada] = useState(false);
    const [visibleReportar, setVisibleReportar] = useState(false);
    const [visibleObservaciones, setVisibleObservaciones] = useState(false);
    const [visibleEditar, setVisibleEditar] = useState(false);
    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [loading, setLoading] = useState(false);


    const showReportar = () => {
        setVisibleReportar(true)
    };
    const showObservaciones = () => {
        setVisibleObservaciones(true)
    };
    const showEditar = () => {
        setVisibleEditar(true)
    };

    const handleOk = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            if (visibleReportar === true) {
                setVisibleReportar(false);
            } else if (visibleEditar === true) {
                setVisibleEditar(false);
            }
        }, 3000);
    };

    const handleCancel = () => {
        if (visibleReportar === true) {
            setVisibleReportar(false);
        } else if (visibleObservaciones === true) {
            setVisibleObservaciones(false);
        } else if (visibleEditar === true) {
            setVisibleEditar(false);
        }
    };

    enquireScreen((b) => {
        return () => {
            setIsMobile(b);
        }
    })

    const onChange = async (e) => {
        setCompletada(e.target.checked)
        let payload = await props.editActivity({'done': e.target.checked}, id_plan, id_mentor, status, activity)
        if(payload && payload.description) {
            if(!status) {
                await props.fetchPlanbyId(id_program)
            } else {
                await props.fetchPlanbyIdMentor(id_program, id_user)
            }

        }
    }

    useEffect(() => {
        enquireScreen((b) => {
            setIsMobile(
                !!b
            );
        });
    }, [isMobile])

    useEffect(() => {
        (async () => {
            if (activity) {
                const payload = await getActivity(activity)
                if (payload) {
                    setActividad(payload)
                    setCompletada(payload.done)
                    setFlag(false)
                }
            }

        })()
    }, [activity, flag])

    return (
        <Col lg={8} md={12} xs={24} xl={8}>
            <Card className='mt-3' id="card-actividad">
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} className="info-actividad">
                    <Col lg={24} md={24} xs={24} sm={24} xl={24} xxl={24}>
                        <Tooltip placement="topLeft" title={actividad?.name}><h5>{actividad?.name}</h5></Tooltip>
                        <Divider/>
                        <p><strong>Mentor: </strong>{actividad?.mentor?.first_name} {actividad?.mentor?.last_name}</p>
                        <div className='description-activity'>
                            <p><strong>Descripción: </strong>{actividad?.description}</p>
                        </div>
                        <Button style={{paddingLeft: '0%'}} type='link' onClick={showObservaciones}>Leer
                            observaciones</Button>
                    </Col>
                    <Modal
                        visible={visibleObservaciones}
                        title="Observaciones y avances"
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[
                            <Button className='btn-verde-basico' type='primary' key="back"
                                    onClick={handleCancel}>
                                Volver
                            </Button>
                        ]}
                    >
                        <Observaciones flag2={flag2} setFlag2={setFlag2} id={actividad?.id}/>

                    </Modal>
                </Row>
                <Divider/>
                <Row className='fechas-actividad'>
                    <Col lg={11} md={11} xs={11} sm={11} xl={11} xxl={11}>
                        <p><strong>Asignada:</strong></p>
                        <p><Moment
                            format="MMMM DD YYYY">{moment.utc(actividad?.start)}</Moment></p>
                    </Col>
                    <Divider type='vertical'/>
                    <Col lg={11} md={11} xs={11} sm={11} xl={11} xxl={11}>
                        <p><strong>Vence:</strong></p>
                        <p><Moment
                            format="MMMM DD YYYY">{moment.utc(actividad?.end)}</Moment></p>
                    </Col>
                </Row>
                <Divider/>
                <Row className='fechas-actividad'>
                    <Col lg={12} md={12} xs={12} sm={12} xl={12} xxl={12}>
                        <p style={{marginBottom: '1%'}}><strong>Estatus</strong></p>
                    </Col>
                    <Col lg={12} md={12} xs={12} sm={12} xl={12} xxl={12}>
                        <Checkbox onChange={onChange} checked={completada}
                                className={completada ? 'completada' : 'incompleta'}
                                disabled={entidad || (status && id_mentor !== actividad?.mentor?.id)? true : false}>{completada ? 'Completada' : 'Pendiente'}</Checkbox>
                    </Col>
                </Row>

                {
                    status ?
                            <>
                                <Divider/>
                                <Row gutter={[4]} justify='space-between'>
                                    <Col lg={12} md={12} xs={12} sm={12} xl={12} xxl={12}>
                                        <Button disabled={id_mentor === actividad?.mentor?.id ? false : true} type='primary' block 
                                                className={id_mentor === actividad?.mentor?.id ? 'btn-azul-basico' : ''}  
                                                onClick={showReportar}>Reportar</Button>
                                    </Col>
                                    <Modal
                                        className="modales-plan"
                                        visible={visibleReportar}
                                        title="Reportar progreso "
                                        onOk={handleOk}
                                        onCancel={handleCancel}
                                        footer={[]}
                                    >
                                        <FormReportarActividad flag2={flag2} setFlag2={setFlag2} setVisible={setVisibleReportar} id={actividad?.id}/>
                                    </Modal>
                                    <Col lg={12} md={12} xs={12} sm={12} xl={12} xxl={12}>
                                        <Button disabled={id_mentor === actividad?.mentor?.id ? false : true} type='primary' block 
                                                className= {id_mentor === actividad?.mentor?.id ? 'btn-azul-basico' : ''} 
                                                onClick={showEditar}>Editar</Button>
                                    </Col>
                                    <Modal
                                        className="modales-plan"
                                        visible={visibleEditar}
                                        title="Editar actividad"
                                        onOk={handleOk}
                                        onCancel={handleCancel}
                                        footer={[]}
                                    >
                                        <FormEditarActividad setVisible={setVisibleEditar} activity={actividad}
                                                             status={status} flag={flag} setFlag={setFlag}/>
                                    </Modal>
                                </Row>
                            </>
                        :
                        <></>
                }

                {
                    (!status && !entidad) && (
                        <>
                            <Divider/>
                            <Row gutter={[4]} justify='space-between'>
                                <Col lg={12} md={12} xs={12} sm={12} xl={12} xxl={12}>
                                    <Button type='primary' block className='btn-azul-basico' onClick={showReportar}>Reportar</Button>
                                </Col>
                                <Modal
                                    className="modales-plan"
                                    visible={visibleReportar}
                                    title="Reportar progreso "
                                    onOk={handleOk}
                                    onCancel={handleCancel}
                                    footer={[]}
                                >
                                    <FormReportarActividad flag2={flag2} setFlag2={setFlag2} setVisible={setVisibleReportar} id={actividad?.id}/>
                                </Modal>
                                <Col lg={12} md={12} xs={12} sm={12} xl={12} xxl={12}>
                                    <Button type='primary' block className='btn-azul-basico' onClick={showEditar}>Editar</Button>
                                </Col>
                                <Modal
                                    className="modales-plan"
                                    visible={visibleEditar}
                                    title="Editar actividad"
                                    onOk={handleOk}
                                    onCancel={handleCancel}
                                    footer={[]}
                                >
                                    <FormEditarActividad setVisible={setVisibleEditar} activity={actividad}
                                                         status={status} flag={flag} setFlag={setFlag}/>
                                </Modal>
                            </Row>
                        </>
                    )
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
    editActivity,
    fetchPlanbyId,
    fetchPlanbyIdMentor
})(CardActividad));