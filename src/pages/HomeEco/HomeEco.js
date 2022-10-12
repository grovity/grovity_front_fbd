import React, {Component} from "react";
import {enquireScreen} from 'enquire-js';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import Footer from "../../components/Footer/Footer";
import BannerHomeEco from "../../components/BannerHomeEco/BannerHomeEco";
import SituacionesEco from "../../components/SituacionesEco/SituacionesEco";
import QuoteEco from "../../components/QuoteEco/QuoteEco";
import WhyGrovityEco from "../../components/WhyGrovityEco/WhyGrovityEco";
import MentoresNecesariosEco from '../../components/MentoresNecesariosEco/MentoresNeceariosEco';
import OurClientsEco from "../../components/OurClientsEco/OurClientsEco";
import CallToHomeEco from "../../components/CallToHomeEco/CallToHomeEco";
import NavBarEco from "../../components/NavBarEco/NavBarEco";
import PricingEco from "../../components/PricingEco/PricingEco";


let isMobile = false;
enquireScreen((b) => {
    isMobile = b;
});


class HomeEco extends Component {
    state = {
        isMobile,
        showShadow: false,
        eco: true,
    };

    componentDidMount() {
        enquireScreen((b) => {
            this.setState({
                isMobile: !!b,
            });
        });
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.innerHTML = 'var ml_webform_2391673 = ml_account(\'webforms\', \'2391673\', \'c4e8t1\', \'load\');ml_webform_2391673(\'animation\', \'fadeIn\');';
        let head = document.querySelector('head')
        head.appendChild(s);
    }

    navToShadow = (e) => {
        this.setState({showShadow: e.mode === 'leave'});
    }

    render() {
        return (
            <React.Fragment>
                <NavBarEco key="header" isMobile={this.state.isMobile} className={this.state.showShadow ? 'show-shadow' : ''} />
                <div id='fondo-fondo-eco' width="100%">
                    {
                        isMobile ?
                            <img src={process.env.PUBLIC_URL + '/static/imgs/home_eco/banner-eco-0,5.jpg'} width='102%'/>
                            :
                            <img src={process.env.PUBLIC_URL + '/static/imgs/home_eco/banner-eco.jpg'} width='100%'/>
                    }
                    <div className='container-banner'>
                        <BannerHomeEco key="banner" isMobile={this.state.isMobile} navToShadow={this.navToShadow} />
                    </div>
                    <div className='container-why'>
                        <SituacionesEco/>
                    </div>
                    <div className='container-back-imgs'>
                        {
                            isMobile ?
                                <div className="img-mobile-eco1"></div>
                                :
                                <img src={process.env.PUBLIC_URL + '/static/imgs/home_eco/body-eco-1.5x.jpg'} className='img-1'/>
                        }
                    </div>
                    <div className='container-quote'>
                        <QuoteEco/>
                    </div>
                    <div className='container-como'>
                        <WhyGrovityEco isMobile={this.state.isMobile}/>
                    </div>
                    <div className='container-mentores-eco'>
                        <MentoresNecesariosEco isMobile={this.state.isMobile}/>
                    </div>
                    <div className='container-back-imgs'>
                        {
                            isMobile ?
                                <div className="img-mobile-eco1"></div>
                                :
                                <img src={process.env.PUBLIC_URL + '/static/imgs/home_eco/body-2-eco.jpg'} className='img-1'/>
                        }
                    </div>
                    <div className='container-pricing'>
                        <PricingEco isMobile={this.state.isMobile}/>
                    </div>
                    <div className='container-clients'>
                        <OurClientsEco isMobile={this.state.isMobile}/>
                    </div>
                    <div id='fondo-fondo-azul'>
                        <div width="100%" style={{backgroundColor: '#00495d'}}>
                            {
                                isMobile ?
                            <img src={process.env.PUBLIC_URL + '/static/imgs/home_eco/footer-eco-mobile.jpg'} width="100%" style={{marginTop: '-15%'}}/>
                            :
                            <img src={process.env.PUBLIC_URL + '/static/imgs/home_eco/footer-eco-1.5x.jpg'} width="100%"/>
                            }
                        </div>
                        <div className='container-call'>
                            <CallToHomeEco isMobile={this.state.isMobile}/>
                        </div>
                        <div className='container-footer'>
                            <Footer key="footer" isMobile={this.state.isMobile} eco={this.state.eco}/>                
                        </div> 
                    </div> 
                </div>  
            </React.Fragment>
        );
    }
}

export default HomeEco;