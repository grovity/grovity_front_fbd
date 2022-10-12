import React, {Component} from "react";
import NavBar from "../../components/NavBar/NavBar";
import {enquireScreen} from 'enquire-js';
import Footer from "../../components/Footer/Footer";
import PoliticaPrivacidadTexto from "../../components/PoliticaPrivacidadTexto/GComponent";
import BannerPoliticaPrivacidad from "../../components/BannerPoliticaPrivacidad/GComponent";


let isMobile = false;
enquireScreen((b) => {
    isMobile = b;
});


class PoliticaPrivacidad extends Component {
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
    }

    navToShadow = (e) => {
        this.setState({showShadow: e.mode === 'leave'});
    }

    render() {
        return (
            <React.Fragment>
                <NavBar key="header" className={this.state.showShadow ? 'show-shadow' : ''}></NavBar>
                <BannerPoliticaPrivacidad
                    msg="Conoce nuestra política de privacidad"
                    key="banner"
                    isMobile={this.state.isMobile}
                    navToShadow={this.navToShadow}/>
                <PoliticaPrivacidadTexto key="soporte-metodo" isMobile={this.state.isMobile}/>
                <Footer key="footer" isMobile={this.state.isMobile}/>
            </React.Fragment>
        );
    }
}

export default PoliticaPrivacidad;