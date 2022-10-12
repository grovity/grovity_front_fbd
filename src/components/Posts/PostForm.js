import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/posts';

const PostForm = ({ addPost, onSubmit }) => {
  const [contenido, setcontenido] = useState('');

  return (
    <div className='post-form'>
      <div className=''>
        <h3 className="titulosazul mb-5"><strong>¿Que quieres compartir hoy?</strong></h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          onSubmit({ contenido });
          setcontenido('');
        }}
      >
        <textarea
          name='contenido'
          className='textarea_int2 form-control mb-3'
          cols='30'
          rows='5'
          placeholder='Crea un post'
          value={contenido}
          onChange={e => setcontenido(e.target.value)}
          required
        />
        <div className="mb-3">
        <input type='submit' className='customeractions2' value='Enviar' />
        </div>
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(PostForm);
