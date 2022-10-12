import React, {useState} from "react";
import {Row, Col, Form, Button, Spinner} from "react-bootstrap";
import {values, size} from "lodash";
import {toast} from "react-toastify";
import {connect} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {getId, getUsername} from "../../selectors/institutions";
import DateItem_disponbilidad from "../MultiSelector/DateItem_disponbilidad";
import {
    editarDisponibilidadMentorDay, eliminarDisponibilidadMentorDay, getDispoMentorDay
} from "../../api/marketplace"
import {fetchDisponibilidadMentor, fetchDisponibilidadMentorDia} from "../../actions/marketplace";
import moment from 'moment';
import {DatePicker} from 'antd';
import './AgregarDisponibilidadDia.scss'

const dateFormat = 'YYYY/MM/DD';

function EditarDisponibilidadDia(props) {

    const {event, id, setShowModal, dateStr, setdispoMentor} = props;
    const [formData, setFormData] = useState(initialFormValue(event, id));

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
            let CrearDispo = await editarDisponibilidadMentorDay(formData)
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

    async function handleDelete(event, inicio, fin) {
        let date = event && event.event && event.event.start && event.event.start.split('T')[0]
        const response = await eliminarDisponibilidadMentorDay(id, date, inicio, fin)
        if (response) {
            setShowModal(false);
            setFormData(initialFormValue(id));
            await props.fetchDisponibilidadMentorDia(dateStr, id)
            let dispo = await getDispoMentorDay(dateStr, id)
            if (dispo) {
                setdispoMentor(dispo)
            }

        }

    }

    return (
        <div className={"sign-up-form"}>
            <h2>Editar disponibilidad por día:</h2>
            <Form>
                <Form.Group>
                    <Row id={'date-picker'}>
                        <Form.Control
                            disabled={true}
                            as={DatePicker}
                            placeholder="Seleccione día"
                            name="date"
                            defaultValue={moment(formData.date, dateFormat)}
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
                                defaultValue={formData.fecha_inicio}
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
                                defaultValue={formData.fecha_fin}
                                onChange={e => {
                                    setFormData({...formData, fecha_fin: e})
                                }
                                }
                            ></Form.Control>
                        </Col>
                    </Row>
                </Form.Group>

                <Button id='crear-evento-desde-mentor' variant="primary" onClick={onSubmit}>
                    {!eventUpLoading ? "Editar" : <Spinner animation="border"/>}
                </Button>

                <div style={{color: 'white', cursor: 'pointer'}} className='mt-2 text-center'
                     onClick={() => handleDelete(event, formData.fecha_inicio, formData.fecha_fin)}>¿Eliminar esta
                    disponibilidad?
                </div>
            </Form>
        </div>
    );
}

function initialFormValue(event, id) {
    let date = event && event.event && event.event.start && event.event.start.split('T')[0]
    let fecha_inicio = event && event.event && event.event.start && event.event.start.split('T')[1]
    let fecha_fin = event && event.event && event.event.end && event.event.end.split('T')[1]
    return {
        date: date,
        mentor_id: id,
        fecha_inicio: fecha_inicio,
        fecha_fin: fecha_fin,
    };
}

const mapStateToProps = (state) => ({

    id: getId(state),
    username: getUsername(state),
});

export default connect(mapStateToProps, {
    fetchDisponibilidadMentor,
    fetchDisponibilidadMentorDia

})(EditarDisponibilidadDia)