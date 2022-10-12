import React, {useEffect, useState} from 'react'
import {Col, Row, Button} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {connect} from "react-redux";
import {enquireScreen} from 'enquire-js';
import { BsStarFill} from "react-icons/bs";
import {Link} from "react-router-dom";
import PopConfirm from "../PopConfirm/PopConfirm";
import {deleteUsuario} from "../../api/mentorships";
import {withRouter} from "react-router-dom";
import {fetchMentors} from "../../actions/fetchMentors";




const MentorCardInfoMain = (props) => {
    const {mentor, user, id_institution} = props
    const [isMobile, setIsMobile] = useState(false);
    const [flag, setFlag] = useState(false)


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

    const onDelete = async (c, id) => {
        const response = await deleteUsuario(c, 2)
        if(response){
            await props.fetchMentors(id)
        }
    }

    return (
        <Row id='marketplace-info-main' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col lg={24} xs={24} md={24}>
                <Row className='nombre-editar-btn'>
                    <Col lg={14} xs={16} md={18} sm={19} xl={17} xxl={18} className='Nombre'>
                        <Row>
                            <h1>{mentor.first_name} {mentor.last_name}</h1>
                        </Row>
                        <Row>
                            <p>{mentor.titulo}</p>
                        </Row>
                    </Col>
                    <Col className='btn-agendar' lg={10} xs={16} md={12} xl={7} xxl={6}>
                        <Row gutter={[8, 8]}>
                            <Col lg={24} xs={12} md={12}>
                                <Link to={`/mentors/mentors/${mentor.username}/data`}>
                                    <Button type='link' className='btn-verde-basico'block>
                                        Ver perfil
                                    </Button>
                                </Link> 
                            </Col>
                            <Col lg={24} xs={12} md={12}>
                                <PopConfirm type={'primary'} message={'mentor'} style={{fontFamily: 'ObjectiveRegular'}} className={'w-100'}
                                            functionDelete={() => onDelete(mentor.username, id_institution)}
                                            id={mentor.id} setFlag={setFlag}></PopConfirm>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col lg={7} xs={24} md={12} xl={7} className="datos-contacto">
                         <h5><BsStarFill /> {(user && user[0] && user[0].puntaje) ?  user[0].puntaje.toFixed(2) : ''}</h5>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state) => ({

});

export default withRouter(connect(mapStateToProps, {
    fetchMentors,
})(MentorCardInfoMain));