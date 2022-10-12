import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {getId, getUsername} from "../../selectors/institutions";
import {getMentorships_mentor} from "../../selectors/mentors";
import "./scss/component-sm.scss"
import "./scss/component-md.scss"
import "./scss/component-lg.scss"
import {getStatusMentor, selectCurrentUser} from "../../selectors/users";
import {Divider, Row, Col, Form, DatePicker, Checkbox, Button} from 'antd';
import DateItem_disponbilidad from "../MultiSelector/DateItem_disponbilidad";
import {createDisponibilidad} from "../../api/disponibilidad";
import moment from "moment";


function BloqueDispoCreate(props) {
    const {id, setFlag, setVisible, dateScheduler} = props
    const {closeModal} = props;
    const [formData] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [semanal, setSemanal] = useState(false);


    const onFinish = async (values) => {
        setFlag(false)
        if (values.date) {
            setLoading(true)
            values = {...values, semanal: semanal, mentor_id: id}
            const response = await props.createDisponibilidad(values)
            if (response) {
                setFlag(true)
                setVisible(false)
                formData.resetFields()

            }
            setLoading(false)

        }


    }

    function handleSemanal(e) {
        setSemanal(e.target.checked)
    }

    useEffect(() => {
        formData.setFieldsValue({
                  date: moment(dateScheduler),
                  start_hour: '',
                  end_hour: '',
              })
    }, [formData, dateScheduler])

    return (

        <Form id={`crear-dispo${dateScheduler}`}
              form={formData}
              name={`crear-dispo${dateScheduler}`}
              onFinish={onFinish}
              initialValues={{
                  date: moment(dateScheduler),
                  start_hour: '',
                  end_hour: '',
              }}
              scrollToFirstError
              labelAlign="right"

        >
            <Row gutter={[8, 8]} justify='center'>
                <Col lg={24} md={24} sm={24} xs={24}>
                    <Row justify='center'>
                        <Col lg={24} md={22} sm={22} xs={22}>
                            <Form.Item name='date' label="Seleccione la fecha" shouldUpdate>
                                <DatePicker/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <p>Seleccione la hora</p>
                    </Row>
                    <Row justify='center' gutter={[12]}>
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <Form.Item name="start_hour" rules={[{
                                required: true,
                                message: 'Por favor selecciona hora de inicio disponibilidad!'
                            }]}>
                                <DateItem_disponbilidad
                                    placeholder="Hora de inicio"/>
                            </Form.Item>
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <Form.Item name="end_hour" rules={[{
                                required: true,
                                message: 'Por favor selecciona hora fin de disponibilidad!'
                            }]}>
                                <DateItem_disponbilidad
                                    placeholder="Hora fin"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify='start' gutter={[12]}>
                        <Col lg={12} md={24} sm={24} xs={24}>
                            <Form.Item
                                name="semanal"
                                valuePropName="checked"
                            >
                                <Checkbox onClick={handleSemanal}>
                                    Repitir semanalmente
                                </Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider style={{marginTop: '0%', marginBottom: '2%'}}/>
                    <Row justify='end' gutter={[8, 8]}>
                        <Col lg={4} md={4} sm={5} xs={6}>
                            <Button form={`crear-dispo${dateScheduler}`} key='submit' htmlType="submit"
                                    className='btn-verde-basico' onClick={onFinish} block
                                    loading={loading}>Crear</Button>
                        </Col>
                        <Col lg={4} md={4} sm={5} xs={6}>
                            <Button type='primary' danger className='btn-danger-basico' block
                                    onClick={closeModal}>Cancelar</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    );
}


const mapStateToProps = (state) => ({
    mentors: getMentorships_mentor(state),
    id: getId(state),
    username: getUsername(state),
    status: getStatusMentor(state),
    current_user: selectCurrentUser(state),
});

export default connect(mapStateToProps, {
    createDisponibilidad,
})(BloqueDispoCreate)