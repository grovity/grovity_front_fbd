import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'antd';
import {Card} from 'react-bootstrap';
import './TrainersBootcamp.scss'
import trainer1 from "../../assets/images/bootcamp/image.jpg"
import trainer1Small from "../../assets/images/bootcamp/image@0,5x.jpg"
import trainer2 from "../../assets/images/bootcamp/image (1).jpg"
import trainer2Small from "../../assets/images/bootcamp/image (1)@0,5x.jpg"
import trainer3 from "../../assets/images/bootcamp/image (2).jpg"
import trainer3Small from "../../assets/images/bootcamp/image (2)@0,5x.jpg"


class TrainersBootcamp extends React.PureComponent {

    static propTypes = {
        className: PropTypes.string,
        isMobile: PropTypes.bool,
    }
    static defaultProps = {
        className: 'bootcamp-trainers',
    }

    render() {
        const {isMobile} = this.props;
        return (
            <Row className='bootcamp-trainers' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col className="containerBootcampTrainers" span={24}>
                <Row className='title'>
                    <h2>Trainers</h2>
                    <hr/>
                </Row>
                <Row className="trainer-item">
                    <Col sm={12} md={7} xs={18}>
                        <Card style={{ width: '100%' }}>
                            {isMobile ?
                            <Card.Img variant="top" src={trainer1Small} id='img-1'/>
                            :
                            <Card.Img variant="top" src={trainer1} id='img-1'/>}
                            <Card.Body>
                                <Card.Title className="nombre">Alejandro</Card.Title>
                                <Card.Title className="apellidos">Gómez</Card.Title>
                                <Card.Text className="subtitulos">
                                Mentor experto en emprendimiento y desarrollo 
                                de modelos de negocio. Ha ayudado a cientos de empresas 
                                a crecer. CEO de Genie Latam y CGO de Grovity.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={12} md={7} xs={18}>
                        <Card style={{ width: '100%' }}>
                            {isMobile ?
                            <Card.Img variant="top" src={trainer2Small} id='img-1'/>
                            :
                            <Card.Img variant="top" src={trainer2} id='img-1'/>}
                            <Card.Body>
                                <Card.Title className="nombre">Camilo</Card.Title>
                                <Card.Title className="apellidos">Cruz</Card.Title>
                                <Card.Text className="subtitulos">
                                Head of Innovation de VIVA Air Brinda a las empresas 
                                soluciones innovadoras de alto impacto. Experto en 
                                construcción de MVP con metodologías ágiles.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={12} md={7} xs={18}>
                        <Card style={{ width: '100%' }}>
                            {isMobile ?
                            <Card.Img variant="top" src={trainer3Small} id='img-1'/>
                            :
                            <Card.Img variant="top" src={trainer3} id='img-1'/>}
                            <Card.Body>
                                <Card.Title className="nombre">Andrea</Card.Title>
                                <Card.Title className="apellidos">Vélez</Card.Title>
                                <Card.Text className="subtitulos">
                                Experta en diseño de servicios y desarrollo de negocios.
                                Ayuda a las empresas a desarrollar propuestas más creativas 
                                e innovadoras para llegar a sus clientes. 
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>   
                </Row>
                </Col>
            </Row>
        );
    }
}

export default TrainersBootcamp;