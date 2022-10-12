import React, {useEffect, useState} from 'react'
import {Col, Row, Button, Modal, Divider} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {connect} from "react-redux";
import {enquireScreen} from 'enquire-js';
import EdicionPerfilEntidad from '../EdicionPerfilEntidad/EdicionPerfilEntidad';
import { TiLocation } from "react-icons/ti";
import AvatarDefault from '../../../src/assets/images/avatar-not-found.png'
import { MdEdit } from "react-icons/md";


const EntidadInfoMain = ({institution, user}) => {
    const [isMobile, setIsMobile] = useState(false);
    const [visible, setVisible] = useState(false);


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
        <Row id='entidad-info-main' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col lg={22} xs={24} md={24}>
                <Row className='nombre-editar-btn'>
                    <Col lg={16} xs={20} md={16} sm={20} xl={17} xxl={19} className='Nombre'>
                            <h1>{institution?.razon_social}</h1>
                            <p>{institution?.descripcion}</p>
                    </Col>
                    <Col className='btn-editar' lg={8} xs={4} md={8} sm={4} xl={7} xxl={5}>
                        <Row>
                            <Col className='btn-editar ' lg={24} xs={24} md={24} sm={24}>
                                {isMobile ?
                                    <Button className='btn-verde-basico' onClick={handleModal} block icon={<MdEdit size={20} />}>
                                    </Button>
                                :
                                    <Button className='btn-verde-basico' onClick={handleModal} block icon={<MdEdit size={18} className='mr-2'/>}>
                                        Editar entidad
                                    </Button>
                                }
                            </Col>
                        </Row>                       
                    </Col>
                </Row>
                <Modal
                    className="modales-plan"
                    title="Editar perfil entidad"
                    centered
                    visible={visible}
                    onOk={() => setVisible(false)}
                    onCancel={() => setVisible(false)}
                    width={1000}
                    footer={[]}
                >

                    <EdicionPerfilEntidad setVisible={setVisible} institution={institution} user={user}/>

                </Modal>
                <Row justify='space-between' gutter={[16]}>
                    <Col lg={9} xs={10} sm={8} md={8} xl={7} xxl={5}>
                        <div className='avatar'
                            style={{backgroundImage: `url('${institution && institution.logo ? institution.logo : AvatarDefault}')`}}>
                        </div>
                    </Col>
                    <Col lg={15} xs={14} sm={16} md={16} xl={17} xxl={19}>
                        <Row>
                            <p className='nit-p'>NIT</p>
                            <p>{institution?.nit}</p>
                        </Row>
                        <Row>
                            <p><TiLocation size={25}/>{institution?.direccion}</p>
                        </Row>
                    </Col>
                </Row>
               
                <Divider/>
                {/*<Row className="datos-entidad">*/}
                {/*    <Col lg={4} xs={22} md={5} className='dato'>*/}
                {/*        <p>Programas: 5</p>*/}
                {/*    </Col>*/}
                {/*    <Divider type="vertical"/>*/}
                {/*    <Col lg={5} xs={22} md={6} className='dato'>*/}
                {/*        <p>Empresarios: 10</p>*/}
                {/*    </Col>*/}
                {/*    <Divider type="vertical"/>*/}
                {/*    <Col lg={4} xs={22} md={5} className='dato'>*/}
                {/*        <p>Mentores: 25</p>*/}
                {/*    </Col>*/}
                {/*    <Divider type="vertical"/>*/}
                {/*    <Col lg={7} xs={16} md={10} className='dato'>*/}
                {/*        <p>Sesiones Impartidas: 120</p>*/}
                {/*    </Col>*/}
                {/*</Row>*/}
                {/*<Divider/>*/}
            </Col>
        </Row>
    )
}

const mapStateToProps = (state, props) => ({
});

export default connect(mapStateToProps, null)(EntidadInfoMain)