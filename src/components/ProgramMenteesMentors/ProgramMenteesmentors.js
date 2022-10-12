import React, {useState, useEffect} from 'react'
import {Col, Row, Tabs, Input} from 'antd';
import PropTypes from 'prop-types';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {getUserbyId} from "../../api";
import {connect} from "react-redux";
import {enquireScreen} from 'enquire-js';
import CardPlanEmprendedor from '../CardsPlanEmprendedor/CardsPlanEmprendedor';
import CardMentor from '../CardMentor/CardMentor';
import { fetchUsersbyId } from '../../actions/fetchUsers';
import {fetchEmprendedoresbyProgram} from "../../actions/fetchUsers";
import {getIdInstitution} from "../../selectors/institutions";
import {getStatusMentor} from "../../selectors/users";
import {fetchMentorsByProgram} from '../../actions/fetchMentors';


//usuario/entidad/<int:id_entidad>/<int:id_programa>

const {TabPane} = Tabs;
const {Search} = Input;


const ProgramMenteesMentors = (props) => {
    const {emprendedores, mentors_program} = props
    const [isMobile, setIsMobile] = useState(false);
    const [search, setSearch] = useState(false);
    const [search2, setSearch2] = useState(false);
    const [emprendedoresProgram, setEmprendedoresProgram] = useState([])
    const [mentoresProgram, setMentoresProgram] = useState([])


    enquireScreen((b) => {
        return () => {
            setIsMobile(b);
        }
    })

    const onSearch = (value) => {
        // funcion para buscar emprendedores por valor ingresado
        let searchResults = [];
        let res = [];

        if (value) {
            value = value.split(' ');
            value.map((val) => {
                setSearch(true);
                let results = props.emprendedores.filter(obj => Object.values(obj).some(v => v?v.toString().toLowerCase().includes(val.toLowerCase()): false));
                if (results)
                    searchResults.push(results)
            })
            searchResults.map(r => {
                res = res.concat(r);
            })
            let uniqueResults = Array.from(new Set(res.map(a => a.id)))
                .map(id => {
                    return res.find(a => a.id === id)
                }) 
            setEmprendedoresProgram(uniqueResults);
           
        }
        else {
            setSearch(false);
        }
    }
    const onSearch2 = (value) => {
        // funcion para buscar mentor por valor ingresado
        let searchResults = [];
        let res = [];

        if (value) {
            value = value.split(' ');
            value.map((val) => {
                setSearch2(true);
                let results = props.mentors_program.filter(obj => Object.values(obj).some(v => v?v.toString().toLowerCase().includes(val.toLowerCase()): false));
                if (results)
                    searchResults.push(results)
            })
            searchResults.map(r => {
                res = res.concat(r);
            })
            let uniqueResults = Array.from(new Set(res.map(a => a.id)))
                .map(id => {
                    return res.find(a => a.id === id)
                }) 
            setMentoresProgram(uniqueResults);
        }
        else {
            setSearch2(false);
        }
    }


    useEffect(() => {
        enquireScreen((b) => {
            setIsMobile(
                !!b
            );
        });
    }, [isMobile])


    return (
        <Row id='tabs-mentor-info' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col lg={0} md={0} xs={0} xl={5}></Col>
            <Col lg={24} md={24} xs={24} xl={19}>
                <Tabs size="large" defaultActiveKey="1">
                    <TabPane
                        tab={
                            <span>
                                Mentees
                            </span>
                        }
                        key="1"
                    >
                        <Row className='row-cards-actividades'>
                            <Col lg={8} md={12} xs={24} xl={6}>
                                <Search
                                placeholder="Escriba el nombre del emprendedor"
                                allowClear
                                enterButton="Buscar"
                                size="medium"
                                onSearch={onSearch}
                                />  
                            </Col>                     
                        </Row>
                        <Row>
                            {
                                search ?
                                Array.isArray(emprendedoresProgram) && (
                                    emprendedoresProgram.map(function (emprendedor) {
                                        return <CardPlanEmprendedor emprendedor={emprendedor} key={emprendedor.id}></CardPlanEmprendedor>
                                    })
                                )
                                :
                                Array.isArray(emprendedores) && (
                                    emprendedores.map(function (emprendedor) {
                                        return <CardPlanEmprendedor emprendedor={emprendedor} key={emprendedor.id}></CardPlanEmprendedor>
                                    })
                                )
                            }
                        </Row>
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                Mentores
                            </span>
                        }
                        key="2"
                    >
                        <Row className='row-cards-actividades'>
                            <Col lg={8} md={12} xs={24} xl={6}>
                                <Search
                                placeholder="Escriba el nombre del mentor"
                                allowClear
                                enterButton="Buscar"
                                size="medium"
                                onSearch={onSearch2}
                                />  
                            </Col>                     
                        </Row>
                        <Row>
                            {
                                search2 ?
                                Array.isArray(mentoresProgram) && (
                                    mentoresProgram.map(function (mentor) {
                                        return <CardMentor mentor={mentor} key={mentor.id}></CardMentor>
                                    })
                                )
                                :
                                Array.isArray(mentors_program) && (
                                    mentors_program.map(function (mentor) {
                                        return <CardMentor mentor={mentor} key={mentor.id}></CardMentor>
                                    })
                                )
                            }
                        </Row>
                    </TabPane>
                </Tabs>
            </Col>
        </Row>       
    )
}

ProgramMenteesMentors.propTypes = {
    fetchUsersbyId: PropTypes.func.isRequired,
    user: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
    user: getUserbyId(),
    emprendedores: state.emprendedores_program,
    id_entidad: getIdInstitution(state),
    status: getStatusMentor(state),
});

export default connect(mapStateToProps, {
    fetchUsersbyId,
    fetchEmprendedoresbyProgram, 
    fetchMentorsByProgram
})(ProgramMenteesMentors)