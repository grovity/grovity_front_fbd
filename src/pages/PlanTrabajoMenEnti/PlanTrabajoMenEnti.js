import React, {useState, useEffect} from 'react'
import {Row, Col, Button, Layout, Divider, Input, Empty, Spin} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {
    getStatusMentor,
    getIdUser, getStatusEmpresa,
    getStatusEmpresa_desdementor,
    selectEmpresa
} from "../../selectors/users";
import {getUsername} from "../../selectors/institutions";
import {
    fetchEmpresaEmprendedor,
    fetchEmpresaEmprendedorbyusername,
    fetchUsersbyId
} from "../../actions/fetchUsers";
import AppFrame from "../../components/AppFrame/AppFrame";
import {enquireScreen} from 'enquire-js';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {fetchProgram} from "../../actions/fetchPrograms";
import getJsonStrError from "../../helpers/handleJsonErrors";
import {editProgram} from "../../api";
import {loadUser} from "../../actions/auth";
import {setAlert} from "../../actions/alert";
import {getStatusEntidad} from "../../selectors/institutions";

import PlanTrabajoEmprendedor from '../../components/PlanTrabajoEmprendedor/PlanTrabajoEmprendedor';
import PlanTrabajoInfoMain from '../../components/PlanTrabajoInfoMain/PlanTrabajoInfoMain';
import FotoPerfilEmprendedor from '../../components/FotoPerfilEmprendedor/FotoPerfilEmprendedor';
import {fetchPlanbyIdMentor} from "../../actions/fetchPlan";

const {Header, Content} = Layout;
const {Search} = Input;

const PlanTrabajoMenEnti = (props) => {

    const {user, id, status, entidad, program, plan} = props
    const [isMobile, setIsMobile] = useState(false);
    const [loading, setLoading] = useState(true);


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

    useEffect(() => {
        (async () => {
            await props.fetchUsersbyId(id)
            await props.fetchPlanbyIdMentor(program.id ? program.id: props.match.params.id_program, id)
            setLoading(false)

        })()
    }, [program.id, id])

    return (
        <AppFrame>
            {
                loading && (
                    <div className='position-absolute d-flex justify-content-center align-items-center w-100 h-100'
                         style={{left: '0', top: '0'}}>
                        <Spin size='large' className='mt-5'/>
                    </div>
                )
            }
            {
                !loading && (
                    <Layout id='program-menenti'>
                        <Header>
                            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} className='row-title'>
                                <Col lg={21} md={18} xs={24} xl={21}>
                                    <h3>Plan de trabajo</h3>
                                </Col>
                                <Col lg={3} md={6} xs={12} xl={3} className='btns-header'>
                                    <Button className='btn-verde-basico' type='primary' block onClick={() => props.history.goBack()}>
                                        Volver
                                    </Button>
                                </Col>
                                <Divider className='header-marketplace'/>
                            </Row>
                        </Header>

                        <Content style={{overflow: 'hidden'}}>
                            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} className='row-user-plan'>
                                <Col lg={5} md={7} xs={24}>
                                    <FotoPerfilEmprendedor user={user}/>
                                </Col>
                                <Col lg={19} md={17} xs={24}>
                                    <PlanTrabajoInfoMain {...program} entidad={entidad} id_program={program?.id ? program.id : props.id_program} user={user}/>
                                    <Divider className='ant-divider-horizontal'/>
                                </Col>
                            </Row>
                            {
                                plan.length === 0 && (
                                    <Row>
                                        <Col lg={5} md={0} xs={0}></Col>
                                        <Col lg={19} md={17} xs={24}>
                                            <Empty className='no-plan'
                                                   image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                   imageStyle={{
                                                       height: 60,
                                                   }}
                                                   description={
                                                       <span> Este usuario no tiene plan de trabajo para este programa aún</span>
                                                   }
                                            >
                                            </Empty>
                                        </Col>
                                    </Row>
                                )
                            }
                            {
                                plan.length !== 0 && (
                                    <PlanTrabajoEmprendedor plan={plan} status={status} entidad={entidad} id_program={program?.id ? program.id : props.match.params.id_program}
                                                            id_user={props.match.params.id}/>
                                )
                            }
                            {/* <Pagination defaultCurrent={1} total={mentores_marketplace.count-20} style={{overflowY: 'scroll'}} /> */}
                        </Content>
                    </Layout>
                )
            }
        </AppFrame>
    )
}

PlanTrabajoMenEnti.defaultProps = {
    programs: {}
};

const mapStateToProps = state => ({
    program: state.programs,
    entidad: getStatusEntidad(state),
    status: getStatusMentor(state),
    user: state.user[0],
    id_usuario: getIdUser(state),
    username: getUsername(state),
    empresa: getStatusEmpresa_desdementor(state),
    empresa_status: getStatusEmpresa(state),
    empresa_info: selectEmpresa(state),
    plan: state.plan_user,
});

export default withRouter(connect(mapStateToProps, {
    fetchUsersbyId,
    fetchEmpresaEmprendedor,
    fetchEmpresaEmprendedorbyusername,
    fetchPlanbyIdMentor,
    fetchProgram,
    editProgram,
    setAlert,
    loadUser,
    getJsonStrError
})(PlanTrabajoMenEnti));