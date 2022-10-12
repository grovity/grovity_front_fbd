import React, {useState} from 'react';
import {withRouter, Link} from 'react-router-dom';
import './LoginForm.scss';
import {Col, Row, Form, Input, Button,Space } from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {connect} from "react-redux";
import {login} from "../../actions/auth";
import {fetchUser} from "../../actions/fetchUsers";
import {setAlert} from "../../actions/alert";
import {Spinner} from "react-bootstrap";
import {toast} from "react-toastify";
import encriptarValor from "../../helpers/crypto";
import {PUBLIC_KEY} from "../../constants";



const LoginForm = (props) => {
    const [eventUpLoading, setEventUpLoading] = useState(false);

    Form.useForm();
    const onFinish = async values => {
        const emailCrypto = encriptarValor(PUBLIC_KEY, values.email)
        const passCrypto = encriptarValor(PUBLIC_KEY, values.password)
        values = {email: emailCrypto, password: passCrypto}
        setEventUpLoading(true);
        await props.login(values)
        if (localStorage.getItem('token')) {
            let {payload} = await props.fetchUser()
            if (payload) {
                setEventUpLoading(false);
            }
            if (payload && payload[0] && payload[0].entidad_entidad && payload[0].entidad_entidad.length !== 0) {
                toast.success("Sesión iniciada correctamente")


                props.history.push("/institution");

                let reload = () => {
                    window.location.reload()
                }
                setTimeout(reload, 500)

            } else {
                toast.success("Sesión iniciada correctamente")
                if (localStorage.getItem('usuario_nuevo')) {
                    props.history.push("/marketplace");
                } else {
                    props.history.push("/user");

                }
                let reload = () => {
                    window.location.reload()
                }
                setTimeout(reload, 700)


            }
        } else {
            props.setAlert("Datos inválidos", "danger")
            setEventUpLoading(false);
        }

        setEventUpLoading(false);

    };


    return (
        <div className="login-form-container">
            <Row>
                <Col>
                    {/* <Switch checkedChildren="Personas" unCheckedChildren="Empresas" defaultChecked /> */}
                    <h2>Iniciar Sesión</h2>
                    {/* <Row className="sing-in-social-networks">
                        <Col className="redes-singin">
                            <img width="80%" src={FB}/>
                        </Col>
                        <Col className="redes-singin">
                            <img width="80%" src={LinkedIn}/>
                        </Col>
                        <Col className="redes-singin">
                            <img width="80%" src={Google}/>
                        </Col>
                    </Row> */}
                    <p>Ingresa con tu email:</p>
                </Col>
            </Row>
            <Row>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[{
                            required: true,
                            type: 'email',
                            message: '¡Por favor ingrese un email válido, sin espacios!'
                        }]}
                    >
                        <Input autoComplete="new-password"  prefix={<UserOutlined className="site-form-item-icon"/>}
                               id='input-blanco' placeholder="Nombre de usuario o email"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: '¡Por favor ingrese su contraseña!'}]}
                    >
                        <Input.Password
                            autoComplete="new-password"
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Contraseña"
                        />
                    </Form.Item>
                    <Form.Item>
                        {/* <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item> */}
                        <a className="login-form-forgot" href="/change_password">¿Olvidaste tu contraseña?</a>
                        <hr/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" block htmlType="submit" className="login-form-button">
                            {!eventUpLoading ? "Log in" :
                                <Spinner style={{width: '1rem', height: '1rem'}} animation="border"/>}
                        </Button>
                        <p>¿Eres nuevo? <a href="/sign-up">Crea tu cuenta</a></p>

                       

                    <div className='boton-links-center'>
                    <Link to={"/terminos-y-condiciones"}>
                        Terminos y condiciones
                        </Link>
                   <br />

                        <Link to={"/politica-privacidad"}>
                        Politica de privacidad
                        </Link>
                    </div>


                    </Form.Item>
                </Form>
            </Row>
        </div>
    );
};


export default withRouter(connect(null, {
    login,
    fetchUser,
    setAlert,
})(LoginForm))
