import React, {useState} from 'react'
import {Col, Row, Input, Form, Select, Button} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import {setAlert} from "../../actions/alert";
import {connect} from "react-redux";
import {createPlan} from "../../api/plan";
import {getId} from "../../selectors/institutions";
import {fetchPlanbyId} from "../../actions/fetchPlan";
import {Spinner} from "react-bootstrap";



const FormCrearPlan = (props) => {
    const {id, setVisible, id_program} = props;
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setLoading(true)
        let payload = await props.createPlan(values, id, id_program)
        if (payload && payload.description) {
            await props.fetchPlanbyId(id_program)
            setVisible(false);
        }
        setLoading(false)
    };

    return (
        <div className='site-car-wrapper'>
            <Row id="form-crear-actividad" gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col lg={24} xs={24} md={24}>
                    <Form id="crear-plan"
                          name="crear-plan"
                          onFinish={onFinish}
                          form={form}
                          initialValues={{
                              description: '',
                          }}
                          labelAlign='right'
                    >
                        <Row>
                            <Col lg={22} xs={24} md={24} xl={24}>
                                <h6>Objetivo del plan de trabajo</h6>
                                <Form.Item name='description'
                                           rules={[{required: true, message: 'Por favor escribe el objetivo del plan de trabajo'}]}>
                                    <Input.TextArea rows={4}
                                                    placeholder="Escribe el objetivo del plan de trabajo"/>
                                </Form.Item>
                            </Col>
                            {/*<Col lg={22} xs={24} md={24} xl={24}>*/}
                            {/*    <h6>Crea la primera actividad</h6>*/}
                            {/*    <Form.Item*/}
                            {/*        label="Nombre de la actividad"*/}
                            {/*        name="description"*/}
                            {/*        rules={[{message: 'Por favor escribe el nombre de la actividad!'}]}*/}
                            {/*    >*/}
                            {/*        <Input/>*/}
                            {/*    </Form.Item>*/}
                            {/*</Col>*/}

                            {/*    !status ?*/}
                            {/*        <Col lg={22} xs={24} md={24} xl={24}>*/}
                            {/*            <Form.Item name="mentor" label="Mentor">*/}
                            {/*                <Select*/}
                            {/*                    placeholder="Seleccione el mentor que asisgnó la actividad"*/}
                            {/*                >*/}
                            {/*                    <Option value="male">male</Option>*/}
                            {/*                    <Option value="female">female</Option>*/}
                            {/*                    <Option value="other">other</Option>*/}
                            {/*                </Select>*/}
                            {/*            </Form.Item>*/}
                            {/*        </Col>*/}
                            {/*        :*/}
                            {/*        <Col lg={22} xs={24} md={24} xl={24}>*/}
                            {/*            <Form.Item name="emprendedor" label="Emprendedor" >*/}
                            {/*                <Select*/}
                            {/*                    placeholder="Seleccione el emprendedor responsable de la actividad"*/}
                            {/*                >*/}
                            {/*                    <Option value="male">male</Option>*/}
                            {/*                    <Option value="female">female</Option>*/}
                            {/*                    <Option value="other">other</Option>*/}
                            {/*                </Select>*/}
                            {/*            </Form.Item>*/}
                            {/*        </Col>*/}
                            {/*}*/}
                            {/*<Col lg={12} xs={24} md={24} xl={12}>*/}
                            {/*    <Form.Item name="fecha_inicio" label="Asignada">*/}
                            {/*        <DatePicker format={dateFormat}/>*/}
                            {/*    </Form.Item>*/}
                            {/*</Col>*/}
                            {/*<Col lg={12} xs={24} md={24} xl={12}>*/}
                            {/*    <Form.Item name="fecha_fin" label="Vence" >*/}
                            {/*        <DatePicker format={dateFormat}/>*/}
                            {/*    </Form.Item>*/}
                            {/*</Col>*/}
                            {/*<Col lg={22} xs={24} md={24} xl={24}>*/}
                            {/*    <Form.Item>*/}
                            {/*        <TextArea name='descripcion' rows={6}*/}
                            {/*                  placeholder="Escribe una breve descripción de la tarea a realizar"/>*/}
                            {/*    </Form.Item>*/}
                            {/*</Col>*/}
                        </Row>
                        <Row className='row-button-right'>
                            <Button
                                style={{backgroundColor: '#95c11f', border: 'none'}}
                                form="crear-plan" key='submit' htmlType="submit" type="primary"
                            >
                                {!loading ? "Crear" : <Spinner animation="border" size={'sm'}/>}
                            </Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}


const mapStateToProps = (state, props) => ({
    id: getId(state),
});

export default connect(mapStateToProps, {
    setAlert,
    createPlan,
    fetchPlanbyId
})(FormCrearPlan);