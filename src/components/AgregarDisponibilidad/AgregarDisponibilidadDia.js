import React, {useState} from "react";
import {Row, Col, Form, Button, Spinner} from "react-bootstrap";
import {values, size} from "lodash";
import {toast} from "react-toastify";
import {connect} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {getId, getUsername} from "../../selectors/institutions";
import DateItem_disponbilidad from "../MultiSelector/DateItem_disponbilidad";
import {agregarDisponibilidadMentor, agregarDisponibilidadMentorDay, getDispoMentorDay} from "../../api/marketplace"
import {fetchDisponibilidadMentor, fetchDisponibilidadMentorDia} from "../../actions/marketplace";
import {DatePicker} from 'antd';
import './AgregarDisponibilidadDia.scss'

function AgregarDisponibilidadDia(props) {

    const {setShowModal, id, dateStr, setdispoMentor} = props;
    const [formData, setFormData] = useState(initialFormValue(id));
    const [eventUpLoading, setEventUpLoading] = useState(false);


    const onSubmit = async (e) => {
        e.preventDefault();

        let validCount = 0;
        values(formData).some((value) => {
            value && validCount++;
            return null;
        });
        if (validCount !== size(formData)) {
            toast.info("Completa todos los campos del formulario");

        } else {
            setEventUpLoading(true);
            const btn = document.getElementById("crear-evento-desde-mentor")
            btn.disabled = true
            let CrearDispo = await agregarDisponibilidadMentorDay(formData)
            if (CrearDispo && !CrearDispo.detail && !CrearDispo.error) {
                setShowModal(false);
                setFormData(initialFormValue(id));
                 await props.fetchDisponibilidadMentorDia(dateStr, id)
                let dispo = await getDispoMentorDay(dateStr, id)
                if (dispo) {
                    setdispoMentor(dispo)
                }

            }

            setEventUpLoading(false);
            btn.disabled = false
        }
    }

    function onChange(date, dateString) {
        setFormData({...formData, date: dateString})
    }

    return (
        <div className={"sign-up-form"}>
            <h2>Agregar disponibilidad por día:</h2>
            <Form>
                <Form.Group>
                    <Row id={'date-picker'}>
                        <Form.Control
                            as={DatePicker}
                            placeholder="Seleccione día"
                            name="date"
                            onChange={onChange}

                        >
                        </Form.Control>

                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row id='fechas'>
                        <Col>
                            <Form.Control
                                as={DateItem_disponbilidad}
                                placeholder="Hora de inicio"
                                name="fecha_inicio"
                                onChange={e => {
                                    setFormData({...formData, fecha_inicio: e})
                                }
                                }

                            ></Form.Control>
                        </Col>
                        <Col>
                            <Form.Control
                                as={DateItem_disponbilidad}
                                placeholder="Hora final"
                                name="fecha_fin"
                                onChange={e => {
                                    setFormData({...formData, fecha_fin: e})
                                }
                                }
                            ></Form.Control>
                        </Col>
                    </Row>
                </Form.Group>

                <Button id='crear-evento-desde-mentor' variant="primary" onClick={onSubmit}>
                    {!eventUpLoading ? "Agregar" : <Spinner animation="border"/>}
                </Button>
                {/*<div style={{color: 'red', cursor: 'pointer', fontFamily: 'ObjectiveBold'}} className='mt-2 text-center'*/}
                {/*     onClick={handleDelete(id)}>Cancelar*/}
                {/*</div>*/}
            </Form>
        </div>
    );
}

function initialFormValue(id) {
    return {
        date: "",
        mentor_id: id,
        fecha_inicio: "",
        fecha_fin: "",
    };
}

const mapStateToProps = (state) => ({

    id: getId(state),
    username: getUsername(state),
});

export default connect(mapStateToProps, {
    fetchDisponibilidadMentor,
    fetchDisponibilidadMentorDia

})(AgregarDisponibilidadDia)