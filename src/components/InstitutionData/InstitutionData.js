import {Link, withRouter} from 'react-router-dom';
import {Col, Row} from 'reactstrap';
import React from 'react';

const InstitutionData = ({razon_social, nit, onBack, descripcion, direccion, funcionario, id, programas, logo, user}) => {
    return (
        <div className='flex-column justify-content-center py-5 i_entidad'>
            <div className='bar_right'>
                <Row>
                    <Col md='6'>
                        <h2 className='mb-3 pt-3 pt-md-0'>Información entidad:</h2>
                        <h5>{razon_social}</h5>
                        <h5>{nit}</h5>
                        <h5>{user.telefono}</h5>
                        <h5>{direccion}</h5>
                        <h5>{funcionario}</h5>
                    </Col>
                    <Col md='6'>
                        <img className='borde' src="https://i.ibb.co/bdPw4xd/borde-imagen.png" alt=""/>
                        <img src={logo} alt="" className='imagen_modelo'/>
                    </Col>
                </Row>
            </div>
            <div className='w-100 mt-3 opts'>
                <Row className='m-0'>
                    <Col md='12' className='p-0'>
                        <button id="uservolver" className='mr-3' onClick={onBack}>
                            Volver
                        </button>

                        <Link to={`${id}/edit`}>
                            <button id="uservolver">
                                Perfil de la organización
                            </button>
                        </Link>
                    </Col>
                </Row>
            </div>
        </div>
    )
};

export default withRouter(InstitutionData);