import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';

class JuntasAsesorasPodra extends React.PureComponent {

    static propTypes = {
        className: PropTypes.string,
        isMobile: PropTypes.bool,
    }
    static defaultProps = {
        className: 'bootcmap-podra',
    }

    render() {
        const {podra1, podra2, podra3, podra4} = this.props;
        return (
            <Row className='bootcamp-podra' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col className="containerBootcampPodra" span={24}>
                    <Row className='title'>
                        <h2>Con este programa lograrás:</h2>
                        <hr/>
                    </Row>
                    <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                        <Col className="chart bootcamp-1" xs={12} md={6}>                                
                                <h1>1</h1>
                                <p>{podra1}</p>
                        </Col>
                        <Col className="chart bootcamp-2" xs={12} md={6}>
                                <h1>2</h1>
                                <p>{podra2}</p>
                        </Col>
                            <Col className="chart bootcamp-3" xs={12} md={6}>
                                <h1>3</h1>
                                <p>{podra3}</p>
                        </Col>
                        <Col className="chart bootcamp-4" xs={12} md={6}>
                                <h1>4</h1>
                                <p>{podra4}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default JuntasAsesorasPodra;