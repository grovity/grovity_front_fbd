import React, {Component} from "react";
import NavBarCentroSoporte from "../../components/NavBarCentroSoporte/NavBarCentroSoporte";
import {enquireScreen} from 'enquire-js';
import BannerSoporte from "../../components/BannerSoporte/BannerSoporte";
import Footer from "../../components/Footer/Footer";
import ArticulosSoporte from "../../components/ArticulosSoporte/ArticulosSoporte";


let isMobile = false;
enquireScreen((b) => {
    isMobile = b;
});


class SoporteArticulos extends Component {
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
                <NavBarCentroSoporte key="header" className={this.state.showShadow ? 'show-shadow' : ''}></NavBarCentroSoporte>
                <BannerSoporte
                    msg="¿Cómo podemos ayudarte?"
                    key="banner"
                    isMobile={this.state.isMobile}
                    navToShadow={this.navToShadow}/>
                <ArticulosSoporte key="soporte-metodo" isMobile={this.state.isMobile}/>
                <Footer key="footer" isMobile={this.state.isMobile}/>
            </React.Fragment>
        );
    }
}

export default SoporteArticulos;