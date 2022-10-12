import React, {useEffect, useState} from 'react'
import {Col, Row, Input, Form, Select, DatePicker, Button, Checkbox} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import {setAlert} from "../../actions/alert";
import {connect} from "react-redux";
import {deleteActivity, editActivity} from "../../api/plan";
import {getStatusMentor} from "../../selectors/users";
import {fetchMentorships} from "../../actions/fetchMentorships";
import {Spinner} from "react-bootstrap";
import {fetchPlanbyId} from "../../actions/fetchPlan";
import moment from 'moment';
import PopConfirm from "../PopConfirm/PopConfirm";
import {getId} from "../../selectors/institutions";
import {fetchMentorsByProgram} from "../../actions/fetchMentors";
import useFetch from "../../hooks/useFetch";
import {URL_BASE} from "../../constants";
import {
    convertUtcToTimeZone,
    convertTimeZoneToUtc,
    colTimeZonetoOtherTimeZone,
    TimeZonetoColTimeZone,
  } from "../../helpers/timeZone";
import AllCountryWithTimeZone, {getTimeZone} from "../../helpers/countrys";

const {Option} = Select;
const dateFormat = 'YYYY/MM/DD';

const FormEditarActividad = (props) => {
    const {status, setVisible, id_mentor, id_program, mentores, id_plan, activity,  setFlag,
    setActaInfo, event, setActividadesActa, acta, acta_info, entidad} = props;
    const [completada, setCompletada] = useState(activity?.done)
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();
    const {get}=useFetch(URL_BASE)

    let timeZone = getTimeZone()
    timeZone  = AllCountryWithTimeZone.find( pais => pais.label === timeZone);

    const onFinish = async (values) => {
        setLoading(true)
        const obj = {...values, 'done': completada,start_date: TimeZonetoColTimeZone(values.start, timeZone.value), end_date: TimeZonetoColTimeZone(values.end,timeZone.value)}
        let payload = await props.editActivity(obj, id_plan, id_mentor, status, activity?.id)
        if (payload && payload.description) {
            setVisible(false);
            setFlag(true)
            if (acta) {
                const response = await get(`/acts/acts/${event?.act}/`)
                if (response) {
                    setActaInfo(response)
                    let arr = []
                    for (let i = 0; i < acta_info?.activities.length; i++) {
                        const response2 = await get(`/acts/acts/${event?.act}/activities/${acta_info?.activities[i]}/`)
                        if (response2) {
                            arr.push(response2)
                        }
                    }
                    setActividadesActa(arr)
                }
            }
        }
        setLoading(false)
    };

    const onChange = ((e) => {
        setCompletada(!completada)
    })

    useEffect(() => {
        (async () => {
            if(!status) {
                await props.fetchMentorsByProgram(id_program)
            }
        })()

    }, [id_program])

    return (
        <div className='site-car-wrapper'>
            <Row id="form-crear-actividad" gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col lg={24} xs={24} md={24}>
                    <Form id={`editar-actividad-${activity?.id}`}
                          name={`editar-actividad-${activity?.id}`}
                          onFinish={onFinish}
                          form={form}
                          initialValues={{
                              name: activity?.name,
                              mentor: activity?.mentor.id,
                              
                              start: moment(colTimeZonetoOtherTimeZone(activity?.start,timeZone.value), dateFormat),
                                end: moment(colTimeZonetoOtherTimeZone(activity?.end, timeZone.value), dateFormat),
                           
                                
                              description: activity?.description,
                              done: activity?.done
                          }}
                          labelAlign='right'
                    >
                        <Row>
                            <Col lg={24} xs={24} md={24} xl={24}>
                                <Form.Item
                                    label="Nombre de la actividad"
                                    name="name"
                                    rules={[{required: true, message: 'Por favor escribe el nombre de la actividad!'}]}
                                >
                                    <Input disable={entidad ? true : false}/>
                                </Form.Item>
                            </Col>


                            {
                                !status ?
                                    <Col lg={24} xs={24} md={24} xl={24}>
                                        <Form.Item name="mentor" label="Mentor"
                                                   rules={[{
                                                       required: true,
                                                       message: 'Por favor selecciona el mentor que realizará el seguimiento'
                                                   }]}>
                                            <Select
                                                placeholder="Seleccione el mentor que asisgnó la actividad"
                                                disable={entidad ? true : false}
                                            >
                                                <Option value=''>Seleccione mentor para seguimiento</Option>
                                                {
                                                    Array.isArray(mentores) ?
                                                        mentores.map(c => (
                                                            <Option
                                                                value={c.id}
                                                            >
                                                                {c.email} {c.first_name} {c.last_name}

                                                            </Option>
                                                        )) :
                                                        <Option value=''>Seleccione una herramienta...</Option>
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    :
                                    <span></span>
                            }
                            <Col lg={12} xs={24} md={12} xl={12}>
                                <Form.Item name="start" label="Asignada" rules={[{
                                    required: true,
                                    message: 'Por favor selecciona fecha de inicio de la actividad'
                                }]}>
                                    <DatePicker format={dateFormat} disable={entidad ? true : false}/>
                                </Form.Item>
                            </Col>
                            <Col lg={12} xs={24} md={11} xl={12}>
                                <Form.Item name="end" label="Vence" rules={[{
                                    required: true,
                                    message: 'Por favor selecciona el plazo final para realizar la actividad'
                                }]}>
                                    <DatePicker format={dateFormat} disable={entidad ? true : false}/>
                                </Form.Item>
                            </Col>
                            <Col lg={24} xs={24} md={24} xl={24}>
                                <Form.Item
                                    label="Estatus"
                                    name="done"
                                >
                                    <Checkbox checked={completada} onChange={onChange} disable={entidad ? true : false}/>
                                </Form.Item>
                            </Col>
                            <Col lg={24} xs={24} md={24} xl={24}>
                                <Form.Item name='description' rules={[{
                                    required: true,
                                    message: 'Por favor escribe una breve descripción de la tarea a realizar'
                                }]}>
                                    <Input.TextArea rows={6}
                                                    placeholder="Escribe una breve descripción de la tarea a realizar"
                                                    disable={entidad ? true : false}/>
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row justify='end' gutter={[8,8]}>
                            <Col lg={5} sm={5}>
                                <Button className='mr-2 btn-verde-basico' form={`editar-actividad-${activity?.id}`} 
                                        key='submit' htmlType="submit" type="primary" block disable={entidad ? true : false}>
                                    {!loading ? "Editar" : <Spinner animation="border" size={'sm'}/>}
                                </Button>
                            </Col>
                            <Col lg={5} sm={5}>
                                <PopConfirm message={'actividad'} type={'primary'} 
                                            functionDelete={props.deleteActivity} id={activity?.id} 
                                            disable={entidad ? true : false}></PopConfirm>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

const mapStateToProps = state => ({
    id_mentor: getId(state),
    mentorships: state.mentorships,
    id_program: state.programs.id,
    id_plan: state.plan_user.id,
    status: getStatusMentor(state),
    mentores: state.mentors_by_program
});

export default connect(mapStateToProps, {
    setAlert,
    editActivity,
    fetchMentorships,
    fetchMentorsByProgram,
    fetchPlanbyId,
    deleteActivity,
})(FormEditarActividad);