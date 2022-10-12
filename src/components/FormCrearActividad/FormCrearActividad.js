import React, {useEffect, useState} from 'react'
import {Col, Row, Input, Form, Select, DatePicker, Button} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import {setAlert} from "../../actions/alert";
import {connect} from "react-redux";
import {createActivity} from "../../api/plan";
import {fetchMentorships} from "../../actions/fetchMentorships";
import {Spinner} from "react-bootstrap";
import {fetchPlanbyId, fetchPlanbyIdMentor} from "../../actions/fetchPlan";
import {getId} from "../../selectors/institutions";
import {fetchMentorsByProgram} from "../../actions/fetchMentors";
import useFetch from "../../hooks/useFetch";
import {URL_BASE} from "../../constants";


const {Option} = Select;
const dateFormat = 'DD-MM-YYYY';

const FormCrearActividad = (props) => {
    const {
        status,
        setVisible,
        id_mentor,
        id_program,
        mentores,
        id_plan,
        id_user,
        acta,
        acta_id,
        id_mentor_evento,
        setActividadesActa,
        acta_info, event,
        setActaInfo
    } = props;
    const [loading, setLoading] = useState(false)
    const {get} = useFetch(URL_BASE)
    const [form] = Form.useForm();

    const selectIdProgramandEntidad = (mentorias, idMentoria) => {
        let ob = mentorias.find(c => c.id == idMentoria)
        return ob
    }

    const onFinish = async (values) => {
        setLoading(true)
        let payload = await props.createActivity(values, id_plan, id_mentor, status, acta, acta_id, id_mentor_evento)

        if (payload && payload.description) {
            if (!status) {
                await props.fetchPlanbyId(id_program)
            }
            if (status) {
                await props.fetchPlanbyIdMentor(id_program, id_user)
            }
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

            setVisible(false);
        }
        setLoading(false)
    };

    useEffect(() => {
        (async () => {
            if (!status) {
                await props.fetchMentorsByProgram(id_program)
            }

        })()

    }, [id_program])

    return (
        <div className='site-car-wrapper'>
            <Row id="form-crear-actividad" gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col lg={24} xs={24} md={24}>
                    <Form id="crear-actividad"
                          name='crear-actividad'
                          onFinish={onFinish}
                          form={form}
                          initialValues={{
                              name: '',
                              mentor: '',
                              start: '',
                              end: '',
                              description: ''
                          }}
                          labelAlign='right'
                    >
                        <Row>
                            <Col lg={24} xs={24} md={24} xl={24}>
                                <Form.Item
                                    label="Nombre de la actividad"
                                    name="name"
                                    rules={[{required: true, message: 'Por favor escriba el nombre de la actividad!'}]}
                                >
                                    <Input/>
                                </Form.Item>
                            </Col>
                            {
                                (!status && !acta) ?
                                    <Col lg={24} xs={24} md={24} xl={24}>
                                        <Form.Item name="mentor" label="Mentor"
                                                   rules={[{
                                                       required: true,
                                                       message: 'Por favor seleccione el mentor que realizará el seguimiento'
                                                   }]}>
                                            <Select
                                                placeholder="Seleccione el mentor que asisgnó la actividad"
                                            >
                                                <Option value=''>Seleccione mentor para seguimiento</Option>
                                                {
                                                    Array.isArray(mentores) ?
                                                        mentores.map((c, i) => (
                                                            c.first_name && (
                                                                <Option value={c.id} key={i}>
                                                                    {c.first_name} {c.last_name}
                                                                </Option>)

                                                        )) :
                                                        <Option value=''>Cargando mentores...</Option>
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    :
                                    <span></span>
                            }
                            <Col lg={12} xs={24} md={24} xl={12}>
                                <Form.Item name="start" label="Asignada" rules={[{
                                    required: true,
                                    message: 'Por favor seleccione fecha de inicio de la actividad'
                                }]}>
                                    <DatePicker className="date-picker-ant" format={dateFormat}/>
                                </Form.Item>
                            </Col>
                            <Col lg={12} xs={24} md={24} xl={12}>
                                <Form.Item name="end" label="Vence" rules={[{
                                    required: true,
                                    message: 'Por favor seleccione el plazo final para realizar la actividad'
                                }]}>
                                    <DatePicker format={dateFormat}/>
                                </Form.Item>
                            </Col>
                            <Col lg={24} xs={24} md={24} xl={24}>
                                <Form.Item name='description' rules={[{
                                    required: true,
                                    message: 'Por favor escriba una breve descripción de la tarea a realizar'
                                }]}>
                                    <Input.TextArea rows={6}
                                                    placeholder="Escriba una breve descripción de la tarea a realizar"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row className='row-button-right'>
                            <Button form="crear-actividad" key='submit' htmlType="submit" type="primary"
                                    className='btn-verde-basico' loading={loading}
                            >
                                Crear
                            </Button>
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
    mentorships_mentor: state.mentorships_mentor,
    mentores: state.mentors_by_program
});

export default connect(mapStateToProps, {
    setAlert,
    createActivity,
    fetchMentorships,
    fetchPlanbyId,
    fetchPlanbyIdMentor,
    fetchMentorsByProgram
})(FormCrearActividad);