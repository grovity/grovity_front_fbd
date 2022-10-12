import React, {useState, useEffect, useCallback} from 'react'
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {useDropzone} from 'react-dropzone'
import {Camera} from '../../helpers/icons'
import {
    selectCurrentUser,
} from "../../selectors/users";
import {connect} from "react-redux";
import {enquireScreen} from 'enquire-js';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Button,
    Divider,
    InputNumber,
    Tag,
    Modal,
    Space,
} from 'antd';

import {cambioPassword2, editUser, getTags} from "../../api";
import {getUsername} from "../../selectors/institutions";
import {setAlert} from "../../actions/alert";
import {loadUser} from "../../actions/auth";
import {getPaises,setUpGoogleCalendar,setOutlookcalendar,setUpManualCalendar} from "../../api/user";

const ReachableContext = React.createContext();
const UnreachableContext = React.createContext();


const {Option} = Select;

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


const EdicionPerfilMentor = (props) => {
    const {user, setLoading, setVisible, loading} = props
    const [skills, setSkills] = useState(user.skills)
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [isMobile, setIsMobile] = useState(false);
    const [paises, setPaises] = useState([]);
    const [avatarUrl, setAvatarUrl] = useState(user.img_usuario);
    const [avatarFile, setAvatarFile] = useState(null);
    const [tags, setTags] = useState([]);
    const [flag, setFlag] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const _ = require("lodash")

    const [modal, contextHolder] = Modal.useModal();
    const [cambioPass, setCambioPass] = useState(false);

    let skills_format = []
    if (Array.isArray(user.skills)) {
        user.skills.map(skill =>
            skills_format.push({
                description: skill.description,
                tag: skill.tag.id,
                name: skill.tag.name,
            })
        )
    }
    const setGcalendar = async () => {
        setLoading(true);
        await setUpGoogleCalendar();
        setLoading(false);
    }
    const setOutlook = async () => {
        setLoading(true);
        await setOutlookcalendar();
        setLoading(false);
    }
    const setManual = async () => {
        setLoading(true);
        await setUpManualCalendar();
        setLoading(false);
    }

    const onDropAvatar = useCallback(acceptedFile => {
        const file = acceptedFile[0]
        setAvatarUrl(URL.createObjectURL(file))
        setAvatarFile(file)
    })
    const {getRootProps: getRootAvatarProps, getInputProps: getInputBannerProps} = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        multiple: false,
        onDrop: onDropAvatar

    })

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
        const obtainPaises = async () => {
            const listaPaises = await getPaises()
            setPaises(listaPaises)
        }
        obtainPaises()


        const loadUser2 = async () => {
            await loadUser()
            setSkills(user.skills)
        }
        loadUser2()

        const tags = async () => {
            let tagsList = await getTags()
            setTags(tagsList)
        }
        tags()

    }, [isMobile, user, flag2])


    function warning(id) {
        return () => {
            Modal.warning({
                title: '¿Deseas eliminar esta área de experiencia?',
                content: 'Haz click en el botón OK para confirmar',
                onOk() {
                    if (!flag) {
                        skills_format = _.reject(skills_format, function (el) {
                            return el.tag === id;
                        });
                        setSkills(() => (skills_format))
                        setFlag(true)
                    } else {
                        skills_format = skills
                        skills_format = _.reject(skills_format, function (el) {
                            return el.tag === id;
                        });
                        setSkills(() => (skills_format))

                    }


                },
                maskClosable: true,
            });
        }
    }

    const onFinish = async (values) => {
        if (Array.isArray(values.skills)) {
            let skills_total = [...skills, ...values.skills]
            values.skills = skills_total
        } else if (Array.isArray(skills) && !values.skills) {
            let skills_total = [...skills]
            values.skills = skills_total
        }
        setLoading(true);
        setFlag(false)
        let payload = await props.editUser(values, props.username, props.setAlert, avatarFile)
        if (payload) {
            setLoading(false);
            setVisible(false);
            setFlag2(true)
            form.resetFields()
        } else {
            setLoading(false);
        }

    };

    const onFinish2 = async values => {
        setLoading2(true);
        let payload = await props.cambioPassword2(values)
        setCambioPass(false);
        if (payload) {
            setLoading2(false);
            setVisible(false);
            setFlag2(true)
        } else {
            setLoading(false);
        }
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{width: 70}}>
                <Option value="57">+57</Option>
                <Option value="52">+52</Option>
            </Select>
        </Form.Item>
    );


    return (
        <>
            <Form id='edicion-perfil-mentor'
                  {...formItemLayout}
                  form={form}
                  name="edicion-perfil-mentor"
                  onFinish={onFinish}
                  initialValues={{
                      first_name: user.first_name,
                      last_name: user.last_name,
                      email: user.email,
                      titulo: user.titulo,
                      telefono: user.telefono,
                      descripcion: user.descripcion,
                      linkedin: user.linkedin,
                      twitter: user.twitter,
                      instagram: user.instagram,
                      precio: user.precio,
                      reside: user.reside,
                      img_usuario: user.img_usuario,
                  }}
                  scrollToFirstError
                  labelAlign="right"
            >
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24}>
                                <h4>Información básica</h4>
                                <div
                                    className='avatar mb-5'
                                    style={{backgroundImage: `url('${avatarUrl}')`}}
                                    {...getRootAvatarProps()}>
                                    <input {...getInputBannerProps()}/>
                                    <Camera></Camera>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={11} md={11} sm={24} xs={24}>
                                <Form.Item name="first_name" label="Nombre" rules={[{required: true, message: 'Por favor escriba su nombre!'}]}>
                                    <Input/>
                                </Form.Item>
                                <Form.Item name="last_name" label="Apellido" validateTrigger='onBlur' rules={[{required: true, message: 'Por favor escriba su apellido!'}]}>
                                    <Input/>
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    label="E-mail"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'E-mail invalido!',
                                        },
                                        {
                                            required: true,
                                            message: 'Por favor ingrese su E-mail!',
                                        },
                                    ]}
                                >
                                    <Input/>
                                </Form.Item>

                            </Col>
                            <Col lg={11} md={11} sm={24} xs={24}>
                                <Form.Item
                                    name="reside"
                                    label="Ubicación"
                                    rules={[
                                        {type: 'string', required: true, message: 'Por favor seleccione su ubicación!'},
                                    ]}
                                >
                                    <Select placeholder="Seleccionar...">
                                        {

                                            Array.isArray(paises) && (
                                                paises.map(r =>
                                                    <Option value={r.name}>
                                                        {r.name}
                                                    </Option>
                                                ))

                                        }
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="telefono"
                                    label="Teléfono"
                                    rules={[{required: true, message: 'Por favor ingrese su numero de telefono!'}]}
                                >
                                    <Input addonBefore={prefixSelector} style={{width: '100%'}}/>
                                </Form.Item>
                                {/*<Form.Item*/}
                                {/*    name="confirm"*/}
                                {/*    label="Confirmar Contraseña"*/}
                                {/*    dependencies={['password']}*/}
                                {/*    hasFeedback*/}
                                {/*    rules={[*/}
                                {/*        {*/}
                                {/*            required: true,*/}
                                {/*            message: 'Por favor confirma tu contraseña!',*/}
                                {/*        },*/}
                                {/*        ({getFieldValue}) => ({*/}
                                {/*            validator(rule, value) {*/}
                                {/*                if (!value || getFieldValue('password') === value) {*/}
                                {/*                    return Promise.resolve();*/}
                                {/*                }*/}
                                {/*                return Promise.reject('Las contraseñas no son iguales!');*/}
                                {/*            },*/}
                                {/*        }),*/}
                                {/*    ]}*/}
                                {/*>*/}
                                {/*    <Input.Password/>*/}
                                {/*</Form.Item>*/}
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={11} md={11} sm={24} xs={24}>
                                <Form.Item name="titulo" label="Cargo actual" rules={[{
                                    type: "string",
                                    required: true,
                                    message: 'Por favor ingrese su cargo actual!'
                                }]}>
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col lg={11} md={11} sm={24} xs={24}>
                                <Form.Item name="descripcion" label="Acerca de mí">
                                    <Input.TextArea/>
                                </Form.Item>
                            </Col>
                        </Row>
                        
                        <Row className='row-button-right'>
                          <Button loading={loading} className='btn-verde-basico' onClick={setGcalendar}>
                              Sync Google Calendar
                          </Button>
                          <Button loading={loading} className='btn-verde-basico' onClick={setOutlook}>
                              Sync Outlook
                          </Button>
                          <Button loading={loading} className='btn-verde-basico' onClick={setManual}>
                              Sync Manual
                          </Button>
                        </Row>
                        <Divider className='divider-sections'/>
                        <Row>
                            <h4>Redes</h4>
                        </Row>
                        <Row>
                            <Col lg={11} md={11} sm={24} xs={24}>
                                <Form.Item name="linkedin" label="Url LinkedIn" rules={[{
                                    type: "string",
                                    required: true,
                                    message: 'Por favor ingrese su perfil de Linkedin'
                                }]}>
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col lg={11} md={11} sm={24} xs={24}>
                                <Form.Item name="twitter" label=" Url Twitter" rules={[{required: false}]}>
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col lg={11} md={11} sm={24} xs={24}>
                                <Form.Item name="instagram" label="Url Instagram" rules={[{required: false}]}>
                                    <Input/>
                                </Form.Item>
                            </Col>

                        </Row>
                        <Divider className='divider-sections'/>
                        <Row>
                            <h4>Áreas de experticia</h4>
                        </Row>
                        <Row>
                            <Col style={{marginBottom: '3%'}}>
                                <p>Áreas de experticia actuales: </p>
                                {
                                    Array.isArray(skills) && (
                                        skills.map(skill =>
                                            <ReachableContext.Provider value="Light">
                                                <Space>
                                                    <Tag color="volcano">
                                                        <li style={{cursor: 'pointer'}}
                                                            onClick={warning(skill.tag.id ? skill.tag.id : skill.tag)}>• {skill.tag.name ? skill.tag.name : skill.name}</li>
                                                    </Tag>
                                                </Space>
                                                {contextHolder}
                                                <UnreachableContext.Provider value="Bamboo"/>
                                            </ReachableContext.Provider>
                                        )
                                    )
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24}>
                                <Form.List name="skills">
                                    {(fields, {add, remove}) => (
                                        <>
                                            {fields.map(field => (
                                                //<Space key={field.key} style={{display: 'flex', marginBottom: 8}}
                                                //align="baseline">
                                                <Row style={{marginBottom: 8, width: '100%'}}>
                                                    <Col lg={11} md={11} sm={24} xs={24}>
                                                        <Form.Item
                                                            {...field}
                                                            label="Área"
                                                            validateTrigger={['onChange', 'onBlur']}
                                                            name={[field.name, 'tag']}
                                                            fieldKey={[field.fieldKey, 'tag']}
                                                            rules={[{
                                                                required: true,
                                                                message: 'Falta área de experiencia'
                                                            }]}
                                                        >
                                                            <Select placeholder="Seleccionar...">
                                                                {
                                                                    Array.isArray(tags) && (
                                                                        tags.map(tag =>
                                                                            <Option value={tag.id}>
                                                                                {tag.name}
                                                                            </Option>
                                                                        ))
                                                                }
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col lg={11} md={11} sm={24} xs={24}>
                                                        <Form.Item
                                                            {...field}
                                                            label="Descripción"
                                                            name={[field.name, 'description']}
                                                            fieldKey={[field.fieldKey, 'description']}
                                                            rules={[{required: true, message: 'Falta la descripción'}]}
                                                        >
                                                            <Input.TextArea/>
                                                        </Form.Item>
                                                    </Col>

                                                    <Col lg={2} md={2} sm={2} xs={2} style={{marginLeft: '2%'}}>
                                                        <MinusCircleOutlined onClick={() => remove(field.name)}/>
                                                    </Col>
                                                    <Divider className='divider-items'/>
                                                </Row>
                                                //</Space>
                                            ))}
                                            <Form.Item>
                                                <Button type="dashed" onClick={() => add()} block
                                                        icon={<PlusOutlined/>}>
                                                    Añadir área de experticia
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Col>
                        </Row>

                        <Divider className='divider-sections'/>
                        {/*<Row>*/}
                        {/*    <h4>Experiencia Laboral</h4>*/}
                        {/*</Row>*/}
                        {/*<Row>*/}
                        {/*    <Col lg={24} md={24} sm={24} xs={24}>*/}
                        {/*        <Form.List name="experiencia">*/}
                        {/*            {(fields, {add, remove}) => (*/}
                        {/*                <>*/}
                        {/*                    {fields.map(field => (*/}
                        {/*                        <Row key={field.key} style={{marginBottom: 8, width: '100%'}}>*/}
                        {/*                            <Col lg={24} md={24} sm={24} xs={24}>*/}
                        {/*                                <Row>*/}
                        {/*                                    <Col lg={11} md={11} sm={24} xs={24}>*/}
                        {/*                                        <Form.Item*/}
                        {/*                                            {...field}*/}
                        {/*                                            name={[field.name, 'nombre-empresa']}*/}
                        {/*                                            fieldKey={[field.fieldKey, 'nombre-empresa']}*/}
                        {/*                                            hasFeedback*/}
                        {/*                                            label="Nombre Empresa"*/}
                        {/*                                            rules={[{*/}
                        {/*                                                required: false,*/}
                        {/*                                                message: 'Por favor escriba el nombre de la empresa!'*/}
                        {/*                                            }]}*/}
                        {/*                                        >*/}
                        {/*                                            <Input/>*/}
                        {/*                                        </Form.Item>*/}
                        {/*                                    </Col>*/}
                        {/*                                    <Col lg={10} md={11} sm={22} xs={22}>*/}
                        {/*                                        <Form.Item*/}
                        {/*                                            {...field}*/}
                        {/*                                            name={[field.name, 'cargo']}*/}
                        {/*                                            fieldKey={[field.fieldKey, 'cargo']}*/}
                        {/*                                            label="Cargo"*/}
                        {/*                                            rules={[{required: false, message: 'Falta cargo'}]}*/}
                        {/*                                        >*/}
                        {/*                                            <Input/>*/}
                        {/*                                        </Form.Item>*/}
                        {/*                                    </Col>*/}
                        {/*                                    <Col lg={2} md={2} sm={2} xs={2} style={{marginLeft: '2%'}}>*/}
                        {/*                                        <MinusCircleOutlined onClick={() => remove(field.name)}/>*/}
                        {/*                                    </Col>*/}
                        {/*                                </Row>*/}
                        {/*                                <Row>*/}
                        {/*                                    <Col lg={11} md={212} sm={24} xs={24}>*/}
                        {/*                                        <Form.Item label="Período" style={{marginBottom: 0}}>*/}
                        {/*                                            <Form.Item*/}
                        {/*                                                style={{*/}
                        {/*                                                    display: 'inline-block',*/}
                        {/*                                                    width: 'calc(50% - 12px)'*/}
                        {/*                                                }}*/}
                        {/*                                            >*/}
                        {/*                                                <DatePicker picker="month"/>*/}
                        {/*                                            </Form.Item>*/}
                        {/*                                            <span*/}
                        {/*                                                style={{*/}
                        {/*                                                    display: 'inline-block',*/}
                        {/*                                                    width: '24px',*/}
                        {/*                                                    lineHeight: '32px',*/}
                        {/*                                                    textAlign: 'center'*/}
                        {/*                                                }}*/}
                        {/*                                            >*/}
                        {/*                                        -*/}
                        {/*                                    </span>*/}
                        {/*                                            <Form.Item style={{*/}
                        {/*                                                display: 'inline-block',*/}
                        {/*                                                width: 'calc(50% - 12px)'*/}
                        {/*                                            }}>*/}
                        {/*                                                <DatePicker picker="month"/>*/}
                        {/*                                            </Form.Item>*/}
                        {/*                                        </Form.Item>*/}
                        {/*                                    </Col>*/}
                        {/*                                </Row>*/}
                        {/*                                <Row>*/}
                        {/*                                    <Col lg={11} md={22} sm={24} xs={24}>*/}
                        {/*                                        <Form.Item*/}
                        {/*                                            {...field}*/}
                        {/*                                            name={[field.name, 'descripcion-experiencia']}*/}
                        {/*                                            fieldKey={[field.fieldKey, 'descripcion-experiencia']}*/}
                        {/*                                            label="Descripción"*/}
                        {/*                                            rules={[{*/}
                        {/*                                                required: false,*/}
                        {/*                                                message: 'Falta la descripción'*/}
                        {/*                                            }]}*/}
                        {/*                                        >*/}
                        {/*                                            <Input.TextArea/>*/}
                        {/*                                        </Form.Item>*/}
                        {/*                                    </Col>*/}
                        {/*                                    <Divider className='divider-items'/>*/}
                        {/*                                </Row>*/}
                        {/*                            </Col>*/}
                        {/*                        </Row>*/}
                        {/*                    ))}*/}
                        {/*                    <Form.Item>*/}
                        {/*                        <Button type="dashed" className='add-btn' onClick={() => add()} block*/}
                        {/*                                icon={<PlusOutlined/>}>*/}
                        {/*                            Añadir Ítem*/}
                        {/*                        </Button>*/}
                        {/*                    </Form.Item>*/}
                        {/*                </>*/}
                        {/*            )}*/}
                        {/*        </Form.List>*/}
                        {/*    </Col>*/}
                        {/*</Row>*/}
                        {/*<Divider className='divider-sections'/>*/}
                        {/*<Row>*/}
                        {/*    <h4>Educación</h4>*/}
                        {/*</Row>*/}
                        {/*<Row>*/}
                        {/*    <Col lg={24} md={24} sm={24} xs={24}>*/}
                        {/*        <Form.List name="educacion">*/}
                        {/*            {(fields, {add, remove}) => (*/}
                        {/*                <>*/}
                        {/*                    {fields.map(field => (*/}
                        {/*                        <Row key={field.key} style={{marginBottom: 8, width: '100%'}}>*/}
                        {/*                            <Col lg={24} md={24} sm={24} xs={24}>*/}
                        {/*                                <Row>*/}
                        {/*                                    <Col lg={11} md={11} sm={24} xs={24}>*/}
                        {/*                                        <Form.Item*/}
                        {/*                                            {...field}*/}
                        {/*                                            name={[field.name, 'titulo']}*/}
                        {/*                                            fieldKey={[field.fieldKey, 'titulo']}*/}
                        {/*                                            hasFeedback*/}
                        {/*                                            label="Título"*/}
                        {/*                                            rules={[{*/}
                        {/*                                                required: false,*/}
                        {/*                                                message: 'Por favor escriba el nombre de tu título!'*/}
                        {/*                                            }]}*/}
                        {/*                                        >*/}
                        {/*                                            <Input/>*/}
                        {/*                                        </Form.Item>*/}
                        {/*                                    </Col>*/}
                        {/*                                    <Col lg={10} md={11} sm={22} xs={22}>*/}
                        {/*                                        <Form.Item*/}
                        {/*                                            {...field}*/}
                        {/*                                            name={[field.name, 'nombre-institucion']}*/}
                        {/*                                            fieldKey={[field.fieldKey, 'nombre-institucion']}*/}
                        {/*                                            label="Institución"*/}
                        {/*                                            rules={[{*/}
                        {/*                                                required: false,*/}
                        {/*                                                message: 'Falta el nombre de la institución'*/}
                        {/*                                            }]}*/}
                        {/*                                        >*/}
                        {/*                                            <Input/>*/}
                        {/*                                        </Form.Item>*/}
                        {/*                                    </Col>*/}
                        {/*                                    <Col lg={2} md={2} sm={2} xs={2} style={{marginLeft: '2%'}}>*/}
                        {/*                                        <MinusCircleOutlined onClick={() => remove(field.name)}/>*/}
                        {/*                                    </Col>*/}
                        {/*                                </Row>*/}
                        {/*                                <Row>*/}
                        {/*                                    <Col lg={11} md={10} sm={24} xs={24}>*/}
                        {/*                                        <Form.Item*/}
                        {/*                                            {...field}*/}
                        {/*                                            name={[field.name, 'descripcion-educacion']}*/}
                        {/*                                            fieldKey={[field.fieldKey, 'descripcion-educacion']}*/}
                        {/*                                            label="Descripción"*/}
                        {/*                                            rules={[{*/}
                        {/*                                                required: false,*/}
                        {/*                                                message: 'Falta la descripción'*/}
                        {/*                                            }]}*/}
                        {/*                                        >*/}
                        {/*                                            <Input.TextArea/>*/}
                        {/*                                        </Form.Item>*/}
                        {/*                                    </Col>*/}
                        {/*                                    <Col lg={10} md={11} sm={24} xs={24}>*/}
                        {/*                                        <Form.Item*/}
                        {/*                                            label="Graduación"*/}
                        {/*                                        >*/}
                        {/*                                            <DatePicker picker="month"/>*/}
                        {/*                                        </Form.Item>*/}
                        {/*                                    </Col>*/}
                        {/*                                    <Divider className='divider-items'/>*/}
                        {/*                                </Row>*/}
                        {/*                            </Col>*/}
                        {/*                        </Row>*/}
                        {/*                    ))}*/}
                        {/*                    <Form.Item>*/}
                        {/*                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>*/}
                        {/*                            Añadir Ítem*/}
                        {/*                        </Button>*/}
                        {/*                    </Form.Item>*/}
                        {/*                </>*/}
                        {/*            )}*/}
                        {/*        </Form.List>*/}
                        {/*    </Col>*/}
                        {/*</Row>*/}
                        {/*<Divider className='divider-sections'/>*/}
                        <Row>
                            <h4>Precio por hora</h4>
                        </Row>
                        <Row>
                            <Col lg={11} md={11} sm={24} xs={24}>
                                {/*    <Form.Item*/}
                                {/*        name={['duracion']}*/}
                                {/*        hasFeedback*/}
                                {/*        label="Duración"*/}
                                {/*        rules={[{required: false, message: 'Por favor seleccione el área!'}]}*/}
                                {/*    >*/}
                                {/*        <Select mode="multiple" placeholder="Seleccionar...">*/}
                                {/*            <Option value="hora">1 hora</Option>*/}
                                {/*            <Option value="media-hora">30 minutos</Option>*/}
                                {/*            <Option value="cuarto-hora">15 minutos</Option>*/}
                                {/*        </Select>*/}
                                {/*    </Form.Item>*/}
                                <Form.Item name="precio" label="Precio por hora"
                                           rules={[{required: true, message: 'Por favor ingrese el valor por hora!'}]}>
                                    <InputNumber/>
                                </Form.Item>
                            </Col>
                            <Col lg={11} md={11} sm={24} xs={24}>
                                <Form.Item
                                    name="password"
                                    label="Contraseña"
                                    autoComplete={'off'}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Por favor ingrese su contraseña!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className='row-button-right'>
                    <Button form="edicion-perfil-mentor" key='submit' htmlType="submit"
                            loading={loading} className='btn-verde-basico' >
                        Editar
                    </Button>
                </Row>
            </Form>
            <Row>

                {cambioPass ?
                    <>
                        <Divider/>
                        <Form {...formItemLayout}
                              form={form2}
                              name="cambio-contrasena"
                              onFinish={onFinish2}
                              initialValues={{
                                  password2: '',
                                  new_password: '',
                                  new_password_confirm: ''
                              }}
                              scrollToFirstError
                              labelAlign="right"
                        >
                            <Col lg={24} md={18} sm={24} xs={24}>
                                <h4>Cambiar contraseña</h4>
                            </Col>

                            <Row>
                                <Col lg={11} md={11} sm={24} xs={24}>

                                    <Form.Item
                                        name="password2"
                                        label="Contraseña Actual"
                                        type="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Por favor ingrese su contraseña actual!',
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input.Password
                                            placeholder="Por favor ingrese su contraseña actual"/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row className={'password-change2'}>
                                <Col lg={11} md={11} sm={24} xs={24}>
                                    <Form.Item
                                        name="new_password"
                                        type="password"
                                        label="Contraseña nueva"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Por favor ingrese su nueva contraseña!',
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input.Password
                                            placeholder="Por favor ingrese su nueva contraseña"/>
                                    </Form.Item>
                                </Col>
                                <Col lg={11} md={11} sm={24} xs={24}>
                                    <Form.Item
                                        name="new_password_confirm"
                                        label="Confirme contraseña"
                                        type="password"
                                        dependencies={['new_password']}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Por favor confirme su nueva contraseña!',
                                            },
                                            ({getFieldValue}) => ({
                                                validator(rule, value) {
                                                    if (!value || getFieldValue('new_password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject('Las contraseñas no coinciden!');
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password
                                            placeholder="Por favor confirme su nueva contraseña"/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row className='row-button-right'>
                                <Button form="cambio-contrasena" key='submit' htmlType="submit" type="primary"
                                        className='btn-verde-basico' >
                                    Cambiar Contraseña
                                </Button>
                            </Row>
                        </Form>
                    </>
                    :
                    <Col lg={11} md={18} sm={24} xs={24} offset={12}>
                        <Button onClick={() => setCambioPass(true)} type='link'>Cambiar contraseña</Button>
                    </Col>
                }
            </Row>
        </>
    );
};

const mapStateToProps = (state) => ({
    user: selectCurrentUser(state),
    username: getUsername(state)
});

export default connect(mapStateToProps, {
    cambioPassword2,
    setAlert,
    editUser
})(EdicionPerfilMentor)