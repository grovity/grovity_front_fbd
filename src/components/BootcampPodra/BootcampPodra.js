import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'antd';
import './BootcampPodra.scss'

class BootcampPodra extends React.PureComponent {

    static propTypes = {
        className: PropTypes.string,
        isMobile: PropTypes.bool,
    }
    static defaultProps = {
        className: 'bootcmap-podra',
    }

    render() {
        const {podra1, podra2, podra3, podra4, podra5, podra6, podra7} = this.props;
        return (
            <Row className='bootcamp-podra' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col className="containerBootcampPodra" span={24}>
                <Row className='title'>
                    <h2>Con este programa podrás:</h2>
                    <hr/>
                </Row>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col className="chart bootcamp-1" xs={12} md={6}>
                            {/* {isMobile ?
                                <img classname="iconos-grovity-home" width="60px" src={ProyectosSmall} />
                                :
                                <img classname="iconos-grovity-home" width="120px" src={Proyectos} />}    */}
                            
                            <h1>1</h1>
                            <p>{podra1}</p>
                    </Col>
                    <Col className="chart bootcamp-2" xs={12} md={6}>
                            {/* {isMobile ?
                                <img classname="iconos-grovity-home" width="60px" src={ObjetivosSmall} />
                                :
                                <img classname="iconos-grovity-home" width="120px" src={Objetivos} />}  */}
                            <h1>2</h1>
                            <p>{podra2}</p>
                    </Col>
                        <Col className="chart bootcamp-3" xs={12} md={6}>
                            {/* {isMobile ?
                                <img classname="iconos-grovity-home" width="60px" src={ProblemasSmall} />
                                :
                                <img classname="iconos-grovity-home" width="120px" src={Problemas} />}  */}
                            <h1>3</h1>
                            
                            <p>{podra3}</p>
                    </Col>
                    <Col className="chart bootcamp-4" xs={12} md={6}>
                            {/* {isMobile ?
                                <img classname="iconos-grovity-home" width="60px" src={IdeasSmall} />
                                :
                                <img classname="iconos-grovity-home" width="120px" src={Ideas} />}  */}
                            <h1>4</h1>
                            
                            <p>{podra4}</p>
                    </Col>
                </Row>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col className="chart bootcamp-4" xs={12} md={8}>
                            {/* {isMobile ?
                                <img classname="iconos-grovity-home" width="60px" src={ProyectosSmall} />
                                :
                                <img classname="iconos-grovity-home" width="120px" src={Proyectos} />}    */}
                            
                            <h1>5</h1>
                            <p>{podra5}</p>
                    </Col>
                    <Col className="chart bootcamp-1" xs={12} md={8}>
                            {/* {isMobile ?
                                <img classname="iconos-grovity-home" width="60px" src={ObjetivosSmall} />
                                :
                                <img classname="iconos-grovity-home" width="120px" src={Objetivos} />}  */}
                            <h1>6</h1>
                            <p>{podra6}</p>
                    </Col>
                        <Col className="chart bootcamp-2" xs={24} md={8}>
                            {/* {isMobile ?
                                <img classname="iconos-grovity-home" width="60px" src={ProblemasSmall} />
                                :
                                <img classname="iconos-grovity-home" width="120px" src={Problemas} />}  */}
                            <h1>7</h1> 
                            <p>{podra7}</p>
                    </Col>
                </Row>
                </Col>
            </Row>
        );
    }
}

export default BootcampPodra;