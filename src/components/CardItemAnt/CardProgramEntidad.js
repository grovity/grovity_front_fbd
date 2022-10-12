import React from 'react'
import {Card, Col, Row, Avatar} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './CardItemAnt.scss'
import {Link} from "react-router-dom";

function CardProgramEntidad(props) {

    const {program} = props;

    return (
            //visto desde la entidad vista programas
            <Col id='col-cards' xxl={6} xl={8} lg={12} xs={24} md={24} sm={24}>
            <Card>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} style={{height: '100%'}}>
                    <Col xs={0} md={12} lg={10} id='col-image'>
                        <Card.Meta
                            avatar={
                                <Avatar src={program && program.img_programa}/>
                            }>
                        </Card.Meta>
                    </Col>
                    <Col lg={14} xs={24} md={12} id='col-programs'>
                        <Link to={`/programs/programs/${program.id}`}>
                            <h5>{program?.nombre}</h5>
                            <div className='show-two-lines'>
                            <p title={program?.descripcion}>
                                {program?.descripcion}
                            </p>
                            </div>
                        </Link>
                    </Col>
                </Row>
            </Card>
        </Col>
    )
}

export default CardProgramEntidad;