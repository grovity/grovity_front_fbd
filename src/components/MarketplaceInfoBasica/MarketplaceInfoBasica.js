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
const MarketplaceInfoBasica = ({mentor, user}) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [flag, setFlag] = useState(false)


    const handleModal = () => {
        setVisible(true);
        setFlag(true)

    }


    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setVisible(false);
            setFlag(false)
        }, 200);
    };

    return (
        <Row id='mentor-info-basica' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col lg={24} xs={24} md={24}>
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
                                loading={loading} onClick={handleOk} className='btn-verde-basico'>
                            Volver
                        </Button>
                    ]}
                >
                    <ReviewMentor setFlag={setFlag} flag={flag} visible={visible} username={mentor.username} username_current={user?.username}/>
                </Modal>
                <Row className="datos-mentor">
                    <Col lg={5} xs={10} md={10} className='dato'>
                        <a style={{cursor:'pointer', color:'blue'}} onClick={handleModal}> Leer reseñas: {mentor.reviews}</a>

                    </Col>
                    <Divider type="vertical"/>

                    <Col lg={5} xs={10} md={10} className='dato'>
                        <p>Sesiones: {mentor.nsesiones}</p>
                    </Col>
                    <Divider type="vertical"/>
                    <Col lg={6} xs={14} md={10} className='dato'>
                        <p>Precio por hora: $ {mentor.precio}</p>
                    </Col>
                </Row>
                <Divider/>
                <Row className='bio-mentor'>
                    <Col className='bio'>
                        <h4>Acerca de mí</h4>
                        <p>{mentor.descripcion}</p>
                    </Col>
                </Row>
                <Row className='tags-mentor'>
                    <Col className='tags'>
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
    user: selectCurrentUser(state)
});

export default connect(mapStateToProps, null)(MarketplaceInfoBasica)