import React from 'react'
import {Col, Row, Divider} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {
    selectCurrentUser,
} from "../../selectors/users";
import {connect} from "react-redux";


const MentorInfoBasica = ({user, current_user}) => {
    return (
        <Row id='mentor-info-basica' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col lg={24} xs={24} md={24}>
                <Divider/>
                <Row className="datos-mentor">
                    <Col lg={4} xs={8} md={4} className='dato'>
                        <p>Reseñas: {user?.reviews}</p>
                    </Col>
                    <Divider type="vertical"/>
                    <Col lg={4} xs={8} md={4} className='dato'>
                        <p>Sesiones: {user?.nsesiones}</p>
                    </Col>
                    <Divider type="vertical"/>
                    <Col lg={7} xs={14} md={7} className='dato'>
                        <p>Precio por hora: {user?.precio}</p>
                    </Col>
                </Row>
                <Divider/>
                <Row className='bio-mentor'>
                    <Col className='bio'>
                        <h4>Acerca de mí</h4>
                        <p>{user && user.descripcion}</p>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state, props) => ({

});

export default connect(mapStateToProps, null)(MentorInfoBasica)