import React from 'react';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';

export default function VideoMetadata(props) {
    const viewCount = Number(props.viewCount).toLocaleString() || '';

    return (
        <div className="video-metadata">
            <h3>{props.videos.snippet.title}</h3>
            <div>
                <span>{props.videos.snippet.description}</span>
            </div>
        </div>
    );
}