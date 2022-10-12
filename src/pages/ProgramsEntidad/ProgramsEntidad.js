import React, {useState, useEffect} from 'react'
import {Row, Col, Button, Layout, Divider, Modal, Input, Spin} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import PropTypes from 'prop-types';
import {getet, getIdInstitution, getmt, getStatusEntidad} from "../../selectors/institutions";
import AppFrame from "../../components/AppFrame/AppFrame";
import {enquireScreen} from 'enquire-js';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {loadUser} from "../../actions/auth";
import CardProgramsAnt from '../../components/CardItemAnt/CardItemAnt';

import ProgramRegister from '../../components/ProgramRegister/ProgramRegister';
import {fetchPrograms_entidad} from "../../actions/fetchPrograms";


const {Header, Content} = Layout;
const {Search} = Input;

const ProgramsEntidad = (props) => {

    const {status, programs, entidad, id_entidad} = props

    const [isMobile, setIsMobile] = useState(false);
    const [search, setSearch] = useState(false);
    const [searchPrograms, setSearchPrograms] = useState([]);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const onSearch = (value) => {
        // funcion para buscar programas de una entidad por valor ingresado
        let searchResults = [];
        let res = [];

        if (value) {
            value = value.split(' ');
            value.map((val) => {
                setSearch(true);
                let results = props.programs.filter(obj => Object.values(obj).some(v => v ? v.toString().toLowerCase().includes(val.toLowerCase()) : false));
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
            setSearchPrograms(uniqueResults);

        } else {
            setSearch(false);
        }
    }

    //________________________________
    // abre modal nuevo programa
    const handleAddNew = () => {
        setVisible(true)
    };

    //________________________________
    // cierra modal nuevo programa
    const handleCancel = () => {
        setVisible(false);

    };

    //________________________________
    // procesa modal crear programa

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
        // props.fetchProgram(props.match.params.id)
    }, [isMobile])

    useEffect(() => {
        setLoading2(true);
        (async () => {
            await props.fetchPrograms_entidad(id_entidad)
        })()
        setLoading2(false);
    }, [id_entidad])

    return (
        <AppFrame>
            <Layout id='programs-entidad'>
                <Header>
                    <Row gutter={[12]}>
                        <Col lg={16} md={12} xs={24} xl={17}>
                            <h3>Programas</h3>
                        </Col>
                        <Col lg={5} md={6} xs={12} xl={4} className='btns-header'>
                            <Button className='btn-verde-basico' type='primary' block onClick={handleAddNew}>
                                Crear programa
                            </Button>
                        </Col>
                        <Modal
                            className='modales-plan'
                            title="Registrar nuevo programa"
                            centered
                            visible={visible}
                            onOk={() => setVisible(false)}
                            onCancel={() => setVisible(false)}
                            width={1000}
                        >
                            <ProgramRegister setLoading={setLoading} setVisible={setVisible} loading={loading}
                                             onCancel={handleCancel}/>
                        </Modal>
                        <Col lg={3} md={6} xs={12} xl={3} className='btns-header'>
                            <Button className='btn-verde-basico' block onClick={() => props.history.goBack()}>
                                Volver
                            </Button>
                        </Col>
                        <Divider className='header-marketplace'/>
                    </Row>
                </Header>

                <Content style={{overflow: 'hidden'}}>
                    <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} className='search-program'>
                        <Col lg={12} md={12} xs={24} xl={8} xxl={6}>
                            <Search
                                placeholder="Buscar programas"
                                allowClear
                                onSearch={onSearch}
                                enterButton
                                style={{width: '100%', margin: '0 10px'}}
                            />
                        </Col>
                    </Row>
                    <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                        <Col lg={24} md={24} xs={24} xl={24}>

                            {
                                !loading2 || !programs?
                                    search ?
                                        <CardProgramsAnt entidad={entidad} programs={searchPrograms} status={status}/>
                                        :
                                        <CardProgramsAnt entidad={entidad} programs={programs} status={status}/> :
                                    <div className='text-center mt-2'>
                                         <Spin size='large'></Spin>
                                    </div>

                            }

                        </Col>
                    </Row>
                </Content>
            </Layout>
        </AppFrame>
    )
}

ProgramsEntidad.propTypes = {
    fetchPrograms: PropTypes.func,
    programs: PropTypes.array.isRequired,
    loadUser: PropTypes.func.isRequired,
    auth: PropTypes.array.isRequired

};

ProgramsEntidad.defaultProps = {
    programs: []
};

const mapStateToProps = state => ({
    programs: state.programs_user,
    auth: state.auth,
    nombre_entidad: state.auth.user[0].entidad_entidad[0].razon_social,
    mt: getmt(state).split('-')[0],
    mt_plural: getmt(state).replace('-', ''),
    et: getet(state).split('-')[0],
    et_plural: getet(state).replace('-', ''),
    entidad: getStatusEntidad(state),
    id_entidad: getIdInstitution(state)
});

export default withRouter(connect(mapStateToProps, {
    loadUser,
    fetchPrograms_entidad
})(ProgramsEntidad));