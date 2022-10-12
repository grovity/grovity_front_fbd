import React, {useState} from 'react'
import {Col, Row, Divider, Tag, Button, Modal} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {
    selectCurrentUser,
} from "../../selectors/users";
import {connect} from "react-redux";
import ReviewMentor from "../ReviewsPerfilMentor/ReviewMentor";

const colors = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
    'magenta',
    'red',
    'volcano',
    'orange'

]
const MentorCardInfoBasica = ({mentor, current_user, user}) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [flag, setFlag] = useState(false);


    const handleModal = () => {
        setVisible(true);
        setFlag(true)
    }

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setVisible(false);
        }, 200);
    };

    return (
        <Row id='mentor-info-basica' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col lg={24} xs={24} md={24} xl={24}>
                <Divider/>
                <Modal
                    title="Reseñas"
                    centered
                    visible={visible}
                    onOk={() => setVisible(false)}
                    onCancel={() => setVisible(false)}
                    width={1000}
                    footer={[
                        <Button form="edicion-perfil-mentor" key='submit' htmlType="submit" type="primary"
                                loading={loading} onClick={handleOk}>
                            Volver
                        </Button>
                    ]}
                >
                    <ReviewMentor setFlag={setFlag} flag={flag} username={mentor.username} username_current={current_user.username}/>
                </Modal>
                <Row className="datos-mentor">
                    <Col lg={11} xs={11} md={11} xl={11} className='dato'>
                        <p style={{cursor:'pointer', color:'blue'}} onClick={handleModal}>Leer Reseñas: {user && user[0] ? user[0].reviews: ''}</p>
                    </Col>
                    <Divider type="vertical"/>

                    <Col lg={12} xs={11} md={12} xl={12} className='dato'>
                        <p>Sesiones: { user && user[0] ? user[0].nsesiones: ''}</p>
                    </Col>
                </Row>
                <Divider/>
                <Row className='bio-mentor'>
                    <Col lg={24} xs={24} md={24} xl={24} className='bio'>
                        <h5>Acerca de mí</h5>
                        <p>{mentor.descripcion}</p>
                    </Col>
                </Row>
                <Row className='tags-mentor'>
                    <Col lg={24} xs={24} md={24} xl={24} className='tags'>
                        {
                            Array.isArray(mentor.skill_set) ?
                                mentor.skill_set.map(skill =>
                                    <Tag title={skill.description}
                                         color={colors[Math.floor(Math.random() * 15)]}>{skill.name}</Tag>
                                ) :
                                <span></span>
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state, props) => ({
    current_user: selectCurrentUser(state)
});

export default connect(mapStateToProps, null)(MentorCardInfoBasica)