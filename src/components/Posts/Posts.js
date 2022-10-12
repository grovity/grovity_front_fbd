import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../Spiner';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({posts, onSubmit}) => {
    return (
        <Fragment>
            <h1 className='mb-3 text-center titulosListados'>Posts</h1>
            <p className='lead'>
                <p className='titulosazul fas fa-user mt-5'> Comparte información, preguntas y recomendaciones en esta sección</p>
            </p>
            <PostForm onSubmit={onSubmit}/>
            <div className='posts'>
                {
                    Array.isArray(posts) && posts !== undefined ?
                        posts.map(post => (
                            <PostItem key={post.id} post={post} onSubmit={onSubmit}/>
                        )) :
                        <Spinner/>
                }
            </div>
        </Fragment>
    );
};

Posts.propTypes = {
    posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({

});

export default connect(
    mapStateToProps, null
)(Posts);