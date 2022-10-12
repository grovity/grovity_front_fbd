import React, {useState, useEffect} from 'react';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
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



const NavBarEco = (props) => {
    const {entidad, isMobile} = props
    const [stateHeader, setStateHeader] = useState('header-eco')
    const [logged, setLogged] = useState(false);
    const avatarUrl = AvatarDefault


    const handleScroll = () => {
        if (window.pageYOffset > 0) {
            setStateHeader('header-eco-scroll')
        } else {
                setStateHeader('header-eco')
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
              AGENDAR DEMO
            </Link>
          </Menu.Item>
          <Menu.Item>
              <a href='https://mentores.grovity.co/marketplace'>
                PRECIOS
              </a>
          </Menu.Item>
          {
            !localStorage.getItem('token') && (
                <Menu.Item>
                    <a href={`/sign-up`}>
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
        <header className={stateHeader}>
            <Row justify='center'>
                <Col xxl={20} xl={20} lg={20} md={22} sm={22} xs={22}>
                    <Row align='middle'>
                        <Col className='col-logo' xxl={16} xl={12} lg={11} md={!isMobile ? 11 : logged ? 18 : 22} sm={ logged ? 17 : 21} xs={logged ? 17 : 21}>
                            <Link to={'/'}>
                                <img alt='Grovity Home' src={process.env.PUBLIC_URL + '/static/imgs/home_eco/grovity-azul.png'}/>
                            </Link>
                        </Col>
                        {
                            isMobile ?
                            <>
                                <Col xxl={0} xl={0} lg={0} md={2} sm={3} xs={3}>
                                    <Space direction="vertical">
                                        <Space wrap>
                                            <Dropdown overlay={menu} placement="bottomLeft">
                                                <GiHamburgerMenu size={25} style={{color: '#00495d'}}/>
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
                            <Col xxl={8} xl={12} lg={13} md={!isMobile ? 13 : logged ? 18 : 22} sm={ logged ? 17 : 22} xs={logged ? 17 : 21}>
                            <Row gutter={[8,8]}>
                                <Col className='cols-btns-navbar' xxl={8} xl={8} lg={8} md={8} sm={22} xs={22}>
                                    <a target='_blank'  href={`https://calendly.com/grovity/demogrovity?month=2021-03`} rel='noopener noreferrer'>
                                        <Button className='btns-navbar' type='link'>AGENDAR DEMO</Button>
                                    </a>
                                </Col>
                                <Col className='cols-btns-navbar' xxl={5} xl={5} lg={5} md={5} sm={22} xs={22}>
                                    <a href='#pricing-eco'>
                                        <Button className='btns-navbar' type='link'>PRECIOS</Button>
                                    </a>
                                </Col>
                                <Col xxl={11} xl={11} lg={11} md={11} sm={22} xs={22}>
                                    {
                                        !localStorage.getItem('token') && (
                                            <Row align='middle'>
                                                <Col className='cols-btns-navbar' xxl={11} xl={11} lg={11} md={10} sm={22} xs={22}>
                                                    <a href={`/sign-up`}>
                                                        <Button className='btns-navbar' type='link' >REGISTRO</Button>
                                                    </a>
                                                </Col>
                                                <Divider type='vertical' />
                                                <Col className='cols-btns-navbar' xxl={11} xl={11} lg={10} md={10} sm={22} xs={22}>
                                                    <a href={`/login`}>
                                                        <Button className='btns-navbar' type='link'>LOGIN</Button>
                                                    </a>
                                                </Col>
                                            </Row>

                                        )
                                    }
                                    {
                                        localStorage.getItem('token') && (
                                            <Row justify='space-between'>
                                                <Col className='cols-btns-navbar' xxl={11} xl={11} lg={11} md={11} sm={22} xs={22}>
                                                    <a href={`/`} onClick={logout2}>
                                                        <Button className='btns-navbar' type='link'>LOGOUT</Button>
                                                    </a>
                                                </Col>
                                                <Divider type='vertical' className='divider-navbar'/>
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
                                </Row>
                            </Col>
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

export default withRouter(connect(mapStateToProps, null)(NavBarEco))