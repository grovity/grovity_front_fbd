import React, {useEffect, useState} from 'react'
import {Col, Row, Button, Modal} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {
    getStatusMentor,
    selectCurrentUser,
} from "../../selectors/users";
import {connect} from "react-redux";
import {enquireScreen} from 'enquire-js';
import EdicionPerfilEmprendedor from '../EdicionPerfilEmprendedor/EdicionPerfilEmprendedor';
import ModalFile_emprendedor from "../ModalEvent/ModalFile_emprendedor";
import ModalUrl_emprendedor from "../ModalEvent/ModalUrl_emprendedor";
import {Link} from "react-router-dom";
import { HiLocationMarker } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { BsAt } from "react-icons/bs";



const EmprendedorInfo = (props) => {
    const {user, current_user, status, params_id, entidad} = props
    const [isMobile, setIsMobile] = useState(false);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [show2, setShow2] = useState(false);

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

    function ucFirst(string) 
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    return (
        <Row id='emprendedor-info' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col lg={24} xs={24} md={24}>
                <Row className='nombre-editar-btn'>
                    <Col lg={17} xs={18} md={16} sm={18} xl={9} className='Nombre'>
                        <Row>
                            <h1>{user && user.first_name} {user && user.last_name}</h1>
                        </Row>
                        <Row>
                            <p>{user && user.titulo}</p>
                        </Row>
                    </Col>
                    <Col className='btn-editar' lg={6} xs={6} md={8} xl={6}>
                        {(isMobile && current_user && user && current_user.username === user.username) ?
                            <Button className='btn-verde-basico' onClick={handleModal} block type='primary' icon={<MdEdit size={20}/>}>
                            </Button>
                            :
                            current_user && user && current_user.username === user.username &&
                            <Button className='btn-verde-basico' onClick={handleModal} block type='primary' icon={<MdEdit size={18} className='mr-2'/>}>
                                Editar perfil
                            </Button>
                        }
                    </Col>
                </Row>
                <Modal
                    title="Editar perfil"
                    className='modales-plan'
                    centered
                    visible={visible}
                    onOk={() => setVisible(false)}
                    onCancel={() => setVisible(false)}
                    width={1000}
                    footer={[]}
                >
                    <EdicionPerfilEmprendedor loading={loading} setLoading={setLoading} setVisible={setVisible} user={user}/>
                </Modal>
                <Row>
                    <Col lg={10} xs={24} md={12} xl={6} className="datos-contacto">
                        <p><BsAt className='icons' size={25}/>  {user && user.email}</p>
                    </Col>
                    <Col lg={6} xs={24} md={9} xl={5} className="datos-contacto">
                        <p><FaPhoneAlt className='icons' size={25}/> {user && user.telefono}</p>
                    </Col>
                    <Col lg={8} xs={24} md={9} xl={5} className="datos-contacto">
                        <p><HiLocationMarker className='icons' size={25}/> {user && ucFirst(user.reside)}</p>
                    </Col>
                </Row>
                <Row className="btn-acciones" gutter={[12]}>
                    <ModalFile_emprendedor show={show} id_usuario={user && user.id} entidad={entidad}
                                           username2={current_user && current_user.username}
                                           status={status} modal={modal} username={user && user.username}
                                           toggle={event => {
                                               setShow(false)
                                               setModal(false)
                                           }}
                    />
                    <Col lg={8} xs={24} md={8} xl={5}>
                        <ModalUrl_emprendedor show={show2} id_usuario={user && user.id} entidad={entidad}
                                              status={status} modal={modal2}
                                              username={user && user.username} username2={current_user && current_user.username}
                                              toggle={event => {
                                                  setShow2(false)
                                                  setModal2(false)
                                              }}
                        />
                        <Button block className="btn-azul-basico mb-2" type="primary"
                                onClick={event => {
                                    setShow(true)
                                    setModal(true)
                                }
                                }>
                            Subir archivos
                        </Button>
                    </Col>
                    <Col lg={7} xs={24} md={7} xl={5}>
                        <Button block className="btn-azul-basico mb-2" type="primary"
                                onClick={event => {
                                    setShow2(true)
                                    setModal2(true)
                                }
                                }>
                            Subir URLs
                        </Button>
                    </Col>
                    <Col lg={8} xs={24} md={9} xl={5}>
                        <Link to={`/files/user/${user && user.username}`}>
                        {
                            current_user && user && current_user.username === user.username ?
                                <Button block className="btn-azul-basico" type="primary">
                                    Mis archivos
                                </Button>
                                :
                                <Button block className="btn-azul-basico" type="primary">
                                    Documentos usuario
                                </Button>
                            }
                            
                           
                        </Link>
                    </Col>
                </Row>
                <Row className="bio-emprendedor">
                    <Col lg={24} xs={24} md={24} xl={14}>
                        <h5>Acerca de mí</h5>
                        <p>{user && user.descripcion}</p>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state) => ({
    status: getStatusMentor(state)
});

export default connect(mapStateToProps, null)(EmprendedorInfo)