import React, {useState} from "react";
import {Row, Col, Form, Button, Spinner} from "react-bootstrap";
import {register} from "../../actions/auth";
import {connect} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {registerUser} from "../../actions/auth";
import "./ContactForm.scss";
import Flecha from "../../assets/images/flecha.png";


function ContactForm(props) {
    const [formData] = useState(initialFormValue());
    const [signUpLoading, setSignUpLoading] = useState(false);

    const onSubmit = async (e) => {
        setSignUpLoading(true);
        setSignUpLoading(false);

    }
    return (
        <div className={"sign-up-form-white"}>
            <h2>CONTÁCTANOS</h2>
            <Form>
                <Form.Group>
                    <Row>
                        <Col md='6'>
                            <Form.Control
                                type="text"
                                placeholder="Nombre"
                                name="nombre"
                                defaultValue={formData.first_name}
                            ></Form.Control>
                            <Form.Control
                                as="select"
                                placeholder="¿Emprendedor, mentor o ecosistema?"
                                name="tipo"
                                defaultValue={formData.first_name}
                            >
                                <option>¿Empresario, mentor o ecosistema?</option>
                                <option>Empresario</option>
                                <option>Mentor</option>
                                <option>Ecosistema</option>
                            </Form.Control>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                name="email"
                                defaultValue={formData.first_name}
                            ></Form.Control>
                            <Form.Control
                                type="text"
                                placeholder="Asunto"
                                name="asunto"
                                defaultValue={formData.first_name}
                            ></Form.Control>
                        </Col>
                        <Col md='6'>
                            <Form.Control
                                as="textarea"
                                placeholder="Mensaje"
                                name="mensaje"
                                defaultValue={formData.first_name}
                            ></Form.Control>

                        </Col>
                    </Row>
                </Form.Group>

                <Button variant="primary" onClick={onSubmit}>
                    {!signUpLoading ? "Solicita información" : <Spinner animation="border"/>}
                    <img src={Flecha}/>
                </Button>
            </Form>
        </div>
    );
}

function initialFormValue() {
    return {
        nombre: "",
        tipo: "",
        email: "",
        asunto: "",
        mensaje: "",
    };
}

export default connect(null, {
    register,
    registerUser,
})(ContactForm)