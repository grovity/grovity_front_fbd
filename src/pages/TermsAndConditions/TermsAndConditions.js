import React, { Component } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { enquireScreen } from "enquire-js";
import Footer from "../../components/Footer/Footer";
import TermsAndConditionsText from "../../components/TermsAndConditionsText/index";
import BannerPoliticaPrivacidad from "../../components/BannerPoliticaPrivacidad/GComponent";

let isMobile = false;
enquireScreen((b) => {
  isMobile = b;
});

class TermsAndConditions extends Component {
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
    this.setState({ showShadow: e.mode === "leave" });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          key="header"
          className={this.state.showShadow ? "show-shadow" : ""}
        ></NavBar>
        <BannerPoliticaPrivacidad
          msg="Conoce nuestros términos y condiciones"
          key="banner"
          isMobile={this.state.isMobile}
          navToShadow={this.navToShadow}
        />
        <TermsAndConditionsText
          key="soporte-metodo"
          isMobile={this.state.isMobile}
        />
        <Footer key="footer" isMobile={this.state.isMobile} />
      </React.Fragment>
    );
  }
}

export default TermsAndConditions;
