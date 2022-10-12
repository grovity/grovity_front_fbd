import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addComment} from '../../actions/posts';
import './style.css'

const CommentForm = ({postId, addComment, onSubmit}) => {
    const [contenido, setcontenido] = useState('');

    return (
        <div className='post-form'>
            <div className='mb-3 mt-5 text-left titulosazul'>
                <h3><strong>Deja un comentario</strong></h3>
            </div>
            <form
                className='form my-1'
                onSubmit={e => {
                    e.preventDefault();
                    onSubmit({contenido});
                    setcontenido('');
                }}
            >
        <textarea
            name='contenido'
            cols='30'
            rows='5'
            className='textarea_int2 form-control mb-3'
            placeholder='Deja un comentario'
            value={contenido}
            onChange={e => setcontenido(e.target.value)}
            required
        />
                <input type='submit' className='customeractions2 mb-2' value='Enviar'/>
            </form>
        </div>
    );
};

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired
};

export default connect(
    null,
    {addComment}
)(CommentForm);