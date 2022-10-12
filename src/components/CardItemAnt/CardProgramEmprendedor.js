import React, {useState} from 'react'
import {Card, Col, Row, Avatar, Button, Modal} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './CardItemAnt.scss'
import {Link} from "react-router-dom";
import EventCreateMenteeForm from "../EventCreateForm/EventCreateMenteeForm";

function CardProgramEmprendedor(props) {

    const {program, status, perfilEmpren, user} = props
    const [showModalMentee, setShowModalMentee] = useState(false)
    const [loading, setLoading] = useState(false)
    const openModalMentee = async () => {
        setShowModalMentee(true)
    };



    return (
        // vista desde el emprendedor y perfil emprendedor por todos los roles
        <Col id='col-cards' xxl={12} xl={12} lg={24} xs={24} md={24} sm={24}>
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
                        <Link to={`/programs/programs/${program?.id}`}>
                            <h5>{program?.nombre}</h5>
                            <div className='show-two-lines'>
                                <p title={program?.descripcion}>
                                    {program?.descripcion}
                                </p>
                            </div>
                        </Link>
                        {
                            perfilEmpren ?

                            <Link to={`/plan/${user.username}/${program.id}`}>
                                <Button type='primary' className='btn-verde-basico mb-2'>Plan de trabajo</Button>
                            </Link>

                        :
                            <Row className='mt-2'>
                                {
                                    !status &&
                                    <>
                                        <Button className= "btn-verde-basico mb-2 mr-2" type='primary' onClick={openModalMentee}>
                                            + Crear evento
                                        </Button>
                                            <Modal
                                                title="Crear evento"
                                                centered
                                                visible={showModalMentee}
                                                onOk={() => setShowModalMentee(false)}
                                                onCancel={() => setShowModalMentee(false)}
                                                width={800}
                                                footer={[
                                                    <Button form={`crear-evento-emprendedor${program?.id}`} className='btn-verde-basico'
                                                            htmlType="submit" loading={loading}>
                                                        Agendar
                                                    </Button>,
                                                    <Button onClick={() => setShowModalMentee(false)} 
                                                            className="btn-danger-basico" danger type='primary'>
                                                        Cancelar
                                                    </Button>
                                                ]}
                                            >
                                                <EventCreateMenteeForm
                                                    program_id={program?.id}
                                                    program_nombre={program?.nombre}
                                                    setLoading={setLoading}
                                                    setVisible={setShowModalMentee}

                                                />
                                            </Modal>
                                        <Link to={`/programs/programs/${program.id}`}>
                                            <Button className='btn-verde-basico' type='primary' block>
                                                Ver plan
                                            </Button>
                                        </Link>
                                    </>
                                }
                            </Row>
                        }
                    </Col>
                </Row>
            </Card>
        </Col>
    )
}

export default CardProgramEmprendedor;