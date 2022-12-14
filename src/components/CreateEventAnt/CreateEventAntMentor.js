import React, {Fragment, useEffect, useState} from "react";
import {Row, Col, Form, Button, Select, Input, DatePicker, Divider} from "antd";
import {connect} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {createEvent, getEventbyId} from "../../api";
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

const CreateEventAntMentor = (props) => {
    const [form] = Form.useForm();

    const {mentors, users, onCancel, program_id, mentor,setVisible, total_mentorias_mentor } = props;
    const [CrearEvento, setCrearEvento] = useState({})
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState(null)
    const [inicio, setInicio] = useState(null)
    const [fin, setFin] = useState(null)
    const [isMobile, setIsMobile] = useState(false);
    const [idMentoria, setIdMentoria] = useState(null);
    const [mentorships, setMentorships] = useState([])

    enquireScreen((b) => {
        return () => {
            setIsMobile(b);
        }
    })

    const onClickCambiar = (num) => {
    }

    useEffect(()=>{
        if(Array.isArray(total_mentorias_mentor[0])){
            const mentorshipsProgram = total_mentorias_mentor[0].filter(m => m.programa == program_id)
            setMentorships(mentorshipsProgram)
        }

    },[program_id])

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
        values = {...values, mentor:mentor}
        if(values.nombre){
            const response = await props.createEvent(values, values.mentoria)
            if(response && !response.error){
                props.fetchTotalEventsUser()
                setVisible(false)
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

    let date = moment().format('YYYY/MM/DD HH:').toString();
    let time = "00";
    let timeAndDate = moment(date + time);


    return (
        <Form id='crear-evento-mentor'
              {...formItemLayout}
              form={form}
              name="crear-evento-mentor"
              onFinish={onFinish}
              initialValues={{
                  nombre: "",
                  mentoria: "",
                  fecha_inicio: timeAndDate,
                  fecha_fin: timeAndDate,
                  mentor: "",
                  tipo: "",
                  usuario_individual: "",
                  sub_grupo: "",
                  tema: '',
                  mentores: '',
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
                                    message: '??Por favor agregue el nombre del evento!'
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
                                label="Tipo de mentor??a"
                                rules={[{required: true, message: '??Por favor seleccione el tipo!'}]}
                            >
                                <Select placeholder="Seleccionar tipo de mentor??a..." onChange={handleChangeMentoria}>
                                    {
                                                Array.isArray(mentorships) ?
                                                    mentorships.map(c => (
                                                        <Option
                                                            value={c.id}
                                                        >
                                                            {c.nombre}

                                                        </Option>
                                                    )) :
                                                    <Option value='Cargando informaci??n de usuarios...'>
                                                        Este programa no tiene tipos de mentorias a??n</Option>
                                            }
                                </Select>
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
                                           {required: true, message: 'Por favor seleccione la fecha de finalizaci??n!',},
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
                                label="Tipo de sesi??n"
                                rules={[{required: true, message: '??Por favor seleccione el tipo!'}]}
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
                                                        >
                                                            {c.email} {c.first_name} {c.last_name}

                                                        </Option>
                                                    )) :
                                                    <Option value='Cargando informaci??n de usuarios...'>Cargando
                                                        informaci??n de usuarios...</Option>
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
                                                escogidas <strong>NO</strong> est??n disponibles, te sugerimos los
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
                                                >Opci??n 1</p>
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
                                                >Opci??n 2</p>
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
                    {/*<Row>*/}
                    {/*    <Col lg={24} md={24} sm={24} xs={24}>*/}
                    {/*        <Form.Item*/}
                    {/*            name="espacio"*/}
                    {/*            label="Se repite"*/}
                    {/*            rules={[{required: true, message: 'Por favor seleccione la frecuencia!'}]}*/}
                    {/*        >*/}
                    {/*            <Select placeholder="Seleccionar repetici??n...">*/}
                    {/*                <Option value="0">No se repite</Option>*/}
                    {/*                <Option value='1'>Diario</Option>*/}
                    {/*                <Option value='7'>Semanal</Option>*/}
                    {/*                <Option value="30">Mensual</Option>*/}
                    {/*            </Select>*/}
                    {/*        </Form.Item>*/}
                    {/*    </Col>*/}
                    {/*    <Col lg={24} md={24} sm={24} xs={24}>*/}
                    {/*        <Form.Item*/}
                    {/*            label="# de repeticiones"*/}
                    {/*            name="repeticion"*/}
                    {/*        >*/}
                    {/*            <InputNumber/>*/}
                    {/*        </Form.Item>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                    <Divider style={{marginTop: '2%', marginBottom: '2%'}}/>
                    <Row justify='end' gutter={[8]}>
                        <Col>
                            <Button form="crear-evento-mentor" key='submit' htmlType="submit"
                                    loading={loading} className='btn-verde-basico' onClick={onFinish}>
                                Crear
                            </Button>
                        </Col>
                        <Col>
                            <Button danger type='primary' onClick={onCancel} className='btn-danger-basico'>
                                Cancelar
                            </Button>
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
    mentor: getId(state),
    total_mentorias_mentor: state.mentorships_mentor,
});

export default connect(mapStateToProps, {
    createEvent,
    fetchEmprendedor,
    getEventbyId,
    fetchTotalEventsUser,
    getJsonStrError,
    fetchEmprendedoresPrograma,
    fetchMentorsbymentorship,
    fetchMentorships,
    fetchEmprendedoresbyProgram
})((CreateEventAntMentor));