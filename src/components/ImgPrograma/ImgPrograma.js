import React from 'react'
import {Col, Row} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import AvatarDefault from '../../../src/assets/images/avatar-not-found.png'
import {connect} from "react-redux";


const ImgPrograma = (props) => {
    const {program} = props
    const avatarUrl = AvatarDefault
    return (
        <Row id='programa-detalle' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col lg={24} xs={24} md={24}>
                <Row>
                    <div
                        className='avatar'
                        style={{backgroundImage: `url('${program && program.img_programa ? program.img_programa: avatarUrl }')`}}>
                    </div>
                </Row>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state, props) => ({

});

export default connect(mapStateToProps, null)(ImgPrograma)