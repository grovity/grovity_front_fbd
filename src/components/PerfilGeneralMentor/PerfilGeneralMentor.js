import React from 'react'
import {Link, } from 'react-router-dom';
import {connect} from "react-redux";
import {RightOutlined} from '@ant-design/icons';
import {Button, Col, Progress, Row} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import AvatarDefault from '../../../src/assets/images/avatar-not-found.png';
import {LinkedinShareButton, 
        LinkedinIcon,
        FacebookShareButton,
        FacebookIcon,
        TwitterShareButton,
        TwitterIcon} from 'react-share';



const PerfilGeneralMentor = ({user, username, status}) => {
    const avatarUrl = AvatarDefault

    const shareUrl = 'https://bit.ly/2UOihD6';
    const title = 'Grovity - Mentors to grow';
    const description = 'Somos una plataforma que conecta a emprendedores y empresas con mentores de toda Latinoamérica que acompañan las distintas etapas de crecimiento de los negocios';
    const quote = 'Accede a Grovity y conoce mis mentorías para #Emprendedores y #Empresarios'

    return (
        <Col className='perfil-general-mentor' lg={6} xs={24} md={24}>
            <div
                className='avatar'
                style={{backgroundImage: `url('${user && user.img_usuario ? user.img_usuario : avatarUrl}')`}}>
            </div>
            <div className='nombre-cargo'>
                <h5 className='text-center'>{user && user.first_name} {user && user.last_name}</h5>
                <p className='text-center'>{user && user.titulo}</p>
                <p className='text-center email'>{user && user.email}</p>
            </div>
            <div className='resumen-perfil'>
                <Row>
                    <h6>Comparta para que más emprendedores lo conozcan</h6>
                </Row>
                <Row className='share-btns-row'>
                    <LinkedinShareButton className='share-btns' url={shareUrl} title={title} description={description}><LinkedinIcon size={32} round /></LinkedinShareButton>
                    <FacebookShareButton className='share-btns' url={shareUrl} quote={quote} hashtag='#MentoresEnGrovity'><FacebookIcon size={32} round/></FacebookShareButton>
                    <TwitterShareButton className='share-btns' url={shareUrl} title={quote}><TwitterIcon size={32} round/></TwitterShareButton>
                </Row>
                <Link to={status ? `user/mentor/${username}` : `user/${username}`}>
                    <Button type="primary" className='btn-azul-basico'>Ver mi perfil</Button>
                </Link>
            </div>

        </Col>
    )
}

const mapStateToProps = (state, props) => ({
});

export default connect(mapStateToProps, null)(PerfilGeneralMentor)