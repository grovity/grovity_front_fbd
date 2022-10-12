import React, {useEffect, useState} from 'react'
import AppFrame from "../../components/AppFrame/AppFrame";
import LineChartRechart from "../../components/LineChartRecharts/LineChartRechart";
import {Row, Col, Button, Layout, Divider, Empty, Card} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'

import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {fetchEmpresaEmprendedor} from "../../actions/fetchUsers";
import {getStatusMentor, selectIdEmpresa} from "../../selectors/users";
import {enquireScreen} from 'enquire-js';
import {getStatusEntidad, getUsername} from "../../selectors/institutions";
import {getInformeEmprendedoresPorPrograma} from "../../api/indicadores";


const {Header, Content} = Layout;

function Dashboard(props) {
    const {indicadores, id_empresa, otro_username, username, status, entidad} = props
    const [rest, setRest] = useState([])
    const [loading, setLoading] = useState(false)
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


    useEffect(() => {
        (async () => {
            if (id_empresa || props.match.params.id) {
                await props.fetchEmpresaEmprendedor(id_empresa ? id_empresa : props.match.params.id)

            }
        })()
    }, [id_empresa])

    useEffect(() => {
        if (indicadores && indicadores.length > 1) {
            const rest = indicadores.splice(1)
            setRest(rest)
        }
    }, [indicadores])

    async function handleDescargarInfo() {
        setLoading(() => true)

        await getInformeEmprendedoresPorPrograma(null, otro_username ? otro_username : username)
        setLoading(() => false)
    }

    return (
        <AppFrame>
            <Layout id='mentores-entidad'>
                <Header>
                    <Row gutter={[12, 12]}>
                        <Col lg={7} md={24} xs={24} xl={10}>
                            <h3>Mi dashboard</h3>
                        </Col>

                        <Col lg={14} md={14} xs={14} xl={11} className='btns-header text-right'>
                            {
                                !status && (
                                    <Button loading={loading} disabled={loading}
                                            className='btn-verde-basico boton-dashboard mr-2' block
                                            onClick={handleDescargarInfo}>
                                        Descargar reporte

                                    </Button>
                                )
                            }
                        </Col>
                        <Col lg={3} md={10} xs={10} xl={3} className='btns-header'>
                            <Button className='btn-verde-basico' block onClick={() => props.history.goBack()}>
                                Volver
                            </Button>
                        </Col>
                        <Divider className='header-marketplace'/>
                    </Row>
                </Header>

                <Content style={{overflow: 'hidden'}} className='content-dashboard'>
                    {
                        indicadores && indicadores.length > 0 ?
                            <>
                                <Card>
                                    <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} className='principal-chart'>
                                        <Col xxl={22} xl={22} lg={22} md={24} sm={24} xs={24}>
                                            <LineChartRechart indicador={indicadores[0]} title={indicadores[0]?.name}
                                                              height={isMobile ? 300 : 450}
                                                              width={isMobile ? 550 : 1200}
                                                              color={'#94c01f'}
                                                              entidad={entidad}/>
                                        </Col>
                                    </Row>
                                </Card>
                                {
                                    rest.length >= 1 ?
                                        <>
                                            <Row className='mt-5' justify='space-around' gutter={[24, 16]}>
                                                {
                                                    Array.isArray(rest) ?
                                                        rest.map(indicador => {

                                                            return <Col xxl={12} xl={12} lg={12} md={24} sm={24}
                                                                        xs={24}>
                                                                <Card>
                                                                    <LineChartRechart indicador={indicador}
                                                                                      title={indicador?.name}
                                                                                      height={300}
                                                                                      eje_y={indicador?.eje_y}
                                                                                      width={550} color={'#94c01f'}
                                                                                        entidad={entidad}/>
                                                                </Card>
                                                            </Col>
                                                        })
                                                        :
                                                        <span></span>
                                                }
                                            </Row>
                                        </> :
                                        <span></span>
                                }
                            </> :
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{height: 60,}}
                                description={
                                    <span>No tienes indicadores</span>
                                }
                            />
                    }
                </Content>
            </Layout>
        </AppFrame>
    )
}

const mapStateToProps = state => (
    {
        indicadores: state.empresa_emprendedor?.indicator_set,
        id_empresa: selectIdEmpresa(state),
        empresa: state.empresa_emprendedor,
        username: getUsername(state),
        status: getStatusMentor(state),
        otro_username: state.user[0]?.username,
        entidad: getStatusEntidad(state),

    }
);
export default withRouter(connect(mapStateToProps,
    {
        fetchEmpresaEmprendedor,
    }
)(Dashboard));