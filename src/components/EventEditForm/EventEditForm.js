import React, {Fragment, useEffect, useState} from "react";
import {Row, Col, Form, Button, Select, Input, DatePicker, Divider} from "antd";
import {connect} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {editEvent, getEventbyId} from "../../api";
import {getIdInstitution, getet} from "../../selectors/institutions";
import {getMentors, getMentorships_mentor} from "../../selectors/mentors";
import {fetchEmprendedoresPrograma, fetchEmprendedor} from "../../actions/fetchUsers";
import {CaretRightFilled} from "@ant-design/icons";
import {fetchTotalEventsUser} from "../../actions/fetchEvents";
import getJsonStrError from "../../helpers/handleJsonErrors";
import {fetchMentorsbymentorship} from "../../actions/fetchMentorships";
import RenderMultiselect from "../MultipleSelect/MultiSelect";
import {enquireScreen} from 'enquire-js';
import moment from 'moment'
import PopConfirm from "../PopConfirm/PopConfirm";
import {deleteEventEntidad} from "../../api/event";
import {selectMentorsEntidad} from "../../selectors/users";

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

const EventEditForm= (props) => {
    const [form] = Form.useForm();

    const {mentors, users, idMentoria, id_institution, mentors_entidad,
        setVisibleEdit, event, et, setVisibleEventInfo} = props;
    const [CrearEvento, setCrearEvento] = useState({})
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState(event?.tipo)
    const [inicio, setInicio] = useState(null)
    const [fin, setFin] = useState(null)
    const [isMobile, setIsMobile] = useState(false);
    const [flag, setFlag] = useState(false)

    enquireScreen((b) => {
        return () => {
            setIsMobile(b);
        }
    })

    const onClickCambiar = (num) => {
    }

    useEffect(() => {
        if (idMentoria) {
            props.fetchMentorsbymentorship(idMentoria)
        }

    }, [idMentoria]);

    useEffect(()=>{
        (async()=>{
            await props.fetchEmprendedoresPrograma(event?.programa)
        })()
    }, [event?.programa])



    const handleChangeTipo = (value) => {
        setType(value)

    }
    const onFinish = async (values) => {
        setLoading(true)
        if(values.nombre){
            const values2 = {...values, mentoria:event.mentoria, tema: event.tema}
            const response = await props.editEvent(values2,
                event?.slug, event?.id, getJsonStrError, event?.cuenta_zoom)
            if(response && !response.error){
                props.fetchTotalEventsUser()
                setVisibleEdit(false)
            }

        }

        setLoading(false)
    }

    function onChange(value, dateString) {
        setInicio(dateString)

    }

    function onChangeFin(value, dateString) {
        setFin(dateString)
    }

    function onOk(value) {
        //console.log('onOk: ', value);
    }

    useEffect(() => {
        // fetchMentors(id_institution)
    }, [id_institution]);



    useEffect(() => {
        enquireScreen((b) => {
            setIsMobile(
                !!b
            );
        });
    }, [isMobile])

    async function deleteEvent2(id){
       const response = await  props.deleteEventEntidad(id)
         if(response){
                props.fetchTotalEventsUser()
               setVisibleEdit(false)
                setVisibleEventInfo()

            }
    }

    return (
        <Form id='editar-evento-entidad'
              {...formItemLayout}
              form={form}
              name="editar-evento-entidad"
              onFinish={onFinish}
              initialValues={{
                  nombre: event?.nombre,
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
                    <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item name="fecha_inicio" label="Fecha inicio"
                                       rules={[{required: true, message: 'Por favor seleccione la fecha de inicio!'}]}>
                                <DatePicker showTime={{format: 'HH:mm'}}
                                            format="YYYY-MM-DD HH:mm" minuteStep={30}
                                            allowClear={false} placeholder='Seleccione fecha'
                                            onChange={onChange} onOk={onOk}/>
                            </Form.Item>
                        </Col>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item name="fecha_fin" label="Fecha fin"
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
                                name="mentor"
                                label="Mentor"
                                rules={[{required: true, message: '¡Por favor seleccione el mentor!'}]}
                            >
                                <Select placeholder="Seleccionar...">
                                    <Option value=''>Seleccione mentor</Option>
                                    {
                                        Array.isArray(mentors) ?
                                            mentors.map((c, i) => (
                                                <Option
                                                    value={c.id}
                                                    key={i}
                                                >
                                                     {c.first_name} {c.last_name} {c.email}

                                                </Option>
                                            )) :
                                            <Option value='Cargando información de mentores...'>Cargando información de
                                                mentores...</Option>
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
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
                                        label={`Seleccione ${et.toLowerCase()}`}
                                    >
                                        <Select placeholder="Seleccionar participante...">
                                            {
                                                Array.isArray(users) ?
                                                    users.map(c => (
                                                        <Option
                                                            value={c.id}
                                                        >
                                                            {c.first_name} {c.last_name} {c.email}

                                                        </Option>
                                                    )) :
                                                    <Option value='Cargando información de usuarios...'>Cargando
                                                        información de usuarios...</Option>
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                            )}
                        <Col lg={24} md={24} sm={24} xs={24} style={{marginLeft:'0%'}} offset={isMobile ? 0 : 6}>
                            {
                                (type === 'Grupal' || type === 'Junta Directiva') && (
                                    <Form.Item
                                        name="sub_grupo"
                                        label='Seleccione Mentees'
                                    >
                                        <RenderMultiselect data={users}
                                                           placeholder='Seleccione participantes'/>
                                    </Form.Item>
                                )
                            }
                        </Col>
                        <Col lg={24} md={24} sm={24} xs={24} style={{marginLeft:'0%'}} offset={isMobile ? 0 : 6}>
                            {
                                type === 'Grupal' || type === 'Junta Directiva' && (
                                    <Form.Item
                                        name="mentores"
                                        label='Seleccione Mentores'

                                    >
                                        <RenderMultiselect placeholder='seleccione mentores'
                                                           data={mentors_entidad}
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
                            <Button form="editar-evento-entidad" key='submit' htmlType="submit"
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
    mentors_entidad: selectMentorsEntidad(state),
    users: state.emprendedores_programa.emprendedor,
    idMentoria: state.event_id[0]?.mentoria,
    et: getet(state).split('-')[0],
});

export default connect(mapStateToProps, {
    editEvent,
    fetchEmprendedor,
    getEventbyId,
    fetchTotalEventsUser,
    getJsonStrError,
    fetchEmprendedoresPrograma,
    fetchMentorsbymentorship,
    deleteEventEntidad
})((EventEditForm));