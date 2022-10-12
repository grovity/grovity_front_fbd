import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {createEvent, getEventbyId} from "../../api";
import {getId, getUsername} from "../../selectors/institutions";
import {fetchEmprendedoresbyProgram, fetchEmprendedoresMentor, fetchEmprendedor} from "../../actions/fetchUsers";
import {getMentorships_mentor} from "../../selectors/mentors";
import {fetchMentorsbymentorship, fetchMentorships} from "../../actions/fetchMentorships";
import "./EventEditForm.scss";
import {fetchEventsbyMentor, fetchTotalEventsUser} from "../../actions/fetchEvents";
import getJsonStrError from "../../helpers/handleJsonErrors";
import {getStatusMentor, selectCurrentUser} from "../../selectors/users";
import Scheduler5 from "../Scheduler/Scheduler5";
import {Divider, Row, Col, Form, Button, Input} from 'antd';
import DateItem_disponbilidad from "../MultiSelector/DateItem_disponbilidad";
import {editEventFromUserNormal} from "../../api/marketplace";
import PopConfirm from "../PopConfirm/PopConfirm";
import {deleteEvent} from "../../api/event";


function EventEditUsuarioNormalForm(props) {
    const [formData] = Form.useForm();


    const {
        program_id, mentorships, program_nombre, current_user,
        setVisible, status, event, closeModal, setEditar
    } = props;
    const [mentores, setMentores] = useState([])
    const [idMentoria, setIdMentoria] = useState(0)
    const [dispo, setDispo] = useState(false);
    const [mentor, setMentor] = useState(null);
    const [time, setTime] = useState(false);
    const [date, setDate] = useState(new Date(event?.fecha_inicio));
    const [hours, setHours] = useState(null);
    const [horaInicio, setHoraInicio] = useState(null)
    const [horaFin, setHoraFin] = useState(null)
    const [loading, setLoading] = useState(false)
    const [flag, setFlag] = useState(false)

    const selectIdProgramandEntidad = (mentorias, idMentoria) => {
        let ob = mentorias.find(c => c.id == idMentoria)
        return ob
    }


    function handleChange(value) {
        setIdMentoria(value)
        let obj = selectIdProgramandEntidad(mentorships, value)
        setMentores(obj?.mentor)
    }

    function handleChange2(value) {
        setDispo(true)
        setMentor(value)
    }

    const onFinish = async (values) => {
        //{date, mentor_id, nombre, fecha_inicio, fecha_fin, mentoria}
        let values2 = {}

        if (!values.nombre) {
            values2 = {
                ...values, date: date,
                nombre: `${program_nombre} -  ${current_user.first_name} ${current_user.last_name}`,
                mentor_id: event.mentor, mentoria: event.mentoria,
                usuario_individual: event.usuario_individual
            }
        } else {
            values2 = {
                ...values, date: date, mentor_id: event.mentor, mentoria: event.mentoria,
                usuario_individual: event.usuario_individual
            }
        }
        setLoading(true)
        const response = await props.editEventFromUserNormal(values2, event.slug)
        if (response) {
            await props.fetchTotalEventsUser()
            setVisible(false)
            closeModal()
            setEditar(true)
             formData.resetFields()
        }
        setLoading(false)
    }

    async function deleteEvent2(id){
       const response = await  props.deleteEvent(id)
         if(response && !response.error){
                props.fetchTotalEventsUser()
                setVisible(false)
                closeModal()
              formData.resetFields()

            }
    }



    return (
        <Form id={`editar-evento-emprendedor-${event?.id}`}
              form={formData}
              name={`editar-evento-emprendedor-${event?.id}`}
              onFinish={onFinish}
              initialValues={{

                  date: date,
                  mentor_id: event?.mentor,
                  fecha_inicio: event?.fecha_inicio,
                  fecha_fin: event?.fecha_fin,
                  nombre: event?.nombre,
                  mentoria: event?.mentoria,
                  usuario_individual: event?.usuario_individual,

              }}
              scrollToFirstError
              labelAlign="right"
        >
            <Row gutter={[8, 8]}>
                <Col lg={24} md={24} sm={24} xs={24}>
                    <Row>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item
                                name="nombre"
                                label="Nombre de la sesión"
                                rules={[{required: true, message: 'Por favor escriba el nombre de la sesión!'}]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>

                    {
                        !status ?
                            <>
                                <Divider className='divider-sections'/>
                                <Row justify='center'>
                                    <Col lg={24} md={24} sm={24} xs={24}>
                                        <h4>Selecciona la disponibilidad</h4>
                                        <Scheduler5 setDate={setDate} formData={formData}
                                                    mentor={event?.mentor} setTime={setTime}
                                                    setHours={setHours} date_event={event?.fecha_inicio}
                                                    setHoraInicio={setHoraInicio}
                                                    setHoraFin={setHoraFin}
                                        />
                                    </Col>
                                </Row>
                            </>
                            :
                            <></>
                    }

                    {
                        time || status ?
                            <>
                                <Divider className='divider-sections'/>
                                <Row>
                                    <h4>Selecciona la hora</h4>
                                </Row>
                                <Row justify='center' gutter={[12]}>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <Form.Item name="fecha_inicio" rules={[{
                                            required: true,
                                            message: 'Por favor selecciona la hora de inicio!'
                                        }]}>
                                            <DateItem_disponbilidad min={horaInicio} max={horaFin}
                                                                    placeholder="Hora de inicio"/>
                                        </Form.Item>
                                    </Col>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <Form.Item name="fecha_fin" rules={[{
                                            required: true,
                                            message: 'Por favor selecciona la hora de finalización!'
                                        }]}>
                                            <DateItem_disponbilidad min={horaInicio} max={horaFin}
                                                                    placeholder="Hora fin"/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Divider className='divider-sections'/>
                                <Row justify='end'>
                                    <Col lg={4} md={4} sm={4} xs={4} style={{marginRight: '2%'}}>
                                        <Button form={`editar-evento-emprendedor-${event?.id}`}
                                                className='btn-verde-basico'
                                                htmlType="submit" loading={loading} block
                                        >
                                            Editar
                                        </Button>
                                    </Col>
                                    <Col>
                                        <PopConfirm message={'evento'} type={'primary'}
                                                    functionDelete={() => deleteEvent2(event?.slug)}
                                                    id={event?.slug} setFlag={setFlag}></PopConfirm>

                                    </Col>
                                </Row>
                            </>
                            :
                            <></>
                    }
                </Col>
            </Row>
        </Form>
    );
}


const mapStateToProps = (state) => ({
    mentors: getMentorships_mentor(state),
    id: getId(state),
    username: getUsername(state),
    status: getStatusMentor(state),
    mentorships: state.mentorships,
    current_user: selectCurrentUser(state),
});

export default connect(mapStateToProps, {
    createEvent,
    fetchEmprendedor,
    fetchEmprendedoresMentor,
    getEventbyId,
    fetchMentorsbymentorship,
    fetchEmprendedoresbyProgram,
    fetchTotalEventsUser,
    getJsonStrError,
    fetchEventsbyMentor,
    fetchMentorships,
    editEventFromUserNormal,
    deleteEvent

})(EventEditUsuarioNormalForm)