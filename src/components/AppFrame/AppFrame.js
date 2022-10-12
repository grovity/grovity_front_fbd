import React, {useState, useEffect} from 'react'
import {Layout, Menu, Breadcrumb, Row, Popover} from 'antd';
import PropTypes from 'prop-types'
import Icono_grovity from "../../assets/images/bitmap.png";
import FBD from '../../assets/images/logo-fbd/Logo-FBD_Color.png'
import {Link} from 'react-router-dom';
import AvatarDefault from '../../../src/assets/images/avatar-not-found.png'
import {
    UserOutlined,
    ScheduleOutlined,
    ShopOutlined,
    ImportOutlined,
    TeamOutlined,
    QuestionCircleOutlined,
    HomeOutlined,
    BarChartOutlined,
} from '@ant-design/icons';
import LogoSidebar from "../LogoSidebar/LogoSidebar";
import './AppFrame.scss'
import {
    getEquipo,
    getStatusEmpresa,
    getStatusMentor,
    getStatusUser,
    getUserId,
    selectCurrentUser
} from "../../selectors/users";
import {getet, getUsername} from "../../selectors/institutions";
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {enquireScreen} from 'enquire-js';
import {logout} from "../../actions/auth";


const {Header, Content, Footer, Sider} = Layout;




const AppFrame = ({children, auth: {isAuthenticated}, entidad, username, status,user, id, logout, et_plural}) => {
    const theme = localStorage.getItem('theme')
    const avatarUrl = AvatarDefault
    const [collapsed, setCollapsed] = useState(false)
    const [collapsedMobil, setCollapsedMobil] = useState(true)
    const [isMobile, setIsMobile] = useState(false);
    const [logo, setLogo] = useState(null);
    const [logoClass, setLogoClass] = useState(false);
    const [lightDark, setLightDark] = useState(false);

    useEffect(() => {
        if (!theme) {
            setLogo(Icono_grovity)
        } else if (theme === 'davivienda') {
            setLogo(FBD)
            setLogoClass(true)
            setLightDark(true)
        }
    }, [logo, logoClass, theme, lightDark])

    const text = <span>{user?.first_name} {user?.last_name}</span>;
    const content = (
        <div>
            <Link to={`user/${username}`}>
                <p className='mini-menu'>Mi perfil</p>
            </Link>
            <Link to={'/'}>
                <p className='mini-menu' onClick={logout}>Logout</p>
            </Link>
        </div>
    );

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


    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    const onCollapseMobil = collapsed => {
        setCollapsedMobil(collapsed);
    };
    if (isAuthenticated && !status && !entidad) {
        return (
            <Layout style={{minHeight: '100vh'}}>
                {isMobile ?
                    <Sider collapsible
                           breakpoint='sm'
                           collapsedWidth='0'
                           onBreakpoint={broken => {
                           }}
                           collapsed={collapsedMobil}
                           onCollapse={onCollapseMobil}>
                        <Menu theme={lightDark ? 'light' : "dark"} defaultSelectedKeys={['2']} mode="inline" style={{position: 'sticky', top: '1%'}}>
                            <Menu.Item key="1" className={logoClass ? 'menu-item-logo' : ''} icon={<Link to={'/'}>
                                <LogoSidebar logo={logo} logoClass={logoClass}/></Link>}>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<HomeOutlined />}>
                                Home
                                <Link to="/user"/>
                            </Menu.Item>
                            <Menu.Item key="4" icon={<ScheduleOutlined/>}>
                                Mi calendario
                                <Link to="/calendar"/>
                            </Menu.Item>
                            <Menu.Item key="5" icon={<BarChartOutlined/>}>
                                Mi dashboard
                                <Link to={`/user/dashboard/${user.username}/reports/resumen-por-programa`}/>
                            </Menu.Item>
                            <Menu.Item key="6" icon={<ShopOutlined/>}>
                                Marketplace
                                <Link to={'/marketplace'}/>
                            </Menu.Item>
                            <Menu.Item key="7" icon={<QuestionCircleOutlined/>}>
                                <a target='_blank' href={'/centro-soporte'} rel="noopener noreferrer">Soporte</a>
                            </Menu.Item>
                            <Menu.Item key="8"
                                       icon={<ImportOutlined/>}
                                       onClick={logout}>
                                Logout
                                <Link to="/"/>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    :
                    <Sider collapsible
                           collapsed={collapsed}
                           onCollapse={onCollapse}
                           width={180}
                    >
                        <div className="logo"/>
                        <Menu theme={lightDark ? 'light' : "dark"} defaultSelectedKeys={['2']} mode="inline" style={{position: 'sticky', top: '1%'}}>
                            <Menu.Item key="1" className={logoClass ? 'menu-item-logo' : ''}icon={<Link to={'/'}>
                                <LogoSidebar logo={logo} logoClass={logoClass}/></Link>}>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<HomeOutlined/>}>
                                Home
                                <Link to="/user"/>
                            </Menu.Item>
                            <Menu.Item key="4" icon={<ScheduleOutlined/>}>
                                Mi calendario
                                <Link to="/calendar"/>
                            </Menu.Item>
                            <Menu.Item key="5" icon={<BarChartOutlined/>}>
                                Mi dashboard
                                <Link to={`/user/dashboard/${user.username}/reports/resumen-por-programa`}/>
                            </Menu.Item>
                            <Menu.Item key="6" icon={<ShopOutlined/>}>
                                Marketplace
                                <Link to={'/marketplace'}/>
                            </Menu.Item>

                        </Menu>
                        <Menu Menu theme={lightDark ? 'light' : "dark"} defaultSelectedKeys={['1']} mode="inline" style={{position: 'sticky', top: '83%'}}>
                            <Menu.Item key="7" icon={<QuestionCircleOutlined/>}>
                                <a target='_blank' href={'/centro-soporte'} rel="noopener noreferrer">Soporte</a>
                            </Menu.Item>

                            <Menu.Item key="8"
                                    icon={<ImportOutlined/>}
                                    onClick={logout}>
                                Logout
                                <Link to="/"/>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                }
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0}}>
                        <div className='avatar-topbar'>
                            <a href='https://bit.ly/centro-soporte-grovity'
                               target="_blank" rel="noopener noreferrer">
                                <QuestionCircleOutlined id='help'/>
                            </a>
                            <Link to={`/user`}>
                                <Popover placement='bottom' title={text} content={content} trigger='hover'>
                                    <div
                                        className='avatar-mini'
                                        style={{backgroundImage: `url('${user && user.img_usuario ? user.img_usuario : avatarUrl}')`}}>
                                    </div>
                                </Popover>
                            </Link>
                        </div>
                    </Header>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                            {children}
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        <Row justify='center' align='middle'>
                            <p style={{fontSize: '70%'}}>Powered by</p>
                            <img src={process.env.PUBLIC_URL + '/static/imgs/escuelaJuntas/small/Artboard 5 copy@0,25x.png'}
                                alt="logo"/>
                        </Row>
                    </Footer>
                </Layout>
            </Layout>
        );
    } else if (isAuthenticated && status) {
        return (
            <Layout style={{minHeight: '100vh'}}>
                {isMobile ?
                    <Sider collapsible
                           breakpoint='sm'
                           collapsedWidth='0'
                           onBreakpoint={broken => {

                           }}
                           collapsed={collapsedMobil}
                           onCollapse={onCollapseMobil}>
                        <div className="logo"/>
                        <Menu theme={lightDark ? 'light' : "dark"} defaultSelectedKeys={['2']} mode="inline" style={{position: 'sticky', top: '1%'}}>
                            <Menu.Item key="1" className={logoClass ? 'menu-item-logo' : ''} icon={<Link to={'/'}>
                                <LogoSidebar logo={logo} logoClass={logoClass}/></Link>}>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<HomeOutlined/>}>
                                Home
                                <Link to="/user"/>
                            </Menu.Item>

                            <Menu.Item key="3" icon={<ScheduleOutlined/>}>
                                Mi calendario
                                <Link to="/calendar"/>
                            </Menu.Item>
                            <Menu.Item key="4" icon={<TeamOutlined/>}>
                                {et_plural}
                                <Link to="/user/users"/>
                            </Menu.Item>
                            <Menu.Item key="5" icon={<ShopOutlined/>}>
                                Marketplace
                                <Link to={'/marketplace'}/>
                            </Menu.Item>
                            <Menu.Item key="6" icon={<QuestionCircleOutlined/>}>
                                <a target='_blank' href={'/centro-soporte'} rel="noopener noreferrer">Soporte</a>
                            </Menu.Item>
                            <Menu.Item key="7"
                                       icon={<ImportOutlined/>}
                                       onClick={logout}>
                                Logout
                                <Link to="/"/>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    :
                    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                        <div className="logo"/>
                        <Menu theme={lightDark ? 'light' : "dark"} defaultSelectedKeys={['2']} mode="inline" style={{position: 'sticky', top: '1%'}}>
                            <Menu.Item key="1" className={logoClass ? 'menu-item-logo' : ''} icon={<Link to={'/'}>
                                <LogoSidebar logo={logo} logoClass={logoClass}/></Link>}>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<HomeOutlined/>}>
                                Home
                                <Link to="/user"/>
                            </Menu.Item>

                            <Menu.Item key="3" icon={<ScheduleOutlined/>}>
                                Mi calendario
                                <Link to="/calendar"/>
                            </Menu.Item>
                            <Menu.Item key="4" icon={<TeamOutlined/>}>
                                {et_plural}
                                <Link to="/user/users"/>
                            </Menu.Item>
                            <Menu.Item key="5" icon={<ShopOutlined/>}>
                                Marketplace
                                <Link to={'/marketplace'}/>
                            </Menu.Item>
                            </Menu>
                            <Menu theme={lightDark ? 'light' : "dark"} defaultSelectedKeys={['2']} mode="inline" style={{position: 'sticky', top: '83%'}}>
                            <Menu.Item key="6" icon={<QuestionCircleOutlined/>}>
                                <a target='_blank' href={'/centro-soporte'} rel="noopener noreferrer">Soporte</a>
                            </Menu.Item>
                            <Menu.Item key="7"
                                       icon={<ImportOutlined/>}
                                       onClick={logout}>
                                Logout
                                <Link to="/"/>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                }

                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0}}>
                        <div className='avatar-topbar'>
                            <a href='https://bit.ly/centro-soporte-grovity'
                               target="_blank" rel="noopener noreferrer">
                                <QuestionCircleOutlined id='help'/>
                            </a>
                            <Link to={`/user`}>
                                <Popover placement='bottom' title={text} content={content} trigger='hover'>
                                    <div
                                        className='avatar-mini'
                                        style={{backgroundImage: `url('${user && user.img_usuario ? user.img_usuario : avatarUrl}')`}}>
                                    </div>
                                </Popover>
                            </Link>

                        </div>
                    </Header>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                            {children}
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        <Row justify='center' align='middle'>
                            <p style={{fontSize: '70%'}}>Powered by</p>
                            <img src={process.env.PUBLIC_URL + '/static/imgs/escuelaJuntas/small/Artboard 5 copy@0,25x.png'}
                                alt="logo"/>
                        </Row>
                    </Footer>
                </Layout>
            </Layout>
        );
    } else if (isAuthenticated && !status && entidad) {
        return (
            <Layout style={{minHeight: '100vh'}}>
                {isMobile ?
                    <Sider collapsible
                           breakpoint='sm'
                           collapsedWidth='0' S
                           onBreakpoint={broken => {
                               console.log(broken);
                           }}
                           collapsed={collapsedMobil}
                           onCollapse={onCollapseMobil}>
                        <div className="logo"/>
                        <Menu theme={lightDark ? 'light' : "dark"} defaultSelectedKeys={['2']} mode="inline" style={{position: 'sticky', top: '1%'}}>
                            <Menu.Item key="1" className={logoClass ? 'menu-item-logo' : ''} icon={<Link to={'/'}>
                                <LogoSidebar logo={logo} logoClass={logoClass}/></Link>}>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<HomeOutlined/>}>
                                Home
                                <Link to="/institution"/>
                            </Menu.Item>
                            <Menu.Item key="4" icon={<ScheduleOutlined/>}>
                                Mi calendario
                                <Link to="/calendar"/>
                            </Menu.Item>
                            <Menu.Item key="5" icon={<QuestionCircleOutlined/>}>
                                <a target='_blank' href={'/centro-soporte'} rel="noopener noreferrer">Soporte</a>
                            </Menu.Item>
                            <Menu.Item key="6"
                                       icon={<ImportOutlined/>}
                                       onClick={logout}>
                                Logout
                                <Link to="/"/>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    :
                    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                        <div className="logo"/>
                        <Menu theme={lightDark ? 'light' : "dark"} defaultSelectedKeys={['2']} mode="inline" style={{position: 'sticky', top: '1%'}}>
                            <Menu.Item key="1" className={logoClass ? 'menu-item-logo' : ''} icon={<Link to={'/'}>
                                <LogoSidebar logo={logo} logoClass={logoClass}/></Link>}>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<HomeOutlined/>}>
                                Home
                                <Link to="/institution"/>
                            </Menu.Item>
                            <Menu.Item key="4" icon={<ScheduleOutlined/>}>
                                Mi calendario
                                <Link to="/calendar"/>
                            </Menu.Item>
                            </Menu>
                            <Menu theme={lightDark ? 'light' : "dark"} defaultSelectedKeys={['2']} mode="inline" style={{position: 'sticky', top: '83%'}}>
                            <Menu.Item key="5" icon={<QuestionCircleOutlined/>}>
                                <a target='_blank' href={'/centro-soporte'} rel="noopener noreferrer">Soporte</a>
                            </Menu.Item>
                            <Menu.Item key="6"
                                       icon={<ImportOutlined/>}
                                       onClick={logout}>
                                Logout
                                <Link to="/"/>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                }


                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0}}>
                        <div className='avatar-topbar'>
                            <a href='https://bit.ly/centro-soporte-grovity'
                               target="_blank" rel="noopener noreferrer">
                                <QuestionCircleOutlined id='help'/>
                            </a>
                            <Link to={`/institution`}>
                                <div
                                    className='avatar-mini'
                                    style={{backgroundImage: `url('${user && user.img_usuario ? user.img_usuario : avatarUrl}')`}}>
                                </div>
                            </Link>

                        </div>
                    </Header>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                            {children}
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        <Row justify='center' align='middle'>
                            <p style={{fontSize: '70%'}}>Powered by</p>
                            <img src={process.env.PUBLIC_URL + '/static/imgs/escuelaJuntas/small/Artboard 5 copy@0,25x.png'}
                                alt="logo"/>
                        </Row>
                    </Footer>
                </Layout>
            </Layout>
        )
    } else {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo"/>
                    <Menu theme={lightDark ? 'light' : "dark"} defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<Link to={'/'}><LogoSidebar logo={logo} logoClass={logoClass}/></Link>}>
                            Home
                        </Menu.Item>
                        <Menu.Item key="2" icon={<UserOutlined/>}>
                            Login
                            <Link to="/login"/>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0}}/>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                            {children}
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        <Row justify='center' align='middle'>
                            <p style={{fontSize: '70%'}}>Powered by</p>
                            <img src={process.env.PUBLIC_URL + '/static/imgs/escuelaJuntas/small/Artboard 5 copy@0,25x.png'}
                                alt="logo"/>
                        </Row>
                    </Footer>
                </Layout>
            </Layout>
        )

    }

}

AppFrame.propTypes = {
    children: PropTypes.node
}

const mapStateToProps = state => ({
    auth: state.auth,
    entidad: getStatusUser(state),
    id: getUserId(state),
    username: getUsername(state),
    status: getStatusMentor(state),
    empresa: getStatusEmpresa(state),
    equipo: getEquipo(state),
    user: selectCurrentUser(state),
    et_plural: getet(state).replace('-', ''),
});

export default withRouter(connect(mapStateToProps, {
    logout
})(AppFrame))
