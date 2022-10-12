import React from 'react';
import PropTypes from 'prop-types';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import banner from '../../assets/images/bootcamp/junta-asesorax1,5.jpg'
import bannerSmall from '../../assets/images/bootcamp/junta-asesorax0,5.jpg'


class BannerJuntasAsesoras extends React.PureComponent {    
    
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
                        data-form="2882482:x0p0f6">
                    </div>
                </div>
            );
        }
    }

export default BannerJuntasAsesoras;