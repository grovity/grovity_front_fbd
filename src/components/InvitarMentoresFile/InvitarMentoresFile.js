import React, { useState } from 'react'
import {Row, Col, Upload, message, Button, Form } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './scss/component-lg.scss'
import {connect} from "react-redux";
import {inviteMentorFile} from "../../api";
import {URL_BASE} from "../../constants";

const { Dragger } = Upload;


const InvitaMentoresFile = (props) => {
    const {onCancel} = props
    const [form] = Form.useForm();
    const [uploaded, setUploaded] = useState(false);

    const props1 = {
        name: 'file_mentors',
        multiple: false,
        action: `${URL_BASE}/entidad/usuario/agregar/mentor`,
        headers: {
            authorization: `Token ${localStorage.getItem("token")}`,
        },
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
          }
          if (status === 'done') {
            message.success(`${info.file.name} archivo se ha subido correctamente.`);
            setUploaded(true);
          } else if (status === 'error') {
            message.error(`${info.file.name} fallo al subirse, intente de nuevo.`);
          }
        },
    };

    return (
        <Form id='invitar-mentores'
        form={form}
        name="invitar-mentores"
        initialValues={{
            file_mentors:'',
        }}
        scrollToFirstError
        >
            <Row justify='center'>
                
                    <Col>
                        <p><a href='https://drive.google.com/file/d/1LU1MYD69-U9uQ6BCaToaR_8pm372n4h0/view?usp=sharing '
                        target={'_blank'} rel={"noopener noreferrer"}>Consulte aquí el formato</a></p>
                        <Row>
                            <Form.Item name='file_mentors' rules={[{
                                required: true,
                                message: 'Por favor cargue un archivo con la lista de mentores!'
                            }]}>
                            <Dragger {...props1} className='dragger-upload-file'>
                                { uploaded ?
                                    <p className="text-dragger-upload">El archivo se ha cargado correctamente</p>
                                :
                                <>
                                    <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                    </p>
                                    <p className="text-dragger-upload">Haga click o arrastre el archivo a esta área para subirlo</p>
                                </>
                                }
                            </Dragger>
                            </Form.Item>
                        </Row>
                        <Row justify='center' gutter={[8]} style={{marginTop: '15%'}}>
                            <Col>
                                <Button danger type='primary' onClick={onCancel} className='btn-danger-basico'>
                                    Cerrar
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
        </Form>
       
    )
}

export default connect(null, {
    inviteMentorFile

})(InvitaMentoresFile);