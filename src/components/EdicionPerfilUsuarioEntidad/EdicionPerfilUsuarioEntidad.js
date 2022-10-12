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
    AutoComplete,
    Divider,
} from 'antd';

const {TextArea} = Input;

const {Option} = Select;
const AutoCompleteOption = AutoComplete.Option;


const residences = [
    {
        value: 'colombia',
        label: 'Colombia',
        children: [
            {
                value: 'bogota',
                label: 'Bogota',
            },
            {
                value: 'medellin',
                label: 'Medellin',
            },
            {
                value: 'cali',
                label: 'Cali',
            },
        ],
    },
    {
        value: 'mexico',
        label: 'Mexico',
        children: [
            {
                value: 'ciudad-de-mexico',
                label: 'Ciudad de Mexico',
            },
            {
                value: 'puebla',
                label: 'Puebla',
            },
            {
                value: 'guadalajara',
                label: 'Guadalajara',
            },
        ],
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


const EdicionPerfilUsuarioEntidad = (props) => {
    const [form] = Form.useForm();

    const [isMobile, setIsMobile] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);

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


    const onFinish = values => {
       
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
        <Form id='edicion-perfil-usuario-entidad'
              {...formItemLayout}
              form={form}
              name="edicion-perfil-usuario-entidad"
              onFinish={onFinish}
              initialValues={{
                  residence: ['colombia'],
                  prefix: '57',
              }}
              scrollToFirstError
              labelAlign="right"
        >
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col lg={24} md={24} sm={24} xs={24}>
                    <Row>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <h4>Información personal</h4>
                            <div
                                className='avatar mb-5'
                                style={{backgroundImage: `url('${avatarUrl}')`}}
                                {...getRootAvatarProps()}>
                                <input {...getInputBannerProps()}/>
                                <Camera/>
                            </div>
                        </Col>
                    </Row>  
                    <Row>
                        <Col lg={11} md={11} sm={24} xs={24}>
                            <Form.Item name={['user', 'name']} label="Nombre" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={11} sm={24} xs={24}>
                            <Form.Item name={['user', 'lastname']} label="Apellido" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={11} sm={24} xs={24}>
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
                                name="phone"
                                label="Teléfono"
                                rules={[{required: true, message: 'Por favor ingrese su numero de telefono!'}]}
                            >
                                <Input addonBefore={prefixSelector} style={{width: '100%'}}/>
                            </Form.Item>
                        </Col>
                      
                        <Col lg={11} md={11} sm={24} xs={24}>
                            <Form.Item name={['user', 'cargo']} label="Cargo Actual" rules={[{required: false}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={11} sm={24} xs={24}>
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
                                <Input.Password/>
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={11} sm={24} xs={24}>
                            <Form.Item
                                name="confirm"
                                label="Confirmar Contraseña"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor confirma tu contraseña!',
                                    },
                                    ({getFieldValue}) => ({
                                        validator(rule, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('Las contraseñas no son iguales!');
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider className='divider-sections'/>
                </Col>
            </Row>
        </Form>
    );
};

const mapStateToProps = (state, props) => ({
    user: selectCurrentUser(state)
});

export default connect(mapStateToProps, null)(EdicionPerfilUsuarioEntidad)