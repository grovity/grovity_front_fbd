import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button} from 'antd';
import './FooterEscuelaJuntas.scss';
import {URL_BASE} from "../../constants";



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
        className: 'footer-escuela',
    }

    render() {
        const {className, isMobile} = this.props;
      return (
        <div className="sectionFooterJuntas">
            <Row className="title" gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <h2>Una alianza de:</h2>
            </Row>
            <Row className="logos" gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col md={12} xs={4} className="logo footer">
                    {isMobile ?
                    <img width="184px" src={process.env.PUBLIC_URL + '/static/imgs/escuelaJuntas/small/Artboard 5@0.5x.png'} alt=""/>
                    :
                    <img width="367px" src={process.env.PUBLIC_URL + '/static/imgs/escuelaJuntas/large/Artboard 5.png'} alt=""/>}
                </Col>
                <Col md={12} xs={4} className="logo footer">
                    {isMobile ?
                    <img width="128px" src={process.env.PUBLIC_URL + '/static/imgs/escuelaJuntas/small/Artboard 6@0.5x.png'} alt=""/>
                    :
                    <img width="256px" src={process.env.PUBLIC_URL + '/static/imgs/escuelaJuntas/large/Artboard 6.png'} alt=""/>}
                </Col>
               
            </Row>
            <Row className="copyRight" gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col span={12} offset={10}>
                    <h6><img src={process.env.PUBLIC_URL + '/static/imgs/nuevo_home/large/Artboard 27xxxhdpi.png'}/> 2020. Grovity - Todos los derechos reservados</h6>
                </Col>
            </Row>
        </div>
      );
    }
  }
  
  export default Footer;