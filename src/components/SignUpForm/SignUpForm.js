import React, {useState} from "react";
import {Row, Col, Form, Button, Spinner} from "react-bootstrap";
import {values, size} from "lodash";
import {toast} from "react-toastify";
import {isEmailValid} from "../../../src/helpers/validations";
import {register} from "../../actions/auth";
import {connect} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {registerUser} from "../../actions/auth";
import "./SignUpForm.scss";

function SignUpForm(props) {
    const {setShowModal} = props;
    const [formData, setFormData] = useState(initialFormValue());
    const [signUpLoading, setSignUpLoading] = useState(false);

    const onSubmit = async (e) => {
        let validCount = 0;
        values(formData).some((value) => {
            value && validCount++;
            return null;
        });
        if (validCount !== size(formData)) {
            toast.info("Completa todos los campos del formulario");
        } else {
            if (!isEmailValid(formData.email)) {
                toast.error("Email inválido");
            } else if (formData.password !== formData.confirm_password) {
                toast.error("las contraseñas tienen que ser iguales");
            } else if (size(formData.password) < 6) {
                toast.error("las contraseñas deben tener al  menos 6 caracteres");
            } else {
                setSignUpLoading(true);
                if (props.user == 'entidad') {
                    let registro = await props.register(formData)
                    if (registro) {
                        setShowModal(false);
                        setFormData(initialFormValue());
                    }
                } else {
                    let registro_user = await props.registerUser(formData)
                    if (registro_user) {
                        setShowModal(false);
                        setFormData(initialFormValue());
                    }
                }
                setSignUpLoading(false);
            }
        }
    };
    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    return (
        <div className={"sign-up-form"}>
            <h2>Crea tu cuenta</h2>
            <Form onChange={onChange}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Nombre"
                                name="first_name"
                                defaultValue={formData.first_name}
                            ></Form.Control>
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Apellidos"
                                name="last_name"
                                defaultValue={formData.last_name}
                            ></Form.Control>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="email"
                        placeholder="Correo Electrónico"
                        name="email"
                        defaultValue={formData.email}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control
                                type="password"
                                placeholder="Contraseña"
                                name="password"
                                defaultValue={formData.password}
                            ></Form.Control>
                        </Col>
                        <Col>
                            <Form.Control
                                type="password"
                                placeholder="Repetir contraseña"
                                name="confirm_password"
                                defaultValue={formData.confirm_password}
                            ></Form.Control>
                        </Col>
                    </Row>
                </Form.Group>
                <Button variant="primary" onClick={onSubmit}>
                    {!signUpLoading ? "Registrarse" : <Spinner animation="border"/>}
                </Button>
            </Form>
        </div>
    );
}

function initialFormValue() {
    return {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
    };
}

export default connect(null, {
    register,
    registerUser,
})(SignUpForm)
