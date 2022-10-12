import React, {useState, useEffect} from 'react'
import {Row, Col, Button, Card} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {enquireScreen} from 'enquire-js';
import {Link, withRouter} from "react-router-dom";
import {getet} from "../../selectors/institutions";
import {connect} from "react-redux";



const CardEmpresaPerfil = ({user, empresa, status, entidad, id_empresa, et}) => {
    const [isMobile, setIsMobile] = useState(false);

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


    return (
        <Card className='mt-3' id="card-empresa-perfil">
            
            {
                empresa.detail !== "No encontrado." ?
                    <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} className="logo-nombre">
                        {/*<Col lg={4} md={5} xs={14} sm={6} xl={5} xxl={4}>*/}
                        {/*    <Avatar shape="square" size={100} src={process.env.PUBLIC_URL + '/static/imgs/escuelaJuntas/small/Artboard 5 copy@0,25x.png'} />*/}
                        {/*</Col>*/}
                        <Col lg={20} md={20} xs={20} sm={18} xl={19} xxl={20}>
                            <h4>{empresa.name}</h4>
                            <p>Sector: {empresa.sector}</p>
                            <p>Número de trabajadores: {empresa.n_employees}</p>
                        </Col>
                    </Row> :
                    <span></span>
            }
            {
                empresa.detail !== "No encontrado." ?
                    <Row className="meta">
                        <Col lg={24} md={24} xs={24} xl={22}>
                            <h5>Principales retos:</h5>
                            <p>{empresa.goal}</p>
                            {/*<Progress percent={50} strokeColor='#242728'/>*/}
                            {
                                !status && !entidad ?
                                    <Link
                                        to={`/dashboard`}
                                        className='mr-2'>

                                        <Button className='btn-azul-basico mt-2 mb-0' type="primary">
                                            Ver mi dashboard
                                        </Button>

                                    </Link> :
                                    <span></span>

                            }                      
                            {
                                status && !entidad && user ?
                                    <Link
                                        to={`/dashboard/${id_empresa}`}>

                                        <Button className='btn-azul-basico mt-2 mb-0 mr-2' type="primary">
                                            Ver dashboard del {et.toLowerCase()}
                                        </Button>

                                    </Link> :
                                    <span></span>
                            }

                            {
                                !status && entidad ?
                                    <Link
                                        to={`/dashboard/${id_empresa}`}>

                                        <Button className='btn-azul-basico mt-2 mb-0 mr-2' type="primary">
                                            Ver dashboard del {et.toLowerCase()}
                                        </Button>

                                    </Link> :
                                    <span></span>
                            }
                            {
                                status || entidad ?
                                    <Link to={`/empresa/${id_empresa}`}>
                                <Button className='btn-azul-basico mt-2 mb-0' type="primary">
                                    Ver empresa
                                </Button>
                            </Link>:
                                    <Link to={`/empresa`}>
                                <Button className='btn-azul-basico mt-2 mb-0' type="primary">
                                    Ver empresa
                                </Button>
                            </Link>
                            }

                        </Col>
                    </Row> :
                    <span>No hay empresa registrada</span>
            }
        </Card>
    )
}

const mapStateToProps = state => ({
    et: getet(state).split('-')[0],
});

export default withRouter(connect(mapStateToProps, {})( CardEmpresaPerfil));