import React, {useState, useEffect} from 'react'
import {Col, Row, Divider, Tabs, Card, Avatar} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {
    selectCurrentUser,
} from "../../selectors/users";
import {connect} from "react-redux";
import {enquireScreen} from 'enquire-js';
import { SiPinboard } from "react-icons/si";


const {TabPane} = Tabs;
const {Meta} = Card;

const TabsMentorInfo = (props) => {
    const {user} = props

    const [isMobile, setIsMobile] = useState(false);

    enquireScreen((b) => {
        return () => {
            setIsMobile(b);
        }
    })

    useEffect(() => {
        enquireScreen((b) => {
            setIsMobile(
                !!b
            );
        });
    }, [isMobile])


    return (
        <Row id='tabs-mentor-info' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col lg={24} xs={24} md={24}>
                <Tabs size="large" defaultActiveKey="1">
                    <TabPane
                        tab={
                            <span>
                        Áreas de experticia
                        </span>
                        }
                        key="1"
                    >
                        <Card
                            style={{width: '100%'}}
                        >
                                {
                                    Array.isArray(user.skills) ?
                                        user.skills.map(skill =>
                                            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} style={{marginBottom: '3%'}}>
                                            {isMobile ?
                                                <Col lg={3} md={5} xs={0}></Col>
                                                :
                                                <Col lg={3} md={5} xs={4}>
                                                    <Meta
                                                        avatar={<SiPinboard size={20} style={{color: 'var(--primary-text-color)'}}/>}
                                                    />
                                                </Col>
                                            }
                                            <Col lg={19} md={18} xs={22}>
                                                <Meta
                                                    title={skill.tag.name}
                                                    description={skill.description}
                                                />
                                            </Col>
                                            
                                            </Row>
                                        )
                                        :
                                        <Row>
                                            <span></span>
                                        </Row>
                                }
                           
                        </Card>
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state, props) => ({

});

export default connect(mapStateToProps, null)(TabsMentorInfo)