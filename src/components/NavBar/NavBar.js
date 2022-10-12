import React, {useState, useEffect} from 'react';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './NavBar.scss'
import {Row, Col, Button, Divider, Menu, Dropdown, Space} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import {
    getStatusMentor,
    selectCurrentUser
} from "../../selectors/users";
import {connect} from "react-redux";
import AvatarDefault from "../../assets/images/avatar-not-found.png";
import {getStatusEntidad} from "../../selectors/institutions";
import { GiHamburgerMenu } from "react-icons/gi";



const NavBar = (props) => {
    const {entidad, isMobile} = props
    const [state, setState] = useState('header-scroll')
    const [logged, setLogged] = useState(false);
    const avatarUrl = AvatarDefault


    const handleScroll = () => {
        if (window.pageYOffset > 0) {
            setState('header-scroll')
        } else {
            if (window.location.pathname === '/marketplace') {
                setState('header-nav-marketplace')
            }
            else {
                setState('header')
            }
        } 
    }

    const logout2 = () => {
        localStorage.clear();
        setLogged(false);
    }

    const menu = (
        <Menu>
          <Menu.Item>
            <Link to={`/marketplace`}>
              BUSCAR MENTORES
            </Link>
          </Menu.Item>
          <Menu.Item>
              <a href='https://consultor.grovity.co/landing'>
                CONVIERTETE EN MENTOR
              </a>
          </Menu.Item>
          {
            !localStorage.getItem('token') && (
                <Menu.Item>
                    <a href={'https://consultor.grovity.co/landing'}>
                    REGISTRO
                    </a>
                </Menu.Item>
            )
        }
          {
            !localStorage.getItem('token') && (
                <Menu.Item>
                    <a href={`/login`}>
                    LOGIN
                    </a>
                </Menu.Item>
            )
        }
        {
            localStorage.getItem('token') && (
                <Menu.Item>
                    <a href={`/`} onClick={logout2}>
                    LOGOUT
                    </a>
                </Menu.Item>
            )
        }      
        </Menu>
      );


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setLogged(true);
        }
        else {
            setLogged(false)
        }

    }, [logged]);


    return (
        <header className={state}>
            <Row justify='center'>
                <Col xxl={20} xl={20} lg={20} md={22} sm={22} xs={22}>
                    <Row align='middle'>
                        <Col className='col-logo' xxl={13} xl={10} lg={7} md={!isMobile ? 7 : logged ? 18 : 22} sm={ logged ? 17 : 22} xs={logged ? 17 : 21}>
                            <Link to={'/'}>
                                <img alt='Grovity Home' src={process.env.PUBLIC_URL + '/static/imgs/nuevo_home/medium/logo-blanco0\,5.png'}/>
                            </Link>
                        </Col>
                        {
                            isMobile ?
                            <>
                                <Col xxl={0} xl={0} lg={0} md={2} sm={3} xs={3}>
                                    <Space direction="vertical">
                                        <Space wrap>
                                            <Dropdown overlay={menu} placement="bottomLeft">
                                                <GiHamburgerMenu size={25} style={{color: 'white'}}/>
                                            </Dropdown>
                                        </Space>
                                    </Space>
                                </Col>
                                <Col>
                                {
                                        localStorage.getItem('token') && (
                                            <Row align='middle' justify='space-between'>
                                                <Divider type='vertical' />
                                                <Col xxl={0} xl={0} lg={0} md={2} sm={2} xs={2}>
                                                    <Link to={entidad ? '/institution': 'user'}>
                                                        <div
                                                            className='avatar-mini'
                                                            style={{backgroundImage: `url('${avatarUrl}')`}}>
                                                        </div>
                                                    </Link>
                                                </Col>
                                            </Row>
                                        )
                                    }
                                </Col>
                            </>
                            :
                            <>
                                <Col className='cols-btns-navbar' xxl={3} xl={4} lg={5} md={5} sm={22} xs={22}>
                                    <Link to={`/marketplace`}>
                                        <Button className='btns-navbar' type='link'>BUSCA MENTORES</Button>
                                    </Link>
                                </Col>
                                <Col className='cols-btns-navbar' xxl={4} xl={5} lg={6} md={7} sm={22} xs={22}>
                                    <a href='https://consultor.grovity.co/landing' target='_blank' rel='noopener noreferrer'>
                                        <Button className='btns-navbar' type='link'>CONVIERTETE EN MENTOR</Button>
                                    </a>
                                </Col>
                                <Col xxl={4} xl={5} lg={6} md={5} sm={22} xs={22}>
                                    {
                                        !localStorage.getItem('token') && (
                                            <Row align='middle'>
                                                <Col className='cols-btns-navbar' xxl={11} xl={11} lg={11} md={10} sm={22} xs={22}>
                                                    <a href={'https://consultor.grovity.co/landing'}>
                                                        <Button className='btns-navbar' type='link' >REGISTRO</Button>
                                                    </a>
                                                </Col>
                                                <Divider type='vertical' />
                                                <Col className='cols-btns-navbar' xxl={11} xl={11} lg={11} md={10} sm={22} xs={22}>
                                                    <a href={`/login`}>
                                                        <Button className='btns-navbar' type='link'>LOGIN</Button>
                                                    </a>
                                                </Col>
                                            </Row>

                                        )
                                    }
                                    {
                                        localStorage.getItem('token') && (
                                            <Row align='middle' justify='space-between'>
                                                <Col className='cols-btns-navbar' xxl={11} xl={11} lg={11} md={11} sm={22} xs={22}>
                                                    <a href={`/`} onClick={logout2}>
                                                        <Button className='btns-navbar' type='link'>LOGOUT</Button>
                                                    </a>
                                                </Col>
                                                <Divider type='vertical' />
                                                <Col xxl={11} xl={11} lg={11} md={8} sm={22} xs={22}>
                                                    <Link to={entidad ? '/institution': 'user'}>
                                                        <div
                                                            className='avatar-mini'
                                                            style={{backgroundImage: `url('${avatarUrl}')`}}>
                                                        </div>
                                                    </Link>
                                                </Col>
                                            </Row>
                                        )
                                    }
                                </Col>
                            </>
                        }
                    </Row>
                </Col>
                
            </Row>
        </header>
    );
}


const mapStateToProps = state => ({
    user: selectCurrentUser(state),
    status: getStatusMentor(state),
    entidad: getStatusEntidad(state),

});

export default withRouter(connect(mapStateToProps, null)(NavBar))