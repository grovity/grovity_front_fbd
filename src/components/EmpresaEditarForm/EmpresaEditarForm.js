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

    InputNumber,

} from 'antd';
import {setAlert} from "../../actions/alert";

import {fetchEmpresaEmprendedor, fetchIndicadoresSectores, fetchInfoEmpresa} from "../../actions/fetchUsers";
import {editEmpresaEmprendedor2, getEmpresaEmprendedorEdit} from "../../api/user";

import {getId} from "../../selectors/institutions";
import {deleteEmpresaEmprendedor} from "../../api/empresa";



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


const EmpresaEditarForm = (props) => {
    const { sectores, empresa, id_empresa, setVisible, setLoading} = props;
    const [form] = Form.useForm();

    const [isMobile, setIsMobile] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(empresa.image);
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

    const onFinish = async values => {
          setLoading(true)
        const response = await props.editEmpresaEmprendedor2(values, avatarFile, id_empresa)
        if (response) {
            await props.fetchEmpresaEmprendedor(id_empresa)
            setVisible(false)
        }
        setLoading(false)
    };

    useEffect(() => {
        enquireScreen((b) => {
            setIsMobile(
                !!b
            );
        });

    }, [isMobile]);

    useEffect(() => {
        props.fetchIndicadoresSectores()
    }, []);



    return (
        <Form id='edicion-perfil-empresa'
              {...formItemLayout}
              form={form}
              name="edicion-perfil-empresa"
              onFinish={onFinish}
              initialValues={{
                  name: empresa?.name,
                  sector: empresa?.sector,
                  goal: empresa?.goal,
                  n_employees: empresa?.n_employees

              }}
              scrollToFirstError
              labelAlign="right"

        >
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col lg={24} md={24} sm={24} xs={24}>
                    <Row>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <h4>Información de la Empresa</h4>
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
                        <Col lg={11} md={11} sm={24} xs={24}>
                            <Form.Item name="sector"
                                       label="Sector"
                                       rules={[
                                           {required: true, message: 'Por favor seleccione el sector!'},
                                       ]}>
                                <Select placeholder="Selecciona el sector al que pertenece tu empresa">
                                    {
                                        Array.isArray(sectores) && (
                                            sectores.map(r =>
                                                <Option value={r} key={r}>
                                                    {r}
                                                </Option>
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
        </Form>
    );
};



const mapStateToProps = (state, props) => ({
    user: selectCurrentUser(state),
    sectores: state.sectores,
    id: getId(state)

});

export default connect(mapStateToProps, {
        fetchIndicadoresSectores,
        getEmpresaEmprendedorEdit,
        fetchInfoEmpresa,
        setAlert,
    editEmpresaEmprendedor2,
    fetchEmpresaEmprendedor,
    deleteEmpresaEmprendedor
    }
)(EmpresaEditarForm);