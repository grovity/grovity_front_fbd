import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import './SignUpSection-md.scss'
import { Col, Row, Form, Input, Button, Switch } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined} from '@ant-design/icons';
import {connect} from "react-redux";
import {registerUser} from "../../actions/auth";
import {register} from "../../actions/auth";
import {values, size} from "lodash";
import {toast} from "react-toastify";
import {isEmailValid} from "../../../src/helpers/validations";
import {Spinner} from "react-bootstrap";
import {validar_clave} from "../../helpers/validations";

const SignupForm = (props) => {
    const [form] = Form.useForm();
    const [formData, setFormData] = useState(initialFormValue());
    const [signUpLoading, setSignUpLoading] = useState(false);
    const [entidadChecked, setEntidadChecked] = useState(false);
    const {history} = props;

    const onFinish = async formData => {
      //console.log('Received values of form: ', formData);
      //let registro = await props.registerUser(formData)

      let validCount = 0;
        values(formData).some((value) => {
            value && validCount++;
            return null;
        });
        if (validCount !== size(formData)) {
            toast.info("Completa todos los campos del formulario");
        } else {
            let valid = validar_clave(formData.password)
            if (!isEmailValid(formData.email)) {
                toast.error("Email inválido");
            } else if (!valid) {
                toast.error("La contraseña deben tener al menos 8 caracteres, una letra mayúscula, minúscula, un número y un símbolo");
            } else {
                setSignUpLoading(true);
                if (entidadChecked) {
                    let registro = await props.register(formData)
                    if (registro === true){
                        localStorage.setItem('entidad', true)
                        history.push('/email-confirmacion');
                    }

                } else {
                    let registro_user = await props.registerUser(formData)
                    if (registro_user === true){
                        history.push('/email-confirmacion');
                    }

                }
                setSignUpLoading(false);
            }
        }
    };

    const onChange = (checked, e) => {
        
        if (!checked) {

            setEntidadChecked(true);
        }
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    return (
        <div className="signup-form-container">
   
            <Row>
                <Col>
                    <div className='switch-container'>
                    <Switch className='switch-header'  unCheckedChildren="Busco Freelancer" checkedChildren="Soy Freelancer" defaultChecked onChange={onChange}/>
                    </div>
                    <h2>Crea tu cuenta GRATIS</h2>
                    <p>Accede a más de 10 funcionalidades totalmente gratis</p>
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
                className="register"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="first_name"
                    rules={[{ required: true, message: '¡Por favor ingrese su nombre!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nombre" />
                </Form.Item>
                <Form.Item
                    name="last_name"
                    rules={[{ required: true, message: '¡Por favor ingrese sus apellidos!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Apellidos" />
                </Form.Item>
                {/*<Form.Item*/}
                {/*    name="telefono"*/}
                {/*    rules={[{ required: true, message: '¡Por favor ingrese su número de teléfono!' }]}*/}
                {/*>*/}
                {/*    <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="Teléfono de contacto" />*/}
                {/*</Form.Item>*/}
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: '¡Por favor ingrese un email válido, sin espacios!', type:'email'}]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>


                <Form.Item
                name="password"
                rules={[{ required: true, message: '¡Por favor ingrese su contraseña!' }]}
                >
                    <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Contraseña"
                />
                </Form.Item>
                <Form.Item
                    name="confirm_password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                    {
                        required: true,
                        message: '¡Por favor confirme su contraseña!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject('¡Las contraseñas no coinciden!');
                        },
                    }),
                    ]}
                >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Confirmar contraseña"
                />
                </Form.Item>

                {/*<Form.Item*/}
                {/*    name="Terminos"*/}
                {/*    valuePropName="checked"*/}
                {/*    rules={[*/}
                {/*    { validator:(_, value) => value ? Promise.resolve() : Promise.reject('Should accept agreement') },*/}
                {/*    ]}*/}
                {/*    // {...tailFormItemLayout}*/}
                {/*>*/}
                {/*    <Checkbox>*/}
                {/*    He leído los <a href="">términos y condiciones</a>*/}
                {/*    </Checkbox>*/}
                {/*    <hr/>*/}
                {/*</Form.Item>*/}
                
                <Form.Item>
                    <Button type="primary" block htmlType="submit" className="login-form-button">
                        {!signUpLoading ? "Crea tu cuenta GRATIS" : <Spinner style ={{width:'1rem',height:'1rem'}} animation="border"/>}
                    </Button>
                    <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
                </Form.Item>
            </Form>
        </Row>
      </div>
    );
  };

function initialFormValue() {
    return {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
    };
}

export default withRouter(connect(null, {
    register,
    registerUser,
})(SignupForm))