import React, {useState} from "react";
import {Row, Col, Form, Button, Spinner} from "react-bootstrap";
import {connect} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import "./IndicadorEditForm.scss";
import InputFormMobiscroll from "../InputFormMobiscroll/InputFormMobiscroll";
import DateItem_indicador from "../MultiSelector/DateItem_indicador";
import {editEmpresaEmprendedorIndicador} from "../../api/user";
import {size, values} from "lodash";
import {toast} from "react-toastify";

function IndicadorEditForm(props) {
    const {event, indicador} = props;
    const [formData, setFormData] = useState(initialFormValue(event));
    const [signUpLoading, setSignUpLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        let validCount = 0;
        values(formData).some((value) => {
            value && validCount++;
            return null;
        });
        if (validCount !== size(formData)) {
            toast.info("Completa todos los campos del formulario")
        } else {
            setSignUpLoading(true);
            let response = await props.editEmpresaEmprendedorIndicador(formData.valor, formData.fecha_dato,
                formData.id_punto)
            if (response) {
                setSignUpLoading(false);
                let reload = () => {
                    window.location.reload()
                }
                setTimeout(reload, 2000)
            }

        }

    }
    return (
        <div className={'indicadores-form'}>
            <h2>Edita este punto en la gráfica:</h2>
            <Form>
                <Form.Group>
                    <Row>
                        <Col md='8'>
                            <Form.Control
                                as={InputFormMobiscroll}
                                name="valor"
                                indicador={indicador}
                                className='p-0 m-0 w-100'
                                defaultValue={formData.valor}
                                onChange={e => {
                                    console.log(e)
                                    setFormData({...formData, valor: e})
                                }
                                }
                            ></Form.Control>
                        </Col>
                        <Col>
                            <Form.Control
                                as={DateItem_indicador}
                                name="fecha_dato"
                                className='col-md-4 mt-5 fecha'
                                placeholder='Ingrese Fecha'
                                id='id_indicador'
                                defaultValue={formData.fecha_dato}
                                onChange={e => {
                                    setFormData({...formData, fecha_dato: e})
                                }
                                }
                            >
                            </Form.Control>

                        </Col>
                    </Row>
                </Form.Group>
                <Button variant="primary" onClick={onSubmit}>
                    {!signUpLoading ? "Editar" : <Spinner animation="border"/>}
                </Button>
            </Form>
        </div>
    );
}

function initialFormValue(props) {
    //  console.log(props.id)
    let event = props
    if (event) {
        return {
            id_punto: event.id,
            valor: event.value,
            fecha_dato: event.date
        }
    }
    return {
        id_punto: "",
        valor: "",
        fecha_dato: ""
    };
}

export default connect(null, {editEmpresaEmprendedorIndicador})(IndicadorEditForm)