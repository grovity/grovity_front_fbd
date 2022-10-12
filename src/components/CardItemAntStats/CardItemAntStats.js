import React from 'react'
import {Col, Row} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import CardItemStat from "../CardItemStat/CardItemStat";
import { SiGoogleclassroom } from "react-icons/si";
import { FaComments } from "react-icons/fa";
import { GoStar } from "react-icons/go";
import {AiFillClockCircle} from 'react-icons/ai'


const CardItemAntStats = (props) => {
    const sesiones = <SiGoogleclassroom size={55} className='icons'/>
    const reviews = <FaComments size={55} className='icons'/>
    const calificacion = <GoStar size={55} className='icons'/>
    const clock = <AiFillClockCircle size={55} className='icons'/>
    
        return ( <div className='site-car-wrapper'>
            <Row id="card-stats" gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col lg={8} md={12} sm={24} xs={24}>
                    <CardItemStat titulo='Sesiones'
                                icon={sesiones}

                                stat={props.user?.nsesiones}/>

                </Col>
                <Col lg={8} md={12} sm={24} xs={24}>
                    <CardItemStat titulo='Reviews'
                                icon={reviews}
                                stat={props.user?.reviews}/>
                </Col>
                <Col lg={8} md={12} sm={24} xs={24}>
                    <CardItemStat titulo='Estrellas'
                                icon={calificacion}
                                 stat={props.calificacion &&
                                props.calificacion?.calificacion &&
                                props.calificacion?.calificacion.toFixed(2)}/>
                </Col>
                <Col lg={8} md={12} sm={24} xs={24}>
                    <CardItemStat titulo='Minutos este mes'
                                icon={clock}
                                 stat={
                                    props.user.duracion_zoom ?? 0
                           
                                }/>
                </Col>
            </Row>
        </div>
    )
}

export default CardItemAntStats