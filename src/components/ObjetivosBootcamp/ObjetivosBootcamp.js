import React, { Fragment } from 'react';
import {Row, Col, Button} from 'antd';
import PropTypes from 'prop-types';
import './ObjetivosBootcamp.scss';
import ObjetivosJuntas from '../../assets/images/bootcamp/bonneval-sebastien-UIpFY1Umamw-unsplash.jpg'

class ObjetivosBootcamp extends React.PureComponent {

    static propTypes = {
        className: PropTypes.string,
        isMobile: PropTypes.bool,
    }
    static defaultProps = {
        className: 'objetivos-escuela',
    }

    render() {
        const {objetivos, dirigido, metodologia, isMobile} = this.props;
        return (
            <Fragment>
                {isMobile ?
                    <Row className='row-objetivos-bootcamp' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                        <Col className='texto-objetivos-xs' xs={20} offset={2}>
                            <h4>Objetivo</h4>
                            <p>
                                {objetivos}
                            </p>
                            <h4>Dirigido a</h4>
                            <p>
                                {dirigido}
                            </p>
                            <h4>Metodología</h4>
                            <p>
                                {metodologia}
                            </p>
                        </Col>
                    </Row>
                :
                    <Row className='row-objetivos-bootcamp' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                        
                        <Col className='texto-objetivos' md={12} xs={16} lg={10} offset={2}>
                            <h4>Objetivo</h4>
                            <p>
                                {objetivos}
                            </p>
                            <h4>Dirigido a</h4>
                            <p>
                                {dirigido}
                            </p>
                            <h4>Metodología</h4>
                            <p>
                                {metodologia}
                            </p>
                        </Col>
                        <Col md={14}>
                            <img src={ObjetivosJuntas} className='imagen-objetivos' />
                        </Col>
                    </Row>
                }
            </Fragment>
        );
    }
}

export default ObjetivosBootcamp;
