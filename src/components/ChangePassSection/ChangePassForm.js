import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import { Col, Row, Form, Input, Button } from 'antd';
import { LockOutlined, MailOutlined} from '@ant-design/icons';
import {connect} from "react-redux";
import {Spinner} from "react-bootstrap";
import {setAlert} from "../../actions/alert";
import {cambioConfirmacionPassword, cambioPassword} from "../../api";



const ChangePassForm = () => {
    const [loading, setLoading] = useState(false);
    const [sentCode, setSentCode] = useState(false);


    const onFinish = async (values) => {
        setLoading(true)


        if (localStorage.getItem('confirmar') !== null) {

             const request = await  cambioConfirmacionPassword(values);
             if(request) {
                 setSentCode(false)
             }
        } else {
            values = {
                ...values,
                codigo: '',
                password: ''
            }
             const request = await cambioPassword(values);
            if(request) {
                setSentCode(request)
            }
        }
           setLoading(false)

    };

    useEffect(() => {
         localStorage.removeItem('confirmar');
    }, [])
  
    return (
        <div className="signup-form-container">
            <Row>
                <Col xl={20} lg={20} md={20} sm={20} xs={20}>
                    <h2>Recuperar Contraseña</h2>
                    <p>Ingresa el correo con el que te 
                        registraste en Grovity y te enviremos un código de 
                        verificación para que puedas crear una nueva contraseña</p>
                </Col>
            </Row>
            <Row>
            <Form
                name="change_pass"
                className="register"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: '¡Por favor ingrese un email válido, sin espacios!', type:'email'}]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>

                { sentCode ?
                <>
                    <Form.Item
                    name="codigo"
                    rules={[{ required: true, message: '¡Por favor ingrese su código de verificación!' }]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Código de verificación"
                    />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        hasFeedback
                        rules={[
                        {
                            required: true,
                            message: '¡Por favor escriba su nueva contraseña!',
                        },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Nueva contraseña"
                    />
                    </Form.Item>
                    </>
                :
                <></>
            
                }
                
                <hr/>

                {
                    sentCode ?
                    <Form.Item>
                    <Button type="primary" block htmlType="submit" className="login-form-button">
                        {!loading? "Cambiar Contraseña" : <Spinner style ={{width:'1rem',height:'1rem'}} animation="border"/>}
                    </Button>
                    <p>Volver al <a href="/login">Login</a></p>
                </Form.Item>
                :
                <Form.Item>
                    <Button type="primary" block htmlType="submit" className="login-form-button">
                        {!loading? "Enviar" : <Spinner style ={{width:'1rem',height:'1rem'}} animation="border"/>}
                    </Button>
                    <p>Volver al <a href="/login">Login</a></p>
                </Form.Item>
                }
            </Form>
        </Row>
      </div>
    );
  };

function initialFormValue() {
    return {
        email: "",
        password: "",
        confirm_password: "",
    };
}

export default withRouter(connect(null, {
    setAlert,
})(ChangePassForm))