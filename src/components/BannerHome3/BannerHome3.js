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
                    <Col xxl={20} xl={20} lg={20} md={22} sm={22} xs={22}>
                        <Row>
                            <Col className='col-banner-text' xxl={10} xl={13} lg={15} md={16} sm={15} xs={15}>
                                <h1>Crece tu Startup con ayuda de Founders y mentores expertos</h1>
                                <p>Agenda sesiones 1 a 1 en temas como Growth, tecnología, finanzas, 
                                    levantamiento de capital, bootstrapping y más</p>
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