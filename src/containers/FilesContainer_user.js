import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';
import {getIdInstitution, getUsername} from "../selectors/institutions";
import {loadUser} from "../actions/auth";
import {fetchFilesByEvent, fetchFilesByUser} from "../actions/files";
import {getStatusMentor} from "../selectors/users";
import FilterTable_files from "../components/FilterTable_filesAll/FilterTable_files";
import AppFrame from "../components/AppFrame/AppFrame";
import {Button, Divider, Layout, Spin, Row, Col} from 'antd';
import {getet} from "../selectors/institutions";


const {Header, Content} = Layout;

class FilesContainer_user extends Component {

    constructor(props) {
        super(props);

        this.state = {
            spinner: true,

        };
    }

    componentDidMount = async () =>  {
        await this.props.fetchFilesByUser(this.props.match.params.id, this.props.status, this.props.username_mentor)

        this.setState({
            spinner: false,
        })
    }

    handleOnBack = () => {
        this.props.history.goBack();
    };

    

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
                                <Col lg={21} md={20} xs={24} xl={21}>
                                    {
                                        (!this.props.status && !this.props.id_institution) || (this.props.match.params.id === this.props.username_mentor)?
                                            <h3>Mis archivos</h3>
                                            :
                                            <h3>Documentos {this.props.et.toLowerCase()}</h3>
                                    }
                                </Col>
                                <Col lg={3} md={4} xs={12} xl={3} className='btns-header'>
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
                                    <FilterTable_files allfiles={files}/>
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
                {!this.state.spinner ? this.renderBody(this.props.files) : <div className="spinner">
                    <Spin size="large"/>
                </div>}
            </AppFrame>
        )
    }
}

FilesContainer_user.propTypes = {
    files: PropTypes.array.isRequired,
};

FilesContainer_user.defaultProps = {
    files: []
};

const mapStateToProps = state => ({
    files: state.files_users,
    id_institution: getIdInstitution(state),
    status: getStatusMentor(state),
    username_mentor: getUsername(state),
    et: getet(state).split('-')[0],
});

//mapStateToprops(values) ijecta valores como propiedades (recibe el estado y se devuelve un objeto con las propiedades que queremos para injectarlas al componente) accedemos a esas propiedades con this.props
//mapDispatchToProps(funciones) injecta las funciones como propiedades del componente y se hace la validación a través del proptypes
// al ejecutar funciones se actualizan los valores del mapStateToProps lo que obliga a nueva renderizaciones
export default withRouter(connect(mapStateToProps, {
    fetchFilesByEvent,
    fetchFilesByUser,
    loadUser,
})(FilesContainer_user));
