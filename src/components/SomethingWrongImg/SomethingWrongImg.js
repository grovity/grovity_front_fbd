import React from 'react';
import PropTypes from 'prop-types';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import {withRouter} from 'react-router-dom';
import { Row, Col, Button } from 'antd';


class SomethingWrongImg extends React.PureComponent {


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
                        <h1>500</h1>
                        <p>Ups! Algo ha salido mal, <br/> vuelve a intentarlo</p>
                        <hr/>
                        <Button onClick={() => this.props.history.goBack()} size='large'>Volver</Button>
                    </Col>
                </Row>
                
            </div>
        )
    }
}

export default withRouter(SomethingWrongImg);