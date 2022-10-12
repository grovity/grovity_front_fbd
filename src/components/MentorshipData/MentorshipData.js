
import {Col, Row, Button, Divider, Layout} from 'antd';
import React from 'react';
import './style.css';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import FilterTable_mentorship from "../FilterTable/FilterTable_mentorship";
import {Spin} from "antd";
import AppFrame from "../../components/AppFrame/AppFrame";
import CardMentor from "../CardMentor/CardMentor";
import TableHerramientas from '../TableHerramientas/TableHerramientas';

const {Header, Content} = Layout;

const MentorshipData = ({nombre, descripcion, mentor, onBack, auth: {user}, eventos, entidad}) => {
    /*useEffect(() => {
        fetchMentorshipsMentor(username)
    }, [username]);*/
    return user === null ? (
        <Spin></Spin>
    ) : (

        <Layout id='programs-entidad'>
            <Header>
                <Row gutter={[12]}>
                    <Col lg={17} md={12} xs={24} xl={18}>
                        <h3>{nombre}</h3>
                    </Col>
                    <Col lg={4} md={6} xs={12} xl={3} className='btns-header'>
                        <Link to={`/calendar`}>
                            <Button className='btn-verde-basico' type='primary' block>
                                Calendario
                            </Button>
                        </Link>
                    </Col>
                    <Col lg={3} md={6} xs={12} xl={3} className='btns-header'>
                        <Button className='btn-verde-basico' block onClick={onBack}>
                            Volver
                        </Button>
                    </Col>
                    <Divider className='header-marketplace'/>
                </Row>
            </Header>

            <Content style={{overflow: 'hidden'}} className='herramienta-info'>
                <Row gutter={[8,8]}>
                    <Col lg={24} md={24} xs={24} xl={12}>
                        <p>{descripcion}</p>
                    </Col>
                </Row>
                <Row gutter={[8,8]}>
                    {
                        mentor ? 
                        mentor.map((m, i) => {
                            return <CardMentor entidad={entidad} mentor={m} key={i}/>
                        })
                        :
                        <h3>No existen mentores en este momento</h3>
                    }
                </Row>
                <Row>
                    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                        <h3>Sesiones</h3>
                        <TableHerramientas eventos={eventos}/>                
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
};
const mapStateToProps = (state, props) => ({
    auth: state.auth,
    username: state.auth.user,

});

export default connect(mapStateToProps, null)(MentorshipData);
