import React from 'react'
import {Row, Col} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import TablaIndicadores from "../../components/TablaIndicadores/TablaIndicadores";
import TablaIndicadores_usuario from "../../components/TablaIndicadores/TablaIndicadores_usuario";
import LogoPerfilEmpresa from '../../components/LogoPerfilEmpresa/LogoPerfilEmpresa';
import EmpresaInfo from '../../components/EmpresaInfo/EmpresaInfo';
import CardEquipoEmpresa from '../../components/CardEquipoEmpresa/CardEquipoEmpresa';


const PerfilEmpresa = (props) => {
    const {user, empresa,  empresa_status, equipo, params_id, current_user, empresa_desde_mentor, status, entidad} = props

    return (
            <div id='perfil-emprendedor-detalle'>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    {
                        empresa ?
                        <>
                        <Col lg={6} md={7} xs={24} xl={5}>
                            {/* <LogoPerfilEmpresa user={user} empresa={empresa}/> */}
                        </Col>
                        <Col lg={18} md={17} xs={24} xl={19}>
                            <EmpresaInfo user={user} params_id={params_id} empresa={empresa} 
                                            empresa_status={empresa_status} empresa_desde_mentor={empresa_desde_mentor}
                                            current_user={current_user ? current_user : user} entidad={entidad}/>
                        </Col>
                        </>
                    :
                        <Col lg={24} md={24} xs={24} xl={24}>
                            <EmpresaInfo user={user} params_id={params_id} empresa={empresa} 
                                            empresa_status={empresa_status} empresa_desde_mentor={empresa_desde_mentor}
                                            current_user={current_user ? current_user : user} entidad={entidad}/>
                        </Col>
                    }
                </Row>

                <Row>
                    <Col lg={6} md={0} xs={0} xl={5} style={{height: '100px'}}></Col>
                    <Col lg={18} md={24} xs={24} xl={12}>
                        {
                            empresa && empresa.equipo?
                                <CardEquipoEmpresa user={user}
                                        empresa={empresa_desde_mentor ? empresa_desde_mentor : empresa}
                                        current_user={current_user ? current_user : user}
                                        status={status} entidad={entidad}/>
                            :
                                <span></span>
                        }
                    </Col>
                </Row>

            {
                    (empresa_status || equipo || empresa_desde_mentor) ?
                        <Row>
                            <Col lg={6} md={7} xs={24} xl={5} style={{height: '20px'}}></Col>
                            <Col lg={18} md={24} xs={24} xl={19}>
                                <h2>{(status && current_user && current_user.username != user.username && empresa_desde_mentor) ? 'Indicadores del usuario:' : !entidad ?'Configura tus indicadores:': ''}</h2>
                                {
                                    (status && !entidad && current_user && current_user.username != user.username && empresa_desde_mentor) ?
                                        (empresa || empresa_desde_mentor) ?
                                        <TablaIndicadores
                                            empresa={empresa_desde_mentor ? empresa_desde_mentor : empresa}
                                            status={status}>
                                        </TablaIndicadores> :
                                            <span>El usuario no tiene indicadores registrados</span>:
                                        !entidad && (empresa || empresa_desde_mentor)?
                                        <TablaIndicadores_usuario
                                            empresa={empresa_desde_mentor ? empresa_desde_mentor : empresa}
                                            status={status}>
                                        </TablaIndicadores_usuario>:
                                            !entidad ?
                                            <span>El usuario no tiene indicadores registrados</span>:
                                                <span></span>
                                }

                            </Col>
                        </Row>
                        :
                        <span></span>
                }
        </div>
    )
}

export default PerfilEmpresa;