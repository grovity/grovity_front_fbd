
import React, {Fragment, useEffect, useState} from "react";
import {Row, Col, Form, Button, Select, Input, DatePicker, Divider} from "antd";
import {connect} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {createEvent, editEvent, getEventbyId} from "../../api";
import {getId, getIdInstitution} from "../../selectors/institutions";
import {getMentors, getMentorships_mentor} from "../../selectors/mentors";
import {fetchEmprendedoresPrograma, fetchEmprendedor, fetchEmprendedoresbyProgram} from "../../actions/fetchUsers";
import {CaretRightFilled} from "@ant-design/icons";
import {fetchTotalEventsUser} from "../../actions/fetchEvents";
import getJsonStrError from "../../helpers/handleJsonErrors";
import {fetchMentorsbymentorship, fetchMentorships} from "../../actions/fetchMentorships";
import RenderMultiselect from "../MultipleSelect/MultiSelect";
import {enquireScreen} from 'enquire-js';
import moment from 'moment'
import PopConfirm from "../PopConfirm/PopConfirm";
import {deleteEvent, deleteEventEntidad} from "../../api/event";
import AllCountryWithTimeZone, {getTimeZone} from "../../helpers/countrys";
const {Option} = Select;
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 6},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};
//load timeZone
const EventEditMentorForm = (props) => {
    let timeZone = getTimeZone()
    let timeZoneLocal = AllCountryWithTimeZone.find( pais => pais.label === timeZone);
    let fecha_inicio_label = `Fecha de inicio ${timeZoneLocal.short}`
    let fecha_fin_label = `Fecha de fin ${timeZoneLocal.short}`

    const [form] = Form.useForm();

    const {mentors, users, closeModal, program_id, mentor,setVisible2, mentorships, event, setVisibleEventInfo} = props;

    const [CrearEvento, setCrearEvento] = useState({})
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState(event?.tipo)
    const [inicio, setInicio] = useState(moment(event?.fecha_inicio, 'YYYY-MM-DD HH:mm'))
    const [fin, setFin] = useState(moment(event?.fecha_fin, 'YYYY-MM-DD HH:mm'))
    const [isMobile, setIsMobile] = useState(false);
    const [idMentoria, setIdMentoria] = useState(event?.mentoria);
    const [flag, setFlag] = useState(false)

    enquireScreen((b) => {
        return () => {
            setIsMobile(b);
        }
    })

    const onClickCambiar = (num) => {
    }

    useEffect(() => {
        const emprendedores = async () => {
            await props.fetchEmprendedoresPrograma(program_id)
        }
        emprendedores()

    }, [program_id]);

    const handleChangeTipo = (value) => {
        setType(value)

    }

    const handleChangeMentoria = (value) => {
        setIdMentoria(value)

    }

    const onFinish = async (values) => {
        setLoading(true)
        values = {...values, mentor:mentor, tema: event.tema}
        if(values.nombre){
            const response = await props.editEvent(values, event.slug, event.id, getJsonStrError, event?.cuenta_zoom)
            if(response && !response.error){
                props.fetchTotalEventsUser()
                setVisible2(false)
            }

        }

        setLoading(false)
    }

    function onChange(value, dateString) {
            setInicio(dateString);
    }

    function onChangeFin(value, dateString) {
            setFin(dateString);
    }

    function onOk(value) {
    }

    useEffect(() => {
        (async()=>{
            await props.fetchMentorships(program_id)
        })()
    }, [program_id]);

    useEffect(() => {
        (async()=>{
            if(idMentoria){
                await props.fetchMentorsbymentorship(idMentoria)
            }

        })()
    }, [idMentoria]);

    useEffect(() => {
        enquireScreen((b) => {
            setIsMobile(
                !!b
            );
        });
    }, [isMobile])

    let date = moment(event?.fecha_inicio).format('YYYY-MM-DD HH:').toString();
    let time = "00";
    let timeAndDate = moment(date + time);

    async function deleteEvent2(id){
       const response = await  props.deleteEventEntidad(id)
         if(response){
                await props.fetchTotalEventsUser()
                setVisible2(false)
                setVisibleEventInfo()
            }
    }


    return (
        <Form id='edit-event-mentor'
              {...formItemLayout}
              form={form}
              name="edit-event-mentor"
              onFinish={onFinish}
              initialValues={{
                  nombre: event?.nombre,
                  mentoria: event?.mentoria,
                  fecha_inicio: moment(event?.fecha_inicio, 'YYYY-MM-DD HH:mm'),
                  fecha_fin: moment(event?.fecha_fin, 'YYYY-MM-DD HH:mm'),
                  mentor: event?.mentor,
                  tipo: event?.tipo,
                  usuario_individual: event?.usuario_individual,
                  sub_grupo: event?.sub_grupo,
                  tema: event?.tema,
                  mentores: event?.mentores,
                  espacio: '0',
                  repeticion: '0'
              }}
              scrollToFirstError
              labelAlign="right"
        >
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col lg={24} md={24} sm={24} xs={24}>
                    <Row>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item name="nombre" label="Nombre" rules={[
                                {
                                    required: true,
                                    message: '¡Por favor agregue el nombre del evento!'
                                }
                            ]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item
                                name="mentoria"
                                label="Tipo de mentoría"
                                rules={[{required: true, message: '¡Por favor seleccione el tipo!'}]}
                            >
                                <Select placeholder="Seleccionar tipo de mentoría..." onChange={handleChangeMentoria}>
                                    {
                                                Array.isArray(mentorships) ?
                                                    mentorships.map(c => (
                                                        <Option
                                                            value={c.id}
                                                            kay={c.id}
                                                        >
                                                            {c.nombre}

                                                        </Option>
                                                    )) :
                                                    <Option value='Cargando información de usuarios...'>
                                                        Este programa no tiene tipos de mentorias aún</Option>
                                            }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item name="fecha_inicio" label={fecha_inicio_label}
                                       rules={[{required: true, message: 'Por favor seleccione la fecha de inicio!'}]}>
                                <DatePicker showTime={{ format: 'HH:mm'}}
                                            format="YYYY-MM-DD HH:mm" minuteStep={30}
                                            value={inicio}
                                            allowClear={false} placeholder='Seleccione fecha'
                                            onChange={onChange} onOk={onOk}/>
                            </Form.Item>
                        </Col>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item name="fecha_fin" label={fecha_fin_label}
                                       rules={[
                                           {required: true, message: 'Por favor seleccione la fecha de finalización!',},
                                       ]}
                            >
                                <DatePicker
                                            showTime={{format: 'HH:mm'}}
                                            format="YYYY-MM-DD HH:mm" minuteStep={30}
                                            allowClear={false} placeholder='Seleccione fecha'
                                            onChange={onChangeFin} onOk={onOk}/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item
                                name="tipo"
                                label="Tipo de sesión"
                                rules={[{required: true, message: '¡Por favor seleccione el tipo!'}]}
                            >
                                <Select placeholder="Seleccionar tipo..." onChange={handleChangeTipo}>
                                    <Select.Option value="">Seleccione tipo</Select.Option>
                                    <Select.Option value="Grupal">Grupal</Select.Option>
                                    <Select.Option value="Individual">Individual</Select.Option>
                                    <Select.Option value="Junta Directiva">Junta Directiva</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        {
                            type === 'Individual' && (

                                <Col lg={24} md={24} sm={24} xs={24}>
                                    <Form.Item
                                        name="usuario_individual"
                                        label='Seleccione Mentee'
                                    >
                                        <Select placeholder="Seleccionar participante...">
                                            {
                                                Array.isArray(users) ?
                                                    users.map(c => (
                                                        <Option
                                                            value={c.id}
                                                            key={c.id}
                                                        >
                                                            {c.email} {c.first_name} {c.last_name}

                                                        </Option>
                                                    )) :
                                                    <Option value='Cargando información de usuarios...'>Cargando
                                                        información de usuarios...</Option>
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                            )}
                        <Col lg={24} md={24} sm={24} xs={24} offset={isMobile ? 0 : 6}>
                            {
                                (type === 'Grupal' || type === 'Junta Directiva') && (
                                    <Form.Item
                                        name="sub_grupo"
                                        label=''
                                    >
                                        <RenderMultiselect data={users}
                                                           placeholder='Seleccione participantes'/>
                                    </Form.Item>
                                )
                            }
                        </Col>
                        <Col lg={24} md={24} sm={24} xs={24} offset={isMobile ? 0 : 6}>
                            {
                                type === 'Grupal' || type === 'Junta Directiva' && (
                                    <Form.Item
                                        name="mentores"

                                    >
                                        <RenderMultiselect placeholder='seleccione mentores'
                                                           data={mentors}
                                        />
                                    </Form.Item>
                                )
                            }
                        </Col>
                    </Row>
                    <Row>

                        {CrearEvento && CrearEvento.opciones && CrearEvento.opciones.warning ?
                            (CrearEvento.opciones.hora1_inicio || CrearEvento.opciones.hora2_inicio) ?
                                <Fragment style={{
                                    backgroundColor: '#01404f',
                                    paddingTop: '1%',
                                    paddingLeft: '2%',
                                    border: 'red',
                                    borderWidth: '1px'
                                }}>
                                    <Row>
                                        <Col>
                                            <p style={{color: 'white', fontFamily: 'ObjectiveLightItalic'}}>
                                                <CaretRightFilled style={{color: 'red'}}/> Las horas
                                                escogidas <strong>NO</strong> están disponibles, te sugerimos los
                                                siguientes
                                                horarios</p>
                                        </Col>
                                    </Row>
                                    {CrearEvento.opciones.hora1_inicio ?
                                        <Row>
                                            <Col>
                                                <p style={{
                                                    color: 'white', fontFamily: 'ObjectiveRegular',
                                                    marginLeft: '1%', marginTop: '1%'
                                                }}
                                                >Opción 1</p>
                                                <Row>
                                                    <Col lg={6} sm={5} style={{display: 'inline'}}>

                                                        <p style={{
                                                            color: 'white', fontFamily: 'ObjectiveLight',
                                                            marginLeft: '3%', marginTop: '1%'
                                                        }}
                                                        ><strong>Fecha</strong> {CrearEvento.opciones.fecha}
                                                        </p>
                                                        <p style={{
                                                            color: 'white', fontFamily: 'ObjectiveLight',
                                                            float: 'left', marginLeft: '3%', marginTop: '1%'
                                                        }}
                                                        >
                                                            <strong>Hora</strong> {CrearEvento.opciones.hora1_inicio} - {CrearEvento.opciones.hora1_fin}
                                                        </p>

                                                    </Col>
                                                    <Col>
                                                        <Button size="sm"
                                                                variant='link'
                                                                onClick={onClickCambiar(1)}
                                                        >Cambiar
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row> :
                                        <span></span>
                                    }
                                    {CrearEvento.opciones.hora2_inicio ?
                                        <Row>
                                            <Col>
                                                <p style={{
                                                    color: 'white', fontFamily: 'ObjectiveRegular',
                                                    marginLeft: '1%', marginTop: '1%'
                                                }}
                                                >Opción 2</p>
                                                <Row>
                                                    <Col lg={6} sm={5} style={{display: 'inline'}}>

                                                        <p style={{
                                                            color: 'white', fontFamily: 'ObjectiveLight',
                                                            marginLeft: '3%', marginTop: '1%'
                                                        }}
                                                        ><strong>Fecha</strong> {CrearEvento.opciones.fecha}
                                                        </p>
                                                        <p style={{
                                                            color: 'white', fontFamily: 'ObjectiveLight',
                                                            float: 'left', marginLeft: '3%', marginTop: '1%'
                                                        }}
                                                        >
                                                            <strong>Hora</strong> {CrearEvento.opciones.hora2_inicio} - {CrearEvento.opciones.hora2_fin}
                                                        </p>

                                                    </Col>
                                                    <Col>
                                                        <Button size="sm"
                                                                variant='link'
                                                                onClick={onClickCambiar(2)}
                                                        >Cambiar
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row> :
                                        <span></span>
                                    }
                                </Fragment>
                                :
                                <Row>
                                    <Col>
                                        <p style={{color: 'white', fontFamily: 'ObjectiveLightItalic'}}>
                                            <CaretRightFilled style={{color: 'red'}}/> No hay horarios disponibles
                                            en la fecha escogida, por favor escoge otra fecha
                                        </p>
                                    </Col>
                                </Row>
                            :
                            <Row></Row>
                        }
                    </Row>
                    <Divider style={{marginTop: '2%', marginBottom: '2%'}}/>
                    <Row justify='end' gutter={[8]}>
                        <Col>
                            <Button form="edit-event-mentor" key='submit' htmlType="submit"
                                    loading={loading} className='btn-verde-basico' onClick={onFinish}>
                                Editar
                            </Button>
                        </Col>
                        <Col>
                            <PopConfirm message={'evento'} type={'primary'}
                                        functionDelete={() => deleteEvent2(event?.slug)}
                                        id={event?.slug} setFlag={setFlag}></PopConfirm>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    )
};

const mapStateToProps = (state, props) => ({
    id_institution: getIdInstitution(state),
    mentors: getMentorships_mentor(state),
    mentors_entidad: getMentors(state),
    users: state.emprendedores_programa.emprendedor,
    mentorships: state.mentorships,
    mentor: getId(state)
});

export default connect(mapStateToProps, {
    editEvent,
    fetchEmprendedor,
    getEventbyId,
    fetchTotalEventsUser,
    getJsonStrError,
    fetchEmprendedoresPrograma,
    fetchMentorsbymentorship,
    fetchMentorships,
    fetchEmprendedoresbyProgram,
    deleteEventEntidad
})((EventEditMentorForm));
