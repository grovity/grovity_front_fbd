import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'antd';
import './ConJuntasPodra.scss'

class ConJuntasPodra extends React.PureComponent {

    static propTypes = {
        className: PropTypes.string,
        isMobile: PropTypes.bool,
    }
    static defaultProps = {
        className: 'con-juntas-podra',
    }

    render() {
        const {podra1, podra2, podra3, podra4} = this.props;
        return (
            <Row className='con-juntas-podra' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col className="containerJuntasPodra" span={24}>
                <Row className='title'>
                    <h2>Con este programa logrará:</h2>
                    <hr/>
                </Row>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col className="chart que-hacemos-por-ti-1" xs={12} md={6}>
                            {/* {isMobile ?
                                <img classname="iconos-grovity-home" width="60px" src={ProyectosSmall} />
                                :
                                <img classname="iconos-grovity-home" width="120px" src={Proyectos} />}    */}
                            
                            <h1>1</h1>
                            <p>{podra1}</p>
                    </Col>
                    <Col className="chart que-hacemos-por-ti-2" xs={12} md={6}>
                            {/* {isMobile ?
                                <img classname="iconos-grovity-home" width="60px" src={ObjetivosSmall} />
                                :
                                <img classname="iconos-grovity-home" width="120px" src={Objetivos} />}  */}
                            <h1>2</h1>
                            <p>{podra2}</p>
                    </Col>
                        <Col className="chart que-hacemos-por-ti-3" xs={12} md={6}>
                            {/* {isMobile ?
                                <img classname="iconos-grovity-home" width="60px" src={ProblemasSmall} />
                                :
                                <img classname="iconos-grovity-home" width="120px" src={Problemas} />}  */}
                            <h1>3</h1>
                            
                            <p>{podra3}</p>
                    </Col>
                    <Col className="chart que-hacemos-por-ti-4" xs={12} md={6}>
                            {/* {isMobile ?
                                <img classname="iconos-grovity-home" width="60px" src={IdeasSmall} />
                                :
                                <img classname="iconos-grovity-home" width="120px" src={Ideas} />}  */}
                            <h1>4</h1>
                            
                            <p>{podra4}</p>
                    </Col>
                </Row>
                </Col>
            </Row>
        );
    }
}

export default ConJuntasPodra;