import React, {useState} from 'react'
import {Col, Row, Button, Modal} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import AvatarDefault from '../../../src/assets/images/avatar-not-found.png'
import {connect} from "react-redux";
import { MdEdit } from "react-icons/md";
import EdicionPerfilEmprendedor from "../EdicionPerfilEmprendedor/EdicionPerfilEmprendedor";
import { TiLocation } from "react-icons/ti";
import { ImPhone } from "react-icons/im";
import { BsAt } from "react-icons/bs";


const FotoPerfilEntidad = ({user}) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleModal = () => {
        setVisible(true);
    }

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setVisible(false);
        }, 3000);
      };

    const avatarUrl = AvatarDefault
    return (
        <Row id='perfil-detalle-entidad' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col lg={24} xs={24} md={24}>
                <Row>
                    <div
                        className='avatar'
                        style={{backgroundImage: `url('${user && user.img_usuario ? user.img_usuario : avatarUrl}')`}}>
                    </div>

                </Row>
                <Row>
                    <Col xl={20} lg={24} xs={24} md={24} sm={24} className='col-info-user'>
                        <h5>{user && user.first_name} {user && user.last_name}</h5>
                        <p>{user && user.titulo}</p>
                        <p><TiLocation size={15}/> {user && user.reside}</p>
                        <p><BsAt size={15}/> {user && user.email}</p>
                        <p><ImPhone size={15}/> {user && user.telefono}</p>
                        <Button type="text" onClick={handleModal}><MdEdit/>Editar perfil</Button>
                    </Col>
                </Row>
                <Modal
                    className='modales-plan'
                    title="Editar perfil personal"
                    centered
                    visible={visible}
                    onOk={() => setVisible(false)}
                    onCancel={() => setVisible(false)}
                    width={1000}
                    footer={[

                        ]}
                >
                    <EdicionPerfilEmprendedor  loading={loading} setLoading={setLoading} setVisible={setVisible} user={user}/>
                </Modal>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state, props) => ({});

export default connect(mapStateToProps, null)(FotoPerfilEntidad)