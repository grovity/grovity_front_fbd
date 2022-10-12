import React from 'react';
import PropTypes from 'prop-types';
import './BannerEscuelaJuntas.scss';
import banner from '../../assets/images/escuelaJuntas/large/sebastian-herrmann-O2o1hzDA7iE-unsplash@1,5x.jpg'
// import banner from '../../assets/images/Landings/large/Artboard 1@1,5x.webp'
import bannerSmall from '../../assets/images/escuelaJuntas/large/sebastian-herrmann-O2o1hzDA7iE-unsplash.jpg'
// import bannerSmall from '../../assets/images/Landings/small/Artboard 1@0,3x.webp'



class BannerEscuelaJuntas extends React.PureComponent {


    
    componentDidMount() {
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.innerHTML = 'var ml_webform_2542961 = ml_account(\'webforms\', \'2542961\', \'c4e8t1\', \'load\');ml_webform_2542961(\'animation\', \'fadeIn\');';
        let head = document.querySelector('head')
        head.appendChild(s);
    }

    static propTypes = {
        className: PropTypes.string,
        isMobile: PropTypes.bool,
        navToShadow: PropTypes.func,
    }
    static defaultProps = {
        className: 'banner-escuela-juntas',
    }

    render() {
        const {className, isMobile, navToShadow, msg, submsg} = this.props;
        return (
            <div component="section" className={`${className}-wrapper page`} id="bannerEscuela">
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
                        data-form="2542961:v2y5d9">
                </div>

            </div>
        );
    }
}

export default BannerEscuelaJuntas;