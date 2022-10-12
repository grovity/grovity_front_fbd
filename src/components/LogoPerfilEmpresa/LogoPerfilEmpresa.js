import React from 'react'
import {Col, Progress, Row} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import AvatarDefault from '../../../src/assets/images/avatar-not-found.png'
import {connect} from "react-redux";


const LogoPerfilEmpresa = (props) => {
    const {user, empresa} = props
    const avatarUrl = AvatarDefault
    return (
        <Row id='perfil-detalle-empresa' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col lg={24} xs={24} md={24}>
                <Row>
                    <div
                        className='avatar'
                         style={{backgroundImage: `url('${empresa ? user?.image: avatarUrl }')`}}
                        >
                    </div>
                </Row>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state, props) => ({

});

export default connect(mapStateToProps, null)(LogoPerfilEmpresa)