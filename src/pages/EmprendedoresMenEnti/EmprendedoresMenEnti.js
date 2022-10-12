import React, {useState, useEffect} from 'react'
import {Row, Col, Button, Layout, Divider, Input, Modal, Spin, Pagination} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {getStatusEntidad, getIdInstitution, getet} from "../../selectors/institutions";
import AppFrame from "../../components/AppFrame/AppFrame";
import {enquireScreen} from 'enquire-js';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
// import {Pagination} from 'antd';
import CardMenteesMenEntiMap from '../../components/CardMenteesMenEnti/CardMenteesMenEntiMap';
import {fetchEmprendedor} from "../../actions/fetchUsers";
import {fetchProgram} from '../../actions/fetchPrograms';
import InvitaEmprendedor from '../../components/InvitaMentor/InvitaEmprendedor';
import InvitarEmprendedorFile from '../../components/InvitarEmprendedorFile/InvitarEmprendedorFile';

import {URL_BASE, URL_BASE_GOLANG, USER_LOADED} from "../../constants";

const {Header, Content} = Layout;
const {Search} = Input;

const EmprendedoresMenEnti = (props) => {
    const {entidad, id_institution, users, count, urlPath, status, et_plural, et} = props

    const [isMobile, setIsMobile] = useState(false);
    const [search, setSearch] = useState(false);
    const [menteesEntidad, setMenteesEntidad] = useState([]);
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [loading, setLoading] = useState(false);
    const [spin, setSpin] = useState(false)
    const [currentPage, setCurrentPage] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [filterUsers, setFilterUsers] = useState(users)
    const [next, setNext] = useState(false)
    const [prev, setPrev] = useState(false)
    

    useEffect(() => {

     
        setSpin(true)
        if (searchText === ''){
            
            fetch(`${URL_BASE}/entidad/2/None/emprendedor/?page=1`,{
                headers: {
                    'Authorization': `Token ${localStorage.getItem("token")}`
                },
                method: 'GET'
            })
                .then(res => res.json())
                .then(data => {
                    setMenteesEntidad(data.results)
                    setNext(data.next)
                    setPrev(data.previous)
                    setSpin(false)
                    let newUsers = data.results.map(user => {
            
                        return {
                            first_name: user.first_name,
                            last_name: user.last_name,
                            username: user.username,
                            email: user.email,
                            id: user.id,
                            img_usuario: user.img_usuario
    
                        }
                    })
                    setFilterUsers(newUsers)
    
                }).finally(() => {
                    setSpin(false)
                })
        }else{
            fetch(`${URL_BASE}/entidad/2/${searchText}/emprendedor/?page=1`,{
                headers: {
                    'Authorization': `Token ${localStorage.getItem("token")}`
                },
                method: 'GET'
            })
                .then(res => res.json())
                .then(data => {
                    setMenteesEntidad(data.results)
                    setNext(data.next)
                    setPrev(data.previous)
                    setSpin(false)
                    let newUsers = data.results.map(user => {
             
                        return {
                            first_name: user.first_name,
                            last_name: user.last_name,
                            username: user.username,
                            email: user.email,
                            id: user.id,
                            img_usuario: user.img_usuario
    
                        }
                    })
                    setFilterUsers(newUsers)
    
                }).finally(() => {
                    setSpin(false)
                })
        }
 
    },[searchText])

    const handleSearch = (value) => {
    
        setSpin(true)
        fetch(`${value}`,{
            headers: {
                'Authorization': `Token ${localStorage.getItem("token")}`
            },
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setMenteesEntidad(data.results)
                setNext(data.next)
                setPrev(data.previous)
                setSpin(false)
                let newUsers = data.results.map(user => {
                  
                    return {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        username: user.username,
                        email: user.email,
                        id: user.id,
                        img_usuario: user.img_usuario

                    }
                })
                setFilterUsers(newUsers)

            }).finally(() => {
                setSpin(false)
            })
    }
    const onCLick = async (e) => {
        setCurrentPage(e)
        setSpin(true)
        await props.fetchEmprendedor(id_institution, e)
        setSpin(false)
    };

    const onSearch = (value) => {
        setSearchText(value)

        // let searchResults = [];
        // let res = [];

        // if (value) {
        //     value = value.split(' ');
        //     value.map((val) => {
        //         setSearch(true);
        //         let results = users.filter(obj => Object.values(obj).some(v => v ? v.toString().toLowerCase().includes(val.toLowerCase()) : false));
        //         if (results)
        //             searchResults.push(results)
        //     })
        //     searchResults.map(r => {
        //         res = res.concat(r);
        //     })

        //     let uniqueResults = Array.from(new Set(res.map(a => a.id)))
        //         .map(id => {
        //             return res.find(a => a.id === id)
        //         })
        //     setMenteesEntidad(uniqueResults);

        // } else {
        //     setSearch(false);
        // }
    }

    function getMenteesfull() {
        setSearch(false)
    }

    //________________________________
    // abre modal nuevo emprendedor
    const handleAddNew = () => {
        setVisible(true);
    };
    //________________________________
    // cierra modal nuevo emprndedor
    const handleCancel = () => {
        setVisible(false);
    };

    //________________________________
    // abre modal subir archivo lista emprendedores
    const handleAddNewFile = () => {
        setVisible2(true);
    };
    //________________________________
    // cierra modal subir archivo lista emprendedores
    const handleCancel2 = () => {
        setVisible2(false);
    };
    //________________________________
    // procesa modal subir archivo lista emprendedores
    const onSubmit2 = async values => {
        setLoading(true);
        // insertar codigo aqui

        // console.log(values);

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


    }, [isMobile])


    return (
        <AppFrame>
            <Layout id='mentores-entidad'>
                <Header>
                    <Row gutter={[8, 8]}>
                        <Col lg={24} md={24} xs={24} xl={11}>
                            <h3>{et_plural}</h3>
                        </Col>
                        <Col lg={8} md={8} xs={24} xl={4} className='btns-header'>
                            <Button className='btn-verde-basico' block onClick={handleAddNew}>
                                Nuevo {et.toLowerCase()}
                            </Button>
                        </Col>
                        <Modal
                            className="modales-plan"
                            visible={visible}
                            title={`Invitar ${et}`}
                            onCancel={handleCancel}
                            width={600}
                            footer={[]}
                        >
                            <InvitaEmprendedor onCancel={handleCancel} loading={loading}
                                               setLoading={setLoading} setVisible={setVisible}/>
                        </Modal>
                        <Col lg={11} md={11} xs={24} xl={6} className='btns-header'>
                            <Button className='btn-verde-basico' block onClick={handleAddNewFile}>
                                Cargar lista de {et_plural.toLowerCase()}
                            </Button>
                            <Modal
                                className="modales-plan"
                                visible={visible2}
                                title={`Invitar ${et_plural}`}
                                onCancel={handleCancel2}
                                width={600}
                                footer={[]}
                            >
                                <InvitarEmprendedorFile onCancel={handleCancel2} loading={loading}
                                                        setLoading={setLoading} setVisible={setVisible2}/>
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
                                <Col lg={5} md={5} xs={12} xl={3} className='btns-header'>
                                    <Button className='btn-verde-basico' block onClick={() => props.history.goBack()}>
                                        Volver
                                    </Button>
                                </Col>
                        }
                        <Divider className='header-marketplace'/>
                    </Row>
                </Header>

                <Content style={{overflow: 'hidden'}} className='content-empren-men-enti'>
                    <Row id='barra-top-filtros' gutter={{xs: 8, sm: 16, md: 24, lg: 32}} style={{width: '100%'}}>
                        <Col lg={24} xs={24} md={24}>
                            {isMobile ?
                                <></>
                                :
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
                                <Row gutter={[16, 16]} align='middle' style={{marginTop: '2%'}}>
                                    <CardMenteesMenEntiMap mentees={search ? filterUsers : filterUsers}
                                                           entidad={entidad} id_institution={id_institution}
                                                           urlPath={urlPath} status={status}/>
                                </Row>
                                {
                                prev ?
                                    <Row gutter={[16, 16]} align='middle' style={{marginTop: '2%'}}>
                                        <Button onClick={() =>handleSearch(prev)} className='btn-verde-basico' >
                                        prev
                                        </Button>
                                    </Row>
                                    :
                                    <>    <Row gutter={[16, 16]} align='middle' style={{marginTop: '2%'}}>
                                    <Button disabled className='btn-verde-basico' >
                                    prev
                                    </Button>
                                </Row>
                                </>
                            }

                            {
                                next ?
                                    <Row gutter={[16, 16]} align='middle' style={{marginTop: '2%'}}>
                                        <Button onClick={() => handleSearch(next)} className='btn-verde-basico' >
                                            Next
                                        </Button>
                                    </Row>
                                    :
                                    <>    <Row gutter={[16, 16]} align='middle' style={{marginTop: '2%'}}>
                                    <Button  disabled className='btn-verde-basico' >
                                        Next
                                    </Button>
                                </Row>
                                </>
                            }
                                {/* <Pagination showSizeChanger={false} defaultCurrent={currentPage}
                                            defaultPageSize={15}
                                            total={count}
                                            onChange={onCLick}
                                            style={{overflowY: 'scroll'}}/> */}
                            </>
                    }

                </Content>
            </Layout>
        </AppFrame>
    )
}

EmprendedoresMenEnti.defaultProps = {
    users: [],
    users_mentors: [],
};

const mapStateToProps = state => ({
    entidad: getStatusEntidad(state),
    id_institution: getIdInstitution(state),
    et_plural: getet(state).replace('-', ''),
    et: getet(state).split('-')[0],
    count: state.emprendedores_entidad.count
});

export default withRouter(connect(mapStateToProps, {
    fetchEmprendedor,
    fetchProgram
})(EmprendedoresMenEnti));