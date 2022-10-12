import React, {useState, useEffect} from 'react'
import {Row, Col, Layout, Divider} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import FotoPerfilMentor from '../../components/FotoPerfilMentor/FotoPerfilMentor';
import MentorInfoMain from '../../components/MentorInfoMain/MentorInfoMain';
import MentorInfoBasica from '../../components/MentorInfoBasica/MentorInfoBasica';
import TabsMentorInfo from '../../components/TabsMentorInfo/TabsMentorInfo';
import {enquireScreen} from 'enquire-js';
import {connect} from "react-redux";
import ReviewMentor from "../../components/ReviewsPerfilMentor/ReviewMentor";
import SiderDisponibilidad from '../../components/SiderDisponibilidad/SiderDisponibilidad';
import FooterDisponibilidad from '../../components/FooterDisponibilidad/FooterDisponibilidad';
import {getId} from "../../selectors/institutions";
import {fetchDisponibilidadMentor} from "../../actions/marketplace";




const { Header, Footer, Sider, Content } = Layout;

const PerfilMentor = (props) => {
    const {user, calificacion, id, events, status, current_user, entidad} = props
    
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
        props.fetchDisponibilidadMentor(id)
    }, [isMobile, id])

    return (
        <Layout id='perfil-mentor-detalle'>
            <Header>
                <h3>Perfil mentor</h3>
                <Divider/>
            </Header>
            <Layout>
            <Content>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col lg={5} md={7} xs={24}>
                        <FotoPerfilMentor user={user}/>
                    </Col>
                    <Col lg={13} md={17} xs={24}>
                        <MentorInfoMain user={user} calificacion={calificacion} current_user={current_user}
                        entidad={entidad}/>
                    </Col>
                </Row>
                <Row>
                    <Col lg={18} md={24} xs={24}>
                        <MentorInfoBasica user={user} current_user={current_user}/>
                    </Col>
                </Row>
                <Row>
                    <Col lg={18} md={24} xs={24}>
                        <TabsMentorInfo user={user}/>
                    </Col>
                </Row>
                <Row>
                    <Col lg={18} md={24} xs={24}>
                        <ReviewMentor calificacion={calificacion} username={user?.username}/>
                    </Col>
                </Row>
            </Content>

            {isMobile ?

                    !current_user ?
                        <Footer
                    style={{
                        overflow: 'auto',
                        height: 'auto',
                        position: 'fixed',
                        right: '0%',
                        bottom: 0,
                        width: '100%',
                        zIndex: '1',
                    }}
                >
                    <FooterDisponibilidad/>
                </Footer>:
                        <span></span>


            :

                !current_user ?
                <Sider
                    style={{
                        height: 'auto',
                        position: 'absolute',
                        right: '1%',
                        backgroundColor: '#fff',
                        zIndex: '1',
                    }}
                    width="390"
                    theme= 'light'
                    breakpoint='xl'
                    collapsedWidth='0'
                    onBreakpoint={broken => {
                      }}
                      onCollapse={(collapsed, type) => {
                      }}
                >
                    <SiderDisponibilidad events={events} status={status}/>
                </Sider>:
                <span></span>


            }
            </Layout>   
        </Layout>
    )
}

const mapStateToProps = (state, props) => ({
    id: getId(state)
});

export default connect(mapStateToProps, {
    fetchDisponibilidadMentor
})(PerfilMentor)
