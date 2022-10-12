import React, { useEffect} from 'react'
import {Row, Col} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {fetchEmpresaEmprendedor, fetchInfoEmpresa, fetchProgramsbyUser} from "../../actions/fetchUsers";
import {fetchEventsbyMentor, fetchEventsbyUser} from "../../actions/fetchEvents";
import {fetchCalifiacionbyMentor, fetchMentors} from "../../actions/fetchMentors";
import {fetchMentorshipsbyMentor, fetchMentorshipsMentor} from "../../actions/fetchMentorships";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import {getet, getmt, getUsername} from "../../selectors/institutions";
import {getMentorshipsbyMentor} from "../../selectors/mentorships";
import FotoPerfilEntidad from '../../components/FotoPerfilEntidad/FotoPerfilEntidad';
import EntidadInfoMain from '../../components/EntidadInfoMain/EntidadInfoMain';
import CardsEntidadMain from '../../components/CardsEntidadMain/CardsEntidadMain';



const HomeUserEntidad = (props) => {
    const {
        user, institution,
    } = props

    useEffect(() => {

    }, [])


    return (

        <div id='home-user-entidad'>
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} className="foto-info-row">
                <Col lg={6} md={24} xs={24}>
                    <FotoPerfilEntidad
                        user={user}
                    />
                </Col>
                
                <Col lg={18} md={24} xs={24}>
                    <Row className='eventos-hoy'>
                        <Col lg={24} xs={24} md={24} className='calendar-week'>
                            <EntidadInfoMain institution={institution} user={user}/>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row className='eventos-hoy'>
                <Col lg={6} md={24} xs={24}></Col>
                <Col lg={18} md={24} xs={24}>
                    <Row>
                        <Col lg={24} xs={24} md={24}>
                            <CardsEntidadMain mt_plural={props.mt_plural} et_plural={props.et_plural}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}


const mapStateToProps = state => ({
    username: getUsername(state),
    mentorships: getMentorshipsbyMentor(state),
    mt: getmt(state).split('-')[0],
    mt_plural: getmt(state).replace('-', ''),
    et_plural: getet(state).replace('-', ''),
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
})(HomeUserEntidad));