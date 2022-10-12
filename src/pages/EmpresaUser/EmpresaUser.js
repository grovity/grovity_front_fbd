import React, {useState, useEffect, useContext} from 'react'
import {Row, Col, Button, Modal, Card} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import TablaIndicadores_usuario from "../../components/TablaIndicadores/TablaIndicadores_usuario";
import {
    getIdUser, getIndicadoresEmpresa,
    getStatusEmpresa, getStatusEmpresa_desdeOtroPerfil, getStatusEmpresaEquipo,
    getStatusMentor,
    selectCurrentUser, selectEmpresa, selectIdEmpresa, selectIdEmpresaEquipo
} from "../../selectors/users";
import {getStatusEntidad, getUsername} from "../../selectors/institutions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {
    fetchEmpresaEmprendedor,
    fetchEmpresaEmprendedorbyusername, fetchIndicadoresEmpresa, fetchUsersbyId,
} from "../../actions/fetchUsers";
import AppFrame from "../../components/AppFrame/AppFrame";
import CardEquipoEmpresa from "../../components/CardEquipoEmpresa/CardEquipoEmpresa";
import EmpresaInfo from "../../components/EmpresaInfo/EmpresaInfo";
import LogoPerfilEmpresa from '../../components/LogoPerfilEmpresa/LogoPerfilEmpresa';
import BotonesIndicadoresEmpresa from '../../components/BotonesIndicadoresEmpresa/BotonesIndicadoresEmpresa';
import {FaUsers} from "react-icons/fa";
import {IoMdPersonAdd} from "react-icons/io";
import AddEmployeesForm from "../../components/AddEmployeesForm/AddEmployeesForm";
import {editTeamEmpresa} from "../../api/empresa";


const EmpresaUser = (props) => {
    const {
        user, empresa, indicadores, empresa_status, id_empresa_equipo, team, current_user,
        empresa_status_desdeOtroPerfil, empresa_status_equipo, status, entidad, id_empresa, username
    } = props

    const [load, setLoad] = useState(false)
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {

            if (id_empresa_equipo) {
                await props.fetchEmpresaEmprendedor(id_empresa_equipo)
                await props.fetchIndicadoresEmpresa(id_empresa_equipo)
            } else {
                if(id_empresa || props.match.params.id) {
                    await props.fetchEmpresaEmprendedor(id_empresa ? id_empresa : props.match.params.id)
                    await props.fetchIndicadoresEmpresa(id_empresa ? id_empresa : props.match.params.id)
                }
            }
        })()
        setLoad(false)
    }, [id_empresa, load])


    const handleModal = () => {
        setVisible(true);
    }


    return (
        <AppFrame>
            <div id='empresa-user'>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} style={{marginBottom: '2%'}}>
                    {
                        empresa_status || empresa_status_desdeOtroPerfil || empresa_status_equipo ?
                            <>
                                <Col lg={0} md={0} xs={0} xl={1} xxl={1}></Col>
                                <Col lg={7} md={7} xs={24} xl={5} xxl={4}>
                                    <LogoPerfilEmpresa user={empresa} empresa={true}/>
                                </Col>
                                <Col lg={17} md={17} xs={24} xl={18} xxl={19}>
                                    <EmpresaInfo user={user} empresa={empresa}
                                                 empresa_status={empresa_status ? empresa_status : empresa_status_equipo}
                                                 status={status}
                                                 current_user={current_user} entidad={entidad}/>
                                </Col>
                            </>
                            :
                            <Col lg={24} md={24} xs={24} xl={24}>
                                <EmpresaInfo user={user} empresa={empresa}
                                             empresa_status={empresa_status ? empresa_status : empresa_status_equipo}
                                             status={status}
                                             current_user={current_user} entidad={entidad}/>
                            </Col>
                    }
                </Row>
                {
                    empresa_status || empresa_status_desdeOtroPerfil || empresa_status_equipo ?
                        <Row align='middle' style={{marginBottom: '2%'}}>
                            <Col lg={6} md={7} xs={24} xl={1} style={{height: '20px'}}></Col>
                            <Col lg={24} md={24} xs={24} xl={23}>
                                <Card className='mt-3' id="card-equipo-empresa">
                                    <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} className="equipo-nombre">
                                        <Col lg={2} md={2} xs={4} sm={4} xl={2} xxl={1}>
                                            <FaUsers size={35} className='icons'/>
                                        </Col>
                                        <Col lg={18} md={19} xs={15} sm={17} xl={19} xxl={21}>
                                            <h4>Equipo</h4>
                                        </Col>
                                        {
                                            !status && !entidad && id_empresa && (
                                                <Col className='btn-editar' lg={4} md={3} xs={5} sm={3} xl={3} xxl={2}>
                                                    <Button className='btn-verde-basico' block
                                                            onClick={handleModal}><IoMdPersonAdd size={25}/></Button>
                                                </Col>
                                            )
                                        }

                                        <Modal
                                            title="Editar equipo"
                                            centered
                                            visible={visible}
                                            onOk={() => setVisible(false)}
                                            onCancel={() => setVisible(false)}
                                            width={1000}
                                            footer={[
                                                <Button form="edicion-equipo-empresa" key='submit'
                                                        htmlType="submit" loading={loading}
                                                        className='btn-verde-basico'>
                                                    Agregar
                                                </Button>
                                            ]}
                                        >
                                            <AddEmployeesForm setLoading={setLoading} setVisible={setVisible}
                                                              current_user={current_user}/>
                                        </Modal>
                                    </Row>
                                    <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} className="equipo-nombre">
                                        <Col lg={2} md={2} xs={4} sm={4} xl={2} xxl={1}></Col>
                                        <Col lg={15} md={15} xs={15} sm={15} xl={15} xxl={16}>
                                            <p><strong>No. de empleados:</strong> {empresa?.n_employees}</p>
                                        </Col>
                                    </Row>

                                    <Row gutter={[12, 12]}>
                                        {
                                            team && Array.isArray(team) && (
                                                team.map(t => (
                                                    <CardEquipoEmpresa key={t.id} team={t} empresa={empresa}
                                                                       team_complete={team} id_empresa={id_empresa}
                                                                       editTeamEmpresa={props.editTeamEmpresa}
                                                                       user={user} current_user={current_user}/>
                                                ))
                                            )
                                        }
                                    </Row>
                                </Card>

                            </Col>
                        </Row>
                        :
                        <span></span>
                }

                {
                    (empresa_status || empresa_status_desdeOtroPerfil || empresa_status_equipo) ?
                        <Row>
                            <Col lg={6} md={7} xs={24} xl={1} style={{height: '20px'}}></Col>
                            <Col lg={24} md={24} xs={24} xl={23}>
                                <Row align='middle' style={{marginBottom: '2%'}}>
                                    <Col lg={14} md={24} xs={24} xl={16}>
                                        <h2>{(current_user?.username !== user?.username) ? 'Indicadores del usuario' : 'Configura tus indicadores'}</h2>
                                    </Col>
                                    <Col lg={10} md={24} xs={24} xl={8}>
                                        <BotonesIndicadoresEmpresa user={user} entidad={entidad}/>
                                    </Col>
                                </Row>

                                {
                                    indicadores && (
                                        <TablaIndicadores_usuario indicadores={indicadores}></TablaIndicadores_usuario>)
                                }

                            </Col>
                        </Row>
                        :
                        <span></span>
                }
            </div>
        </AppFrame>
    )
}

const mapStateToProps = (state, props) => ({
    user: state.user[0],
    current_user: selectCurrentUser(state),
    id_usuario: getIdUser(state),
    username: getUsername(state),
    status: getStatusMentor(state),
    entidad: getStatusEntidad(state),
    empresa_status: getStatusEmpresa(state),
    empresa_status_equipo: getStatusEmpresaEquipo(state),
    empresa_status_desdeOtroPerfil: getStatusEmpresa_desdeOtroPerfil(state),
    indicadores_mentor: getIndicadoresEmpresa(state),
    empresa: selectEmpresa(state),
    programs_user: state.programs_user,
    id_empresa: selectIdEmpresa(state),
    id_empresa_equipo: selectIdEmpresaEquipo(state),
    indicadores: state.indicadores_empresa,
    team: state.empresa_emprendedor?.team,

});


export default withRouter(connect(mapStateToProps,
    {
        fetchEmpresaEmprendedor,
        fetchEmpresaEmprendedorbyusername,
        fetchIndicadoresEmpresa,
        editTeamEmpresa,
        fetchUsersbyId
    })(EmpresaUser));