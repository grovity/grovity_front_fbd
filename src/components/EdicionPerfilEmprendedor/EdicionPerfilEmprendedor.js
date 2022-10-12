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
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Button,
    Divider,
} from 'antd';

import {setAlert} from "../../actions/alert";
import {cambioPassword2, editUser} from "../../api";


const {Option} = Select;


const residences = [
    {
        value: 'argentina',
        label: 'Argentina',
    },
    {
        value: 'bolivia',
        label: 'Bolivia',
    },
    {
        value: 'brasil',
        label: 'Brasil',
    },
    {
        value: 'chile',
        label: 'Chile',
    },
    {
        value: 'colombia',
        label: 'Colombia',
    },
    {
        value: 'costa rica',
        label: 'Costa Rica',
    },
    {
        value: 'cuba',
        label: 'Cuba',
    },
    {
        value: 'ecuador',
        label: 'Ecuador',
    },
    {
        value: 'mexico',
        label: 'Mexico',
    },
    {
        value: 'peru',
        label: 'Perú',
    },
    {
        value: 'uruguay',
        label: 'Uruguay',
    },
    {
        value: 'venezuela',
        label: 'Venezuela',
    },
    {
        value: 'otro',
        label: 'Otro',
    },
];

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


const EdicionPerfilEmprendedor = (props) => {
    const {user, setVisible, loading, setLoading} = props
    const [form] = Form.useForm();
    const [form2] = Form.useForm();

    const [isMobile, setIsMobile] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(user.img_usuario);
    const [avatarFile, setAvatarFile] = useState(null);
    const [cambioPass, setCambioPass] = useState(false);
    const [loading2, setLoading2] = useState(false);

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
    }, [isMobile])


    const onFinish = async values => {
        setLoading(true)
        const response = await props.editUser(values, props.user.username, props.setAlert, avatarFile)
        if (response) {
            setVisible(false)
        }
        setLoading(false)
    };

    const onFinish2 = async values => {
        setLoading2(true)
        const response = await props.cambioPassword2(values)
        if (response) {
            setVisible(false);
        }
        setLoading2(false)
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
            <Form id='edicion-perfil-emprendedor'
                  {...formItemLayout}
                  form={form}
                  name="edicion-perfil-mentor"
                  onFinish={onFinish}
                  initialValues={{
                      first_name: user.first_name,
                      last_name: user.last_name,
                      email: '',
                      titulo: user.titulo,
                      telefono: '',
                      descripcion: user.descripcion,
                      linkedin: user.linkedin,
                      twitter: user.twitter,
                      precio: user.precio,
                      reside: user.reside,
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
                            <Col lg={11} md={18} sm={24} xs={24}>
                                <Form.Item name="first_name" label="Nombre" rules={[{required: true, message: 'Por favor escriba su nombre!'}]}>
                                    <Input/>
                                </Form.Item>
                                <Form.Item name="last_name" label="Apellido" rules={[{required: true, message: 'Por favor escriba su apellido!'}]}>
                                    <Input/>
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    label="E-mail"
                                    validateTrigger='onBlur'
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'E-mail invalido!',
                                        },
                                        {
                                            required: true,
                                            message: 'Por favor escriba un e-mail!',
                                        },
                                    ]}
                                >
                                    <Input placeholder={user.email}/>
                                </Form.Item>
                            </Col>
                            <Col lg={11} md={18} sm={24} xs={24}>
                                <Form.Item
                                    name="reside"
                                    label="Ubicación"
                                    rules={[
                                        {type: 'string', required: true, message: 'Por favor seleccione su ubicación!'},
                                    ]}
                                >
                                    <Select placeholder="Seleccionar...">
                                        {

                                            Array.isArray(residences) && (
                                                residences.map(r =>
                                                    <Option value={r.value} key={r}>
                                                        {r.label}
                                                    </Option>
                                                ))
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="telefono"
                                    label="Teléfono"
                                >
                                    <Input placeholder={user?.telefono} addonBefore={prefixSelector} style={{width: '100%'}}/>
                                </Form.Item>
                                <Form.Item name='descripcion' label="Acerca de mí">
                                    <Input.TextArea
                                        placeholder="Cuentele a la comunidad quién es"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={11} md={18} sm={24} xs={24}>
                                <Form.Item name='titulo' label="Cargo actual" rules={[{required: false}]}>
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col lg={11} md={18} sm={24} xs={24}>

                                <Form.Item
                                    name="password"
                                    label="Contraseña"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Por favor ingrese su contraseña!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password
                                        placeholder="Por favor ingrese su contraseña actual"/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className='row-button-right'>
                    <Button form="edicion-perfil-emprendedor" key='submit' htmlType="submit"
                            loading={loading} className='btn-verde-basico'>
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
                              id="cambio-contrasena"
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
                                <Col lg={11} md={18} sm={24} xs={24}>

                                    <Form.Item
                                        name="password2"
                                        label="Contraseña actual"
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
                            <Row>
                                <Col lg={11} md={18} sm={24} xs={24}>
                                    <Form.Item
                                        name="new_password"
                                        label="Contraseña nueva"
                                        type="password"
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
                                <Col lg={11} md={18} sm={24} xs={24}>
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
                                <Button form="cambio-contrasena" key='submit' htmlType="submit"
                                        loading={loading2} className='btn-verde-basico'>
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

const mapStateToProps = (state, props) => ({
    user: selectCurrentUser(state)
});

export default connect(mapStateToProps, {
    cambioPassword2,
    setAlert,
    editUser
})(EdicionPerfilEmprendedor)