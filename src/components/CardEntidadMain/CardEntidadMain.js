import React from 'react'
import {Card, Col, Row} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {getStatusMentor} from "../../selectors/users";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";


function CardEntidadMain({titulo, icon}) {
    return (
            <Card>
                <Row id="card-entidad-main">
                    <Col lg={12} xs={8} md={3} xl={6} xxl={6} id='col-icon'>
                        <div>{icon}</div>
                    </Col>
                    <Col lg={16} xs={14} md={17} xl={14} xxl={14} id='col-stat'>
                        <h5>{titulo}</h5>
                    </Col>
                </Row>
            </Card>
    )
}

const mapStateToProps = state => ({
    status: getStatusMentor(state),
});

export default withRouter(connect(mapStateToProps, null)(CardEntidadMain));