import React, {useState, useEffect} from 'react'
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {
    getStatusMentor,
    selectCurrentUser,
} from "../../selectors/users";
import {connect} from "react-redux";
import {enquireScreen} from 'enquire-js';
import {
    Form,
    Input,
    Row,
    Col,
    Button,
    Divider,
    DatePicker,

} from 'antd';
import {Link} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import {URL_BASE} from "../../constants";
import RenderMultiselect from "../MultipleSelect/MultiSelect";
import {getId} from "../../selectors/institutions";
import AddActivityFromAct from "../AddActivityFromAct/AddActivityFromAct";
import {toast} from "react-toastify";
import moment from "moment";
import getJsonStrError from "../../helpers/handleJsonErrors";
import NombreActividadEvento from "../NombreActividadEvento/NombreActividadEvento";
import {
    convertUtcToTimeZone,
    convertTimeZoneToUtc,
    colTimeZonetoOtherTimeZone,
    TimeZonetoColTimeZone,
  } from "../../helpers/timeZone";
import AllCountryWithTimeZone, {getTimeZone} from "../../helpers/countrys";

const colors = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
    'magenta',
    'red',
    'volcano',
    'orange'

]


const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};

const dateFormat = 'YYYY/MM/DD HH:mm';

const ActaFormEdit = (
    {
        users, event, id_user, status,
        acta_info, setVisible, setActaInfo, actividadesActa, setActividadesActa,
        idsAsistentes
    }) => {
    const {put, get} = useFetch(URL_BASE)
    const [form] = Form.useForm();
    const [isMobile, setIsMobile] = useState(false);


    const [loading, setLoading] = useState(false);

    let timeZone = getTimeZone()
    timeZone  = AllCountryWithTimeZone.find( pais => pais.label === timeZone);
    enquireScreen((b) => {
        return () => {
            setIsMobile(b);
        }
    })

    useEffect(() => {
        enquireScreen((b) => {
            setIsMobile(
                !!b
            );
        });
    }, [isMobile])


    const onFinish = async (values) => {
        setLoading(true);
        if (values.summary) {
            // TimeZonetoColTimeZone(values.start, timeZone.value)
            let fecha_i = values.start_date.format('YYYY-MM-DD HH:mm')
            let fecha_f = values.end_date.format('YYYY-MM-DD HH:mm')
            const values2 = {
                ...values, event: event?.id, creator: id_user,
                start_date:  TimeZonetoColTimeZone(fecha_i, timeZone.value), end_date: TimeZonetoColTimeZone(fecha_f, timeZone.value)
            }
            const response = await put(`/acts/acts/${event?.act}/`, values2)
            if (response) {
                if (response.error) {
                    let error = getJsonStrError(response.error)
                    toast.error(error)
                } else {
                    toast.success('Acta editada correctamente')
                    const response2 = await get(`/acts/acts/${event?.act}/`)
                    if (response2) {
                        setActaInfo(response2)
                    }
                }

                setVisible(false)
            }
        }

        setLoading(false);
    };

    function onOk(value) {

    }

    function onChange(value, dateString) {

    }


    return (
        <>
            <Form id={`acta-edit-form-${event?.id}`}
                  {...formItemLayout}
                  form={form}
                  name={`acta-edit-form-${event?.id}`}
                  onFinish={onFinish}
                  initialValues={{
                      assistants: idsAsistentes,
                      summary: acta_info?.summary,
                  
                               
                      start_date: moment(colTimeZonetoOtherTimeZone(acta_info?.start_date,timeZone.value), dateFormat),
                      end_date: moment(colTimeZonetoOtherTimeZone(acta_info?.end_date, timeZone.value), dateFormat),
                  }}
                  scrollToFirstError
                  labelAlign="right"
            >
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24}>
                                <Form.Item name='assistants' label="Asistentes" rules={[{
                                    required: true,
                                    message: 'Por favor seleccione al menos un asistente'
                                }]}>
                                    <RenderMultiselect mensaje={'Selecciona los participantes que asistieron'}
                                                       placeholder='Seleccione los participantes que asistieron'
                                                       data={users}
                                                       value2={Array.isArray(acta_info.assistants) ? acta_info.assistants.map(c =>
                                                           c.id
                                                       ) : []}
                                    />
                                </Form.Item>
                            </Col>
                            <Col lg={24} md={24} sm={24} xs={24}>
                                <Form.Item name='summary' label="Resumen de la sesión" rules={[{
                                    required: true,
                                    message: 'Por favor ingrese el resumen de la reunión'
                                }]}>
                                    <Input.TextArea/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24}>
                                <Form.Item name="start_date" label="Fecha inicio"
                                           rules={[{
                                               required: true,
                                               message: 'Por favor seleccione la fecha de inicio!'
                                           }]}>
                                    <DatePicker showTime={{format: 'HH:mm'}}
                                                format="YYYY-MM-DD HH:mm"
                                                onChange={onChange} onOk={onOk}/>
                                </Form.Item>
                            </Col>
                            <Col lg={24} md={24} sm={24} xs={24}>
                                <Form.Item name="end_date" label="Fecha fin"
                                           rules={[
                                               {
                                                   required: true,
                                                   message: 'Por favor seleccione la fecha de finalización!',
                                               },
                                           ]}
                                >
                                    <DatePicker showTime={{format: 'HH:mm'}}
                                                format="YYYY-MM-DD HH:mm"
                                                onChange={onChange} onOk={onOk}/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row justify='end' gutter={[12, 12]} style={{marginBottom: '0%'}}>
                            <Col>
                                <Button form={`acta-edit-form-${event?.id}`} key='submit' htmlType="submit"
                                        type="primary"
                                        className='btn-verde-basico' loading={loading}
                                >
                                    Editar Acta
                                </Button>
                            </Col>
                            {/*<Col>*/}
                            {/*    <PopConfirm message={'acta'} type={'primary'}*/}
                            {/*        // functionDelete={() => deleteEquipo(team?.username)}*/}
                            {/*        // id={team?.username}*/}
                            {/*    ></PopConfirm>*/}
                            {/*</Col>*/}
                        </Row>

                        <Divider className='divider-sections'/>
                        {
                            event.workplan ?

                                <AddActivityFromAct id_program={event?.programa}
                                                    id_plan={event?.workplan}
                                                    id_mentor={event?.mentor}
                                                    id_user={id_user}
                                                    status={status}
                                                    acta_id={event?.act}
                                                    actividadesActa={actividadesActa}
                                                    setActividadesActa={setActividadesActa}
                                                    acta_info={acta_info}
                                                    event={event}
                                                    setActaInfo={setActaInfo}/> :
                                <>

                                    {
                                        status ?
                                            <></>
                                            :
                                            <>
                                                <span>Para crear actividades debe crear un plan de trabajo</span>
                                                <Link to={`/programs/programs/${event?.programa}`}>
                                                    <p style={{color: 'var(--primary-color)'}}>Crear plan de trabajo</p>
                                                </Link>
                                            </>

                                    }
                                </>
                        }

                        {
                            status && (
                                <>
                                    <Row>Actividades: </Row><br/>
                                    <Row className='mb-4'>
                                        {
                                            Array.isArray(actividadesActa) && (
                                                actividadesActa.map(function (activity) {
                                                    return (
                                                        <Col key={activity.id}>

                                                            <NombreActividadEvento
                                                                setActaInfo={setActaInfo}
                                                                setActividadesActa={setActividadesActa}
                                                                activity={activity}
                                                                event={event}
                                                                acta={true}
                                                                acta_info={acta_info}
                                                                colors={colors}
                                                            />
                                                        </Col>
                                                    )
                                                })
                                            )
                                        }
                                    </Row>
                                </>
                            )
                        }
                    </Col>
                </Row>
            </Form>
        </>

    );
};

const mapStateToProps = (state, props) => ({
    user: selectCurrentUser(state),
    id_user: getId(state),
    status: getStatusMentor(state)
});

export default connect(mapStateToProps, null)(ActaFormEdit)