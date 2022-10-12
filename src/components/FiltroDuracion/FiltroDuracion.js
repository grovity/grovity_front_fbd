import React, {useState, useEffect} from 'react'
import {Col, Row, Checkbox, Tag} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {
    selectCurrentUser,
} from "../../selectors/users";
import {connect} from "react-redux";
import {enquireScreen} from 'enquire-js';


const FiltroDuracion = ({}) => {

    const [isMobile, setIsMobile] = useState(false);

    const onChange = (e) => {
        // console.log(`checked = ${e.target.checked}`);
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


    return (
        <Row id='filtro-areas' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col lg={24} xs={24} md={24}>
                    <Row style={{height: 'auto'}}>
                        <Col className='checkboxes' lg={24} xs={24} md={24}>
                            <h5>Duración</h5>
                        </Col>
                    </Row>
                    <Checkbox.Group style={{ width: '100%', marginLeft: '2%' }} onChange={onChange}>
                    <Row>
                        <Col className='checkboxes' lg={20} xs={20} md={20}>
                            <Checkbox value="1">1 hora</Checkbox>
                        </Col>
                        <Col className='checkboxes' lg={4} xs={4} md={4}>
                            <Tag>45</Tag>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='checkboxes' lg={20} xs={20} md={20}>
                            <Checkbox value="2">2 horas</Checkbox>
                        </Col>
                        <Col className='checkboxes' lg={4} xs={4} md={4}>
                        <Tag>45</Tag>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='checkboxes' lg={20} xs={20} md={20}>
                            <Checkbox value="4">4 horas</Checkbox>
                        </Col>
                        <Col className='checkboxes' lg={4} xs={4} md={4}>
                        <Tag>45</Tag>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='checkboxes' lg={20} xs={20} md={20}>
                            <Checkbox value="medio">Otro</Checkbox>
                        </Col>
                        <Col className='checkboxes' lg={4} xs={4} md={4}>
                        <Tag>45</Tag>
                        </Col>
                    </Row>
                    </Checkbox.Group>      
            </Col>
        </Row>
    )
}

const mapStateToProps = (state, props) => ({
   user: selectCurrentUser(state)
});

export default connect(mapStateToProps, null)(FiltroDuracion)