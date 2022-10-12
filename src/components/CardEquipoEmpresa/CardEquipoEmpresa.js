import React, {useState, useEffect} from 'react'
import {Row, Col, Card, Avatar, Button, Modal} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {enquireScreen} from 'enquire-js';
import PopConfirm from "../PopConfirm/PopConfirm";
import {connect} from "react-redux";
import {setAlert} from "../../actions/alert";
import {fetchEmpresaEmprendedor, fetchIndicadoresSectores} from "../../actions/fetchUsers";
import {createEmpresaEmprendedor} from "../../api/user";
import {loadUser} from "../../actions/auth";
import {
    getIdUser, getIndicadoresEmpresa,
    getStatusEmpresa,
    getStatusEmpresa_desdeOtroPerfil,
    getStatusMentor,
    selectCurrentUser, selectEmpresa, selectIdEmpresa
} from "../../selectors/users";
import {getStatusEntidad, getUsername} from "../../selectors/institutions";


const CardEquipoEmpresa = (props) => {
    const {empresa, status, entidad, team, team_complete, id_empresa, editTeamEmpresa} = props
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

    async function deleteEquipo(username) {
        const result = team_complete.filter(team_complete => username !== team_complete.username)
        if (result) {
            const response = await editTeamEmpresa(result, id_empresa)
            if (response) {
                await props.fetchEmpresaEmprendedor(id_empresa)
            }
        }

    }


    return (



        <Col xxl={6} xl={8} lg={12} md={12} sm={24} xs={24}>

            <Card>
                <Row>
                    <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                        <Avatar src={team?.img_usuario}/>
                    </Col>
                    <Col xl={20} lg={20} md={20} sm={20} xs={20}>
                        {
                            team?.first_name && team?.last_name ?
                                <h6>{team?.first_name} {team?.last_name}</h6>
                            :
                            <h6>{team?.email}</h6>
                        }
                        <a href={`mailto:${team?.email}`}><p>{team?.email}</p></a>
                    </Col>
                </Row>

                {
                    !status && !entidad && id_empresa && (
                        <Row className='row-button-right'>
                            <PopConfirm message={'persona'} type={'text'}
                                        functionDelete={() => deleteEquipo(team?.username)}
                                        id={team?.username}></PopConfirm>
                        </Row>
                    )
                }
            </Card>
        </Col>
    )
}

const mapStateToProps = (state, props) => ({
    status: getStatusMentor(state),
    entidad: getStatusEntidad(state),

});

export default connect(mapStateToProps, {
    fetchEmpresaEmprendedor,

})(CardEquipoEmpresa)