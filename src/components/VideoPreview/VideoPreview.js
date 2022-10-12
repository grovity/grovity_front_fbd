import React from 'react';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';

export default function VideoPreview (props) {
    
    return (
        <div className='video-preview'>
            <div className='image-container'>
                {/* <img src='http://via.placeholder.com/315x177'/> */}
                {/* <img src={props.video.snippet.thumbnails.high.url}/> */}
                <img alt='' src={props.video.snippet.thumbnails.medium.url}/>
            </div>
            <div className='video-info'>
                <div className='semi-bold show-max-two-lines'>{props.video.snippet.title}</div>
                <div className='video-preview-metadata-container'>
                <div className='channel-title'>{props.video.snippet.channelTitle}</div>
                </div>
            </div>
        </div>
    );
}