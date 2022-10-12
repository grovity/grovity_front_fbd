import React, {useState, useEffect} from 'react'
import {Col, Comment, Avatar, Tooltip} from 'antd';
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
import AvatarDefault from '../../../src/assets/images/avatar-not-found.png'



const ReviewsPerfilMentor = ({comment}) => {

    const [isMobile, setIsMobile] = useState(false);

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

                        <Col lg={11} md={24} sm={24} xs={24}>
                            <Comment
                                author={<a>{comment.user}</a>}
                                avatar={
                                    <Avatar
                                    src={comment.user_img ? comment.user_img: AvatarDefault}
                                    alt={'Avatar'}
                                    />
                                }
                                content={
                                    <>
                                    <p className="num-sesiones-reviews"></p>
                                    <p>
                                        {comment.comentario}
                                    </p>
                                    </>
                                }
                                datetime={
                                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                    <span><Moment format="DD/MM  h:mm A z" utc
                                                            local>{moment(comment.fecha_creacion).local('America/Bogota')}</Moment></span>
                                    </Tooltip>
                                }
                            />
                        </Col>



    )
}

const mapStateToProps = (state, props) => ({
   user: selectCurrentUser(state)
});

export default connect(mapStateToProps, null)(ReviewsPerfilMentor)