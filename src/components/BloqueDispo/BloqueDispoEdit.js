import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {getId, getUsername} from "../../selectors/institutions";

import "./scss/component-sm.scss"
import "./scss/component-md.scss"
import "./scss/component-lg.scss"
import {getStatusMentor, selectCurrentUser} from "../../selectors/users";
import {Divider, Row, Col, Form, DatePicker, Checkbox, Button, Select} from 'antd';
import DateItem_disponbilidad from "../MultiSelector/DateItem_disponbilidad";
import {deleteDisponibilidad, editDisponibilidad} from "../../api/disponibilidad";
import moment from "moment";
import {deleteUsuario} from "../../api/mentorships";
import PopConfirm from "../PopConfirm/PopConfirm";


const {Option} = Select;

function BloqueDispoEdit(props) {
    const {id, start, end, day, setVisible, setFlag} = props
    const [formData] = Form.useForm();
    const {closeModal} = props;
    const [loading, setLoading] = useState(false);
    const [inicio, setInicio] = useState(start);
    const [fin, setFin] = useState(end);

    const onFinish = async (values) => {
        setFlag(false)
        if (values.date) {
            setLoading(true)
            values = {...values, semanal: values.week === "true", mentor_id: id, start_hour_actual:inicio, end_hour_actual:fin}
            const response = await props.editDisponibilidad(values)
            if(response) {
                setVisible(false)
                setFlag(true)
                formData.resetFields()
            }
            setLoading(false)
        }


    }

    function handleChange(value) {
    }

    useEffect(()=>{
        const temp = start.split('T')[1]
        const temp2 = temp.substr(0,5)
        setInicio(()=>temp2)
        const temp3 = end.split('T')[1]
        const temp4 = temp3.substr(0,5)
        setFin(()=>temp4)

    }, [formData, day, start, end])

    useEffect(() => {
        const temp = start.split('T')[1]
        const temp2 = temp.substr(0,5)
        setInicio(()=>temp2)
        const temp3 = end.split('T')[1]
        const temp4 = temp3.substr(0,5)
        setFin(()=>temp4)

        formData.setFieldsValue({
                  date: moment(day),
                  start_hour: temp2,
                  end_hour: temp4
              })
    }, [formData, inicio, start, end])



    const onDelete = async () => {
        setFlag(false)
        const s = formData.getFieldValue('week')
        let obj = {
            date: day,
            start_hour_actual:inicio,
            end_hour_actual:fin,
            mentor_id: id,
            semanal: s,
        }
        const response = await props.deleteDisponibilidad(obj)
        if(response){
            setVisible(false)
            setFlag(true)
            formData.resetFields()
        }
    }

    // useEffect(() => {
    //     formData.setFieldsValue({
    //               date: moment(day),
    //               start_hour: inicio,
    //               end_hour: fin,
    //           })
    // }, [formData, day])

    return (
        <Form id={`editar-dispo${day}${start}${end}`}
            form={formData}
            name={`editar-dispo${day}${start}${end}`}
            onFinish={onFinish}
            initialValues={{
                date: moment(day ? day : new Date()),
                week: false,
                start_hour: inicio,
                end_hour: fin
            }}
            scrollToFirstError
            labelAlign="right"
        >
            <Row gutter={[8,8]} justify='center'>
                <Col lg={24} md={24} sm={24} xs={24}>                  
                    <Row justify='center'>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item name='date' label="Seleccione la fecha">
                                <DatePicker />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <p>Seleccione la hora</p>
                    </Row>
                    <Row justify='center' gutter={[12]}>
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <Form.Item name="start_hour" rules={[{required: true, message: 'Por favor selecciona la hora de inicio!'}]}>
                                <DateItem_disponbilidad defaultValue={inicio} placeholder="Hora de inicio"/>
                            </Form.Item>
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <Form.Item name="end_hour" rules={[{required: true, message: 'Por favor selecciona la hora de finalización!'}]}>
                                <DateItem_disponbilidad defaultValue={fin} placeholder="Hora fin"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify='start' gutter={[12]}>

                        <Col lg={12} md={12} sm={24} xs={24}>
                            <Form.Item
                                name="week"
                                valuePropName="checked"
                                label='Editar'
                            >
                                <Select defaultValue="false" style={{ width: 200 }} onChange={handleChange}>
                                    <Option value='false'>Solo esta ocurrencia</Option>
                                    <Option value='true'>Todas las ocurrencias</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider style={{marginTop: '0%', marginBottom: '2%'}}/>
                    <Row justify='end' gutter={[8,8]}>
                        <Col lg={4} md={4} sm={5} xs={6}>
                            <Button form={`editar-dispo${day}${start}${end}`} key='submit' htmlType="submit"
                                    className='btn-verde-basico' onClick={onFinish} block
                                    loading={loading}>Editar</Button>
                        </Col>
                        <Col lg={4} md={4} sm={5} xs={7}>
                            <PopConfirm type={'primary'} message={'disponibilidad'} style={{fontFamily: 'ObjectiveRegular'}} className={'w-100'}
                                            functionDelete={() => onDelete()}
                                            id={id} setFlag={setFlag}></PopConfirm>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    );
}


const mapStateToProps = (state) => ({
    id: getId(state),
    username: getUsername(state),
    status: getStatusMentor(state),
    current_user: selectCurrentUser(state),
});

export default connect(mapStateToProps, {
    editDisponibilidad,
    deleteDisponibilidad

})(BloqueDispoEdit)