import React, {useState} from 'react'
import {Card, Col, Row, Avatar, Button, Modal, Tooltip} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './CardItemAnt.scss'
import {Link} from "react-router-dom";
import CreateEventAntMentor from '../CreateEventAnt/CreateEventAntMentor';

function CardProgramMentor(props) {

    const {program, perfilEmpren, user, program_id} = props
    const [showModalMentor, setShowModalMentor] = useState(false)
   
    const openModalMentor = async () => {
        setShowModalMentor(true)
    };

    const closeModal = () => {
        setShowModalMentor(false)
    };


    return (
        //vista desde el mentor
        <Col id='col-cards' xxl={perfilEmpren ? 12 : 8} xl={perfilEmpren ? 12 : 8} lg={perfilEmpren ? 24 : 12} xs={24} md={24}>
            <Card>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} style={{height: '100%'}}>
                    <Col xs={0} md={12} lg={10} id='col-image'>
                        <Card.Meta
                            avatar={
                                <Avatar src={program && program.img_programa}/>
                            }>
                        </Card.Meta>
                    </Col>
                    <Col lg={14} xs={24} md={12} id='col-programs'>
                        <Row >
                            <Col>
                                <Link to={`/programs/programs/${program?.id}`}>
                                    <Tooltip placement='topRight' title='Ver emprendedores y planes de trabajo'><h5>{program?.nombre}</h5></Tooltip>
                                    <div className='show-two-lines'>
                                        <p title={program?.descripcion}>
                                            {program?.descripcion}
                                        </p>
                                    </div>
                                </Link>
                            </Col>
                        </Row>
                        <Row gutter={[8,8]} style={{marginTop: '3%'}}>
                            <Col xxl={perfilEmpren ? 13 : 22} xl={24} lg={perfilEmpren ? 14 : 22} md={perfilEmpren ? 12 : 22} sm={perfilEmpren ? 11 : 10} xs={11}>
                                <Button className=" btn-verde-basico"
                                        type='primary' block
                                        onClick={openModalMentor}
                                            >+ Crear evento
                                </Button>
                                <Modal
                                    title="Crear evento"
                                    className='modales-plan'
                                    centered
                                    visible={showModalMentor}
                                    onOk={() => setShowModalMentor(false)}
                                    onCancel={() => setShowModalMentor(false)}
                                    width={800}
                                    footer={[]}
                                >
                                    <CreateEventAntMentor program_id={program?.id} program_nombre={program?.nombre} 
                                                        fromProgram={true} onCancel={closeModal} setVisible={setShowModalMentor}/>
                                </Modal>
                            </Col>
                            <Col xxl={11} xl={24} lg={10} md={12} sm={11} xs={11}>
                                {
                                    perfilEmpren ?
                                        <Link to={`/plan/${user.username}/${program.id}`}>
                                            <Button type='primary' block className='btn-verde-basico mb-2'>Ver plan</Button>
                                        </Link>
                                    :
                                        <></>
                                }
                            </Col>
                        </Row>     
                    </Col>
                </Row>
            </Card>
        </Col>
    )
}

export default CardProgramMentor;