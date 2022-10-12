import React, {Fragment} from 'react';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import { Divider } from 'antd';
import VideoGridHeader from '../VideoGridHeader/VideoGridHeader';
import ArticulosCard from '../ArticulosCard/ArticulosCard';



export default function ArticuloGrid(props) {
    const divider = props.hideDivider ? null : <Divider/>;

    return (
        <Fragment>
            <VideoGridHeader title="Artículos"/>
            <div className='video-grid'>
                {props.articles && props.articles.map((article, i) =>
                    <ArticulosCard article={article} key={i}/>
                )} 
            </div>
            {divider}
        </Fragment>
    );
}