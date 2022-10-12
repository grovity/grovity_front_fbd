import React, {useEffect, useState, useCallback} from 'react';
import {setPropsAsInitial} from '../../helpers/setPropsAsInitial';
import {connect} from 'react-redux'

import {getet, getIdInstitution} from "../../selectors/institutions";
import {fetchEmprendedor} from '../../actions/fetchUsers'

import 'react-widgets/dist/css/react-widgets.css'
import {loadUser} from "../../actions/auth";
import {
    Form,
    Input,
    Row,
    Col,
    Button,
} from 'antd';
import {useDropzone} from 'react-dropzone'
import {Camera} from '../../helpers/icons'
import {enquireScreen} from 'enquire-js';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';

import RenderMultiselect from "../MultipleSelect/MultiSelect";
import {createProgram} from "../../api";
import {fetchPrograms_entidad} from "../../actions/fetchPrograms";



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


function ProgramRegister(props) {
    const {onCancel, setLoading, setVisible, loading, funcionarios_emprendedores, id_entidad, et_plural} = props

    const [form] = Form.useForm();
    const [isMobile, setIsMobile] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState();
    const [avatarFile, setAvatarFile] = useState(null);
    const [listaFuncionarios, setFuncionarios] = useState([]);

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


    const onSubmit = async values => {
        setLoading(true);
        if(values.nombre){
            const response = await props.createProgram(values, avatarFile)
            if(response){
                await props.fetchPrograms_entidad(id_entidad)
            setVisible(false);
        }
        }

        setLoading(false);

    };


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


    return (

        <>
            <Form id='crear-programa'
                  {...formItemLayout}
                  form={form}
                  name="crear-programa"
                  onFinish={onSubmit}
                  initialValues={{
                      nombre: '',
                      descripcion: '',
                      emprendedor: '',
                      funcionario: '',
                  }}
                  scrollToFirstError
                  labelAlign="right"
            >
                <Row justify='center'>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <Row justify='center'>
                            <Col lg={24} md={24} sm={24} xs={24}>
                                <h4>Información del programa</h4>
                                <div
                                    className='avatar mb-5'
                                    style={{backgroundImage: `url('${avatarUrl}')`}}
                                    {...getRootAvatarProps()}>
                                    <input {...getInputBannerProps()}/>
                                    <Camera></Camera>
                                </div>
                            </Col>
                        </Row>
                        <Row justify='space-between'>
                            <Col lg={20} md={20} sm={24} xs={24}>
                                <Form.Item name="nombre" label="Nombre" rules={[{
                                    type: "string",
                                    required: true,
                                    message: 'Por favor ingrese el nombre del programa!'
                                }]}>
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col lg={20} md={20} sm={24} xs={24}>
                                <Form.Item name="descripcion" label="Descripción">
                                    <Input.TextArea/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify='center'>
                            <Col xl={20} lg={20} md={24} sm={24} xs={24} offset={9}>
                                <p>Selecciona los {et_plural.toLowerCase()}</p>
                                <Form.Item
                                    name="emprendedor"
                                    label=""
                                >
                                    <RenderMultiselect data={funcionarios_emprendedores && funcionarios_emprendedores.emprendedor}
                                    />
                                </Form.Item>
                                <p>Selecciona los funcionarios</p>

                                <Form.Item
                                    name="funcionario"
                                    label=""
                                >

                                     <RenderMultiselect data={funcionarios_emprendedores && funcionarios_emprendedores.funcionario}
                                                                         onChange={e => setFuncionarios(e)}/>
                                </Form.Item>

                            </Col>
                        </Row>
                        <Row justify='end' gutter={[8]}>
                            <Col>
                                <Button form="crear-programa" key='submit' htmlType="submit"

                                        loading={loading} className='btn-verde-basico' onClick={onSubmit} >

                                    Crear
                                </Button>
                            </Col>
                            <Col>
                                 <Button form="crear-programa" danger type='primary'
                                        onClick={onCancel} className='btn-danger-basico'>
                                    Cancelar
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </>
    )
};

ProgramRegister.propTypes = {};



const mapStateToProps = (state, props) => ({
    id_institution: getIdInstitution(state),
    funcionarios_emprendedores: state.funcionarios_emprendedores,
    id_entidad: getIdInstitution(state),
    et_plural: getet(state).replace('-', ''),
});

export default connect(mapStateToProps, {
    fetchEmprendedor,
    fetchPrograms_entidad,
    loadUser,
    createProgram

})(ProgramRegister);

