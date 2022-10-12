import React, {useEffect, useState} from "react";
import {Row, Col, Form, Button, Spinner} from "react-bootstrap";
import {values} from "lodash";
import {connect} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {createEvent, getEventbyId} from "../../api";
import {getId, getUsername} from "../../selectors/institutions";
import {fetchEmprendedoresbyProgram} from "../../actions/fetchUsers";
import {getMentorships_mentor} from "../../selectors/mentors";
import {fetchMentorsbymentorship} from "../../actions/fetchMentorships";
import "./EventCreateMentorForm.scss";
import {fetchEventsbyUser, fetchTotalEventsUser} from "../../actions/fetchEvents";
import getJsonStrError from "../../helpers/handleJsonErrors";
import {getStatusMentor} from "../../selectors/users";
import {
    createEventFromUserNormal,
    editEventFromUserNormal
} from "../../api/marketplace";
import DateItem_disponbilidad from "../MultiSelector/DateItem_disponbilidad";
import {fetchDisponibilidadMentorCompra} from "../../actions/marketplace";


function EventCreateUsuarioNormalForm(props) {
    const {setShowModal, id, event, date, setVisible, formData2, mentor, edit, eventEdit} = props;
    const [formData, setFormData] = useState(initialFormValue(id, formData2, event, mentor, eventEdit));
    const [eventUpLoading, setEventUpLoading] = useState(false);


    const onSubmit = async (e) => {

        e.preventDefault();

        let validCount = 0;
        values(formData).some((value) => {
            value && validCount++;
            return null;
        });

        setEventUpLoading(true);
        const btn = document.getElementById("crear-evento-desde-mentor")
        btn.disabled = true
        let CrearEvento
        if(edit){
             CrearEvento = await props.editEventFromUserNormal(formData, eventEdit.slug)
        } else {
             CrearEvento = await props.createEventFromUserNormal(formData)
        }
        if (CrearEvento && !CrearEvento.detail && !CrearEvento.error) {
            setShowModal(false);
            setEventUpLoading(false);
            setVisible(false)
            await props.fetchTotalEventsUser()
            await props.fetchEventsbyUser()
            let date2 = date.getDate();
            let month = date.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
            let year = date.getFullYear();
            let dateStr = year + "-" + month + "-" + date2;
            await props.fetchDisponibilidadMentorCompra(dateStr, formData.mentor_id)
            let reload = () => {
                window.location.reload()
            }
            setTimeout(reload, 1000)
            //setFormData(initialFormValue(id, id_mentor));

            setEventUpLoading(false);
            btn.disabled = false
        }
        setEventUpLoading(false);
        btn.disabled = false
    }

    useEffect(() => {

    }, []);


    return (
        <div className={"sign-up-form"}>
            <h2>Agendar</h2>
            <Form>
                <Form.Group>
                    <Row id='fechas'>
                        <Col>
                            <Form.Control
                                as={DateItem_disponbilidad}
                                defaultValue={formData.fecha_inicio}
                                min={formData.fecha_inicio}
                                max={formData.fecha_fin}
                                placeholder="Fechas de inicio"
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
                                defaultValue={formData.fecha_fin}
                                min={formData.fecha_inicio}
                                max={formData.fecha_fin}
                                placeholder="Fechas final"
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
                    {!eventUpLoading ? "Agendar" : <Spinner animation="border"/>}
                </Button>
                {/*<div style={{color: 'red', cursor: 'pointer', fontFamily: 'ObjectiveBold'}} className='mt-2 text-center'*/}
                {/*     onClick={handleDelete(id)}>Cancelar*/}
                {/*</div>*/}
            </Form>
        </div>
    );
}

function initialFormValue(id, formData2, event, mentor, eventEdit) {
    let date = event && event.event && event.event.start && event.event.start.split('T')[0]
    return {
        date: date,
        mentor_id: mentor,
        fecha_inicio: event && event.event.start,
        fecha_fin: event && event.event.end,
        nombre: formData2?.nombre,
        mentoria: formData2?.mentoria,
        usuario_individual: eventEdit?.usuario_individual,

    };
}

const mapStateToProps = (state) => ({
    users: state.emprendedores_program,
    mentors: getMentorships_mentor(state),
    id: getId(state),
    username: getUsername(state),
    status: getStatusMentor(state),
});

export default connect(mapStateToProps, {
    createEvent,
    getEventbyId,
    fetchMentorsbymentorship,
    fetchEmprendedoresbyProgram,
    fetchEventsbyUser,
    fetchTotalEventsUser,
    fetchDisponibilidadMentorCompra,
    getJsonStrError,
    createEventFromUserNormal,
    editEventFromUserNormal
})(EventCreateUsuarioNormalForm)
