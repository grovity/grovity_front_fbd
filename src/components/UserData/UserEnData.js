import {Col, Row, Button} from 'reactstrap';
import React, {useState, Fragment} from 'react';
import './style.css'
import mobiscroll from "@mobiscroll/react";
import IndicadoresRegisterForm from "../IndicadoresForm/IndicadoresForm";
import FilterTable_indicadores from "../FilterTable/FilterTable_indicadores";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile} from "@fortawesome/free-regular-svg-icons";
import ModalFile_emprendedor from "../ModalEvent/ModalFile_emprendedor";
import {    Link} from 'react-router-dom';
import ModalUrl_emprendedor from "../ModalEvent/ModalUrl_emprendedor";
import {Spin} from "antd";


const UserEnData = ({
                        first_name, status, last_name, img_usuario, email, telefono, username,
                        programa_emprendedor,
                        descripcion, id, username2, calificacion, empresa, indicadores_empresa,
                        setAlert, empresa_info, indicadores_mentor, entidad, id_usuario,
                    }) => {

    const [show, setShow] = useState(false);
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [show2, setShow2] = useState(false);
    return (email || username) === null ? (
            <Spin></Spin>
        ) :
        (


            <div className="container">
                <Row className='button-back'>
                    {
                        status && username2 !== id ?
                            <Link to={`/user/users`}>
                                <Button style={{backgroundColor: '#95C11F', border: 'none', width: '200px'}}
                                        className="customeractions2 mt-3">
                                    Volver
                                </Button>
                            </Link> :
                            <Link to={entidad ? `/users` : `/user`}>
                                <Button style={{backgroundColor: '#95C11F', border: 'none', width: '200px'}}
                                        className="customeractions2 mt-3">
                                    Volver
                                </Button>
                            </Link>
                    }


                </Row>

                <div className="align-items-center row mt-5">
                    <Col id="colmentoriadetail" className="col-md-6 text-center">
                        <img id="mentor_img" src={img_usuario} className="iconshome_institution" alt=""/>
                        <h5 className="nombrementor2">{first_name} {last_name}</h5>
                        <h5 className="nombrementor2">Celular: {telefono}</h5>
                        <h5 className="nombrementor2">{email}</h5>
                        {

                            <div className='align-items-center'>
                                <h5 className='customeractions3'
                                    onClick={event => {
                                        setShow(true)
                                        setModal(true)
                                    }
                                    }><FontAwesomeIcon
                                    icon={faFile}
                                    title="Subir archivos o links"
                                    onClick={event => {
                                        setShow(true)
                                        setModal(true)
                                    }
                                    }/> Subir archivos
                                </h5>
                                <ModalFile_emprendedor show={show} id_usuario={id_usuario}
                                                       username2={username2}
                                                       status={status} modal={modal} username={username}
                                                       toggle={event => {
                                                           setShow(false)
                                                           setModal(false)
                                                       }}
                                />
                            </div>


                        }
                        {

                            <div className='align-items-center mt-2'>
                                <h5 className='customeractions3'
                                    onClick={event => {
                                        setShow2(true)
                                        setModal2(true)
                                    }
                                    }> Subir Urls
                                </h5>
                                <ModalUrl_emprendedor show={show2} id_usuario={id_usuario}
                                                      status={status} modal={modal2}
                                                      username={username} username2={username2}
                                                      toggle={event => {
                                                          setShow2(false)
                                                          setModal2(false)
                                                      }}
                                />
                            </div>


                        }
                        {

                            <Link to={`/files/user/${username}`}>
                                <div className='align-items-center mt-2'>
                                    <h5 className='customeractions3'
                                    > Ver archivos y urls
                                    </h5>
                                </div>
                            </Link>

                        }

                    </Col>

                    <Col id="colmentoriadetail2" className="col-md-6">
                        {
                            status && username2 === id ?
                                <h4 className="text-left ml-4 mt-4">Descripción del perfil:</h4> :
                                <h4 className="text-left ml-4 mt-4">Tu meta:</h4>
                        }

                        <p className="text-left ml-4 mt-4">{descripcion}</p>

                        {
                            status && username2 === id ?
                                <span></span> :
                                <Fragment>
                                    <h4 className="text-left ml-4 mt-4">Programas inscritos :</h4>
                                </Fragment>

                        }

                        {
                            status && username2 === id && (
                                <h4 className="text-left ml-4 mt-4">Tu calificación promedio:</h4>

                            )
                        }
                        {
                            calificacion && status && username2 === id ?
                                <mobiscroll.Rating disabled
                                                   value={calificacion ? calificacion.calificacion : 0}>
                                </mobiscroll.Rating> :
                                <p></p>

                        }

                        {
                            Array.isArray(calificacion.calificaciones) && status && username2 === id ?

                                calificacion.calificaciones.slice(-6    , -1).map(c =>
                                    <p className="text-left ml-4 mt-4">{c}</p>
                                ) :
                                <p></p>
                        }


                        <ul>
                            {
                                programa_emprendedor ?
                                    programa_emprendedor.map(c => (
                                        <li className="text-left ml-4 mr-2">{c.nombre}</li>
                                    )) :
                                    <li className="text-left ml-4 mr-2">No está inscrito en ningún programa</li>
                            }


                        </ul>
                        {
                            !status && username2 === id && empresa_info ?
                                <Fragment>
                                    <h4 className="text-left ml-4 mt-4">Tu empresa : </h4>
                                    <p className="text-left ml-4 mt-4"> {empresa_info.nombre} </p>
                                    <h4 className="text-left ml-4 mt-4">Estrella del norte : </h4>
                                    <p className="text-left ml-4 mt-4"> {empresa_info.meta} </p>
                                </Fragment> :
                                <span></span>

                        }
                    </Col>


                    {
                        status && username2 !== id && indicadores_mentor ?
                            <Col className="col-md-12 text-center indicadores_recoletar">
                                <h2 className="titulosazul mt-5">Seguimiento a indicadores</h2>
                                <IndicadoresRegisterForm
                                    indicadores={indicadores_mentor.indicadores ? indicadores_mentor.indicadores : []}
                                    setAlert={setAlert} username={id}/>
                            </Col> :
                            <span></span>


                    }

                    {/*{*/}
                    {/*    status && username2 !== id && !empresa && (*/}
                    {/*        <Col className="col-md-12 text-center indicadores_recoletar">*/}
                    {/*            <h2 className="titulosazul mt-5">Seguimiento a indicadores</h2>*/}
                    {/*            <p className="mt-5">El emprendedor aún no tiene registrada una empresa</p>*/}
                    {/*        </Col>*/}

                    {/*    )*/}
                    {/*}*/}

                    {
                        !status && username2 === id && (
                            <Col className="col-md-12 mb-3">
                                <span></span>
                            </Col>

                        )
                    }

                </div>
                {
                    !status && empresa && indicadores_empresa && (
                        <Col className="col-md-12 text-center indicadores_recoletar">
                            <h2 className="titulosazul mt-5 mb-3">Indicadores seleccionados</h2>
                            <Link to={`dashboard/${username}/reports/resumen-por-programa`}>

                                <Button className='customeractions2 mb-3'
                                        style={{backgroundColor: '#95C11F', border: 'none'}}>
                                    Ver mi Dashboard
                                </Button>
                            </Link>
                            <FilterTable_indicadores
                                id={id}
                            ></FilterTable_indicadores>
                        </Col>)
                    // <div className='text-center mt-2'>
                    // <button id="uservolver"  onClick={onBack}>
                    //     Volver
                    // </button>
                    //     </div>


                }

                {
                    entidad && (
                        <Row className="text-center mt-5">
                            <Col>
                                <Link to={`users/${username}/reports/resumen-por-programa`}>

                                    <Button className='customeractions2'
                                            style={{backgroundColor: '#95C11F', border: 'none'}}>
                                        Ver dashboard del emprendedor
                                    </Button>
                                </Link>
                            </Col>
                        </Row>

                    )
                }
            </div>


        )
};

export default UserEnData;
