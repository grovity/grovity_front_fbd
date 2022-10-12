import React, {Fragment, useEffect, useState} from "react";
import {Form, Spinner} from "react-bootstrap";
import {Button, Row, Col} from 'antd'
import {values, size} from "lodash";
import {toast} from "react-toastify";
import {connect} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import "./EventEditForm.scss";
import {editEvent, getEventbyId} from "../../api";
import DateItem_edit from "../MultiSelector/DateItem_edit";
import DateItem_fin_edit from "../MultiSelector/DateItem_fin_edit";
import {getId, getUsername} from "../../selectors/institutions";
import {getMentorships_mentor} from "../../selectors/mentors";
import {fetchEmprendedoresbyProgram} from "../../actions/fetchUsers";
import {fetchMentorsbymentorship, fetchMentorshipsbyMentor} from "../../actions/fetchMentorships";
import {getMentorshipsbyMentor} from "../../selectors/mentorships";
import {fetchEventsbyMentor, fetchTotalEventsUser} from "../../actions/fetchEvents";
import getJsonStrError from "../../helpers/handleJsonErrors";
import {getStatusMentor} from "../../selectors/users";
import {editEventFromUser} from "../../api/marketplace";

function EventEditUsuarioForm(props) {
    const {setShowModal, event, username, status} = props;
    const [formData, setFormData] = useState(initialFormValue(event));
    const [eventUpLoading, setEventUpLoading] = useState(false);
    const [flag, setFlag] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault();
        let validCount = 0;
        values(formData).some((value) => {
            value && validCount++;
            return null;
        });
        if (validCount !== size(formData)) {
            toast.error('Por favor completa todos los campos del formulario')
        } else {
            setEventUpLoading(true);
            const btn = document.getElementById("crear-evento-desde-mentor")
            btn.disabled = true
            let payload = await props.editEventFromUser(formData, event.slug)
            setFlag(true)
            if (payload && !payload.detail && !payload.error) {
                setShowModal(false);
                await props.fetchEventsbyMentor(username, status)
                await props.fetchTotalEventsUser()
            }

            setEventUpLoading(false);
            btn.disabled = false
        }
    }


    return (
        <Row className="edit-event-marketplace">
            <Col xl={24} lg={24} xs={24}>
            <h2>Editar evento</h2>
            <Form>
                <Form.Group>
                    <Row>
                        <Col xl={24} lg={24} xs={24}>
                            <Form.Control
                                type="text"
                                placeholder="Nombre de la sesión"
                                name="nombre"
                                defaultValue={formData.nombre}
                                onChange={e =>
                                    setFormData({...formData, nombre: e.target.value})}
                            ></Form.Control>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row id='fechas' gutter={[8, 8]}>
                        <Col xl={12} lg={12} xs={12}>
                            <Form.Control
                                as={DateItem_edit}
                                placeholder="Fechas de inicio"
                                name="fecha_inicio"
                                defaultValue={formData.fecha_inicio}
                                onChange={e => {
                                    setFormData({...formData, fecha_inicio: e})
                                }
                                }

                            ></Form.Control>
                        </Col>
                        <Col xl={12} lg={12} xs={12}>
                            <Form.Control
                                as={DateItem_fin_edit}
                                placeholder="Fechas final"
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
                <Row justify='end'>
                    <Button id='crear-evento-desde-mentor' className='btn-verde-basico' variant="primary" onClick={onSubmit}>
                        {!eventUpLoading ? "Editar" : <Spinner animation="border"/>}
                    </Button>
                </Row>
            </Form>
            </Col>
        </Row>
    );
}

function initialFormValue(props) {
    let event = props
    let date = event && event.start && event.start.split('T')[0]
    if (event) {
        return {
            date: date,
            usuario: event.usuario_id,
            mentor_id: event.mentor_id,
            nombre: event.nombre,
            fecha_inicio: event.start,
            fecha_fin: event.end,
        };
    }
    return {
        date: '',
        usuario: '',
        mentor_id: '',
        nombre: '',
        fecha_inicio: '',
        fecha_fin: '',
    };
}

const mapStateToProps = (state) => ({
    mentorias: getMentorshipsbyMentor(state),
    users: state.emprendedores_program,
    mentors: getMentorships_mentor(state),
    id_usuario: getId(state),
    username: getUsername(state),
    status: getStatusMentor(state),
});

export default connect(mapStateToProps, {
    editEventFromUser,
    getEventbyId,
    fetchMentorsbymentorship,
    fetchEmprendedoresbyProgram,
    fetchMentorshipsbyMentor,
    fetchTotalEventsUser,
    getJsonStrError,
    fetchEventsbyMentor,
})(EventEditUsuarioForm)