import {Link, withRouter} from 'react-router-dom';
import React, {Component} from 'react';
import {Col, Row, Tabs, Card, } from 'antd';
import {connect} from "react-redux";
import './style.css';
import './ReportsContainer.scss';
import AppFrame from "../components/AppFrame/AppFrame";
import {enquireScreen} from 'enquire-js';
import ReportEntityPerProgramContainer from '../containers/ReportEntityPerProgramContainer';



const {TabPane} = Tabs;
const {Meta} = Card;


let isMobile = false;
enquireScreen((b) => {
    isMobile = b;
});

class ReportsContainer extends Component {
    
    state = {
        isMobile,
        showShadow: false,
    };
    componentDidMount() {
        //this.props.fetchInstitutions();
        enquireScreen((b) => {
            this.setState({
                isMobile: !!b,
            });
        });
    }
    

    render() {
        return (
            <AppFrame>
                <div className='container' id="tabs-control-indicadores-entidad">
                    <Tabs size="large" defaultActiveKey="1">
                        <TabPane
                            tab={<span>Tablero de control programas</span>}
                            key="1"
                        >
                            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} style={{marginBottom: '3%'}}>
                                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                    <ReportEntityPerProgramContainer/>
                                </Col>            
                            </Row>
                        </TabPane>
                    </Tabs>
                </div>
            </AppFrame>
        )
    }
}

const mapStateToProps = state => ({});

export default withRouter(connect(mapStateToProps, {})(ReportsContainer));
