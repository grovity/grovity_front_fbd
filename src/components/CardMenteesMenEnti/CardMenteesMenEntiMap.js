import React, {Fragment} from 'react'
import CardMenteesMenEnti from './CardMenteesMenEnti';


const CardMenteesMenEntiMap= ({mentees, entidad, id_institution, urlPath, status}) => {
    return (
        <Fragment>
            {
                Array.isArray(mentees) ?
                    mentees.map(function (mentee) {
                        return <CardMenteesMenEnti mentee={mentee} key={mentee.id} status={status}
                                entidad={entidad} id_institution={id_institution} urlPath={urlPath}/>;
                    })
                    : ""
            }
        </Fragment>
    )
}

export default CardMenteesMenEntiMap;