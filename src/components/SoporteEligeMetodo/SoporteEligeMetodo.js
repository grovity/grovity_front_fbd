import React from 'react';
import PropTypes from 'prop-types';
import './SoporteEligeMetodo.scss'
import {Row, Col, Card} from 'antd';
import Videos from "../../assets/images/soporte/Artboard 5.png"
import VideosSmall from "../../assets/images/soporte/Artboard 5@0.5x.png"
import Lecturas from "../../assets/images/soporte/Artboard 6.png"
import LecturasSmall from "../../assets/images/soporte/Artboard 6@0.5x.png"
import { Link } from 'react-router-dom';



class SoporteEligeMetodo extends React.PureComponent {

    static propTypes = {
        className: PropTypes.string,
        isMobile: PropTypes.bool,
    }
    static defaultProps = {
        className: 'soporte-metodo',
    }

    render() {
        const {isMobile} = this.props;
        return (
            <div className='fondo-soporte-metodo'>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='soporte-metodo'>
                    <Col lg={20} md={16} className="containerSoporteMetodo">
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="secondary-row">
                            <Col md={5} lg={10} className='inicio-rapido'>
                                <Card bordered={false}>
                                    <h4>Guía Rápida</h4>
                                    <p>Elige el método de tu preferencia</p>
                                    <hr/>
                                    <Row className="btn-iconos">
                                        <Col className="videos">
                                            <Link>
                                                {isMobile ?
                                                    <img className="icons-metodo" src={VideosSmall}/>
                                                    :
                                                    <img className="icons-metodo" src={Videos}/>
                                                }
                                                <h5>Videos</h5>
                                            </Link>
                                        </Col>
                                        <Col className="videos">
                                            <Link>
                                                {isMobile ?
                                                    <img className="icons-metodo" src={LecturasSmall}/>
                                                    :
                                                    <img className="icons-metodo" src={Lecturas}/>
                                                }
                                                <h5>Artículos</h5>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Card> 
                            </Col>
                            <Col md={5} lg={10} className='inicio-rapido'>
                                <Card bordered={false}>
                                    <h4>Otros Entrenamientos</h4>
                                    <p>Elige el método de tu preferencia</p>
                                    <hr/>
                                    <Row className="btn-iconos">
                                        <Col className="videos">
                                            <Link>
                                                {isMobile ?
                                                    <img className="icons-metodo" src={VideosSmall}/>
                                                    :
                                                    <img className="icons-metodo" src={Videos}/>
                                                }
                                                <h5>Videos</h5>
                                            </Link>
                                        </Col>
                                        <Col className="videos">
                                            <Link>
                                                {isMobile ?
                                                    <img className="icons-metodo" src={LecturasSmall}/>
                                                    :
                                                    <img className="icons-metodo" src={Lecturas}/>
                                                }
                                                <h5>Artículos</h5>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Card> 
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default SoporteEligeMetodo;