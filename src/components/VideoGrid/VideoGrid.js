import React, { useState } from 'react';
import {Fragment} from 'react';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import { Divider, Row, Col } from 'antd';
import VideoPreview from '../VideoPreview/VideoPreview';
import VideoGridHeader from '../VideoGridHeader/VideoGridHeader';
import VideoWatch from '../VideoWatch/VideoWatch';
import VideoMetadata from '../VideoMetadata/VideoMetadata';




export default function VideoGrid(props) {
    const divider = props.hideDivider ? null : <Divider/>;

    const [id, setId] = useState(null);
    const [vid, setVid] = useState(null);

    const handleWatch = (video) => {
        props.handleOnPlay()
        setVid(video)
        if (video && video.id.videoId) {
            setId(video.id.videoId);
        }
        else {
            setId(video.contentDetails.videoId);
        }
    }
    return (
        <Fragment>
             {props.onPlay ?
                <>
                    <VideoWatch id={id} videos={vid}/>
                    <VideoMetadata videos={vid}/>
                    <Divider/>
                </>
            :
                <></>
            }
                    
            <Row>
                <Col>
                    <VideoGridHeader title="Videos"/>
                    <div className='video-grid'>
                        {props.videos && props.videos.map((video, i) =>
                            <div onClick={() => handleWatch(video)} key={i}>
                                <VideoPreview video={video} key={i}/>
                            </div>
                        )}                
                    </div>
                </Col>
            </Row>
            {divider}
           
        </Fragment>
    );
}