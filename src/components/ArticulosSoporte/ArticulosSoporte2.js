import {withRouter} from 'react-router-dom';

import { Row } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArticuloGrid from '../ArticulosGrid/ArticulosGrid';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'

import {fetchVideos, fetchArticles} from "../../actions/fetchEvents";
import { getVideos} from '../../api/soporte';


class ArticulosSoporte extends Component {
    
    render() {

        return (
            <div className="videos-soporte-fondo">
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="videos-soporte-container">
                        <ArticuloGrid title="Guía Rápida" articles={this.props.articles}/>
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
    fetchArticles,
})(ArticulosSoporte));
  //export default connect(mapStateToProps, {fetchVideos})(VideosSoporte);