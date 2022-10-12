import React from 'react'
import {Card, Col, Row} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {getStatusMentor} from "../../selectors/users";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";


function CardItemStat({titulo, icon, stat}) {
    return (
            <Card>
                <Row id="card-stat">
                    <Col lg={10} xs={12} md={12} id='col-icon'>
                        <Row justify='center' align='middle'>
                            {icon}
                        </Row>
                    </Col>
                    <Col lg={14} xs={12} md={12} id='col-stat'>
                        <h5>{titulo}</h5>
                        <h4>{stat}</h4>
                    </Col>
                </Row>
            </Card>
    )
}

const mapStateToProps = state => ({
    status: getStatusMentor(state),
});

export default withRouter(connect(mapStateToProps, null)(CardItemStat));