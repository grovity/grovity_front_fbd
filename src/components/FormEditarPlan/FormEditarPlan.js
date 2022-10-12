import React, {useState} from 'react'
import {Col, Row, Input, Form, Select, Button} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import {setAlert} from "../../actions/alert";
import {connect} from "react-redux";
import {deletePlan, editPlan} from "../../api/plan";
import {getId} from "../../selectors/institutions";
import {fetchPlanbyId} from "../../actions/fetchPlan";
import {Spinner} from "react-bootstrap";
import PopConfirm from "../PopConfirm/PopConfirm";


const FormEditarPlan = (props) => {
    const {id_user, setVisible, id_program, plan} = props;
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setLoading(true)
        let payload = await props.editPlan(values, id_user, id_program, plan?.id)
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
                    <Form id="editar-plan"
                          name="editar-plan"
                          onFinish={onFinish}
                          form={form}
                          initialValues={{
                              description: plan.description,
                          }}
                          labelAlign='right'
                    >
                        <Row>
                            <Col lg={24} xs={24} md={24} xl={24}>
                                <h6>Objetivo del plan de trabajo</h6>
                                <Form.Item name='description'
                                           rules={[{required: true, message: 'Por favor escribe el objetivo del plan de trabajo'}]}>
                                    <Input.TextArea rows={4}
                                                    placeholder="Escribe el objetivo del plan de trabajo"/>
                                </Form.Item>
                            </Col>                           
                        </Row>
                        <Row justify='end' gutter={[8, 8]}>
                            <Col lg={4} xs={5} md={5} xl={4}>
                                <Button className='btn-verde-basico' block
                                    form="editar-plan" key='submit' htmlType="submit" type="primary"
                                >
                                    {!loading ? "Editar" : <Spinner animation="border" size={'sm'}/>}
                                </Button>
                            </Col>
                            <Col lg={5} xs={5} md={5} xl={4}>
                                <PopConfirm  message={'plan'} block type={'primary'} functionDelete={props.deletePlan} id={id_program} ></PopConfirm>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}


const mapStateToProps = (state) => ({
    id: getId(state),
});

export default connect(mapStateToProps, {
    setAlert,
    editPlan,
    deletePlan,
    fetchPlanbyId
})(FormEditarPlan);