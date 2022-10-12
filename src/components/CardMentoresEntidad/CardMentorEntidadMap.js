import React, {Fragment} from 'react'
import {Row} from 'antd';
import CardMentoresEntidad from './CardMentoresEntidad';



const CardMentoresEntidadMap= ({mentores, entidad}) => {
    return (
        <Fragment>
        <Row>

            {
                Array.isArray(mentores) ?
                    mentores.map(function (mentor) {
                        return <CardMentoresEntidad mentor={mentor} key={mentor.id} entidad={entidad}/>;
                    })
                    : ""
            }

        </Row>
        </Fragment>
    )
}

export default CardMentoresEntidadMap;