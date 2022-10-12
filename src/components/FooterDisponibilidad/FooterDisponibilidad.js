import React, {useState} from 'react'
import {Col, Row, Button, Drawer} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {
    selectCurrentUser,
} from "../../selectors/users";
import {connect} from "react-redux";
import SiderDisponibilidad from '../SiderDisponibilidad/SiderDisponibilidad';


const FooterDisponibilidad = () => {
    const [visible, setVisible] = useState(false);

    const onClose = () => {
        setVisible(false);
      };

    return (
        <Row id='footer-disponibilidad' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col lg={24} xs={24} md={24}>
                    <Row style={{height: 'auto'}}>
                        <Col lg={24} xs={24} md={24}>
                        <Button block size="large" onClick={() => setVisible(true)}>DISPONIBILIDAD</Button>
                        </Col>
                    </Row> 
                    <Drawer
                        title="Disponibilidad"
                        placement='bottom'
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                        key='bottom'
                        height= '550'
                        >
                        <SiderDisponibilidad/>
                    </Drawer>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state, props) => ({
   user: selectCurrentUser(state)
});

export default connect(mapStateToProps, null)(FooterDisponibilidad)