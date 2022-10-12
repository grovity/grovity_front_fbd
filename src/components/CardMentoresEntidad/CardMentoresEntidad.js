import React, {useState, useEffect} from 'react'
import {Row, Col, Card} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import FotoPerfilMentor from '../../components/FotoPerfilMentor/FotoPerfilMentor';
import {enquireScreen} from 'enquire-js';
import MentorCardInfoMain from '../MentorCardInfoMain/MentorCardInfoMain';
import MentorCardInfoBasica from '../MentorCardInfoBasica/MentorCardInfoBasica';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {fetchUsersbyId} from "../../actions/fetchUsers";
import {getet, gitIdInstitution} from "../../selectors/institutions";
import {fetchMentors} from "../../actions/fetchMentors";


const CardMentoresEntidad = (props) => {
    const {mentor, entidad, id_institution, et} = props
    const [mentorDetail, setMentorDetail] = useState({})
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
        (async() => {
            const json = await props.fetchUsersbyId(mentor?.username)
            setMentorDetail(json.payload)
        })()
    }, [mentor.username])

    return (
        <Col lg={12} md={24} sm={24} xs={24} xxl={12} style={{padding: '0.5%'}} >
            <Card className='mb-3' id="card-marketplace" style={{height: '100%'}}>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col lg={6} md={6} xs={24} xl={6} style={{textAlign: 'center'}}>
                        <FotoPerfilMentor
                            user={mentor} entidad={entidad}/>
                    </Col>
                    <Col lg={18} md={18} xs={24} xl={18}>
                        <MentorCardInfoMain
                            mentor={mentor} user={mentorDetail} id_institution={id_institution}/>
                    </Col>
                </Row>
                <Row>
                <Col lg={24} md={24} xs={24}>
                        <MentorCardInfoBasica
                            mentor={mentor} user={mentorDetail}/>
                    </Col>
                </Row>
            </Card>
        </Col>   
    )
}

const mapStateToProps = state => ({
    user: state.user,
    id_institution: gitIdInstitution(state),
    et: getet(state).split('-')[0],
});

export default withRouter(connect(mapStateToProps, {
    fetchUsersbyId,
    fetchMentors,

})(CardMentoresEntidad));