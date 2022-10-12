import React, {useState, useEffect} from 'react'
import {Row, Col} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import FotoPerfilEmprendedor from '../../components/FotoPerfilEmprendedor/FotoPerfilEmprendedor';
import EmprendedorInfo from '../../components/EmprendedorInfo/EmprendedorInfo';
import CardEmpresaPerfil from '../../components/CardEmpresPerfil/CardEmpresaPerfil';
import CardProgramsAnt from "../../components/CardItemAnt/CardItemAnt";


const PerfilEmprendedor = (props) => {
    const {
        user,
        empresa,
        empresa_status,
        id_empresa,
        programs,
        params_id,
        current_user,
        empresa_desde_mentor,
        status,
        entidad
    } = props
    const [desdeMentEnti, setDesdeMentEnti] = useState(false);
    const [desdePerfilEmprendedor, setDesdePerfilEmprendedor] = useState(false)
    // const desdePerfilEmprendedor = true;

    useEffect(() => {
        if (status || entidad) {
            setDesdeMentEnti(true);
            setDesdePerfilEmprendedor(true);
        }
    }, [status, entidad])

    return (
        <div id='perfil-emprendedor-detalle'>
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col lg={6} md={7} xs={24} xl={5}>
                    <FotoPerfilEmprendedor user={user}/>
                </Col>
                <Col lg={18} md={17} xs={24} xl={19}>
                    <EmprendedorInfo user={user} params_id={params_id}
                                     current_user={current_user ? current_user : user} entidad={entidad}/>
                </Col>
            </Row>

            {
                (empresa_status) ?
                    <Row>
                        <Col lg={6} md={0} xs={0} xl={5} style={{height: '100px'}}></Col>
                        <Col lg={18} md={24} xs={24} xl={12}>
                            {
                                empresa || empresa_desde_mentor ?
                                    <CardEmpresaPerfil user={user}
                                                       empresa={empresa}
                                                       current_user={current_user ? current_user : user}
                                                       status={status} entidad={entidad}
                                                       id_empresa={id_empresa}/> :
                                    <span>Aún no hay una empresa registrada</span>
                            }

                        </Col>
                    </Row>
                    :
                    <></>
            }

            {
                (programs) ?
                    <Row className='programas'>
                        <Col lg={6} md={0} xs={0} xl={5} style={{height: '100px'}}></Col>
                        <Col lg={18} md={24} xs={24} xl={19}>
                            <Row>
                                <Col lg={24} md={24} xs={24} xl={24}>
                                    <h5>Mis programas:</h5>
                                    <CardProgramsAnt programs_user={programs}
                                                     desde={desdeMentEnti}
                                                     user={user}
                                                     status={status}
                                                     perfilEmpren={desdePerfilEmprendedor}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row> :
                    <span>Aún no hay programas disponibles</span>
            }

        </div>
    )
}

export default PerfilEmprendedor;