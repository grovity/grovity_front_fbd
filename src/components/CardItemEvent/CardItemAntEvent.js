import React from 'react'
import {Col, Row, Empty} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './CardItemAntEvent.scss'
import CardItemEvent from "./CardItemEvent";


const CardItemAntEvent = ({events, value, status, onChange}) => {
    
    const eventsHoy = events['eventos'].filter(event => value.isSame(event.fecha_inicio, 'day'));
    

        return <div className='site-car-wrapper'>
                <Row id="card-events" gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>

                    {
                        Array.isArray(eventsHoy) && eventsHoy.length !== 0 ?
                            eventsHoy.map(function (event) {
                                return <CardItemEvent event={event} key={event.slug}/>;
                            })
                            : 
                            <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{backgroundColor: 'white'}}>
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description={
                                        <span>
                                            No tiene eventos para hoy <br/>
                                            <a href="/calendar">Ir a mi calendario</a>
                                        </span>
                                    }
                                />
                            </Col>
                    }
                </Row>
            </div>
}

export default CardItemAntEvent

