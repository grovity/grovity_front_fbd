import React, { useState } from 'react'
import {Col, Row, Modal, Button} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import CardEntidadMain from '../CardEntidadMain/CardEntidadMain';
import {Link} from 'react-router-dom';

import FormIntegraciones from '../FormIntegraciones/FormIntegraciones';
import { SiGoogleclassroom } from "react-icons/si";
import { GoChecklist } from "react-icons/go";
import { HiPuzzle } from "react-icons/hi";
import { FaUsersCog } from "react-icons/fa";
import { ImStatsDots} from "react-icons/im";
import { RiUserStarFill } from "react-icons/ri";


const CardsEntidadMain = (props) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const programs = <GoChecklist size={45} className='icons'/>
    const mentors = <RiUserStarFill size={45} className='icons'/>
    const users = <SiGoogleclassroom size={45} className='icons'/>
    const funcionarios = <FaUsersCog size={45} className='icons'/>
    const reports = <ImStatsDots size={45} className='icons'/>
    const integracion = <HiPuzzle size={45} className='icons'/>
   
    const handleModal = () => {
        setVisible(true);
    }

    const handleModalCancel = () => {
        setVisible(false);
    }
    
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setVisible(false);
        }, 3000);
      };


        return (
        <div className='site-car-wrapper'>
                <Row id="cards-entidad-main" gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col lg={22} xs={24} md={24}>
                        <Row>
                             <Col xxl={8} lg={11} md={11} sm={24} xs={24} className="programas">
                                <Link to={"programs/"}>
                                    <CardEntidadMain titulo='Mis programas'
                                                icon={programs}
                                                />
                                </Link>
                            </Col>
                            <Col xxl={7} lg={12} md={12} sm={24} xs={24} className="mentores">
                                <Link to={"mentors/"}>
                                    <CardEntidadMain titulo={props.mt_plural}
                                                icon={mentors}
                                                />
                                </Link>
                            </Col>
                            <Col xxl={8} lg={11} md={11} sm={24} xs={24} className="emprendedores">
                                <Link to={"users/"}>
                                    <CardEntidadMain titulo={props.et_plural}
                                                icon={users}
                                                />
                                </Link>
                            </Col>
                            <Col xxl={8} lg={12} md={12} sm={24} xs={24} className="admin">
                                <Link to={"funcionarios/"}>
                                    <CardEntidadMain titulo='Administrar usuarios y roles' 
                                                icon={funcionarios}
                                                />
                                </Link>
                            </Col>
                            <Col xxl={7} lg={11} md={11} sm={24} xs={24} className="reportes">
                                <Link to={"reports/"}>
                                    <CardEntidadMain titulo='Reportes programas'
                                                icon={reports}
                                                />
                                </Link>
                            </Col>
                            <Col xxl={8} lg={12} md={12} sm={24} xs={24} className="integracion">
                                <a onClick={handleModal}>
                                    <CardEntidadMain titulo='Integración con mi página' 
                                                icon={integracion}
                                                />
                                </a>
                                <Modal title="Por favor envíanos tus requerimientos"
                                        centered
                                        visible={visible}
                                        onOk={handleOk}
                                        onCancel={handleModalCancel}
                                        footer={[
                                            <Button form="integraciones-entidad" key='submit' htmlType="submit" 
                                            className='btn-verde-basico' loading={loading} onClick={handleOk}>
                                                Enviar
                                            </Button>
                                        ]}>
                                       <FormIntegraciones/>
                                </Modal>
                            </Col>

                        </Row>
                    </Col>
                </Row>
            </div>
        );
}

export default CardsEntidadMain;