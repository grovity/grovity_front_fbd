import React, {useState, useEffect, useCallback} from 'react'
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {useDropzone} from 'react-dropzone'
import {Camera} from '../../helpers/icons'
import {
    selectCurrentUser, selectIdEmpresa,
} from "../../selectors/users";
import {connect} from "react-redux";
import {enquireScreen} from 'enquire-js';
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    InputNumber,
} from 'antd';

import {setAlert} from "../../actions/alert";
import {fetchEmpresaEmprendedor, fetchIndicadoresSectores} from "../../actions/fetchUsers";
import {createEmpresaEmprendedor} from "../../api/user";
import {getId} from "../../selectors/institutions";
import {loadUser} from "../../actions/auth";


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


const EmpresaCreateFormAnt = (props) => {
    const {user, setVisible, setLoading, sectores, id, id_empresa} = props
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


    const onFinish = async values => {
        setLoading(true)
        const response = await props.createEmpresaEmprendedor(values, avatarFile, id)
        if (response) {
            props.loadUser()
            if(id_empresa){
                 await props.fetchEmpresaEmprendedor(id_empresa)
            }
            setVisible(false)
        }
        setLoading(false)
    };

    useEffect(() => {
        props.fetchIndicadoresSectores()
    }, []);


    return (
        <>
            <Form id='crear-empresa-mentor'
                  {...formItemLayout}
                  form={form}
                  name="crear-empresa-mentor"
                  onFinish={onFinish}
                  initialValues={{
                      name: "",
                      n_employees: "",
                      sector: '',
                      goal: "",
                  }}
                  scrollToFirstError
                  labelAlign="right"
            >
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24}>
                                <h4>Información de la empresa</h4>
                                <div title={'Agregar logo de la empresa'}
                                    className='avatar mb-5'
                                    style={{backgroundImage: `url('${avatarUrl}')`}}
                                    {...getRootAvatarProps()}>
                                    <input {...getInputBannerProps()} />
                                    <Camera></Camera>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={11} md={18} sm={24} xs={24}>
                                <Form.Item name="name" label="Nombre empresa" rules={[{
                                    required: true,
                                    message: 'Por favor ingresa el nombre de la empresa!'
                                }]}>
                                    <Input/>
                                </Form.Item>
                                <Form.Item name="n_employees" label="# de trabajadores" rules={[
                                    {
                                        type: 'number',
                                        min: 0,
                                        message: 'Debe ser un número'
                                    },
                                    {

                                        required: true,
                                        message: 'Por favor ingresa el número de trabajadores!'
                                    }
                                ]}>
                                    <InputNumber/>
                                </Form.Item>
                            </Col>
                            <Col lg={11} md={18} sm={24} xs={24}>
                                <Form.Item
                                    name="sector"
                                    label="Sector"
                                    rules={[
                                        {required: true, message: 'Por favor seleccione el sector!'},
                                    ]}
                                >
                                    <Select placeholder="Seleccionar...">
                                        {

                                            Array.isArray(sectores) && (
                                                sectores.map(c =>
                                                    <Select.Option value={c} key={c}>
                                                        {c}
                                                    </Select.Option>
                                                ))
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item name='goal' label="Barreras" id='label-meta'
                                           rules={[
                                        {required: true, message: 'Por favor incluye tus barreras para crecer'},
                                    ]}

                                 >
                                    <Input.TextArea id='meta'
                                        placeholder="Describe las principales barreras que tiene tu empresa para crecer"/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                 <Row className='row-button-right'>
                </Row>
            </Form>

        </>
    );
};

const mapStateToProps = (state, props) => ({
    user: selectCurrentUser(state),
    sectores: state.sectores,
    id: getId(state),
    id_empresa: selectIdEmpresa(state),
});

export default connect(mapStateToProps, {
    setAlert,
    fetchIndicadoresSectores,
    createEmpresaEmprendedor,
    fetchEmpresaEmprendedor,
    loadUser
})(EmpresaCreateFormAnt)