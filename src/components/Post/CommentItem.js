import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deleteComment} from '../../actions/posts';
import Moment from 'react-moment';
import moment from 'moment';


const CommentItem = ({
                         postId,
                         comment,
                         auth,
                         deleteComment
                     }) => (
    <div style={{border: '#ccc solid 1px'}} className='post bg-white p-1 my-1 mb-5'>
        <div>

            <img className='round-img' src={comment.creador[0].img_usuario} alt=''/>
            <h4>{comment.creador[0].first_name + ' ' + comment.creador[0].last_name}</h4>

        </div>
        <div>
            <p className='my-1 text-left'>{comment.contenido}</p>
            <p className='post-date text-left'>
                Creado el <Moment format="YYYY/MM/DD HH:MM">{moment.utc(comment.fecha_creacion)}</Moment>
            </p>
        </div>
    </div>
);


CommentItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {deleteComment}
)(CommentItem);
