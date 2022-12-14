import React, {useState, useEffect} from 'react'
import {Row, Col, Button, Layout, Divider, Input, Modal, Spin} from 'antd';
import PropTypes from 'prop-types';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {getStatusEntidad, getIdInstitution, getmt} from "../../selectors/institutions";
import AppFrame from "../../components/AppFrame/AppFrame";
import {enquireScreen} from 'enquire-js';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {fetchMentors} from "../../actions/fetchMentors";
import {getTags} from "../../api";
import {Pagination} from 'antd';
import CardMentoresEntidadMap from '../../components/CardMentoresEntidad/CardMentorEntidadMap';
import InvitaMentoresFile from '../../components/InvitarMentoresFile/InvitarMentoresFile';
import InvitaMentor from '../../components/InvitaMentor/InvitaMentor';

const {Header, Content} = Layout;
const {Search} = Input;

const MentorsEntidad = (props) => {
    const {entidad, id_institution, mentors, calificacion, count} = props
    const [isMobile, setIsMobile] = useState(false);
    const [tags, setTags] = useState([]);
    const [search, setSearch] = useState(false);
    const [mentoresEntidad, setMentoresEntidad] = useState([]);
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [loading, setLoading] = useState(false);
    const [spin, setSpin] = useState(false)
    const [currentPage, setCurrentPage] = useState(false)

    const onCLick = async (e) => {
        setCurrentPage(e)
        setSpin(true)
        await props.fetchMentors(id_institution, e)
        setSpin(false)
    };

    const onSearch = (value) => {

        let searchResults = [];
        let res = [];

        if (value) {
            value = value.split(' ');
            value.map((val) => {
                setSearch(true);
                let results = mentors.filter(obj => Object.values(obj).some(v => v ? v.toString().toLowerCase().includes(val.toLowerCase()) : false));
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

            setMentoresEntidad(uniqueResults);

        } else {
            setSearch(false);
        }
    }

    //________________________________
    // abre modal nuevo mentor
    const handleAddNew = () => {
        setVisible(true);
    };
    //________________________________
    // cierra modal nuevo mentor
    const handleCancel = () => {
        setVisible(false);
    };

    //________________________________
    // abre modal subir archivo lista mentores
    const handleAddNewFile = () => {
        setVisible2(true);
    };
    //________________________________
    // cierra modal subir archivo lista mentores
    const handleCancel2 = () => {
        setVisible2(false);
    };
    //________________________________
    // procesa modal subir archivo lista mentores
    const onSubmit2 = async values => {
        setLoading(true);
        // insertar codigo aqui
        setLoading(false);
        setVisible2(false);
    };

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
        (async () => {
            setSpin(true)
            await props.fetchMentors(id_institution)
            setSpin(false)
        })()

        const tags = async () => {
            let tagsList = await getTags()
            setTags(tagsList)
        }
        tags()

    }, [isMobile, id_institution,])


    return (
        <AppFrame>
            <Layout id='mentores-entidad'>
                <Header>
                    <Row gutter={[16, 16]}>
                        <Col lg={8} md={24} xs={24} xl={11}>
                            <h3>Mentores</h3>
                        </Col>
                        <Col lg={5} md={8} xs={9} xl={4} className='btns-header'>
                            <Button className='btn-verde-basico' block onClick={handleAddNew}>
                                Nuevo mentor
                            </Button>
                        </Col>
                        <Modal
                            className="modales-plan"
                            visible={visible}
                            title="Invitar mentor"
                            onCancel={handleCancel}
                            width={600}
                            footer={[]}
                        >
                            <InvitaMentor onCancel={handleCancel} loading={loading} setLoading={setLoading}
                                          setVisible={setVisible}
                            />
                        </Modal>
                        <Col lg={8} md={11} xs={15} xl={6} className='btns-header'>
                            <Button className='btn-verde-basico' block onClick={handleAddNewFile}>
                                Cargar lista de mentores
                            </Button>
                            <Modal
                                className="modales-plan"
                                visible={visible2}
                                title="Invitar mentores"
                                onCancel={handleCancel2}
                                width={600}
                                footer={[]}
                            >
                                <InvitaMentoresFile onCancel={handleCancel2} loading={loading}
                                                    setVisible={setVisible2} id_institution={id_institution}
                                                    setLoading={setLoading}/>
                            </Modal>
                        </Col>
                        {
                            isMobile ?
                                <Col lg={0} md={5} xs={0} xl={0} className='btns-header'>
                                    <Button className='btn-verde-basico' block onClick={() => props.history.goBack()}>
                                        Volver
                                    </Button>
                                </Col>
                                :
                                <Col lg={3} md={5} xs={12} xl={3} className='btns-header'>
                                    <Button className='btn-verde-basico' block onClick={() => props.history.goBack()}>
                                        Volver
                                    </Button>
                                </Col>
                        }
                        <Divider className='header-marketplace'/>
                    </Row>
                </Header>

                <Content style={{overflow: 'hidden'}} className='content-mentores-entidad'>
                    <Row id='barra-top-filtros' gutter={{xs: 8, sm: 16, md: 24, lg: 32}} style={{width: '100%'}}>
                        <Col lg={24} xs={24} md={24}>
                            {isMobile ?
                                <></>
                                :
                                <>
                                    <Row>
                                        <Col className="resultados" lg={24} xs={24} md={24} xl={24}>
                                            <p>Filtros</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={9} xs={24} md={10} xl={10} xxl={6}>
                                            <Search
                                                placeholder="Buscar mentor por nombre"
                                                allowClear
                                                onSearch={onSearch}
                                                enterButton
                                                style={{width: '100%'}}
                                            />
                                        </Col>
                                    </Row>
                                </>
                            }
                        </Col>

                    </Row>
                    {
                        spin ?
                            <div
                                className='position-absolute d-flex justify-content-center align-items-center w-100 h-100'
                                style={{left: '0', top: '0'}}>
                                <Spin size='large' className='mt-5'/>
                            </div> :
                            <>
                            <CardMentoresEntidadMap mentores={search ? mentoresEntidad : mentors} entidad={entidad}/>
                        <Pagination showSizeChanger={false} defaultCurrent={currentPage}
                        defaultPageSize={15}
                        total={count}
                        onChange={onCLick}
                        style={{overflowY: 'scroll'}}/>
                        </>

                    }

                </Content>
            </Layout>
        </AppFrame>
    )
}

MentorsEntidad.propTypes = {
    mentors: PropTypes.array.isRequired,
};

MentorsEntidad.defaultProps = {
    mentors: []
};

const mapStateToProps = state => ({
    entidad: getStatusEntidad(state),
    id_institution: getIdInstitution(state),
    mentors: state.mentors.results,
    count: state.mentors.count,
    calificacion: state.calificacion_mentor,
    mt: getmt(state).split('-')[0],
    mt_plural: getmt(state).replace('-', ''),
});

export default withRouter(connect(mapStateToProps, {
    fetchMentors,
})(MentorsEntidad));