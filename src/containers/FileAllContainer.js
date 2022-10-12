import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';
import {getUsername} from "../selectors/institutions";
import {loadUser} from "../actions/auth";
import {fetchFilesEventsAll} from "../actions/files";
import {getStatusMentor} from "../selectors/users";
import FilterTable_filesAll from "../components/FilterTable_filesAll/FilterTable_filesAll";
import {selectAllEvents} from "../selectors/events";
import {Spin, Button, Divider, Layout, Row, Col} from "antd";
import AppFrame from "../components/AppFrame/AppFrame";

const {Header, Content} = Layout;

class FileAllContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,

        };
    }

    componentDidMount = async () => {
        await this.props.fetchFilesEventsAll(this.props.username)
        this.setState({
            loading: false,
        })

    }

    renderBody = files => (
        <>           
            {this.state.loading && (
                <div className='position-absolute d-flex justify-content-center align-items-center w-100 h-100'
                    style={{left: '0', top: '0'}}>
                    <Spin size='large' className='mt-5'/>
                </div>
            )}
            {
                !this.state.loading && (
                    <Layout id='program-emprendedor'>
                        <Header>
                            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>    
                                <Col lg={13} md={10} xs={24} xl={15}>
                                    <h3>Mis documentos</h3>
                                </Col>
                                <Col lg={4} md={5} xs={10} xl={3} className='btns-header'>
                                    <a href={'https://drive.google.com/drive/folders/11WODEq-j7Es2noOYMnAP_AoTd5T5-jUO'}
                                        target='_blank'>
                                        <Button className='btn-verde-basico' block>
                                            Contenido Grovity
                                        </Button>
                                    </a>
                                </Col>
                                <Col lg={4} md={5} xs={7} xl={3} className='btns-header'>
                                    <Link to={`/files/user/${this.props.username}`}>
                                        <Button className='btn-verde-basico' block>
                                            Mis archivos
                                        </Button>
                                    </Link>
                                </Col>

                                <Col lg={3} md={4} xs={7} xl={3} className='btns-header'>
                                    <Button className='btn-verde-basico' block
                                            onClick={() => this.props.history.goBack()}>
                                        Volver
                                    </Button>
                                </Col>
                                <Divider className='header-marketplace'/>
                            </Row>
                        </Header>
                        <Content style={{overflow: 'hidden'}} className='calendar-container'>
                            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                                <Col lg={24} md={24} xs={24}>
                                    <FilterTable_filesAll allfiles={this.props.allEvents} status={this.props.status}/>
                                </Col>
                            </Row>
                        </Content>
                </Layout>
            )
        }
        </>
    );

    render() {
        return (
            <AppFrame>
                {this.renderBody(this.props.files)}
            </AppFrame>
        )
    }
}

FileAllContainer.propTypes = {
    allEvents: PropTypes.array.isRequired,
};

FileAllContainer.defaultProps = {
    AllEvents   : []
};

const mapStateToProps = state => ({
    status: getStatusMentor(state),
    username: getUsername(state),
    allEvents: selectAllEvents(state)
});

//mapStateToprops(values) ijecta valores como propiedades (recibe el estado y se devuelve un objeto con las propiedades que queremos para injectarlas al componente) accedemos a esas propiedades con this.props
//mapDispatchToProps(funciones) injecta las funciones como propiedades del componente y se hace la validación a través del proptypes
// al ejecutar funciones se actualizan los valores del mapStateToProps lo que obliga a nueva renderizaciones
export default withRouter(connect(mapStateToProps, {
    loadUser,
    fetchFilesEventsAll,
})(FileAllContainer));