import React, {useEffect, useState} from 'react'
import {Col, Row, Button, Modal, Empty, Divider} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {
    getStatusEmpresa_desdeOtroPerfil,
    getStatusMentor,
    selectCurrentUser, selectIdEmpresa, selectIdEmpresaEquipo,
} from "../../selectors/users";
import {connect} from "react-redux";
import {enquireScreen} from 'enquire-js';
import {withRouter} from "react-router-dom";
import EmpresaEditarForm from '../EmpresaEditarForm/EmpresaEditarForm';
import { MdEdit} from "react-icons/md";
import EmpresaCreateFormAnt from '../EmpresaCreateForm/EmpresaCreateFormAnt';
import {createEmpresaEmprendedor} from "../../api/user";
import Spin from "antd/es/spin";
import PopConfirm from "../PopConfirm/PopConfirm";
import {deleteEmpresaEmprendedor} from "../../api/empresa";
import {getStatusEntidad} from "../../selectors/institutions";


const EmpresaInfo = (props) => {
    const {user, current_user, status, entidad, empresa, empresa_status, id_empresa,
        empresa_status_desdeOtroPerfil, id_empresa_equipo} = props
    const [isMobile, setIsMobile] = useState(false);
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    enquireScreen((b) => {
        return () => {
            setIsMobile(b);
        }
    })

    useEffect(() => {
        enquireScreen((b) => {
            setIsMobile(
                !!b
            );
        });

    }, [isMobile])

    const handleModal = () => {
        setVisible(true);
    }


    const handleModalCrear = () => {
        setVisible2(true);
    }



    return (
        <Row id='empresa-info' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            { empresa_status || empresa_status_desdeOtroPerfil?
                <Col lg={24} xs={24} md={24}>
                    <Row className='nombre-editar-btn'>
                        <Col lg={17} xs={18} md={16} sm={18} xl={18} className='Nombre'>
                            <Row>
                                <h1>{empresa && empresa.name}</h1>
                            </Row>
                            <Row>
                                <p>{empresa?.sector}</p>
                            </Row>
                        </Col>
                        <Col className='btn-editar' lg={6} xs={6} md={8} xl={6}>
                            {
                                (isMobile && !status && !entidad && !id_empresa_equipo) ?
                                    <Button className='btn-verde-basico' onClick={handleModal} block>
                                       <MdEdit size={25}/>
                                    </Button>
                                    :
                                    !status && !entidad && !id_empresa_equipo &&

                                    <Button className='btn-verde-basico mb-2' onClick={handleModal}>

                                        <MdEdit size={25} style={{padding: '2%'}}/>Editar empresa
                                    </Button>
                            }
                        </Col>
                    </Row>
                    <Divider style={{marginTop: '0%', marginBottom: '2%', borderColor: '#8ba2a5'}}/>
                    <Modal
                        title="Editar empresa"
                        centered
                        visible={visible}
                        onOk={() => setVisible(false)}
                        onCancel={() => setVisible(false)}
                        width={1000}
                        footer={[
                            <Row justify='end' gutter={[8,8]}>
                                <Col >
                                <Button form="edicion-perfil-empresa" key='submit' htmlType="submit" 
                                    loading={loading2} className='btn-verde-basico' block>
                                    Editar
                                </Button>
                                </Col>
                                <Col >
                                    <PopConfirm message={'empresa'} type={'primary'}  
                                            functionDelete={props.deleteEmpresaEmprendedor} id={id_empresa}></PopConfirm>
                                </Col>
                            </Row>                            
                        ]}
                    >
                        <EmpresaEditarForm empresa={empresa} id_empresa={id_empresa} current_user={current_user} loading={loading2} setLoading={setLoading2} setVisible={setVisible}/>
                    </Modal>

                    <Row>
                        <Col lg={18} xs={24} md={24} xl={18} className="datos-contacto">
                            <h6>Barreras</h6>
                            <p>{empresa?.goal}</p>
                        </Col>
                    </Row>

                </Col>
            :
            <Col lg={24} xs={24} md={24} xl={24} className='no-empresa'>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                        <span>No se ha resgistrado ninguna empresa</span>
                    }
                />
                    { !status && !entidad ?
                        <Row className='no-empresa-content'>
                            <Col lg={12} xs={24} md={24} xl={12}>
                                <Button className='btn-verde-basico' onClick={handleModalCrear}>
                                    <MdEdit size={25} style={{padding: '2%'}}/>Crear empresa
                                </Button>
                            </Col>
                        </Row>
                        :
                        <span></span>
                    }
                        <Modal
                            title="Crear empresa"
                            centered
                            visible={visible2}
                            onOk={() => setVisible2(false)}
                            onCancel={() => setVisible2(false)}
                            width={1000}
                            footer={[
                                <Button form="crear-empresa-mentor" key='submit'
                                        htmlType="submit" type="primary" loading={loading}
                                        className='btn-verde-basico'>
                                    Crear
                                </Button>
                            ]}
                        >
                            <EmpresaCreateFormAnt user={user} loading={loading} setLoading={setLoading} setVisible={setVisible}/>
                        </Modal>
                    <Row className='no-empresa-content'>
                        <Col lg={12} xs={24} md={24} xl={12}>
                            <Button onClick={() => props.history.goBack()} type="link">Volver</Button>
                        </Col>
                    </Row>
                </Col>
        }
        </Row>
    )
}

const mapStateToProps = (state) => ({
    status: getStatusMentor(state),
    id_empresa: selectIdEmpresa(state),
    id_empresa_equipo: selectIdEmpresaEquipo(state),
    empresa: state.empresa_emprendedor,
    empresa_status_desdeOtroPerfil: getStatusEmpresa_desdeOtroPerfil(state),
});

export default withRouter(connect(mapStateToProps, {
    deleteEmpresaEmprendedor

})(EmpresaInfo))