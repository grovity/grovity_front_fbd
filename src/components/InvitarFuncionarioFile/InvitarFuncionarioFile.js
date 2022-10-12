import React, { useState } from 'react'
import {Row, Col, Upload, message, Button, Form } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './scss/component-lg.scss'

const { Dragger } = Upload;


const InvitaFuncionarioFile = ({onCancel, loading, onSubmit}) => {
    const [form] = Form.useForm();
    const [uploaded, setUploaded] = useState(false);

    const props = {
        name: 'file',
        multiple: false,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
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
        <Form id='invitar-funcionarios'
        form={form}
        name="invitar-funcionarios"
        onFinish={onSubmit}
        initialValues={{
            file_funcionarios:{},
        }}
        scrollToFirstError
        >
            <Row justify='center' style={{paddingBottom: '5%'}}>
                    <Col>
                        <Row>
                            <Form.Item name='file_funcionarios' rules={[{
                                required: true,
                                message: 'Por favor cargue un archivo con la lista de mentores!'
                            }]}>
                            <Dragger {...props} className='dragger-upload-file'>
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
                                <Button form="invitar-funcionarios" key='submit' htmlType="submit"
                                        loading={loading} className='btn-verde-basico' disabled={uploaded ? false : true}
                                        onClick={onSubmit}>
                                    Continuar
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
}

export default InvitaFuncionarioFile;