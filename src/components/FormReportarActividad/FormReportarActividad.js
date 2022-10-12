import React, {useState} from 'react'
import {Col, Row, Input, Form, Button} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import {setAlert} from "../../actions/alert";
import {connect} from "react-redux";
import {createObservacion} from "../../api/plan";
import {getId} from "../../selectors/institutions";
import {Spinner} from "react-bootstrap";


const FormReportarActividad = (props) => {
    const {id, id_user, setVisible, setFlag2} = props
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setLoading(true)
        let payload = await props.createObservacion(values, id, id_user)
        if (payload && payload.title) {
            setVisible(false)
            setFlag2(true)
        }
        setLoading(false)
    };

    return (
        <div className='site-car-wrapper'>
            <Row id="cards-entidad-main" gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col lg={24} xs={24} md={24}>
                    <Form id={`reportar-actividad-${id}`}
                          name={`reportar-actividad-${id}`}
                          onFinish={onFinish}
                          form={form}
                          initialValues={{
                              title: '',
                              activity: '',
                              text: '',
                          }}
                    >
                        <Form.Item
                            label="Titulo"
                            name="title"
                            rules={[{required: true, message: 'Por favor escribe un título para tu observación!'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item name='text'>
                            <Input.TextArea rows={6} placeholder="Escribe las observaciones de tu avance"/>
                        </Form.Item>
                        <Row style={{justifyContent: 'flex-end'}}>
                            <Button form={`reportar-actividad-${id}`} type="primary" className='btn-verde-basico'
                                    key='submit' htmlType="submit" 
                            >
                                {!loading ? "Reportar" : <Spinner animation="border" size={'sm'}/>}
                            </Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

const mapStateToProps = state => ({
    id_user: getId(state)
});

export default connect(mapStateToProps, {
    setAlert,
    createObservacion
})(FormReportarActividad);