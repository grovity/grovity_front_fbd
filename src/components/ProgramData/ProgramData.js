import {Link, withRouter} from 'react-router-dom';
import {Col, Row} from 'reactstrap';
import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/es';

const ProgramData = ({nombre, fecha_inicio, fecha_fin, funcionario, descripcion, n_sesiones, onBack, id, img_programa, entidad}) => {
    return (
        <div className='flex-column justify-content-center py-5 i_entidad'>
            <div className='bar_right'>
                <Row>
                    <Col md='6'>
                        <h2 className='mb-3'>{nombre}</h2>
                        <p style={{maxHeight: "4.5rem", overflow:"hidden", textOverflow:"clip", wordWrap:"break-word"}} title={descripcion}>{descripcion}</p>
                        <p className='mt-3 mb-0'>
                            <Link to={`mentorships/${id}`} className='p-2 text-white customeractions2'>> Ver Herramientas Disponibles</Link>
                        </p>
                    </Col>
                    <Col md='6'>
                        <img className='borde' src="https://i.ibb.co/bdPw4xd/borde-imagen.png" alt=""/>
                        <img src={img_programa} className='imagen_modelo' alt=""/>
                    </Col>
                </Row>
            </div>
            <div className='w-100 mt-3 opts'>
                <Row className='m-0'>
                    <Col md='12' className='p-0'>
                        <button id="uservolver" className='mr-3' onClick={onBack}>
                            Volver
                        </button>
                        {
                            entidad ?

                            <Link to={`${id}/edit`}>
                                <button id="uservolver">
                                    Editar
                                </button>
                            </Link> : ''
                        }
                    </Col>
                </Row>
            </div>
        </div>
    )
};

export default withRouter(ProgramData);
