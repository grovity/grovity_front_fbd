import React, {Fragment} from 'react'
import {Row} from 'antd';
import CardHerramientas from './CardHerramientas';



const CardHerramientasMap= ({mentorships, entidad, status, urlPath}) => {
    return (
        <Fragment>
        <Row>

            {
                Array.isArray(mentorships) ?
                    mentorships.map(function (mentorship) {
                        return <CardHerramientas mentorship={mentorship} key={mentorship.id} 
                        entidad={entidad} status={status} urlPath={urlPath}/>;
                    })
                    : ""
            }

        </Row>
        </Fragment>
    )
}

export default CardHerramientasMap;