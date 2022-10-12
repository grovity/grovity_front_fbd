import React, {useEffect, useState} from 'react'
import {Col, Row, Button, Modal, Tooltip} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {
    selectCurrentUser,
} from "../../selectors/users";
import {connect} from "react-redux";
import {enquireScreen} from 'enquire-js';
import { BsCalendar} from "react-icons/bs";
import Scheduler2 from "../Scheduler/Scheduler2";
import {GoStar} from "react-icons/go";


const MarketplaceInfoMain = (props) => {
    const {mentor, user} = props
    const [isMobile, setIsMobile] = useState(false);
    const [visible, setVisible] = useState(false);




    const handleModal = () => {
        setVisible(true); 
    }

    const handleRedirection = () => {
        localStorage.setItem('usuario_nuevo', true)
        window.location = '/sign-up'
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
        <Row id='marketplace-info-main' gutter={[8, 8]}>
            <Col lg={24} xs={24} md={24}>
                <Row className='nombre-editar-btn' justify='space-between'>
                    <Col lg={16} xs={20} md={16} sm={20} className='Nombre'>
                        <Row>
                            <h1>{mentor.first_name} {mentor.last_name}</h1>
                        </Row>
                        <Row>
                            <p>{mentor.titulo}</p>
                        </Row>
                    </Col>
                    <Col className='btn-agendar' lg={8} xs={4} md={8}>
                        <Row>
                            <Col lg={24} xs={24} md={24}>
                                {isMobile ?
                                    <Button className='btn-verde-basico' type='primary' block
                                            onClick={localStorage.getItem('token') ? handleModal : handleModal}>
                                        <Tooltip placement="topLeft" title='Agendar Mentoría'>
                                            <BsCalendar className='icon-agendar'/>
                                        </Tooltip>
                                    </Button>
                                :
                                    <Button className='btn-verde-basico' block type='primary' 
                                            onClick={localStorage.getItem('token') ? handleModal : handleModal}>
                                        Agendar mentoría
                                    </Button>
                                } 
                            </Col>
                        </Row>
                        {/*<Row>*/}
                        {/*    <Col lg={24} xs={24} md={24}>*/}
                        {/*        {isMobile ?*/}
                        {/*            <>*/}
                        {/*            {action === 'saved' ?*/}
                        {/*            <Button className='button-ant-save' size='large' type="text" onClick={unSaved}><BsBookmarkFill/></Button>*/}
                        {/*            :*/}
                        {/*            <Button className='button-ant-save' size='large' type="text" onClick={saved}><BsBookmark/></Button>*/}
                        {/*            }*/}
                        {/*            </>*/}
                        {/*        :*/}
                        {/*            <>*/}
                        {/*            {action === 'saved' ?*/}
                        {/*            <Button className='button-ant-save' size='large' type="text" onClick={unSaved}>Guardado <BsBookmarkFill className="bookmark-fill"/></Button>*/}
                        {/*            :*/}
                        {/*            <Button className='button-ant-save' size='large' type="text" onClick={saved}>Guardar <BsBookmark className="bookmark"/></Button>*/}
                        {/*            }*/}
                        {/*            </>*/}
                        {/*        } */}
                        {/*    </Col>*/}
                        {/*    */}
                        {/*</Row>    */}
                    </Col>
                </Row>
                <Modal
                    title="Agendar mentoría"
                    centered
                    visible={visible}
                    onOk={() => setVisible(false)}
                    onCancel={() => setVisible(false)}
                    width={1000}
                    footer={[
                     ]}
                >
                    <Scheduler2 setVisible={setVisible}
                                precio={mentor.precio}
                                first_name={mentor.first_name}
                                last_name={mentor.last_name}
                                user={user?.id} mentor={mentor.id}
                                areas={mentor.skill_set}
                                modalSchedule={true}/>
                </Modal>
                <Row>
                    <Col lg={5} xs={24} md={12} className="datos-contacto">
                        <h5><GoStar className='icons' p-2/> {mentor.puntaje.toFixed(2)}</h5>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state) => ({
   user: selectCurrentUser(state)
});

export default connect(mapStateToProps, null)(MarketplaceInfoMain)