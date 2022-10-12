import React, {useState, useEffect} from 'react'
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {connect} from "react-redux";
import {enquireScreen} from 'enquire-js';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {
    Form,
    Input,
    Row,
    Col,
    Button,
    Divider,
} from 'antd';

import {fetchEmpresaEmprendedor, fetchInfoEmpresa} from "../../actions/fetchUsers";
import {editEmpresaEmprendedor, getEmpresaEmprendedorEdit} from "../../api/user";
import {addEquipo} from "../../api/empresa";
import {selectIdEmpresa} from "../../selectors/users";


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


const AddEmployeesForm = (props) => {
    const {empresa, current_user, id_empresa, setLoading, setVisible} = props;
    const [form] = Form.useForm();

    const [isMobile, setIsMobile] = useState(false);
    const [formData, setFormData] = useState(initialFormValue(empresa));


    enquireScreen((b) => {
        return () => {
            setIsMobile(b);
        }
    })

    const onFinish = async formData => {
        setLoading(true)
        const response = await props.addEquipo(formData?.equipo[0], id_empresa)
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


    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };


    return (
        <Form id='edicion-equipo-empresa'
              {...formItemLayout}
              form={form}
              name="edicion-equipo-empresa"
              onFinish={onFinish}
              initialValues={formData}
              scrollToFirstError
              labelAlign="right"
              onChange={onChange}
        >
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col lg={24} md={24} sm={24} xs={24}>
                    <Row>
                        <h4>Integrantes del Equipo</h4>
                    </Row>
                    <Divider className='divider-sections'/>
                    <Row>
                        <Col style={{marginBottom: '3%'}} lg={24} md={24} sm={24} xs={24}>
                            <p>Agrega un nuevo integrante a tu equipo</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.List name="equipo">
                                {(fields, {add, remove}) => (
                                    <>
                                        {fields.map((field, i) => (
                                            <Row style={{marginBottom: 8, width: '100%'}}>
                                                <Col lg={11} md={11} sm={24} xs={24}>
                                                    <Form.Item  {...field} label="Nombre"
                                                                name={[field.name, 'first_name']}
                                                                rules={[{required: true, message: 'Falta el nombre'}]}
                                                                fieldKey={[field.fieldKey, 'first_name']}>
                                                        <Input placeholder="Nombre"/>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col lg={11} md={11} sm={24} xs={24}>
                                                    <Form.Item  {...field} label="Apellido"
                                                                rules={[{required: true, message: 'Falta el apellido'}]}
                                                                name={[field.name, 'last_name']}
                                                                fieldKey={[field.fieldKey, 'last_name']}>
                                                        <Input placeholder="Apellido"/>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col lg={11} md={11} sm={24} xs={24}>
                                                    <Form.Item
                                                        {...field}
                                                        label="Email miembro"
                                                        name={[field.name, 'email']}
                                                        fieldKey={[field.fieldKey, 'email']}
                                                        rules={[{required: true, message: 'Falta email'}]}
                                                    >
                                                        <Input placeholder="Email"/>
                                                    </Form.Item>
                                                </Col>

                                                <Col lg={2} md={2} sm={2} xs={2} style={{marginLeft: '2%'}}>
                                                    <MinusCircleOutlined onClick={() => remove(field.name)}/>
                                                </Col>
                                                <Divider className='divider-items'/>
                                            </Row>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                                Añadir Integrante
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    );
};

function initialFormValue(props) {

}

const mapStateToProps = (state) => ({
    empresa: state.empresa_emprendedor_info,
    id: state.empresa_emprendedor.id,
    id_empresa: selectIdEmpresa(state),
});

export default connect(mapStateToProps, {
        editEmpresaEmprendedor,
        getEmpresaEmprendedorEdit,
        fetchInfoEmpresa,
        addEquipo,
    fetchEmpresaEmprendedor
    }
)(AddEmployeesForm);