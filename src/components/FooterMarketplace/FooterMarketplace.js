import React, {useState} from 'react'
import {Col, Row, Button, Drawer} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {
    selectCurrentUser,
} from "../../selectors/users";
import {connect} from "react-redux";
import FiltrosMarketplace from '../FiltrosMarketplace/FiltrosMarketplace';


const FooterMarketplace = ({tags}) => {
    const [visible, setVisible] = useState(false);

    const onClose = () => {
        setVisible(false);
      };

    return (
        <Row id='footer-marketplace' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col lg={24} xs={24} md={24}>
                    <Row style={{height: 'auto'}}>
                        <Col lg={24} xs={24} md={24}>
                        <Button className='btn-verde-basico' type='primary' block size="large" onClick={() => setVisible(true)}>Filtros</Button>
                        </Col>
                    </Row> 
                    <Drawer
                        title="Filtros"
                        placement='bottom'
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                        key='bottom'
                        height= '550'
                        >
                        <>
                        <Button className='btn-azul-basico'
                                block 
                                size="large" 
                                onClick={() => setVisible(false)}>
                                    Limpiar Filtros</Button>
                        <FiltrosMarketplace tags={tags}/>
                        </>
                    </Drawer>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state) => ({
   user: selectCurrentUser(state)
});

export default connect(mapStateToProps, null)(FooterMarketplace)