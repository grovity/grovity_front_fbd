import React, {useState, useEffect} from 'react'
import {Row, Col, Button, Divider, Select, Progress, Modal, Tooltip} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {enquireScreen} from 'enquire-js';
import CardActividad from '../CardActividad/CardActividad';
import FormCrearActividad from '../FormCrearActividad/FormCrearActividad';
import { MdModeEdit } from "react-icons/md";
import FormEditarPlan from '../FormEditarPlan/FormEditarPlan';
import {getActivity} from "../../api/plan";
import moment from 'moment';

const {Option} = Select;

const PlanTrabajoEmprendedor = (props) => {
    const {status, entidad, plan, id_program, id_user} = props
    const [isMobile, setIsMobile] = useState(false);
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [filterResults, setFilterResults] = useState([]);
    const [allActivities, setAllActivities] = useState([]);
    const [filterOn, setFilterOn] = useState(false)

    let activities = [];

    enquireScreen((b) => {
        return () => {
            setIsMobile(b);
        }
    })

    const showModal = () => {
        setVisible(true)
    };
    const showModalEditarPlan = () => {
        setVisible2(true)
    };

    const handleCancel = () => {
        setVisible(false);
    };
    const handleCancelEditarPlan = () => {
        setVisible2(false);
    };

    async function arrActivities(activities) {
        await plan.activity_set.map( async (activity) => {
            const res =  await getActivity(activity);
            if (res) 
                activities.push(res);
        })
        setAllActivities(activities);
    }
   

    function handleChange(value) {
        setFilterOn(true);
    
        if (value === 'finalizadas') {
            let res = allActivities.filter(obj => obj.done === true);
            setFilterResults(res);
        }      
        else if (value === 'pendientes'){
            let res = allActivities.filter(obj => obj.done === false);
            setFilterResults(res);
        }
        else if (value === 'recientes'){
            let today = moment();
            let res = allActivities.filter(n => today.isBetween(n.created_at, moment(n.created_at).add(2, 'day')));
            setFilterResults(res);
        }
        else if (value === 'por_vencer'){
            let today = moment();
            let res = allActivities.filter(n => today.isBetween(moment(n.end).subtract(2, 'day'), n.end));
            setFilterResults(res);
        }
        else {
            setFilterOn(false);
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
       arrActivities(activities);
        
    }, [filterResults])

    return (
        <>
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} className='row-plan-trabajo'>
                <Col lg={0} md={0} xs={0} xl={5}></Col>
                <Col lg={24} md={24} xs={24} xl={19}>
                    <Row>
                        <Col lg={14} md={12} xs={24} xl={14}>
                            {!status && !entidad ?
                                <h5>Plan de trabajo 
                                    <Tooltip placement="rightTop" title='Editar plan de trabajo'>
                                        <Button className="btn-editar-plan" type="link" size='large' onClick={showModalEditarPlan}>
                                            <MdModeEdit size={20}/>
                                        </Button>
                                    </Tooltip>
                                    <Modal
                                        className="modales-plan"
                                        visible={visible2}
                                        title="Editar Plan"
                                        // onOk={handleOk}
                                        onCancel={handleCancelEditarPlan}
                                        width={600}
                                        footer={[]}
                                    >
                                        <FormEditarPlan id_user={id_user} id_program={id_program} setVisible={setVisible2}  plan={plan}/>
                                    </Modal>
                                </h5>
                                :
                                <h5>Actividades</h5>
                            }
                        </Col>
                        {
                            entidad ?
                                <Col lg={9} md={12} xs={24} xl={9}>
                                    <Select defaultValue="todas" style={{width: '100%'}} onChange={handleChange}>
                                        <Option value="finalizadas">Finalizadas</Option>
                                        <Option value="pendientes">Pendientes</Option>
                                        <Option value="recientes">Recientes</Option>
                                        <Option value="por_vencer">Por vencer</Option>
                                        <Option value="todas">Todas</Option>
                                    </Select>
                                </Col>
                                :
                                <>
                                    <Col lg={5} md={6} xs={12} xl={5}>
                                        <Select defaultValue="todas" style={{width: '90%'}} onChange={handleChange}>
                                            <Option value="finalizadas">Finalizadas</Option>
                                            <Option value="pendientes">Pendientes</Option>
                                            <Option value="recientes">Recientes</Option>
                                            <Option value="por_vencer">Por vencer</Option>
                                            <Option value="todas">Todas</Option>
                                        </Select>
                                    </Col>
                                    <Col lg={5} md={6} xs={12} xl={5}>
                                        <Button className='btn-verde-basico' type='primary' block onClick={showModal}>
                                            Crear actividad
                                        </Button>
                                    </Col>
                                </>
                        }

                        <Modal
                            className="modales-plan"
                            visible={visible}
                            title="Crear actividad"
                            onCancel={handleCancel}
                            width={600}
                            footer={[]}
                        >
                            <FormCrearActividad id_user={id_user} id_plan={plan?.id} id_program={id_program} setVisible={setVisible} status={status}/>
                        </Modal>
                    </Row>
                    <Divider className='ant-divider-horizontal-plan'/>
                </Col>
            </Row>
            <Row className='row-info-plan'>
                <Col lg={0} md={0} xs={0} xl={5}></Col>

                <Col lg={24} md={24} xs={24} xl={19}>
                    <Row>
                        <Col lg={14} md={16} xs={24} xl={16} xxl={13} style={{paddingLeft: '1%'}} >
                            <h5>Objetivo: </h5>
                            <div className="description-plan">
                                <p>{plan?.description}</p>
                            </div>
                        </Col>
                        <Divider type='vertical' className='divider-plan-des'/>
                        <Col lg={7} md={6} xs={22} xl={7} xxl={7}>
                            <Row>
                                <Col lg={17} md={13} xs={18} xl={18} xxl={19}>
                                    <h5>Progreso </h5>
                                </Col>
                                <Col lg={7} md={1} xs={6} xl={6} xxl={5}>
                                    <h5>{plan?.progress.toFixed(2)}%</h5>
                                </Col>
                            </Row>
                            <Progress className='progress-plan' showInfo={false} strokeColor='var(--primary-color)' trailColor='white' percent={plan?.progress.toFixed(2)}/>
                        </Col>
                        <Divider style={{marginTop: '0%', paddingLeft: '1%'}} className='ant-divider-horizontal-plan'/>
                    </Row>
                </Col>
            </Row>
            <Row className='row-cards-actividades'>
                <Col lg={0} md={0} xs={0} xl={5}></Col>
                <Col lg={24} md={24} xs={24} xl={19}>
                    <Row>
                    {
                        filterOn ?
                            Array.isArray(filterResults) && (
                                filterResults.map(function (activity) {
                                    return <CardActividad id_user={id_user} id_program={id_program} activity={activity.id} entidad={entidad}
                                                        key={activity.id}></CardActividad>
                                })
                            )
                        :
                            Array.isArray(plan?.activity_set) && (
                                plan.activity_set.map(function (activity) {
                                    return <CardActividad id_user={id_user} id_program={id_program} activity={activity} entidad={entidad}
                                                        key={activity}></CardActividad>
                                })
                            )
                    }
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default PlanTrabajoEmprendedor;