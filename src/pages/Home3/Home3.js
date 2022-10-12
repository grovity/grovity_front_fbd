import React, {Component} from "react";
import NavBar from "../../components/NavBar/NavBar";
import {enquireScreen} from 'enquire-js';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import BannerHome3 from "../../components/BannerHome3/BannerHome3";
import WhyGrovity from "../../components/WhyGrovity/WhyGrovity";
import FoundersHome from '../../components/FoundersHome/FoundersHome';
import Footer from "../../components/Footer/Footer";
import ComoFuncionaHome from "../../components/ComoFuncionaHome/ComoFuncionaHome";
import OurClients from "../../components/OurClients/OurClients";
import Testimonials from '../../components/Testimonials/Testimonials';
import CallToHome3 from '../../components/CallToHome3/CallToHome3';


let isMobile = false;
enquireScreen((b) => {
    isMobile = b;
});


class Home3 extends Component {
    state = {
        isMobile,
        showShadow: false,
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
                <NavBar key="header" isMobile={this.state.isMobile} className={this.state.showShadow ? 'show-shadow' : ''} ></NavBar>
                <div id='fondo-fondo' width="100%">
                    {
                        isMobile ?
                            <img src={process.env.PUBLIC_URL + '/static/imgs/home3/img1-fondo-azul@0,5x.jpg'} width='102%'/>
                            :
                            <img src={process.env.PUBLIC_URL + '/static/imgs/home3/img1-fondo-azul.jpg'} width='102%'/>
                    }
                    <div className='container-banner'>
                        <BannerHome3 key="banner" isMobile={this.state.isMobile} navToShadow={this.navToShadow} />
                    </div>
                    <div className='container-why'>
                        <WhyGrovity/>
                    </div>
                    <div className='container-back-imgs'>
                        {
                            isMobile ?
                                <div className="img-mobile-1"></div>
                                :
                                <img src={process.env.PUBLIC_URL + '/static/imgs/home3/fondo1@1.5x.jpg'} className='img-1'/>
                        }
                    </div>
                    <div className='container-founders'>
                        <FoundersHome isMobile={this.state.isMobile}/>
                    </div>
                    <div className='container-como'>
                        <ComoFuncionaHome isMobile={this.state.isMobile}/>
                    </div>
                    <div className='container-clients'>
                        <OurClients isMobile={this.state.isMobile}/>
                    </div>
                    <div className='container-back-imgs'>
                        {
                            isMobile ?
                            <div style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/static/imgs/home3/fondo2x1.5x.jpg'})`}}></div>
                            // <img src={process.env.PUBLIC_URL + '/static/imgs/home3/fondo2x1.5x.jpg'} width="100%"/>
                            :
                            <img src={process.env.PUBLIC_URL + '/static/imgs/home3/fondo2x1.5x.jpg'} width="75%"/>
                        }
                    </div>
                    <div className='container-testimonials'>
                        <Testimonials isMobile={this.state.isMobile}/>
                    </div>
                    <div id='fondo-fondo-azul'>
                        <div width="100%" style={{backgroundColor: '#00495d'}}>
                            {
                                isMobile ?
                            <img src={process.env.PUBLIC_URL + '/static/imgs/home3/fondo3mobile.png'} width="100%" style={{marginTop: '-15%'}}/>
                            :
                            <img src={process.env.PUBLIC_URL + '/static/imgs/home3/fondo3@1.5x.jpg'} width="100%"/>
                            }
                        </div>
                        <div className='container-call'>
                            <CallToHome3 isMobile={this.state.isMobile}/>
                        </div>
                        <div className='container-footer'>
                            <Footer key="footer" isMobile={this.state.isMobile}/>                
                        </div> 
                    </div> 
                </div>  
            </React.Fragment>
        );
    }
}

export default Home3;