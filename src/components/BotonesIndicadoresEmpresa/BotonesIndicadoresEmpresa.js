import React, {useState} from 'react';
import {Row, Col, Button, Modal} from 'antd';
import {Link} from 'react-router-dom'
import AddIndicador from '../AddIndicador/AddIndicador';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';


const BotonesIndicadoresEmpresa = (props) => {
    const {user, empresa, status, entidad} = props;
    const [loading, setLoading] = useState(false);
    const [visibleIndicador, setVisibleIndicador] = useState(false);

    const handleModalIndicador = () => {
        setVisibleIndicador(true);
    }

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setVisibleIndicador(false);
            setLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        setVisibleIndicador(false);
    };

    return (
        <Row id="btns-indicadores-empresa" justify='space-between' align='middle' gutter={[16]}>
            {
                entidad ?
                    <Col lg={24} xs={24} md={24} xl={24}>
                        <Link to={`/dashboard`}>
                            <Button block className="btn-azul-basico" >
                                Ver dashboard
                            </Button>
                        </Link>
                    </Col> :
                    <Col lg={12} xs={12} md={12} xl={12}>
                        <Link to={`/dashboard`}>
                            <Button block className="btn-azul-basico">
                                Ver dashboard
                            </Button>
                        </Link>
                    </Col>


            }


            {
                !entidad ?
                    <Col lg={12} xs={12} md={12} xl={12}>
                        <Button className='btn-azul-basico' block
                                onClick={handleModalIndicador}>
                            Agregar indicador
                        </Button>
                    </Col> :
                    <span></span>
            }

            <Modal
                className="modales-indicador"
                title="Agregar indicador"
                visible={visibleIndicador}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button form='form-agregar-indicador' key='submit'
                            htmlType="submit" loading={loading}
                            onClick={handleOk} className='btn-verde-basico'>
                        Agregar</Button>,
                    <Button danger onClick={handleCancel} type='primary' className='btn-danger-basico'>Cancelar</Button>
                ]}
            >
                <AddIndicador setloading={setLoading} setVisible={setVisibleIndicador}/>
            </Modal>
        </Row>
    )
}

export default BotonesIndicadoresEmpresa;