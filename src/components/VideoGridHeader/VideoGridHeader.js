import React from 'react';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';

export default function VideoGridHeader(props) {
    return (
        <div className="video-grid-header">
            <span className="title">{props.title}</span>
        </div>
    );
}
