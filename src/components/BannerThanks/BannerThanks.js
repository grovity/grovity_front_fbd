import React from 'react';
import './BannerThanks.scss'
import {Button, Row, Col} from 'antd';
import {withRouter} from "react-router-dom";
import {getStatusEntidad} from "../../selectors/institutions";
import {connect} from "react-redux";
import { RiArrowRightSLine } from "react-icons/ri";


function BannerThanks (props) {
    const {msg, submsg, submsg2} = props;

    function irVistaUsuario() {
        if(localStorage.getItem('entidad')){
            window.location.href = '/institution'
        } else {
            window.location.href = '/user'
        }

    }

    return (
        <div className='fondo-thanks'>
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col xl={16} lg={16} md={16} sm={18} xs={20}>
                    <Row justify='center' align='middle'>
                        <Col>
                            <h1 key="h1">{msg}</h1>
                            <p className="main-info submsg" key="p">
                                {submsg}
                            </p>
                            <p className="main-info submsg2" key="p2">
                                {submsg2}
                            </p>
                        </Col>
                    </Row>
                    <Row justify='center' align='top'>
                        <Col xl={6} lg={6} md={12} sm={8} xs={14}>
                            {
                                (props.confirmation) && (
                                    !localStorage.getItem('usuario_nuevo') ?

                                            <Button size="large" block onClick={irVistaUsuario}>Ir a mi perfil
                                                <RiArrowRightSLine/>
                                            </Button>

                                        :
                                        <a href={`/marketplace`} className="fa fa-search">
                                            <Button type="default" size="large" block>Continuar compra
                                                <RiArrowRightSLine/>
                                            </Button>
                                        </a>)
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>

        </div>
    );
}

const mapStateToProps = state => ({
    entidad: getStatusEntidad(state),
});

export default withRouter(connect(mapStateToProps, {})(BannerThanks));