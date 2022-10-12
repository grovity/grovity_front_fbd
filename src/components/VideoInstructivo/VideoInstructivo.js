import React from 'react';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';

const BASE_EMBED_URL = 'https://www.youtube.com/embed/';

export default function VideoInstructivo(props) {
  
  const embedUrl = `${BASE_EMBED_URL}VU1m9e2LGmU?autoplay=1`;

  return (
      <div className="video-container">
        <div className="video-watch" id='vid-instructivo'>
            <iframe height='100%' width='100%' src={embedUrl} frameBorder='0'
                allow='autoplay; encrypted-media' allowFullScreen title='video' />
        </div>
      </div>
  );
}