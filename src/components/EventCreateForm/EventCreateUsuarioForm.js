import React, {useEffect, useState} from "react";
import {Form, Spinner} from "react-bootstrap";
import {Button, Row, Col} from 'antd'
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
import {createEventFromUser} from "../../api/marketplace";
import DateItem_disponbilidad from "../MultiSelector/DateItem_disponbilidad";
import {URL_BASE} from "../../constants";
import {fetchDisponibilidadMentorCompra} from "../../actions/marketplace";
import RenderMultiselect_tags from "../MultipleSelect/MultiSelect_tags";

function EventCreateUsuarioForm(props) {


    const {setShowModal, id, id_mentor, first_name, last_name, event, precio, date, setVisible, areas, cupon} = props;
    const [formData, setFormData] = useState(initialFormValue(id, id_mentor, first_name, last_name, event, precio, cupon));
    const [eventUpLoading, setEventUpLoading] = useState(false);
    const [tags, setTags] = useState([]);


    const onSubmit = async (e) => {
        e.preventDefault();

        if (tags.length !== 0) {
            formData.tags = tags.getVal()
        }

        let validCount = 0;
        values(formData).some((value) => {
            value && validCount++;
            return null;
        });

        setEventUpLoading(true);
        const btn = document.getElementById("crear-evento-desde-mentor")
        if(btn){
            btn.disabled = true
        }

        let CrearEvento = await props.createEventFromUser(formData)
        if (CrearEvento && !CrearEvento.detail && !CrearEvento.error) {
            setShowModal(false);
            setEventUpLoading(false);
            setVisible(false)
            const url = `${URL_BASE}/payu/compra/${CrearEvento.evento_django.slug}`
            window.open(url, "_blank")
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
    }

    useEffect(() => {

    }, []);


    return (
        <Row className="white-modal-basic" justify='center'>
            <Col xl={24} lg={24} xs={24}>
                <h2>Agendar asesoría</h2>
                <Form>
                    <Form.Group>
                        <Row id='fechas' gutter={[8, 8]}>
                            <Col xl={12} lg={12} xs={12}>
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
                            <Col xl={12} lg={12} xs={12}>
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

                    <Form.Group>
                        <Row>
                            <Col xl={24} lg={24} xs={24}>
                                <Form.Control
                                    as={RenderMultiselect_tags}
                                    name="tags"
                                    mensaje={'Selecciona las áreas de experiencia de interés'}
                                    placeholder='Selecciona áreas de experiencia'
                                    data={areas}
                                    onChange={e => setTags(e)}
                                >
                                </Form.Control>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={24} lg={24} xs={24}>
                                <Form.Control
                                    style={{marginTop: '4%'}}
                                    as='textarea'
                                    placeholder="Cuéntale un poco más al mentor por qué estas agendando la mentoría"
                                    name="observaciones"
                                    onChange={e =>
                                        setFormData({...formData, observaciones: e.target.value})}
                                ></Form.Control>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={8} lg={8} xs={8}>
                                <p style={{color: 'var(--primary-text-color)'}} className='mt-4'>¿Tienes un cupón?</p>         
                            </Col>
                            <Col xl={16} lg={16} xs={16}>
                                <Form.Control
                                    style={{marginTop: '4%'}}
                                    as='input'
                                    placeholder="Ingresa tu cupón"
                                    name="cupon"
                                    onChange={e =>
                                        setFormData({...formData, cupon: e.target.value})}
                                ></Form.Control>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Row justify='end'>
                        <Button id='crear-evento-desde-mentor' className='btn-verde-basico' onClick={onSubmit}>
                            {!eventUpLoading ? "Ir a pagar" : <Spinner size={'sm'} animation="border"/>}
                        </Button>
                    </Row>
                </Form>
            </Col>
        </Row>
    );
}

function initialFormValue(id, id_mentor, first_name, last_name, event, precio, status) {
    let date = event && event.event && event.event.start && event.event.start.split('T')[0]
    return {
        date: date,
        precio: precio,
        usuario_individual: id,
        mentor_id: id_mentor,
        fecha_inicio: event && event.event.start,
        fecha_fin: event && event.event.end,
        nombre: `Grovity-Mentoria ${first_name} ${last_name}`,
        tags: [],
        observacions: '',
        cupon: '',
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
    createEventFromUser
})(EventCreateUsuarioForm)
