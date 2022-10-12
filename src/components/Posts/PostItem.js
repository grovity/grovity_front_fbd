import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/posts';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faThumbsDown, faThumbsUp, faTrash} from "@fortawesome/free-solid-svg-icons";
import Moment from 'react-moment';
import moment from 'moment';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth, onSubmit,
  post: { id, creador, fecha_actualizacion, fecha_creacion, me_gusta=1, comments=1, contenido },
  showActions
}) => (
  <div style={{border: '#ccc solid 1px'}} className='post bg-white p-1 my-1 mb-3'>
    <div>
        <img className='round-img' src={creador[0].img_usuario} alt='' />
        <h4>{creador[0].first_name} {creador[0].last_name}</h4>
    </div>
    <div>
      <p className='my-1 text-left'>{contenido}</p>
      <p className='post-date text-left'>
        Creado el <Moment format="YYYY/MM/DD HH:MM">{moment.utc(fecha_actualizacion)}</Moment>
      </p>

      {showActions && (
        <Fragment>
          {/*<button*/}
          {/*  onClick={() => onSubmit(id)}*/}
          {/*  type='button'*/}
          {/*  className='customeractions_like'*/}
          {/*>*/}
          {/*  <FontAwesomeIcon icon={faThumbsUp}/>{' '}*/}
          {/*  <span>{me_gusta.length > 0 && <span>{me_gusta.length}</span>}</span>*/}
          {/*</button>*/}
          {/*<button
            onClick={() => removeLike(id)}
            type='button'
            className='customeractions_like'
          >
           <FontAwesomeIcon icon={faThumbsDown}/>
          </button>*/}
          <div className='mb-5 text-right'>
          <Link to={`/posts/${id}`} className='customeractions_post'>
            Comentarios{' '}
            {comments.length > 0 && (
              <span className='comment-count'>{comments.length}</span>
            )}
          </Link>
              </div>
        </Fragment>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);
