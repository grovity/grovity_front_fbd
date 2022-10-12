import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'antd';
import {Card} from 'react-bootstrap';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';


class StartupsJuntas extends React.PureComponent {

    static propTypes = {
        className: PropTypes.string,
        isMobile: PropTypes.bool,
    }
    static defaultProps = {
        className: 'startups-juntas',
    }

    render() {
        const {isMobile} = this.props;
        return (
            <Row id='startups-juntas' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col className="containerEscuelaTrainers" span={24}>
                <Row className='title'>
                    <h4>Hemos formado juntas asesoras en Startups como:</h4>
                    <hr/>
                </Row>
                <Row className="trainer-item">
                    <Col sm={12} md={7} xs={20}>
                        <Card style={{ width: '100%' }}>
                            {isMobile ?
                            <Card.Img variant="top" src={process.env.PUBLIC_URL + '/static/imgs/escuelaJuntas/logomonitor.png'}/>
                            :
                            <Card.Img variant="top" width="200px" src={process.env.PUBLIC_URL + '/static/imgs/escuelaJuntas/logomonitor.png'} alt=""/>}
                        </Card>
                    </Col>
                    <Col sm={12} md={7} xs={20}>
                        <Card style={{ width: '100%' }}>
                            {isMobile ?
                            <Card.Img variant="top" src={process.env.PUBLIC_URL + '/static/imgs/escuelaJuntas/intelibpo-logo.png'}/>
                            :
                            <Card.Img variant="top" width="200px" src={process.env.PUBLIC_URL + '/static/imgs/escuelaJuntas/intelibpo-logo.png'} />}
                        </Card>
                    </Col>
                    <Col sm={12} md={7} xs={20}>
                        <Card style={{ width: '100%' }}>
                            {isMobile ?
                            <Card.Img variant="top" src={process.env.PUBLIC_URL + '/static/imgs/escuelaJuntas/LOGO-MECANICAD-85.png'}/>
                            :
                            <Card.Img variant="top" width="200px" src={process.env.PUBLIC_URL + '/static/imgs/escuelaJuntas/LOGO-MECANICAD-85.png'}/>}
                        </Card>
                    </Col>   
                </Row>
                <Row className="trainer-item">
                    <Col sm={10} md={7} xs={20}>
                        <Card>
                            {isMobile ?
                            <Card.Img variant="top" src={process.env.PUBLIC_URL + '/static/imgs/escuelaJuntas/0cannvest100.png'}/>
                            :
                            <Card.Img variant="top" width="20px" src={process.env.PUBLIC_URL + '/static/imgs/escuelaJuntas/0cannvest100.png'}/>}
                        </Card>
                    </Col>
                    <Col sm={12} md={7} xs={20}>
                        <Card>
                            {isMobile ?
                            <Card.Img variant="top" src={process.env.PUBLIC_URL + '/static/imgs/escuelaJuntas/logo-horizontal-medilabb.png'}/>
                            :
                            <Card.Img variant="top" width="100px" src={process.env.PUBLIC_URL + '/static/imgs/escuelaJuntas/logo-horizontal-medilabb.png'}/>}
                        </Card>
                    </Col>  
                </Row>
                </Col>
            </Row>
        );
    }
}

export default StartupsJuntas;