import React, {useState, useEffect} from 'react'
import {Col, Comment, Tooltip, Row, Spin, Avatar} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {
    selectCurrentUser,
} from "../../selectors/users";
import {connect} from "react-redux";
import {enquireScreen} from 'enquire-js';
import moment from 'moment';
import Moment from "react-moment";
import {deleteObservation, getObservations} from "../../api/plan";
import AvatarDefault from "../../assets/images/avatar-not-found.png";
import PopConfirm from "../PopConfirm/PopConfirm";
import {getStatusEntidad} from "../../selectors/institutions";


const Observaciones = ({id, entidad, flag2, setFlag2}) => {

    const [isMobile, setIsMobile] = useState(false);
    const [obs, setObs] = useState(false);
    const [flag, setFlag] = useState(false);

    enquireScreen((b) => {
        return () => {
            setIsMobile(b);
        }
    })

    // const actions = [
    //     <span key="comment-basic-reply-to">Responder</span>,
    //   ];

    useEffect(() => {
        enquireScreen((b) => {
            setIsMobile(
                !!b
            );
        });
    }, [isMobile])

    useEffect(() => {
        (async () => {
            const payload = await getObservations(id)
            if (payload) {
                setObs(payload)
                setFlag(false)
                setFlag2(false)
            }
        })()
    }, [id, flag, flag2])


    return (
        <Row>
            <Col lg={24} md={24} sm={24} xs={24}>
                {
                    Array.isArray(obs) ?
                        obs.map(ob => (
                            <Comment key={ob.id}
                                     author={<p>{ob.creator.first_name} {ob.creator.last_name}</p>}
                                     avatar={
                                         <Avatar
                                             src={ob.creator.img_usuario ? ob.creator.img_usuario : AvatarDefault}
                                             alt={'Avatar'}
                                         />
                                     }
                                     content={
                                         <>
                                             <p className="num-sesiones-reviews">{ob.title}</p>
                                             <p>
                                                 {ob.text}
                                             </p>
                                             {
                                                 !entidad && (
                                                     <div className='row-button-right'>
                                                         <PopConfirm message={'observación'}
                                                                     functionDelete={deleteObservation}
                                                                     id={ob.id}
                                                                     setFlag={setFlag}
                                                                     type={'text'}></PopConfirm>
                                                     </div>
                                                 )
                                             }

                                         </>
                                     }
                                     datetime={
                                         <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                    <span><Moment format="DD/MM  h:mm A z" utc
                                                  local>{moment(ob.created_at).local('America/Bogota')}</Moment></span>
                                         </Tooltip>
                                     }></Comment>
                        )) :
                        <div className='position-absolute d-flex justify-content-center align-items-center w-100 h-100'
                             style={{left: '0', top: '0'}}>
                            <Spin size='default' className='mt-5'/>
                        </div>
                }
            </Col>
        </Row>
    )
}

const mapStateToProps = (state, props) => ({
    user: selectCurrentUser(state),
    entidad: getStatusEntidad(state)
});

export default connect(mapStateToProps, {
    deleteObservation
})(Observaciones)