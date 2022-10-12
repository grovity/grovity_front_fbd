import React from 'react'
import {Col, Row, Input, Form} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import {setAlert} from "../../actions/alert";
import {URL_BASE} from "../../constants";
import {connect} from "react-redux";

const { TextArea } = Input;

const FormIntegraciones = (props) => {
    const [form] = Form.useForm();
    

    const solicitud = async (e) => {
        let formData = new FormData(e.target);

        await fetch(`${URL_BASE}/integracion/crear`, {
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }),
            method: 'POST'
        }).then(r => {
            if (r.status !== 201) {
                props.setAlert("Error al enviar la solicitud", 'danger');
            } else {
                props.setAlert('La solicitud se envió correctamente, nos comunicaremos pronto a través de su correo electrónico', 'success', 2000);
                setTimeout(() => {
                    window.location.href = '/institution';
                }, 3000)
            }
        })
    }

    // const send = async (e) => {
    //     e.preventDefault();
    //     if (localStorage.getItem('token') !== null)
    //         await solicitud(e);
    // }

    const onFinish = values => {
        // props.editUser(values, props.username, props.setAlert, avatarFile)
        // console.log(values, "hola");
        //send();
    };

        return (
        <div className='site-car-wrapper'>
                <Row id="cards-entidad-main" gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col lg={22} xs={24} md={24}>
                        <Form id="integraciones-entidad"
                            onFinish={onFinish}
                            form={form}
                            initialValues={{
                                descripcion: 'hi hi hi',
                            }}
                        >
                            <Form.Item>
                                <TextArea rows={6} placeholder="Describe las necesidades para tu integración"/>  
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
}

export default connect(null, {
    setAlert
})(FormIntegraciones);