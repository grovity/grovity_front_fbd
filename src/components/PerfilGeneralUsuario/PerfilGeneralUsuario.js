import React from 'react'
import {Link} from 'react-router-dom';
import {Col, Button, Row} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './PerfilGeneralUsuario.scss';
import AvatarDefault from '../../../src/assets/images/avatar-not-found.png'
import {connect} from "react-redux";
import {getStatusEmpresa} from "../../selectors/users";


const PerfilGeneralUsuario = ({user, username}) => {

    const avatarUrl = AvatarDefault

    function ucFirst(string) 
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <Col className='perfil-usuario' lg={6} xs={24} md={24}>
            <div
                className='avatar'
                style={{backgroundImage: `url('${user && user.img_usuario ? user.img_usuario : avatarUrl}')`}}>
            </div>
            <div className='nombre-cargo'>
                <h5 className='text-center'>{user && user.first_name} {user && user.last_name}</h5>
                <p className='text-center'>{user && user.titulo}</p>
                <p className='text-center'>{user && ucFirst(user.reside)}</p>
                <p className='text-center'>{user && user.email}</p>
            </div>
            <div className='resumen-empresa'>
                <h5>Acerca de mi:</h5>
                <p>{user && user.descripcion}</p>
            </div>
            <Row className='resumen-empresa'>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>               
                {/*<h4>Mi meta</h4>*/}
                {/*<p>{user && user.descripcion}</p>*/}
                {/*<Progress percent={50} strokeColor='#95C11F' strokeWidth={8}/>*/}
                {/*<h5>Sigue así, ya pasaste la mitad!</h5>*/}
                {/*<p>Compartir mis logros:</p>*/}
                {/*<div className='redes'>*/}
                {/*    <img src={process.env.PUBLIC_URL + '/static/imgs/plataforma/twitter-perfilmain.png'}/>*/}
                {/*    <img src={process.env.PUBLIC_URL + '/static/imgs/plataforma/link-perfilmain.png'}/>*/}
                {/*    <img src={process.env.PUBLIC_URL + '/static/imgs/plataforma/insta-perfilmain.png'}/>*/}
                {/*</div>*/}
                <Row gutter={[8]}>
                    <Col xxl={12} xl={24} lg={24} md={12} sm={12} xs={12}>
                        <Link to={`user/${username}`} className='mr-2'>
                            <Button type='primary' className='btn-azul-basico mb-2' block>
                                Ver mi perfil</Button>
                        </Link>
                    </Col>
                    <Col xxl={12} xl={24} lg={24} md={12} sm={12} xs={12}>
                        <Link to={`empresa`}>
                            <Button type='primary' className='btn-azul-basico' block>
                                Ver mi empresa
                            </Button>
                        </Link>
                    </Col>                   
                </Row>
                </Col>
            </Row>
        </Col>
    )
}

const mapStateToProps = (state, props) => ({
    empresa_status: getStatusEmpresa(state),

});

export default connect(mapStateToProps, null)(PerfilGeneralUsuario)