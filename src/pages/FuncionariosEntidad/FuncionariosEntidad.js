import React, {useState, useEffect} from 'react'
import {Row, Col, Button, Layout, Divider, Modal} from 'antd';
import PropTypes from 'prop-types';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {getStatusEntidad, getIdInstitution} from "../../selectors/institutions";
import AppFrame from "../../components/AppFrame/AppFrame";
import {enquireScreen} from 'enquire-js';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import TableFuncionarios from '../../components/TableFuncionarios/TableFuncionarios';
import InvitaFuncionario from '../../components/InvitaMentor/InvitaFuncionario';
import {fetchFuncionarios} from "../../actions/fetchUsers";

const {Header, Content} = Layout;


const FuncionariosEntidad = (props) => {
    const {id_institution, funcionarios} = props
    const [isMobile, setIsMobile] = useState(false);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    //________________________________
    // abre modal nuevo funcionario
    const handleAddNew = () => {
        setVisible(true);
    };
    //________________________________
    // cierra modal nuevo funcionario
    const handleCancel = () => {
        setVisible(false);
    };


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

    useEffect(()=>{
        (async()=>{
            await props.fetchFuncionarios(id_institution)
        })()
    },[id_institution])




    return (
        <AppFrame>
            <Layout id='mentores-entidad'>
                <Header>
                    <Row gutter={[16, 16]}>
                        <Col lg={14} md={24} xs={24} xl={17}>
                                    <h3>Funcionarios</h3>
                        </Col>
                                <Col lg={5} md={8} xs={9} xl={4} className='btns-header'>
                                        <Button className='btn-verde-basico' block onClick={handleAddNew}>
                                            Nuevo Usuario
                                        </Button>
                                </Col>
                                <Modal
                                    className="modales-plan"
                                    visible={visible}
                                    title="Invitar Usuario"
                                    onCancel={handleCancel}
                                    width={600}
                                    footer={[]}
                                >
                                    <InvitaFuncionario onCancel={handleCancel} loading={loading} setLoading={setLoading}
                                                       setVisible={setVisible}
                                                />
                                </Modal>
                                    {
                                        isMobile ?
                                            <Col lg={0} md={5} xs={0} xl={0} className='btns-header'>
                                                <Button className='btn-verde-basico' block onClick={() => props.history.goBack()}>
                                                    Volver
                                                </Button>
                                            </Col>
                                            :
                                            <Col lg={3} md={5} xs={12} xl={3} className='btns-header'>
                                                <Button className='btn-verde-basico' block onClick={() => props.history.goBack()}>
                                                    Volver
                                                </Button>
                                            </Col>
                                    }
                        <Divider className='header-marketplace'/>
                    </Row>
                </Header>

                <Content style={{overflow: 'hidden'}} className='content-funcionarios'>
                    <Row gutter={[8,16]}>
                        <Col lg={24} xs={24} md={24}>
                            <TableFuncionarios funcionarios={funcionarios}/>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </AppFrame>
    )
}

FuncionariosEntidad.propTypes = {
    funcionarios: PropTypes.array.isRequired,
};

FuncionariosEntidad.defaultProps = {
    funcionarios: []
};

const mapStateToProps = state => ({
    entidad: getStatusEntidad(state),
    id_institution: getIdInstitution(state),
});

export default withRouter(connect(mapStateToProps, {
     fetchFuncionarios,
})(FuncionariosEntidad));