import React from 'react';
import PropTypes from 'prop-types';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import {withRouter, Link} from 'react-router-dom';
import { Row, Col, Button } from 'antd';


class SesionNoImg extends React.PureComponent {


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
            <div className='fondo-something-wrong'>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col xl={8} lg={12} md={16} sm={18} xs={20}>
                        <h1>Ups! Algo ha salido mal </h1>
                        <p>Error al procesar el pago, <br/> vuelve a intentarlo</p>
                        <hr/>
                        <Link to='/calendar'>
                            <Button size='large'>Ir al calendario</Button>
                        </Link>
                    </Col>
                </Row>
                
            </div>
        )
    }
}

export default withRouter(SesionNoImg);