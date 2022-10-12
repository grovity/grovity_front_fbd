import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Button} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import {Link} from 'react-router-dom';


class BannerHomeEco extends React.PureComponent {

    static propTypes = {
        className: PropTypes.string,
        isMobile: PropTypes.bool,
        navToShadow: PropTypes.func,
    }
    static defaultProps = {
        className: 'banner',
    }

    render() {
        const {isMobile} = this.props;

        return (
            <div id='banner-home-eco'>
                <Row justify='space-around'>
                    <Col xxl={20} xl={20} lg={20} md={22} sm={22} xs={22}>
                        <Row>
                            <Col className='col-banner-text' xxl={10} xl={14} lg={13} md={12} sm={12} xs={12}>
                                <h1>Digitaliza tu programa de incubación o aceleración.</h1>
                                <p>Organiza y lleva el control de tus programas con una 
                                    herramienta sencilla, intuitiva y de gran impacto para 
                                    los emprendedores y mentores</p>
                                <a href={`https://calendly.com/grovity/demogrovity?month=2021-03`}>
                                    <Button size={isMobile ? 'medium' : 'large'} className="btn-banner-home3">¡Agendar una demo ya!</Button>
                                </a>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default BannerHomeEco;