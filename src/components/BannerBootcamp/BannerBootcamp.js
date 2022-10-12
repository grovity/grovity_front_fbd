import React from 'react';
import PropTypes from 'prop-types';
import './BannerBootcamp.scss'
import banner from '../../assets/images/bootcamp/1.5x/Artboard 7@1.5x.jpg'
import bannerSmall from '../../assets/images/bootcamp/0.5x/Artboard 7@0.5x.jpg'



class BannerBootcamp extends React.PureComponent {


    static propTypes = {
        className: PropTypes.string,
        isMobile: PropTypes.bool,
        navToShadow: PropTypes.func,
    }
    static defaultProps = {
        className: 'banner-bootcamp',
    }

    render() {
        const {className, isMobile, msg, submsg} = this.props;
        return (
            <div component="section" className={`${className}-wrapper page`} id="bannerBootcamp">
                <div className={className}>
                    <div className={`${className}-img-wrapper`}>
                        {isMobile ?
                            <img width="100%" src={bannerSmall} alt=""/>
                            :
                            <img width="100%" src={banner} alt=""/>}
                    </div>
                    <p className="main-info" key="p">
                        {submsg}
                    </p>
                    <h1 key="h1">{msg}</h1>                  
                </div>
                <div id="ContactoForm" className="ml-form-embed"
                     data-account="2227456:l3g4i8j5l2"
                     data-form="2604341:y2p0v7">
                </div>
            </div>
        );
    }
}

export default BannerBootcamp;