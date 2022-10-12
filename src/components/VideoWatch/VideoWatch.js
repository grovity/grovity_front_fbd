
import React from 'react';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';

const BASE_EMBED_URL = 'https://www.youtube.com/embed/';

export default function VideoWatch(props) {
  if (!props.id) {
    return null;
  }
  const embedUrl = `${BASE_EMBED_URL}${props.id}?autoplay=1`;

  return (
      <div className="video-container">
        <div className="video-watch">
            <iframe height='100%' width='100%' src={embedUrl} frameBorder='0'
                allow='autoplay; encrypted-media' allowFullScreen title='video' />
        </div>
      </div>
  );
}