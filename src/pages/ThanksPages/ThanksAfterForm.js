import React, {Component} from "react";
import NavBar from "../../components/NavBar/NavBar";
import {enquireScreen} from 'enquire-js';
import BannerThanks from "../../components/BannerThanks/BannerThanks.js";
import Footer from "../../components/Footer/Footer";


let isMobile = false;
enquireScreen((b) => {
    isMobile = b;
});


class ThanksAfterForm extends Component {
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
                <BannerThanks  msg="¡Ya tenemos tus datos de contacto!"
                    submsg="Pronto nos comunicaremos contigo para ayudarte a acelerar tu negocio."
                    isMobile={this.state.isMobile}
                    navToShadow={this.navToShadow}/>
            </React.Fragment>

        );
    }
}

export default ThanksAfterForm;