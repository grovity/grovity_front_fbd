import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PostItem2 from '../../components/Posts/PostItem2';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import {getPost} from '../../actions/posts';
import Spiner from "../Spiner";

const Post = ({post, id, program, onSubmit}) => {
    return (
        <Fragment>
            <Link to="/posts" className='customeractions2 mb-5'>
                Volver a los posts
            </Link>
            <h1 className='mt-5 mb-3 text-center titulosListados'>Post creado por {post.creador ? post.creador[0].first_name + ' ' + post.creador[0].last_name: <Spiner/>}</h1>
            {
                program ?
                <PostItem2 post={post} showActions={false}/>:
                    <Spiner/>

            }

            <CommentForm postId={id} onSubmit={onSubmit}/>
            <div className="comments">
                {
                    Array.isArray(post.comentarios) ?
                        post.comentarios.map(comment => (
                            <CommentItem key={comment.id} comment={comment} postId={comment.id}/>
                        )) :
                        <Spiner/>
                }
            </div>
        </Fragment>
    );
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    program: state.programs,
    eventos: state.events_user
});

export default connect(mapStateToProps, {getPost})(Post);