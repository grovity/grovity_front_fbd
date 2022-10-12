import {setPropsAsInitial} from '../../helpers/setPropsAsInitial';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux'
import {getIdInstitution} from "../../selectors/institutions";
import {fetchEmprendedor, fetchFuncionarios} from '../../actions/fetchUsers'
import 'react-widgets/dist/css/react-widgets.css'
import {
    Form,
    Input,
    Row,
    Col,
    Button,
} from 'antd';
import {inviteFuncionario} from "../../api";


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


const InvitaFuncionario = (props) => {
    const {loading, onCancel, setLoading, setVisible, id_institution} = props
    const [form] = Form.useForm();

    const onSubmit = async (values) => {
        setLoading(true)
        let payload = await props.inviteFuncionario(values)
        if (payload) {
            await props.fetchFuncionarios(id_institution)
            setVisible(false)

        }
        setLoading(false)
    };

    return (
        <>
         <Form id='invitar-funcionario'
                {...formItemLayout}
                form={form}
                name="invitar-funcionario"
                onFinish={onSubmit}
                initialValues={{
                    first_name: '',
                    last_name: '',
                    funcionario:'',
                }}
                scrollToFirstError
                labelAlign="right"
            >
            <Row justify='center'>
                <Col lg={24} md={24} sm={24} xs={24}>
                    <Row justify='space-between'>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item name="first_name" label="Nombre del funcionario" rules={[{
                                type: "string",
                                required: true,
                                message: 'Por favor ingrese el nombre del funcionario!'
                            }]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item name="last_name" label="Apellido del funcionario" rules={[{
                                type: "string",
                                required: true,
                                message: 'Por favor ingrese el apellido del funcionario!'
                            }]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify='space-between'>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item name="funcionario" label="Email del funcionario" validateTrigger='onBlur' rules={[{
                                type: "email",
                                required: true,
                                message: 'Por favor ingrese un email válido!'
                            }]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify='end' gutter={[8]}>
                        <Col>
                            <Button form="invitar-funcionario" key='submit' htmlType="submit"
                                    loading={loading} className='btn-verde-basico'>
                                Invitar
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
        </>
    )
};

InvitaFuncionario.propTypes = {
    id: PropTypes.string,
    fetchFuncionarioEmpren: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({
    id_institution: getIdInstitution(state),
    funcionarios_emprendedores: state.funcionarios_emprendedores
});

export default connect(mapStateToProps,
    {
        fetchFuncionarios,
        inviteFuncionario
    })(setPropsAsInitial(InvitaFuncionario));