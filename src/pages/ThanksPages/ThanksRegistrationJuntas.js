import React, {Component} from "react";
import NavBar from "../../components/NavBar/NavBar";
import {enquireScreen} from 'enquire-js';
import BannerThanks from "../../components/BannerThanks/BannerThanks.js";


let isMobile = false;
enquireScreen((b) => {
    isMobile = b;
});


class ThanksRegistrationJuntas extends Component {
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
                <BannerThanks msg="¡Estás a un paso de ser parte de una junta directiva!"
                    submsg="Pronto nuestro equipo te contactará para explicarte más del programa."
                    isMobile={this.state.isMobile}
                    navToShadow={this.navToShadow}/>
            </React.Fragment>

        );
    }
}

export default ThanksRegistrationJuntas;