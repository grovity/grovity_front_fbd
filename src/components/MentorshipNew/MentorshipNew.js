import {setPropsAsInitial} from '../../helpers/setPropsAsInitial';
import PropTypes from 'prop-types';
import React, {useEffect , useState} from 'react';
import {connect} from 'react-redux'
import {getIdInstitution} from "../../selectors/institutions";
import {fetchMentors, fetchMentorsbyEntidad} from "../../actions/fetchMentors";
import RenderMultiselect from "../MultipleSelect/MultiSelect";
import {Row, Col, Button, Form, Input, Select} from 'antd'
import {tipos} from "../../helpers/tiposHerramientas";
import {createMentorship, getMentors} from "../../api";
import {withRouter} from "react-router-dom";
import {toast} from "react-toastify";
import {fetchMentorships} from "../../actions/fetchMentorships";
import {selectMentorsEntidad} from "../../selectors/users";
import EventCreateFastInput from "../EventCreateFastInput/EventCreateFastInput";
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

const MentorshipNew = (props) => {
    const {id_institution, mentores, loading, onCancel, setLoading, setVisible} = props
    const [mentoresSend , setMentoresSend] = useState([]);
    const [form] = Form.useForm();

    function handleChange(value) {
        // console.log(`selected ${value}`);
    }

    useEffect(() => {
        (async()=> {
            await props.fetchMentorsbyEntidad(id_institution)
        })()
    }, [id_institution]);

    const onSubmit = async values => {
        setLoading(true);
        values.mentor = mentoresSend;
        if (values.mentor) {
            const response = await props.createMentorship(values, props.match.params.id)
            if (response) {
                await props.fetchMentorships(props.match.params.id)
                setVisible(false);
            }
        } else {
            toast.error('Por favor seleccione al menos un mentor')
        }

        setLoading(false);

    };

    return (
        <Form id='crear-herramienta'
              {...formItemLayout}
              form={form}
              name="crear-herramienta"
              onFinish={onSubmit}
              initialValues={{
                  nombre: '',
                  mentor: [],
                  tipo: 'Mentoría',
                  descripcion: '',
              }}
              scrollToFirstError
              labelAlign="right"
        >
            <Row justify='center'>
                <Col lg={24} md={24} sm={24} xs={24}>
                    <Row justify='space-between'>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item name="nombre" label="Nombre" rules={[{
                                type: "string",
                                required: true,
                                message: 'Por favor ingrese el nombre de la herramienta!'
                            }]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item name="mentor" label="Mentores">
                                {/* <RenderMultiselect data={mentores} placeholder='Seleccione mentores'/> */}
                                <EventCreateFastInput
                                data={mentores}
                                SetmenteesSelected={setMentoresSend}
                                ></EventCreateFastInput>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify='space-between'>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item name="tipo" label="Tipo de herramienta" rules={[{
                                type: "string",
                                required: true,
                                message: 'Por favor seleccione el tipo de herramienta!'
                            }]}>
                                <Select style={{width: '100%'}} onChange={handleChange}>
                                    {
                                        tipos.map((v, i) => {
                                            return <Option value={v.tipo} key={i}>{v.tipo}</Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify='space-between'>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item name="descripcion" label="Descripción" rules={[{
                                type: "string",
                                required: true,
                                message: 'Por favor incluya una breve descripción de la herramienta'
                            }]}>
                                <Input.TextArea/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify='end' gutter={[8]}>
                        <Col>
                            <Button form="crear-herramienta" key='submit' htmlType="submit"
                                    loading={loading} className='btn-verde-basico'>
                                Crear
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

MentorshipNew.propTypes = {
    description: PropTypes.string,
    title: PropTypes.string,
    tema: PropTypes.number,
    id: PropTypes.string,
};

const mapStateToProps = (state, props) => ({
    id_institution: getIdInstitution(state),
    mentores: selectMentorsEntidad(state)
});

export default  withRouter(connect(mapStateToProps, {
    fetchMentorsbyEntidad,
    createMentorship,
    fetchMentorships
})(setPropsAsInitial(MentorshipNew)));
