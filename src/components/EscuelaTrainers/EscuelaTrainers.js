import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'antd';
import {Card} from 'react-bootstrap';
import './EscuelaTrainers.scss'
import trainer1 from "../../assets/images/escuelaJuntas/large/tatiana.png"
import trainer2 from "../../assets/images/escuelaJuntas/large/diego-parra.jpg"
import trainer3 from "../../assets/images/escuelaJuntas/large/camilo-llinas.jpg"
import trainer4 from "../../assets/images/escuelaJuntas/large/maria-cristina.png"
import trainer5 from "../../assets/images/escuelaJuntas/large/jaime.jpg"
import trainer6 from "../../assets/images/escuelaJuntas/large/enrique-250.jpg"
import trainer7 from "../../assets/images/escuelaJuntas/large/luis-250.jpg"
import trainer1Small from "../../assets/images/escuelaJuntas/small/tatiana@0,75x.png"
import trainer2Small from "../../assets/images/escuelaJuntas/small/diego-parra@0,75x.jpg"
import trainer3Small from "../../assets/images/escuelaJuntas/small/camilo-llinas@0,75x.jpg"
import trainer4Small from "../../assets/images/escuelaJuntas/small/maria-cristina@0,75x.png"
import trainer5Small from "../../assets/images/escuelaJuntas/small/jaime@0,75x.jpg"
import trainer6Small from "../../assets/images/escuelaJuntas/small/enrique-250@0,75x.jpg"
import trainer7Small from "../../assets/images/escuelaJuntas/small/luis-250@0,75x.jpg"


class EscuelaTrainers extends React.PureComponent {

    static propTypes = {
        className: PropTypes.string,
        isMobile: PropTypes.bool,
    }
    static defaultProps = {
        className: 'escuela-trainers',
    }

    render() {
        const {isMobile} = this.props;
        return (
            <Row className='escuela-trainers' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col className="containerEscuelaTrainers" span={24}>
                <Row className='title'>
                    <h4>Trainers</h4>
                    <hr/>
                </Row>
                <Row className="trainer-item">
                    <Col sm={12} md={7} xs={20}>
                        <Card style={{ width: '100%' }}>
                            {isMobile ?
                            <Card.Img variant="top" src={trainer1Small} id='img-1'/>
                            :
                            <Card.Img variant="top" src={trainer1} id='img-1'/>}
                            <Card.Body>
                                <Card.Title className="nombre">Tatiana</Card.Title>
                                <Card.Title className="apellidos">Montealegre</Card.Title>
                                <Card.Text className="subtitulos">
                                M??s de 18 a??os de experiencia, comercial (mercadeo, trade marketing, ventas) 
                                en compa????as como 3M, Nestl??, Kellogg???s, y CocaCola Company.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={12} md={7} xs={20}>
                        <Card style={{ width: '100%' }}>
                            {isMobile ?
                            <Card.Img variant="top" src={trainer2Small} id='img-1'/>
                            :
                            <Card.Img variant="top" src={trainer2} id='img-1'/>}
                            <Card.Body>
                                <Card.Title className="nombre">Diego</Card.Title>
                                <Card.Title className="apellidos">Parra Herrera</Card.Title>
                                <Card.Text className="subtitulos">
                                Se ha desempe??ado por m??s de 13 a??os como asesor empresarial en EEUU, Centro y 
                                Suram??rica formalizando sus estructuras de Gobierno Corporativo y plan de Sucesi??n. 
                                Con Maestr??as en prestigiosas escuelas de negocios de Madrid y Barcelona, donde inici?? 
                                su carrera en el mundo de la consultor??a a trav??s de firmas como Arthur Andersen y Aquent.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={12} md={7} xs={20}>
                        <Card style={{ width: '100%' }}>
                            {isMobile ?
                            <Card.Img variant="top" src={trainer3Small} id='img-1'/>
                            :
                            <Card.Img variant="top" src={trainer3} id='img-1'/>}
                            <Card.Body>
                                <Card.Title className="nombre">Camilo</Card.Title>
                                <Card.Title className="apellidos">Llin??s</Card.Title>
                                <Card.Text className="subtitulos">
                                Emprendedor experimentado en fitness, tecnolog??a y bienes ra??ces. Fundador de 
                                empresas como Stark gym, Evolation Yoga, Aliat y algunas startups. Altamente 
                                involucrado en pol??ticas p??blicas que impulsan la innovaci??n en Am??rica Latina.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>   
                </Row>
                <Row className="trainer-item">
                    <Col sm={10} md={7} xs={20}>
                        <Card style={{ width: '100%' }}>
                            {isMobile ?
                            <Card.Img variant="top" src={trainer4Small} id='img-1'/>
                            :
                            <Card.Img variant="top" src={trainer4} id='img-1'/>}
                            <Card.Body>
                                <Card.Title className="nombre">Mar??a Cristina</Card.Title>
                                <Card.Title className="apellidos">Amado</Card.Title>
                                <Card.Text className="subtitulos">
                                Coach, Facilitadora LEGO??, Especialista en Psicolog??a del Consumidor. Ha acompa??ado
                                por mas de 25 a??os a multiples compa????as en el dise??o de sus modelos de innovaci??n y 
                                creatividad. Ha generado proceso de transformaci??n en organizaciones como: ICBF, GHL
                                Hoteles, Salitre M??gico, Metlife, entre otras.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={12} md={7} xs={20}>
                        <Card style={{ width: '100%' }}>
                            {isMobile ?
                            <Card.Img variant="top" src={trainer5Small} id='img-1'/>
                            :
                            <Card.Img variant="top" src={trainer5} id='img-1'/>}
                            <Card.Body>
                                <Card.Title className="nombre">Jaime</Card.Title>
                                <Card.Title className="apellidos">Casta??eda</Card.Title>
                                <Card.Text className="subtitulos">
                                M??s de 30 a??os de experiencia en los sectores de consumo masivo, log??stica y sistemas de 
                                informaci??n. Ha ejercido cargos gerenciales y directivos en compa????as, tales como Meals, 
                                Quala, Nestl??, Almagran, Legis, y Unilever, tanto en Colombia como otros pa??ses de la regi??n.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>  
                </Row>
                <Row className="trainer-item">
                    <Col sm={10} md={7} xs={20}>
                        <Card style={{ width: '100%' }}>
                            {isMobile ?
                            <Card.Img variant="top" src={trainer6Small} id='img-1'/>
                            :
                            <Card.Img variant="top" src={trainer6} id='img-1'/>}
                            <Card.Body>
                                <Card.Title className="nombre">Enrique</Card.Title>
                                <Card.Title className="apellidos">Samper</Card.Title>
                                <Card.Text className="subtitulos">
                                M??s de 20 a??os de experiencia en compa????as nacionales y multinacionales,
                                 apoyando la construcci??n de negocios digitales exitosos, desarrollando e implementando
                                  estrategias de mercadeo, ventas y comunicaci??n con fuerte ??nfasis digital. Fiel creyente
                                   en la innovaci??n comunicando e implementando ideas a trav??s de Latinoam??rica
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={12} md={7} xs={20}>
                        <Card style={{ width: '100%' }}>
                            {isMobile ?
                            <Card.Img variant="top" src={trainer7Small} id='img-1'/>
                            :
                            <Card.Img variant="top" src={trainer7} id='img-1'/>}
                            <Card.Body>
                                <Card.Title className="nombre">Luis Felipe</Card.Title>
                                <Card.Title className="apellidos">Giraldo</Card.Title>
                                <Card.Text className="subtitulos">
                                ??ngel inversionista en m??s de 15 empresas del sector transporte, tecnolog??a, e-commerce, 
                                entretenimiento y financiero. Conferencista en finanzas personales, emprendimiento, 
                                VentureCapital y fondos de inversi??n. Mentor y consultor en m??ltiples programas de emprendimiento
                                 en diferentes pa??ses de Latinoam??rica.
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

export default EscuelaTrainers;