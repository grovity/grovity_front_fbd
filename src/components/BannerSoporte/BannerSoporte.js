import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import banner from '../../assets/images/soporte/Artboard 1 copy 3-100@1,5x.jpg'
import bannerSmall from '../../assets/images/soporte/Artboard 1 copy 3-100.jpg'
import {Col, Input, Row, Empty} from 'antd';
import {connect} from 'react-redux';
import {fetchVideos, fetchArticles} from "../../actions/fetchEvents";
import VideosSoporte from "../VideosSoporte/VideosSoporte";
import ArticulosSoporte from "../ArticulosSoporte/ArticulosSoporte2";



//'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=PLzKJi2GjpkEFLvBB_JBd4tcbpHQ9F0dTg&key=[YOUR_API_KEY]

//https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC-b3c7kxa5vU-bnmaROgvog&maxResults=18&q=color&key=[YOUR_API_KEY]

const {Search} = Input;


class BannerSoporte extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            value: "",
            videos: [],
            articles: [],
            onPlay: false,
        };
    }

    async componentDidMount() {
        
      let videos = await this.props.fetchVideos()
      let articles = await this.props.fetchArticles()
      this.setState({
          videos: videos.payload.items,
          articles: articles.payload,
        })
    }

    handleOnPlay = async () => {

        this.setState({
            onPlay: true
        })
    }
    handleOffPlay = async () => {

        this.setState({
            onPlay: false
        })
    }
    
    search = async (value) => {
            const YOUTUBE_API_KEY = 'AIzaSyC8FhJzWGVTdBxlPYwyVcsCd89MpK1rE4s';
            const channelId = 'UCboS0t50CMPB0Z8bDYJDNWQ';

            const request_videos = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=18&q=${value}&type=video&key=${YOUTUBE_API_KEY}`)
            const json_videos = await request_videos.json();
            const request_articles = await fetch(`https://api.grovity.co/searchfiles/?q=${value}`)
            const json_articles = await request_articles.json();
            this.setState({
                videos: json_videos.items,
                articles: json_articles,
            })
            this.handleOffPlay();
    }

    static propTypes = {
        className: PropTypes.string,
        isMobile: PropTypes.bool,
        navToShadow: PropTypes.func,
    }
    static defaultProps = {
        className: 'banner-soporte',
    }

    render() {
        const {className, isMobile, msg} = this.props;

        return (
            <Fragment>
                <Row>
                    <div component="section" className={`${className}-wrapper page`} id="bannerSoporte">
                    <div className={className}>
                        <div className={`${className}-img-wrapper`}>
                            {isMobile ?
                                <img width="100%" src={bannerSmall} alt=""/>
                                :
                                <img width="100%" src={banner} alt=""/>}
                        </div>
                        <h1 key="h1">{msg}</h1>
                        {isMobile ?
                            <Search
                                placeholder="Escribe una palabra o pregunta"
                                enterButton="Buscar"
                                size="small"
                                onSearch={value => this.search(value)}
                            />
                            :
                            <Search
                                placeholder="Escribe una palabra o pregunta"
                                enterButton="Buscar"
                                size="large"
                                onSearch={value => this.search(value)}
                            />
                        }
                    </div>
                </div>
                </Row>
                <div style={{backgroundColor: "white", paddingTop: "1%", paddingBottom: "5%"}}>
                    {this.state.articles.length !== 0 ?
                        <Row className="articulosSoporte">
                            <Col>
                                <ArticulosSoporte articles={this.state.articles}></ArticulosSoporte>
                            </Col>
                        </Row>
                    :
                        <Fragment>
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description={
                                <span>
                                    No se encontraron artículos para tu búsqueda <br/>
                                    <a href="/">Contáctanos</a>
                                </span> }
                            />
                        </Fragment>
                    }
                
                    {this.state.videos && this.state.videos.length !== 0  ?
                        <Row className="videosSoporte">
                            <Col>
                                <VideosSoporte videos={this.state.videos} handleOnPlay={this.handleOnPlay} onPlay={this.state.onPlay}></VideosSoporte>
                            </Col>
                        </Row>
                    :
                        <Fragment>
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description={
                                <span>
                                    No se encontraron videos para tu búsqueda <br/>
                                    <a href="/">Contáctanos</a>
                                </span> }
                            />
                        </Fragment>
                    }
                </div> 
            </Fragment>
        );
    }
}

const mapStateToProps = (state, value) => ({})

export default connect(mapStateToProps, {fetchVideos, fetchArticles})(BannerSoporte);