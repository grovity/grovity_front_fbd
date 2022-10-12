import {setPropsAsInitial} from '../../helpers/setPropsAsInitial';
import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import {getet, getIdInstitution} from "../../selectors/institutions";
import {fetchEmprendedor} from '../../actions/fetchUsers'
import 'react-widgets/dist/css/react-widgets.css'
import {
    Form,
    Input,
    Row,
    Col,
    Button,
} from 'antd';
import {inviteEmprendedor} from "../../api";


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


const InvitaEmprendedor = (props) => {
    const {loading, setLoading, setVisible, onCancel, id_institution, et} = props
    const [form] = Form.useForm();

    const onSubmit = async (values) => {
        setLoading(true)
        let payload = await props.inviteEmprendedor(values)
        if (payload) {
            await props.fetchEmprendedor(id_institution)
            setVisible(false)

        }
        setLoading(false)
    };

    return (
        <Form id='invitar-emprendedor'
              {...formItemLayout}
              form={form}
              name="invitar-emprendedor"
              onFinish={onSubmit}
              initialValues={{
                  first_name: '',
                  last_name: '',
                  emprendedor: '',
              }}
              scrollToFirstError
              labelAlign="right"
        >
            <Row justify='center'>
                <Col lg={24} md={24} sm={24} xs={24}>
                    <Row justify='space-between'>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item name="first_name" label={`Nombre del ${et}`} rules={[{
                                type: "string",
                                required: true,
                                message: 'Por favor ingrese el nombre del emprendedor!'
                            }]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item name="last_name" label={`Apellido del ${et}`} rules={[{
                                type: "string",
                                required: true,
                                message: 'Por favor ingrese el apellido del emprendedor!'
                            }]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify='space-between'>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item name="emprendedor" label={`Email del ${et}`} validateTrigger='onBlur' rules={[
                                {
                                    type: "email",
                                    required: true,
                                    message: 'Por favor ingrese un email válido!',
                                }
                            ]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify='end' gutter={[8]}>
                        <Col>
                            <Button form="invitar-emprendedor" key='submit' htmlType="submit"
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
    )
};

InvitaEmprendedor.propTypes = {};

const mapStateToProps = (state, props) => ({
    id_institution: getIdInstitution(state),
    et: getet(state).split('-')[0],
});

export default connect(mapStateToProps, {
    fetchEmprendedor,
    inviteEmprendedor

})(setPropsAsInitial(InvitaEmprendedor));