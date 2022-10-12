import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Row, Col} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss'
import './Footer.scss';
import {Link} from 'react-router-dom';


class Footer extends Component {

    componentDidMount() {
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.innerHTML = 'var ml_webform_2405245 = ml_account(\'webforms\', \'2405245\', \'b3b7d9\', \'load\');ml_webform_2405245(\'animation\', \'fadeIn\');';
        let head = document.querySelector('head')
        head.appendChild(s);
    }
    handleOnclick() {
        return (eval('ml_webform_2405245(\'show\')'))
    }

    static propTypes = {
        className: PropTypes.string,
        isMobile: PropTypes.bool,
    }
    static defaultProps = {
        className: 'footer',
    }

    render() {
        const {isMobile, eco} = this.props;
      return (
        <div className="sectionFooter">
            <Row  justify='space-around'>
                <Col xxl={20} xl={20} lg={20} md={22} sm={22} xs={22}>
                        {
                            !eco ?
                            <Row className='row-texto-footer' justify='space-between'>
                                <Col className='cols-footer' xxl={5} xl={7} lg={7} md={7} sm={24} xs={24}>
                                <h5>Emprendedores</h5>
                                <Link to={`/marketplace`}>
                                    <span style={{cursor:'pointer'}}><p>Encuentra tu mentor</p></span>
                                </Link>
                            </Col>
                            <Col className='cols-footer' xxl={5} xl={7} lg={7} md={7} sm={24} xs={24}>
                                <h5>Mentores</h5>
                                <a href='https://consultor.grovity.co/landing' target='_blank' rel='noopener noreferrer'>
                                    <span style={{cursor:'pointer'}}><p>Conviertete en mentor</p></span>
                                </a>
                            </Col>
                            <Col className='cols-footer' xxl={5} xl={7} lg={7} md={7} sm={24} xs={24}>
                                <Row justify='center'>
                                    <Col xxl={7} xl={7} lg={7} md={7} sm={3} xs={3}>
                                        <a href="https://mobile.twitter.com/grovitylatam" target="_blank"  rel="noopener noreferrer">
                                            <img alt="Twitter" src={process.env.PUBLIC_URL + '/static/imgs/nuevo_home/large/twitter.png'}/>
                                        </a>
                                    </Col>
                                    <Col xxl={7} xl={7} lg={7} md={7} sm={3} xs={3}>
                                        <a href="https://www.linkedin.com/company/grovity/" target="_blank"  rel="noopener noreferrer">
                                            <img alt="LinkedIn" src={process.env.PUBLIC_URL + '/static/imgs/nuevo_home/large/linkedin.png'}/>
                                        </a>
                                    </Col>
                                    <Col xxl={7} xl={7} lg={7} md={7} sm={3} xs={3}>
                                        <a href="https://www.instagram.com/grovitylatam/" target="_blank"  rel="noopener noreferrer"    >
                                            <img alt="Instagram" src={process.env.PUBLIC_URL + '/static/imgs/nuevo_home/large/instagram.png'}/>
                                        </a>
                                    </Col>                           
                                </Row>
                            </Col>
                            </Row>
                            :
                            <Row className='row-texto-footer' justify='center'>
                                <Col className='cols-footer' xxl={5} xl={7} lg={7} md={7} sm={24} xs={24}>
                                    <Row justify='center'>
                                        <Col xxl={7} xl={7} lg={7} md={7} sm={3} xs={3}>
                                            <a href="https://mobile.twitter.com/grovitylatam" target="_blank"  rel="noopener noreferrer">
                                                <img alt="Twitter" src={process.env.PUBLIC_URL + '/static/imgs/nuevo_home/large/twitter.png'}/>
                                            </a>
                                        </Col>
                                        <Col xxl={7} xl={7} lg={7} md={7} sm={3} xs={3}>
                                            <a href="https://www.linkedin.com/company/grovity/" target="_blank"  rel="noopener noreferrer">
                                                <img alt="LinkedIn" src={process.env.PUBLIC_URL + '/static/imgs/nuevo_home/large/linkedin.png'}/>
                                            </a>
                                        </Col>
                                        <Col xxl={7} xl={7} lg={7} md={7} sm={3} xs={3}>
                                            <a href="https://www.instagram.com/grovitylatam/" target="_blank"  rel="noopener noreferrer"    >
                                                <img alt="Instagram" src={process.env.PUBLIC_URL + '/static/imgs/nuevo_home/large/instagram.png'}/>
                                            </a>
                                        </Col>                           
                                    </Row>
                                </Col>
                            </Row>
                        }
                        
                    <Row justify='space-around'>
                        <Col className='logo-footer' xxl={5} xl={5} lg={5} md={5} sm={8} xs={8}>
                            {isMobile ?
                                <img width="100%" src={process.env.PUBLIC_URL + '/static/imgs/nuevo_home/small/ArtBoard 33xxxhdpi@0,3x.png'} alt="logo"/>
                            :
                                <img width="100%" src={process.env.PUBLIC_URL + '/static/imgs/nuevo_home/large/ArtBoard 33xxxhdpi.png'} alt="logo"/>
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="copyRight">
                <Col span={12} offset={10}>
                    <h6><img alt='' src={process.env.PUBLIC_URL + '/static/imgs/nuevo_home/large/Artboard 27xxxhdpi.png'}/> 2020. Grovity - Todos los derechos reservados</h6>
                </Col>
            </Row>
        </div>
      );
    }
  }

  export default Footer;