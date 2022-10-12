import {withRouter} from 'react-router-dom';

import { Row } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import VideoGrid from '../VideoGrid/VideoGrid';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'

import {fetchVideos} from "../../actions/fetchEvents";
import { getVideos} from '../../api/soporte';


class VideosSoporte extends Component {

    render() {
        
        return (
            <div className="videos-soporte-fondo">
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="videos-soporte-container">
                        <VideoGrid title="Guía Rápida" videos={this.props.videos} handleOnPlay={this.props.handleOnPlay} onPlay={this.props.onPlay}/>
                </Row>
            </div>
        );   
    }
}

const mapStateToProps = state => ({
      value: getVideos()
  })
   

  export default withRouter(connect(mapStateToProps, {
    fetchVideos,
})(VideosSoporte));