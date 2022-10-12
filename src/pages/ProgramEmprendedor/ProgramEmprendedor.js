import React, {useState, useEffect} from 'react'
import {Row, Col, Button, Layout, Divider, Modal, Empty, Spin} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import AppFrame from "../../components/AppFrame/AppFrame";
import {enquireScreen} from 'enquire-js';
import {
    getStatusMentor,
} from "../../selectors/users";
import {withRouter, Link} from "react-router-dom";
import {connect} from "react-redux";
import {fetchEmprendedoresbyProgram} from "../../actions/fetchUsers";
import {fetchProgram,} from "../../actions/fetchPrograms";
import {fetchMentors, fetchMentorsByProgram} from "../../actions/fetchMentors";
import {getMentorshipsbyMentor} from "../../selectors/mentorships";
import getJsonStrError from "../../helpers/handleJsonErrors";
import {editProgram, getMentorsByProgram} from "../../api";
import {loadUser} from "../../actions/auth";
import {setAlert} from "../../actions/alert";
import {getId, getStatusEntidad, getUsername} from "../../selectors/institutions";
import ImgPrograma from '../../components/ImgPrograma/ImgPrograma';
import ProgramInfoMain from '../../components/ProgramInfoMain/ProgramInfoMain';
import ProgramMentores from '../../components/ProgramMentores/ProgramMentores';
import PlanTrabajoEmprendedor from '../../components/PlanTrabajoEmprendedor/PlanTrabajoEmprendedor';
import FormCrearPlan from '../../components/FormCrearPlan/FormCrearPlan';
import {fetchPlanbyId} from "../../actions/fetchPlan";
// import ProgramMenteesmentors from '../../components/ProgramMenteesMentors/ProgramMenteesmentors';
import ProgramEdit from "../../components/ProgramEdit/ProgramEdit";

const {Header, Content} = Layout;

const ProgramEmprendedor = (props) => {

    const {user, id, status, entidad, program, mentorships, plan, id_user, mentors_program} = props

    const [isMobile, setIsMobile] = useState(false);
    const [idInstitution, setIdInstitution] = useState(null);
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(false);

      //________________________________
    // abre modal nuevo programa
    const handleModalEdit = () => {
        setVisible2(true)
    };

    const showModal = () => {
        setVisible(true);
    }

    const handleOk = () => {
        // setLoading(true);
        // setTimeout(() => {
        //     setLoading(false);
        //     setVisible(false);
        // }, 1000);
    };

    const handleCancel = () => {
        setVisible2(false);

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

    useEffect(() => {
        (async () => {
            if (!status) {
                await props.fetchPlanbyId(props.match.params.id)
            }
            await props.fetchProgram(props.match.params.id)
            setLoading(false)
            let obj = await selectIdEntidad(program.id)
            await setIdInstitution(obj?.entidad)
            if (entidad) {
                await props.fetchMentorsByProgram(props.match.params.id)
            }
        })()
    }, [props.match.params.id])

    const selectIdEntidad = (idPrograma) => {
        let ob = mentorships.find(c => {
            return c.programa == idPrograma
        })
        return ob
    }


      const handleModal2 = () => {
        setVisible2(true)
    };
    return (
        <AppFrame>

            <Modal
                className='modales-plan'
                title="Editar programa"
                centered
                visible={visible2}
                onOk={() => setVisible2(false)}
                onCancel={() => setVisible2(false)}
                width={1000}
            >
                <ProgramEdit setLoading={setLoading2} setVisible={setVisible2} loading={loading2}
                                 onCancel={handleCancel}/>
            </Modal>
            
                {loading && (
                    <div className='position-absolute d-flex justify-content-center align-items-center w-100 h-100'
                         style={{left: '0', top: '0'}}>
                        <Spin size='large' className='mt-5'/>
                    </div>
                )}
                {
                    !loading && (
                        <Layout id='program-emprendedor'>
                            <Header>
                                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                                    {
                                        !entidad ?
                                            <>
                                                <Col lg={16} md={12} xs={24} xl={17}>
                                                    <h3>Información del programa</h3>
                                                </Col>
                                                <Col lg={5} md={6} xs={12} xl={4} className='btns-header'>
                                                    <Link to={`mentorships/${id}`}>
                                                        <Button className='btn-verde-basico' block>
                                                            Herramientas
                                                        </Button>
                                                    </Link>
                                                </Col>
                                                <Col lg={3} md={6} xs={12} xl={3} className='btns-header'>
                                                    <Button className='btn-verde-basico' block
                                                            onClick={() => props.history.goBack()}>
                                                        Volver
                                                    </Button>
                                                </Col>
                                            </>
                                            :
                                            <>
                                                <Col lg={13} md={10} xs={24} xl={14}>
                                                    <h3>Información del programa</h3>
                                                </Col>
                                                <Col lg={4} md={5} xs={10} xl={4} className='btns-header'>
                                                    <Link to={`mentorships/${id}`}>
                                                        <Button className='btn-verde-basico' block>
                                                            Herramientas
                                                        </Button>
                                                    </Link>
                                                </Col>
                                                <Col lg={4} md={5} xs={7} xl={3} className='btns-header'>
                                                        <Button className='btn-verde-basico' block onClick={handleModal2}>
                                                            Editar
                                                        </Button>
                                                </Col>

                                                <Col lg={3} md={4} xs={7} xl={3} className='btns-header'>
                                                    <Button className='btn-verde-basico' block
                                                            onClick={() => props.history.goBack()}>
                                                        Volver
                                                    </Button>
                                                </Col>
                                            </>
                                    }
                                    <Divider className='header-marketplace'/>
                                </Row>
                            </Header>
                            <Content style={{overflow: 'hidden'}}>
                                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                                    <Col lg={5} md={7} xs={24}>
                                        <ImgPrograma user={user} program={program}/>
                                    </Col>
                                    <Col lg={19} md={17} xs={24}>
                                        <ProgramInfoMain {...program} entidad={entidad} status={status} id={id}/>
                                        <Divider className='ant-divider-horizontal'/>
                                    </Col>
                                </Row>
                                {/*{*/}
                                {/*    status && (*/}
                                {/*         <ProgramMentores emprendedores={users} mentorships={mentorships} program={program}/>*/}
                                {/*    )*/}
                                {/*}*/}
                                {
                                    !status && !entidad && plan.length === 0 ?
                                        <>
                                            <Row>
                                                <Col lg={5} md={0} xs={0}></Col>
                                                <Col lg={19} md={17} xs={24}>
                                                    <Empty className='no-plan'
                                                           image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                           imageStyle={{
                                                               height: 60,
                                                           }}
                                                           description={
                                                               <span>No tiene un plan de trabajo registrado</span>
                                                           }
                                                    >
                                                        <Button type="primary" className='btn-verde-basico' onClick={showModal}>Crear plan de
                                                            trabajo</Button>
                                                    </Empty>
                                                </Col>
                                                <Modal
                                                    className="modales-plan"
                                                    visible={visible}
                                                    title="Crear Plan"
                                                    onOk={handleOk}
                                                    onCancel={handleCancel}
                                                    width={600}
                                                    footer={[]}
                                                >
                                                <FormCrearPlan id_program={id} setVisible={setVisible} status={status}/>
                                            </Modal>
                                        </Row>
                                    </> :
                                    !status && !entidad && plan.length !== 0 ?
                                        <PlanTrabajoEmprendedor id_user={id_user} id_program={id} status={status} plan={plan}/>
                                        :
                                        <ProgramMentores mentorships={mentorships}
                                                         program={program}
                                                         id_institution={idInstitution}
                                                         id_program={id}/>
                            }
                            {/* <Pagination defaultCurrent={1} total={mentores_marketplace.count-20} style={{overflowY: 'scroll'}} /> */}
                        </Content>
                    </Layout>
                )
            }
        </AppFrame>
)
}

ProgramEmprendedor.defaultProps =
    {
        programs: {
        }
    }
;


const mapStateToProps = (state, props) => ({
    program: state.programs,
    entidad: getStatusEntidad(state),
    status: getStatusMentor(state),
    mentorships: getMentorshipsbyMentor(state),
    username: getUsername(state),
    plan: state.plan_user,
    id_user:getId(state),
    mentors_program: state.mentors_by_program,

});

export default withRouter(connect(mapStateToProps, {
    fetchEmprendedoresbyProgram,
    fetchPlanbyId,
    fetchMentors,
    fetchMentorsByProgram,
    fetchProgram,
    editProgram,
    setAlert,
    loadUser,
    getJsonStrError
})(ProgramEmprendedor));