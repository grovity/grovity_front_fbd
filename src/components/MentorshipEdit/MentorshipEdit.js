import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import RenderMultiselect from "../MultipleSelect/MultiSelect";
import {getIdInstitution} from "../../selectors/institutions";
import {connect} from "react-redux";
import {fetchMentors, fetchMentorsbyEntidad, fetchMentorsbyMentorship} from "../../actions/fetchMentors";
import {Row, Col, Button, Form, Input, Select} from 'antd'
import {deleteMentorship, editMentorship} from "../../api";
import {tipos} from "../../helpers/tiposHerramientas";
import {withRouter} from "react-router-dom";
import PopConfirm from "../PopConfirm/PopConfirm";
import {fetchMentorships} from "../../actions/fetchMentorships";
import {selectMentorsEntidad} from "../../selectors/users";

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

const MentorshipEdit = (props) => {
        const {
            mentores, loading, id,
            setVisible, setLoading, mentorship, id_institution
        } = props
        const [mentoresPrev, setMentoresPrev] = useState(null)
        const [flag, setFlag] = useState(false)
        const [form] = Form.useForm();

        function handleChange(value) {
            // console.log(`selected ${value}`);
        }

        useEffect(() => {
            (async () => {
                await props.fetchMentorsbyMentorship(id)
            })()
        }, [mentorship?.id]);

        useEffect(() => {
            if (mentorship?.mentor) {
                let array = []
                for (let i = 0; i < mentorship.mentor.length; i++) {
                    array.push(mentorship.mentor[i].id)
                }
                setMentoresPrev(array)
            }
        }, [])

    useEffect(() => {
        (async()=> {
            await props.fetchMentorsbyEntidad(id_institution)
        })()
    }, [id_institution]);

        async function handleDeleteMentoria() {
            const response = await props.deleteMentorship(id)
            if (response) {
                await props.fetchMentorships(props.match.params.id)
                setVisible(false);
            }
            return true
        }

        const onSubmit = async values => {
            setLoading(true);
            if (!values.mentor) {
                values = {...values, mentor: mentoresPrev}
            }
            const response = await props.editMentorship(values, mentorship?.id)
            if (response) {
                await props.fetchMentorships(props.match.params.id)
                setVisible(false);
            }
            setLoading(false);
        }


        return (

            <Form id={`editar-herramienta${mentorship?.id}`}
                  {...formItemLayout}
                  form={form}
                  name={`editar-herramienta${mentorship?.id}`}
                  onFinish={onSubmit}
                  initialValues={{
                      nombre: mentorship.nombre,
                      mentor: mentoresPrev,
                      tipo: mentorship.tipo,
                      descripcion: mentorship.descripcion,

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
                                    <RenderMultiselect data={mentores} placeholder='Seleccione mentores'
                                                       value2={Array.isArray(mentorship.mentor) ? mentorship.mentor.map(c =>
                                                           c.id
                                                       ) : []}/>
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
                                    message: 'Por favor agregue una descripción!'
                                }]}>
                                    <Input.TextArea/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify='end' gutter={[8]}>
                            <Col>
                                <Button form={`editar-herramienta${mentorship?.id}`} key='submit' htmlType="submit"
                                        loading={loading} className='btn-verde-basico'>
                                    Editar
                                </Button>
                            </Col>
                            <Col>
                                <PopConfirm type={'primary'} message={'herramienta'}
                                            functionDelete={() => handleDeleteMentoria()}
                                            id={id} setFlag={setFlag}></PopConfirm>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>

        )
    }
;

MentorshipEdit.propTypes = {
    descripcion: PropTypes.string,
    nombre: PropTypes.string,
    mentor: PropTypes.string,
    tipo: PropTypes.string,
};

const mapStateToProps = (state, props) => ({
    id_institution: getIdInstitution(state),
    mentores: selectMentorsEntidad(state),

});


export default withRouter(connect(mapStateToProps, {
  fetchMentorsbyMentorship,
    deleteMentorship,
    editMentorship,
    fetchMentorships,
    fetchMentorsbyEntidad

})(MentorshipEdit));
