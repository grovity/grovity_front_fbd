import React, {useState, useEffect} from 'react'
import {Row, Col, Button, Empty, Modal} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import CardProgramsAnt from "../../components/CardItemAnt/CardItemAnt";
import CardItemAntEvent from "../../components/CardItemEvent/CardItemAntEvent";
import CardItemAntStats from "../../components/CardItemAntStats/CardItemAntStats";
import PerfilGeneralMentor from '../../components/PerfilGeneralMentor/PerfilGeneralMentor';
import {PlusOutlined} from '@ant-design/icons';
import {fetchEmpresaEmprendedor, fetchInfoEmpresa, fetchProgramsbyUser} from "../../actions/fetchUsers";
import {fetchEventsbyMentor, fetchEventsbyUser} from "../../actions/fetchEvents";
import {fetchCalifiacionbyMentor, fetchMentors} from "../../actions/fetchMentors";
import {fetchMentorshipsbyMentor, fetchMentorshipsMentor} from "../../actions/fetchMentorships";
import {connect} from "react-redux";
import {Link, withRouter} from 'react-router-dom';
import {getmt, getUsername} from "../../selectors/institutions";
import {getMentorshipsbyMentor} from "../../selectors/mentorships";
import CalendarPruebas from '../../components/CalendarMobiPruebas/CalendarMobiPruebas';
import moment from 'moment';
import CreateEventAntMentor from '../../components/CreateEventAnt/CreateEventAntMentor';
import {getUser} from "../../api";

const HomeUserMentor = (props) => {
    const {
        programs_user, events, id,
        status, entidad, mentorships, username, calificacion, user
    } = props
    const [showModal, setShowModal] = useState(false)
    const [contentModal, setContentModal] = useState(null)
    const [value, setValue] = useState(moment());
    let  user_zoom


    const openModal = async () => {
        setShowModal(true)
        // setContentModal(content)

    };

    const closeModal = () => {
        setShowModal(false)
    };

    useEffect(() => {
        const getMentorships = async () => {
            await props.fetchMentorshipsbyMentor(username)
            user_zoom = await getUser()
           
        }

        const getCalificacion = async (username) => {
            await props.fetchCalifiacionbyMentor(username)
        }

        getCalificacion(username)

        getMentorships()

    }, [username])


    return (

        <div id='home-user-mentor'>
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <PerfilGeneralMentor user={user} status={status}
                    calificacion={calificacion} username={username}>
                </PerfilGeneralMentor>
                <Col lg={18} md={24} xs={24} style={{padding: 0, }}>
                    <Row className='eventos-hoy' >
                        <Col xl={18} lg={14} xs={24} md={24} className='conecta-mentor calendar-week'>
                            <h1>Eventos de esta semana</h1>
                        </Col>
                        <Col xl={6} lg={10} xs={12} md={12}>
                            <Link to={'/user/files'}>
                                <Button size='large' className='btn-verde-basico' block>
                                    Mis documentos
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                    <Row className='eventos-hoy'>
                        <CalendarPruebas events={events} status={status} value={value} onChange={setValue}/>
                    </Row>
                    {events['eventos'].length !== 0 ?
                        <Row className='eventos-hoy'>
                            <CardItemAntEvent events={events} status={status} value={value} onChange={setValue}></CardItemAntEvent>
                        </Row>
                        :
                        <Row className='eventos-hoy-no'>
                            <Col>
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                                       description={
                                           <span>
                                        No tiene eventos esta semana aún <br/>
                                        <a href="/calendar">Ir a mi calendario</a>
                                    </span>
                                       }
                                />
                            </Col>
                        </Row>
                    }
                </Col>
            </Row>

            <Row className='mis-programas mb-0'>
                <h2>Mis estadísticas</h2>
                <CardItemAntStats id={id} user={user} calificacion={calificacion}/>
            </Row>
            <Row className='mis-programas mt-0'>
                <h2>Mis programas</h2>
                <CardProgramsAnt programs_user={programs_user} status={status} entidad={entidad}></CardProgramsAnt>
            </Row>
        </div>
    )
}


const mapStateToProps = state => ({
    username: getUsername(state),
    mentorships: getMentorshipsbyMentor(state),
    mt: getmt(state).split('-')[0],
    mt_plural: getmt(state).replace('-', ''),
    calificacion: state.calificacion_mentor,
});

export default withRouter(connect(mapStateToProps, {
    fetchProgramsbyUser,
    fetchEventsbyUser,
    fetchEventsbyMentor,
    fetchEmpresaEmprendedor,
    fetchInfoEmpresa,
    fetchMentors,
    fetchMentorshipsbyMentor,
    fetchMentorshipsMentor,
    fetchCalifiacionbyMentor
})(HomeUserMentor));