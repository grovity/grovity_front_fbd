import React, {useState} from 'react'
import {Row, Col, Upload, message, Button, Form} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import './scss/component-lg.scss'
import {connect} from "react-redux";
import {inviteEmprendedorFile,  url_entidad} from "../../api";

const {Dragger} = Upload;


const InvitarEmprendedorFile = (props) => {
    const {onCancel} = props
    const [form] = Form.useForm();
    const [uploaded, setUploaded] = useState(false);

    const props1 = {
        name: 'file_users',
        multiple: false,
        action: `${url_entidad}/usuario/agregar/emprendedor`,
        headers: {
            authorization: `Token ${localStorage.getItem("token")}`,
        },
        onChange(info) {
            const {status} = info.file;
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


    const normFile = (e) => {


        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };


    return (
        <Form id='invitar-emprendedores'
              form={form}
              name="invitar-emprendedores"
              scrollToFirstError
        >
            <Row justify='center'>
                <Col>
                    <p><a href='https://drive.google.com/file/d/1LU1MYD69-U9uQ6BCaToaR_8pm372n4h0/view?usp=sharing '
                      target={'_blank'} rel={"noopener noreferrer"}>Consulte aquí el formato</a></p>
                    <Row>

                        <Form.Item name='file_users'
                                   valuePropName="fileList"
                                   getValueFromEvent={normFile}

                                   rules={[{
                                       required: true,
                                       message: 'Por favor cargue un archivo con la lista de emprendedores!'

                                   }]}>
                            <Dragger {...props1} className='dragger-upload-file'>
                                {uploaded ?
                                    <p className="text-dragger-upload">El archivo se ha cargado correctamente</p>
                                    :
                                    <>
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined/>
                                        </p>
                                        <p className="text-dragger-upload">Haga click o arrastre el archivo a esta área
                                            para subirlo</p>
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
    inviteEmprendedorFile

})(InvitarEmprendedorFile);