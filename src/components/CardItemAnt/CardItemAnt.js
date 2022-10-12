import React from 'react'
import {Row, Spin} from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './CardItemAnt.scss'
import CardProgramMentor from './CardProgramMentor';
import CardProgramEntidad from './CardProgramEntidad';
import CardProgramEmprendedor from './CardProgramEmprendedor';

function CardItemAnt(props) {

    const {program, status, mentEnti, perfilEmpren, user} = props
    return (
        <>
            {
                status ?
                    //vista desde el mentor
                    <CardProgramMentor program={program} program_id={program?.id}
                                       perfilEmpren={perfilEmpren} user={user}/>
                    : !mentEnti ?
                    // vista desde el emprendedor y perfil emprendedor por todos los roles
                    <CardProgramEmprendedor program={program} status={status}
                                            perfilEmpren={perfilEmpren} user={user}/>
                    :
                    //visto desde la entidad vista programas
                    <CardProgramEntidad program_id={program?.id} program={program}/>
            }
        </>
    )
}


const CardProgramsAnt = ({programs_user, status, programs, desde, entidad, perfilEmpren, user}) => {

    return (
        <div className='site-car-wrapper'>
            {
                // vista desde el perfil del emprendedor o desde el emprendedor
                programs_user ?
                    <Row id="card-programs" gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                        {
                            Array.isArray(programs_user) && (
                                programs_user.map(function (program) {

                                    return <CardItemAnt entidad={entidad} program={program} key={program.id}
                                                        status={status} perfilEmpren={perfilEmpren} user={user}/>

                                })
                            )
                        }
                    </Row>
                    :
                    //vista desde mentor o entidad
                    <Row id="card-programs" gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                        {
                            Array.isArray(programs) && (
                                programs.map(function (program) {

                                    return <CardItemAnt program={program} key={program.id} mentEnti={programs}
                                                        desde={desde} status={status} perfilEmpren={perfilEmpren}
                                                        entidad={entidad}/>
                                })
                            )
                        }
                    </Row>
            }
        </div>
    )
}

export default CardProgramsAnt