import React, {useState, useEffect} from 'react'
import {Row, Col, Divider, Input, Spin} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {enquireScreen} from 'enquire-js';
import CardPlanEmprendedor from '../CardsPlanEmprendedor/CardsPlanEmprendedor';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {fetchEmprendedoresbyProgram} from "../../actions/fetchUsers";
import {getId, getIdInstitution, getet} from "../../selectors/institutions";
import {getStatusMentor} from "../../selectors/users";


const {Search} = Input;

const ProgramMentores = (props) => {
    const {emprendedores, id_institution, id_program, mentorships, id_entidad, status, et_plural} = props
    const [isMobile, setIsMobile] = useState(false);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(false);
    const [emprendedoresProgram, setEmprendedoresProgram] = useState([])

    const onSearch = (value) => {
        
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
        (async () => {
            if (Array.isArray(mentorships) && status) {
                let ob = mentorships.find(c => id_program == c.programa)
                if (ob?.entidad && id_program) {
                    await props.fetchEmprendedoresbyProgram(ob?.entidad, id_program)
                    setLoading(false)
                }
            }
            if(!status) {
                await props.fetchEmprendedoresbyProgram(id_entidad, id_program)
                setLoading(false)

            }

        })()
    }, [id_institution, id_program, id_entidad])

    return (
        <>
            {loading && (
                <div className='position-absolute d-flex justify-content-center align-items-center w-100 h-100'
                     style={{left: '0', top: '0'}}>
                    <Spin size='large' className='mt-5'/>
                </div>
            )}
            {
                !loading && (
                    <>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} className='row-plan-trabajo'>
                            <Col lg={0} md={0} xs={0} xl={5}></Col>
                            <Col lg={24} md={24} xs={24} xl={19}>
                                <Row>
                                    <Col lg={19} md={18} xs={12} xl={20}>
                                        <h5>{et_plural}</h5>
                                    </Col>
                                </Row>
                                <Divider className='ant-divider-horizontal-plan'/>
                            </Col>
                        </Row>

                        <Row className='row-cards-actividades'>
                            <Col lg={0} md={0} xs={0} xl={5}></Col>
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

                        <Row className='row-cards-actividades'>
                            <Col lg={0} md={0} xs={0} xl={5} style={{height: '100vh'}}></Col>
                            <Col lg={24} md={24} xs={24} xl={19}>
                                <Row>
                                    {
                                        search ?
                                        Array.isArray(emprendedoresProgram) && (
                                            emprendedoresProgram.map(function (emprendedor, i) {
                                                return <CardPlanEmprendedor emprendedor={emprendedor}
                                                                            key={i} id_program={id_program} id_institution={id_institution}></CardPlanEmprendedor>
                                            })
                                        )
                                        :
                                        Array.isArray(emprendedores) && (
                                            emprendedores.map(function (emprendedor) {
                                                return <CardPlanEmprendedor emprendedor={emprendedor}
                                                                            key={emprendedor.id} id_program={id_program} id_institution={id_institution}></CardPlanEmprendedor>
                                            })
                                        )
                                    }
                                </Row>
                            </Col>
                        </Row>
                    </>
                )
            }

        </>
    )
}

const mapStateToProps = (state, props) => ({
    emprendedores: state.emprendedores_program,
    id_entidad: getIdInstitution(state),
    status: getStatusMentor(state),
    et_plural: getet(state).replace('-', ''),
});

export default withRouter(connect(mapStateToProps, {
    fetchEmprendedoresbyProgram
})(ProgramMentores));

