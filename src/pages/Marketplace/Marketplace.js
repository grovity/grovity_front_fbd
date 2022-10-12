import React, {useState, useEffect} from 'react'
import {Row, Col, Button, Layout, Divider, Modal, Spin} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import AppFrame from "../../components/AppFrame/AppFrame";
import {enquireScreen} from 'enquire-js';
import BarraTopFiltros from '../../components/BarraTopFiltros/BarraTopFiltros';
import FiltrosMarketplace from '../../components/FiltrosMarketplace/FiltrosMarketplace';
import FooterMarketplace from '../../components/FooterMarketplace/FooterMarketplace';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {fetchMentorsMarketPlace} from "../../actions/marketplace";
import CardMarketPlaceMap from "../../components/CardMarketplace/CardMarketPlaceMap";
import {getTags} from "../../api";
import {Pagination} from 'antd';
import VideoInstructivo from '../../components/VideoInstructivo/VideoInstructivo';
import NavBar from '../../components/NavBar/NavBar';

const {Header, Footer, Sider, Content} = Layout;

const Marketplace = (props) => {

    const {mentores_marketplace} = props
    const [isMobile, setIsMobile] = useState(false);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState([]);
    const [spin, setSpin] = useState(false)



    const handleOk = () => {
        setLoading(true);
        document.getElementById('vid-instructivo').innerHTML = "&nbsp;";
        handleCookies('f', 'firstVisit', 1095);
        setTimeout(() => {
            setLoading(false);
            setVisible(false);
        }, 1000);
    };

    const onCLick = async (e) => {
        setSpin(true)
        await props.fetchMentorsMarketPlace(e)
        setSpin(false)
    };


    enquireScreen((b) => {
        return () => {
            setIsMobile(b);
        }
    })

    const handleCookies = (name, value, xdays) => {
        let d = new Date();
        d.setTime(d.getTime() + (xdays * 24 * 60 * 60 * 1000));
        let expires = 'expires=' + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + "path=/marketplace";
    }

    const getCookie = (name) => {
        let n = name + '=';
        let coo = document.cookie.split(';');

        for (let i = 0; i < coo.length; i++) {
            let c = coo[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(n) == 0) {
                return c.substring(n.length, c.length);
            }
        }
        return "";
    }

    const checkCookie = () => {
        let cook = getCookie('f')
        if (cook === "") {
            setVisible(true)
        } else {
            if (cook !== "" && cook !== null)
                handleCookies('f', 'firstVisit', 1095);
        }
    }

    useEffect(() => {
        enquireScreen((b) => {
            setIsMobile(
                !!b
            );
        });

        (async () => {
            setSpin(true)
            await props.fetchMentorsMarketPlace()
            setSpin(false)
        })()

        const tags = async () => {
            let tagsList = await getTags()
            setTags(tagsList)
        }
        tags()

        checkCookie();

    }, [isMobile])

    useEffect(() => {
        if (localStorage.getItem('usuario_nuevo')) {
            localStorage.removeItem('usuario_nuevo')
        }
    }, [])


    return (
        <>
            {
                localStorage.getItem('token') ?
                    <>
                        <AppFrame>
                            <Layout id='marketplace'>
                                <Header>
                                    <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                                        <Col lg={16} md={14} xs={24} xl={19} xxl={20}>
                                            <h3>Marketplace</h3>
                                        </Col>

                                        <Modal
                                            title="¿Cómo usar el marketplace?"
                                            centered
                                            visible={visible}
                                            onOk={() => setVisible(false)}
                                            onCancel={() => handleOk()}
                                            width={1000}
                                            footer={[
                                                <Button key="submit" type="primary" loading={loading}
                                                        onClick={handleOk}>
                                                    Cerrar
                                                </Button>,
                                            ]}
                                        >
                                            <VideoInstructivo/>
                                        </Modal>

                                        <Divider className='header-marketplace'/>
                                    </Row>
                                </Header>

                                <Layout>
                                    {isMobile ?
                                        <Footer
                                            style={{
                                                overflow: 'auto',
                                                height: 'auto',
                                                position: 'fixed',
                                                right: '0%',
                                                bottom: 0,
                                                width: '100%',
                                                zIndex: '1',
                                            }}
                                        >
                                            <FooterMarketplace tags={tags}/>
                                        </Footer>
                                        :
                                        <Sider
                                            style={{
                                                height: 'auto',
                                                backgroundColor: '#fff',
                                                zIndex: '100',
                                            }}
                                            width="300"
                                            theme='light'
                                            breakpoint='xl'
                                            collapsedWidth='0'
                                            onBreakpoint={broken => {

                                            }}
                                            onCollapse={(collapsed, type) => {

                                            }}
                                        >
                                            <h6>Filtros</h6>
                                            <Divider/>
                                            <FiltrosMarketplace setSpin={setSpin} tags={tags}/>
                                        </Sider>
                                    }

                                    <Content style={{overflow: 'hidden'}}>
                                        <BarraTopFiltros setSpin={setSpin} mentores={mentores_marketplace}/>
                                        {
                                            spin ?
                                                <div
                                                    className='position-absolute d-flex justify-content-center align-items-center w-100 h-100'
                                                    style={{left: '0', top: '0'}}>
                                                    <Spin size='large' className='mt-5'/>
                                                </div> :
                                                <>
                                                    <CardMarketPlaceMap mentores={mentores_marketplace}/>

                                                    <Pagination showSizeChanger={false} defaultCurrent={1}
                                                                defaultPageSize={15}
                                                                total={mentores_marketplace.count} onChange={onCLick}
                                                                style={{overflowY: 'scroll'}}/>
                                                </>

                                        }

                                    </Content>
                                </Layout>
                            </Layout>
                        </AppFrame>
                    </>
                    :
                    <>
                        <Layout>
                            <Row className='row-nav-marketplace' style={{marginBottom: '180px'}}>
                                <NavBar isMobile={isMobile}/>
                            </Row>
                            <Row justify='center' style={{marginBottom: '5%'}}>
                                <Col xxl={20} xl={20} lg={20} md={22} sm={22} xs={22}>
                                    <Content>
                                        <Layout id='marketplace'>
                                            <Header>
                                                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                                                    <Col lg={20} md={20} xs={24} xl={21}>
                                                        <h3>Marketplace</h3>
                                                    </Col>
                                                    <Divider className='header-marketplace'/>
                                                </Row>
                                            </Header>

                                            <Layout>
                                                {isMobile ?
                                                    <Footer
                                                        style={{
                                                            overflow: 'auto',
                                                            height: 'auto',
                                                            position: 'fixed',
                                                            right: '0%',
                                                            bottom: 0,
                                                            width: '100%',
                                                            zIndex: '1',
                                                        }}
                                                    >
                                                        <FooterMarketplace tags={tags}/>
                                                    </Footer>
                                                    :
                                                    <Sider
                                                        style={{
                                                            height: 'auto',
                                                            backgroundColor: '#fff',
                                                            zIndex: '100',
                                                        }}
                                                        width="300"
                                                        theme='light'
                                                        breakpoint='xl'
                                                        collapsedWidth='0'
                                                        onBreakpoint={broken => {

                                                        }}
                                                        onCollapse={(collapsed, type) => {

                                                        }}
                                                    >
                                                        <h6>Filtros</h6>
                                                        <Divider/>
                                                        <FiltrosMarketplace setSpin={setSpin} tags={tags}/>
                                                    </Sider>
                                                }


                                                <Content style={{overflow: 'hidden'}}>
                                                    <BarraTopFiltros setSpin={setSpin} mentores={mentores_marketplace}/>
                                                    {
                                                        spin ?
                                                            <div
                                                                className='position-absolute d-flex justify-content-center align-items-center w-100 h-100'
                                                                style={{left: '0', top: '0'}}>
                                                                <Spin size='large' className='mt-5'/>
                                                            </div> :
                                                            <>
                                                                <CardMarketPlaceMap mentores={mentores_marketplace}/>

                                                                <Pagination showSizeChanger={false} defaultCurrent={1}
                                                                            defaultPageSize={15}
                                                                            total={mentores_marketplace.count}
                                                                            onChange={onCLick}
                                                                            style={{overflowY: 'scroll'}}/>
                                                            </>
                                                    }

                                                </Content>


                                            </Layout>
                                        </Layout>
                                    </Content>
                                </Col>
                            </Row>
                            <Row justify='center' align='middle' style={{marginBottom: '2%'}}>
                                <img
                                    src={process.env.PUBLIC_URL + '/static/imgs/escuelaJuntas/small/Artboard 5 copy@0,25x.png'}
                                    alt='logo'/>
                            </Row>
                        </Layout>
                    </>
            }
        </>
    )
}

const mapStateToProps = state => ({
    mentores_marketplace: state.mentores_marketplace,
});

export default withRouter(connect(mapStateToProps, {
    fetchMentorsMarketPlace
})(Marketplace));