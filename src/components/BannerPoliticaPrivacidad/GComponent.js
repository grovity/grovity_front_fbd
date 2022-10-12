import React from 'react';
import PropTypes from 'prop-types';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import banner from '../../assets/images/soporte/Artboard 1 copy 3-100@1,5x.jpg'
import bannerSmall from '../../assets/images/soporte/Artboard 1 copy 3-100@0,5x.jpg'

class BannerPoliticaPrivacidad extends React.PureComponent {

    
    static propTypes = {
        className: PropTypes.string,
        isMobile: PropTypes.bool,
        navToShadow: PropTypes.func,
    }
    static defaultProps = {
        className: 'banner-politica',
    }

    render() {
        const {className, isMobile, navToShadow, msg, submsg} = this.props;
        return (
            <div component="section" className={`${className}-wrapper page`} id="bannerSoporte">
                <div className={className}>
                    <div className={`${className}-img-wrapper`}>
                        {isMobile ?
                            <img width="100%" src={bannerSmall} alt=""/>
                            :
                            <img width="100%" src={banner} alt=""/>}
                    </div>
                    {/* <p className="main-info" key="p">
                        {submsg}
                    </p> */}
                    <h1 key="h1">{msg}</h1>                                     
                </div>
            </div>
        );
    }
}

export default BannerPoliticaPrivacidad;