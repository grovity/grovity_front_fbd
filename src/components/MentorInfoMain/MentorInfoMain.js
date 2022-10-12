import React, {useEffect, useState} from 'react'
import {Col, Row, Button, Modal} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {connect} from "react-redux";
import {enquireScreen} from 'enquire-js';
import EdicionPerfilMentor from '../EdicionPerfilMentor/EdicionPerfilMentor'

import { TiLocation } from "react-icons/ti";
import { ImPhone } from "react-icons/im";
import { BsAt } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { GoStar } from "react-icons/go";





const MentorInfoMain = ({user, calificacion, current_user}) => {
    const [isMobile, setIsMobile] = useState(false);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleModal = () => {
        setVisible(true);
    }


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

    return (
        <Row id='mentor-info-main' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col lg={24} xs={24} md={24}>
                <Row className='nombre-editar-btn'>
                    <Col lg={14} xs={20} md={14} sm={20} xl={16} xxl={18} className='Nombre'>
                        <Row>
                            <h1>{user?.first_name} {user?.last_name}</h1>
                        </Row>
                        <Row>
                            <p>{user?.titulo}</p>
                        </Row>
                    </Col>
                    {
                        !current_user ?
                            <Col className='btn-editar' lg={10} xs={4} md={10} sm={4} xl={8} xxl={6}>
                                <Row>
                                    <Col className='btn-editar' lg={24} xs={24} md={24} sm={24}>
                                        {/* {isMobile ?
                                    <>
                                    {action === 'saved' ?
                                    <Button size='large' type="text" onClick={unSaved}><BsBookmarkFill/></Button>
                                    :
                                    <Button size='large' type="text" onClick={saved}><BsBookmark/></Button>
                                    }
                                    </>
                                :
                                    <>
                                    {action === 'saved' ?
                                    <Button size='large' type="text" onClick={unSaved}>Guardado <BsBookmarkFill className="bookmark-fill"/></Button>
                                    :
                                    <Button size='large' type="text" onClick={saved}>Guardar <BsBookmark className="bookmark"/></Button>
                                    }
                                    </>
                                } */}

                                        {isMobile ?
                                            <Button className='button-ant-editar btn-verde-basico' onClick={handleModal} block 
                                                    icon={<MdEdit size={20}/>}>
                                            </Button>
                                            :
                                            <Button className='btn-verde-basico' onClick={handleModal} block 
                                                    icon={<MdEdit size={18} style={{marginRight: '2%'}}/>}>
                                                Editar perfil
                                            </Button>
                                        }
                                    </Col>
                                </Row>
                            </Col> :
                            <span></span>
                    }

                </Row>
                <Modal
                    className='modales-plan'
                    title="Editar perfil"
                    centered
                    visible={visible}
                    onOk={() => setVisible(false)}
                    onCancel={() => setVisible(false)}
                    width={1000}
                    footer={[

                    ]}
                >
                    <EdicionPerfilMentor  loading={loading} setLoading={setLoading} setVisible={setVisible}/>
                </Modal>
                <Row>
                    <Col lg={18} xs={24} md={12} sm={12} xl={8}>
                        <p><BsAt className='icons' size={25}/> {user?.email}</p> 
                    </Col>
                    <Col lg={7} xs={24} md={12} sm={12} xl={8}>
                        <p><TiLocation className='icons' size={25}/> {user?.reside}</p> 
                    </Col>
                    <Col lg={7} xs={24} md={12} sm={12} xl={8}>
                        <p><ImPhone className='icons' size={25}/> {user?.telefono}</p>
                    </Col>
                </Row>
                <Row>
                    <Col lg={5} xs={24} md={12} className="datos-contacto">
                        <h5><GoStar size={25} className='icons'/> {calificacion ? calificacion?.calificacion.toFixed(2) : 0}</h5>
                    </Col>
                </Row>
                <Row className="btn-acciones">
                    {
                        user && user.linkedin ?
                            <Col lg={2} xs={3} md={2}>
                                <a target='_blank' rel='noopener noreferrer' href={user?.linkedin}>
                                   <FaLinkedin className='icons2' size={25}/>
                                </a>
                            </Col> :
                            <span></span>
                    }

                    {
                        user && user.twitter ?
                            <Col lg={2} xs={3} md={2}>
                                <a target='_blank' rel='noopener noreferrer' href={user?.twitter}>
                                    <AiOutlineTwitter className='icons2' size={25}/>
                                </a>
                            </Col> :
                            <span></span>
                    }

                    {
                        user && user.instagram ?
                            <Col lg={2} xs={3} md={2}>
                                <a target='_blank' rel='noopener noreferrer' href={user?.instagram}>
                                    <AiFillInstagram className='icons2' size={25}/>
                                </a>
                            </Col>:
                            <span></span>

                    }

                </Row>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state, props) => ({});

export default connect(mapStateToProps, null)(MentorInfoMain)