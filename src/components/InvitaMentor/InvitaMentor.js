import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux'
import {getIdInstitution, getmt} from "../../selectors/institutions";
import 'react-widgets/dist/css/react-widgets.css'
import {
    Form,
    Input,
    Row,
    Col,
    Button,
} from 'antd';
import {inviteEmprendedor, inviteMentor} from "../../api";
import {fetchMentors} from "../../actions/fetchMentors";
import {loadUser} from "../../actions/auth";


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


const InvitaMentor = (props) => {
    const {onCancel, loading, setLoading, setVisible, id_institution} = props
    const [form] = Form.useForm();

    const onSubmit = async (values) => {
        setLoading(true)
        let payload = await props.inviteMentor(values)
        if (payload) {
            await props.fetchMentors(id_institution)
            setVisible(false)
        }
        setLoading(false)
    };

    return (
        <Form id='invitar-mentor'
              {...formItemLayout}
              form={form}
              name="invitar-mentor"
              onFinish={onSubmit}
              initialValues={{
                  first_name: '',
                  last_name: '',
                  mentor: '',
              }}
              scrollToFirstError
              labelAlign="right"
        >
            <Row justify='center'>
                <Col lg={24} md={24} sm={24} xs={24}>
                    <Row justify='space-between'>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item name="first_name" label="Nombre del mentor" rules={[{
                                type: "string",
                                required: true,
                                message: 'Por favor ingrese el nombre del mentor!'
                            }]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item name="last_name" label="Apellido del mentor" rules={[{
                                type: "string",
                                required: true,
                                message: 'Por favor ingrese el apellido del mentor!'
                            }]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify='space-between'>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item name="mentor" label="Email del mentor" validateTrigger='onBlur' rules={[{
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
                            <Button form="invitar-mentor" key='submit' htmlType="submit"
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

InvitaMentor.propTypes = {
    email: PropTypes.string,
    id: PropTypes.string,
};

const mapStateToProps = (state, props) => ({
    id_institution: getIdInstitution(state),
    mt: getmt(state).split('-')[0],

});

export default connect(mapStateToProps, {
    inviteMentor,
    fetchMentors,
    loadUser
})(InvitaMentor);