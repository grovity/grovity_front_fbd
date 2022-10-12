import React from 'react';
import PropTypes from 'prop-types';
import './ArticulosSoporte.scss'
import {Row, Col, Card} from 'antd';
import { Link } from 'react-router-dom';
import Foto from "../../assets/images/bootcamp/bonneval-sebastien-UIpFY1Umamw-unsplash@0,3x.jpg"

const { Meta } = Card;

class ArticulosSoporte extends React.PureComponent {

    static propTypes = {
        className: PropTypes.string,
        isMobile: PropTypes.bool,
    }
    static defaultProps = {
        className: 'soporte-articulos',
    }

    render() {
        return (
            <div className='fondo-soporte-articulos'>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='soporte-articulos'>
                    <Col lg={20} className="articles-col">
                        <Row lg={20} className="articles-row" >
                        <Col lg={7} md={6} className="containerSoporteArticulos">
                            <Card
                                hoverable
                                cover={<img alt="example" src={Foto} />}
                            >
                                <Meta title="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, ut laoreet " 
                                description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam 
                                nonummy nibh magna aliquam erat volutpat. " />
                                <Link>
                                    Leer más
                                </Link>
                                        
                            </Card>
                        </Col>
                        <Col lg={7} md={6} className="containerSoporteArticulos">
                            <Card
                                hoverable
                                cover={<img alt="example" src={Foto} />}
                            >
                                <Meta title="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, ut laoreet " 
                                description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam 
                                nonummy nibh magna aliquam erat volutpat. " />
                                <Link>
                                    Leer más
                                </Link>
                            </Card>
                        </Col>
                        <Col lg={7} md={6} className="containerSoporteArticulos">
                            <Card
                                hoverable
                                cover={<img alt="example" src={Foto} />}
                            >
                                <Meta title="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, ut laoreet " 
                                description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam 
                                nonummy nibh magna aliquam erat volutpat. " />
                                <Link className="leerMas">
                                    Leer más
                                </Link>
                            </Card>
                        </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ArticulosSoporte;