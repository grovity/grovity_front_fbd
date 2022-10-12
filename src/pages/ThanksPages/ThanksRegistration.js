import React, {Component} from "react";
import {URL_BASE} from "../../constants";
import NavBar from "../../components/NavBar/NavBar";
import {enquireScreen} from 'enquire-js';
import BannerThanks from "../../components/BannerThanks/BannerThanks.js";


let isMobile = false;
enquireScreen((b) => {
    isMobile = b;
});


class ThanksRegistration extends Component {
    state = {
        isMobile,
        showShadow: false,
        mensaje: '¡Registro exitoso!',
        submensaje: 'Ahora podrás acceder a nuestros programas de mentoría desde un solo lugar.',
        submensaje2: 'Si tienes dudas o preguntas puedes escribirnos a support@grovity.atlassian.net',
        confirmation: false
    };



    async componentDidMount() {
        enquireScreen((b) => {
            this.setState({
                isMobile: !!b,
            });
        });

        await fetch(`${URL_BASE}/usuario/confirmar/${this.props.id}`, {
            method: 'DELETE'
        }).then(r => {
            if (r.status !== 200) {
                this.setState({
                    mensaje: '¡Algo ha salido mal!',
                    submensaje: 'Para soporte escríbenos al correo support@grovity.atlassian.net',
                    submensaje2: '',
                    confirmation: false,

                })
            } else {
                this.setState({
                    confirmation: true,
                })
                return r.json();
            }
        }).then(r => {
            if (r)
                localStorage.setItem('token', r.token);
        })

    }

    navToShadow = (e) => {
        this.setState({showShadow: e.mode === 'leave'});
    }

    render() {
        return (
            <React.Fragment>
                <NavBar key="header" className={this.state.showShadow ? 'show-shadow' : ''}></NavBar>
                <BannerThanks  msg={this.state.mensaje}
                    submsg={this.state.submensaje}
                    submsg2={this.state.submensaje2}
                    isMobile={this.state.isMobile}
                    navToShadow={this.navToShadow}
                confirmation={this.state.confirmation}/>
            </React.Fragment>
        );
    }
}

export default ThanksRegistration;