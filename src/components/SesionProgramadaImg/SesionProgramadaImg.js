import React from 'react';
import PropTypes from 'prop-types';
import {enquireScreen} from 'enquire-js';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import {withRouter, Link} from 'react-router-dom';
import {Row, Col, Button} from 'antd';

let isMobile = false;
enquireScreen((b) => {
    isMobile = b;
});

class SesionProgramadaImg extends React.PureComponent {
    state = {
        isMobile,
        showShadow: false,
    };

    static propTypes = {
        className: PropTypes.string,
        isMobile: PropTypes.bool,
        navToShadow: PropTypes.func,
    }
    static defaultProps = {
        className: 'not-found',
    }

    render() {
        return (
                <div className='fondo-sesion-programada'>
                    <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                        {isMobile ?
                            <Col className="ipad-pro" xl={8} lg={12} md={16} sm={18} xs={20}>
                                <h1>¡Felicidades!</h1>
                                <p>Tu mentoría ha sido<br/> programada exitosamente</p>
                                <hr/>
                                <Link to='/calendar'>
                                    <Button size='large'>Ir al calendario</Button>
                                </Link>
                            </Col>
                            :
                            <Col xl={8} lg={12} md={16} sm={18} xs={20}>
                                <h1>¡Felicidades!</h1>
                                <p>Tu mentoría ha sido<br/> programada exitosamente</p>
                                <hr/>
                                <Link to='/calendar'>
                                    <Button size='large'>Ir al calendario</Button>
                                </Link>
                            </Col>
                        }

                    </Row>

                </div>
        )
    }
}

export default withRouter(SesionProgramadaImg);