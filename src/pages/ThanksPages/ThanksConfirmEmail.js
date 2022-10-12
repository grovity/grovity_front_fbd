import React, {Component} from "react";
import NavBar from "../../components/NavBar/NavBar";
import {enquireScreen} from 'enquire-js';
import BannerThanks from "../../components/BannerThanks/BannerThanks.js";


let isMobile = false;
enquireScreen((b) => {
    isMobile = b;
});


class ThanksConfirmationEmail extends Component {
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
                <BannerThanks  msg="¡Tu registro está casi listo!"
                    submsg="Revisa tu correo electrónico, te hemos enviado un mail de confirmación."
                    submsg2="P.D: Puede que llegue a tu bandeja de promociones o spam."
                    isMobile={this.state.isMobile}
                    navToShadow={this.navToShadow}
                />
            </React.Fragment>

        );
    }
}

export default ThanksConfirmationEmail;