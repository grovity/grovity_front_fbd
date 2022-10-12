import React, {useState, useEffect} from 'react'
import {Row, Col, Card, Tooltip, Avatar, Divider, Button, Empty} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {enquireScreen} from 'enquire-js';
import {deleteUsuario} from "../../api/mentorships";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PopConfirm from "../PopConfirm/PopConfirm";
import {fetchEmprendedor, fetchUsersbyId} from "../../actions/fetchUsers";
import {getet} from "../../selectors/institutions";
import { UserOutlined } from '@ant-design/icons';


const CardMenteesMenEnti = (props) => {
    const {mentee, id_institution, urlPath, status, et} = props
    const [userDetail, setUserDetail] = useState([])
    const [flag, setFlag] = useState(false)
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
            const json = await props.fetchUsersbyId(mentee?.username)
            if(json){
                 setUserDetail(json.payload[0])
            }


        })()
    }, [mentee.username])


    const emprendedorName = `${mentee.first_name} ${mentee.last_name}`

    const onDelete = async (c, id) => {
        const response = await deleteUsuario(c, 0)
        if(response){
            await props.fetchEmprendedor(id)
        }
    }

    return (
        <Col lg={12} md={24} sm={24} xs={24} xxl={6} xl={8} style={{padding: '0.5%'}}>
            <Card className='mb-3' id={status ? 'card-men-emprendedor': 'card-enti-emprendedor'} style={{height: '100%'}}>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} className="info-actividad">
                            <Col lg={3} md={3} xs={4} sm={3} xl={3} xxl={4}>
                                {
                                  mentee?.img_usuario ?
                                    <Avatar src={mentee?.img_usuario}></Avatar>
                                    :
                                    <Avatar style={{ backgroundColor: 'red' }} icon={<UserOutlined color='green'/>}/>
                                }
                                
                            </Col>
                            <Col lg={20} md={20} xs={20} sm={20} xl={20} xxl={20}>
                                {
                                    mentee.first_name ?
                                    <Link to={`/users/users/detail/${mentee?.username}`}>
                                        <Tooltip placement="top" title={emprendedorName}>
                                            <h5>{mentee?.first_name} {mentee?.last_name}</h5>
                                        </Tooltip>
                                    </Link>
                                    :
                                    <h5>{mentee.email}</h5>
                                }
                                {
                                    status ?
                                        <a href={`mailto:${mentee.email}`}><p style={{marginBottom: '2%'}}>{mentee.email}</p></a> 
                                    :
                                    <></>
                                }
                            </Col>
                        </Row> 
                        <Divider/>
                        {
                            status ?
                                <>
                                    <Row style={{marginBottom: '8%'}}>
                                        <Col lg={24} md={24} xs={24} sm={24} xl={24} xxl={24}>
                                            <p><strong>Cargo:</strong> {userDetail?.titulo}</p>
                                            <p><strong>Acerca de mí:</strong></p>
                                            <div className='descripcion-emprendedor'>
                                                <p>{userDetail?.descripcion}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                    {/* <Row>
                                        <Col lg={24} md={24} xs={24} sm={24} xl={24} xxl={24} className='col-program-list'>
                                            <p></p>
                                        </Col>
                                    </Row> */}
                                    <Divider/>
                                </>
                            :
                                <>
                                    <Row className='asistencia'>
                                    <Col lg={7} md={7} xs={24} sm={24} xl={7} xxl={7}>
                                        <p><strong>Eventos</strong></p>
                                        <p>{mentee.pasistencia && mentee.pasistencia.numero_eventos}</p>
                                    </Col>
                                    {
                                        isMobile ?
                                        <></>
                                        :
                                        <Divider type='vertical' style={{height: '40px'}}/>
                                    }
                                    <Col lg={7} md={7} xs={24} sm={24} xl={7} xxl={7}>
                                        <p><strong>Asistencia</strong></p>
                                        <p>{mentee.pasistencia && mentee.pasistencia.asistencia}</p>
                                    </Col>
                                    {
                                        isMobile ?
                                        <></>
                                        :
                                        <Divider type='vertical' style={{height: '40px'}}/>
                                    }
                                    <Col lg={7} md={7} xs={24} sm={24} xl={7} xxl={7}>
                                        <p><strong>Porcentaje</strong></p>
                                        <p>{mentee.pasistencia && mentee.pasistencia.porcentaje + "%"}</p>
                                    </Col>
                                </Row>
                                <Divider/>
                                <Row>
                                    <p><strong>Programas</strong></p>
                                    <Col lg={24} md={24} xs={24} sm={24} xl={24} xxl={24} className='col-program-list'>
                                        
                                        {
                                            (Array.isArray(mentee.programa_emprendedor) && mentee.programa_emprendedor.length !== 0) ?
                                                mentee.programa_emprendedor.map((program, i) => {
                                                    return <p style={{marginBottom: '2%'}} key={i}>• {program.nombre}</p>
                                                })
                                            :
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} 
                                                    imageStyle={{
                                                        height: 30,
                                                    }}
                                                    description={
                                                        <span>No hay programas aún</span>
                                            }>
                                            </Empty>
                                        }
                                    </Col>
                                </Row>
                                <Divider/>
                            </>
                        }
                        
                        <Row gutter={[8]} justify='space-between'>
                            <Col lg={12} md={12} xs={12} sm={12} xl={12} xxl={12}>
                                <Link to={`${urlPath + mentee.username}`}>
                                    <Button block className='btn-azul-basico'>Ver perfil</Button>
                                </Link>
                            </Col>
                            <Col lg={12} md={12} xs={12} sm={12} xl={12} xxl={12}>
                                <PopConfirm type={'primary'} message={et} style={{fontFamily: 'ObjectiveRegular'}} className={'w-100'}
                                            functionDelete={() => onDelete(mentee.username, id_institution)}
                                            id={mentee.id} setFlag={setFlag}></PopConfirm>
                            </Col>
                        </Row>
            </Card>
        </Col>   
    )
}

const mapStateToProps = state => ({
    user: state.user,
    et: getet(state).split('-')[0],
});

export default withRouter(connect(mapStateToProps, {
    fetchUsersbyId,
    fetchEmprendedor,

})(CardMenteesMenEnti));