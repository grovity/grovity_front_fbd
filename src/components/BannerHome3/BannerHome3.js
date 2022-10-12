import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Select, Button} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import {Link} from 'react-router-dom';



class BannerHome3 extends React.PureComponent {

    static propTypes = {
        className: PropTypes.string,
        isMobile: PropTypes.bool,
        navToShadow: PropTypes.func,
    }
    static defaultProps = {
        className: 'banner',
    }

    render() {

        return (
            <div id='banner-home3'>
                <Row justify='space-around'>
                    <Col xxl={20} xl={15} lg={20} md={22} sm={22} xs={22}>
                        <Row>
                            <Col className='col-banner-text' xxl={10} xl={13} lg={15} md={16} sm={15} xs={15}>
                                <h1>Digitaliza tu negocio, aumenta tus ingresos y atiende más clientes en todo el mundo</h1>
                                <p>Con Grovity, la plataforma para llevar tu negocio freelance     
                                    a internet en pocos pasos y sin complicaciones</p>
                                <Link to='/marketplace'>
                                    <Button size='medium' className="btn-banner-home3">Buscar Mentores Ahora</Button>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default BannerHome3;