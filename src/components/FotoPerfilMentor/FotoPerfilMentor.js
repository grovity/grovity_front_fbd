import React from 'react'
import {Col, Row} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import AvatarDefault from '../../../src/assets/images/avatar-not-found.png'
import {connect} from "react-redux";


const FotoPerfilMentor = ({user, entidad}) => {
    const avatarUrl = AvatarDefault
    return (
        <Row id='perfil-detalle-mentor' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col lg={24} xs={24} md={24}>
                <Row>
                    <div
                        className={!entidad ? 'avatar' : 'avatar-card-entidad'}
                        style={{backgroundImage: `url('${user && user.img_usuario ? user.img_usuario: avatarUrl }')`}}>
                    </div>
                </Row>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state, props) => ({
});

export default connect(mapStateToProps, null)(FotoPerfilMentor)