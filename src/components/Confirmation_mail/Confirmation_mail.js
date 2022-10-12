import React, {Component} from "react";
import './style.css'


class Confirmation_mail extends Component {
    render() {
        return (
            <div id="container">
                <h1 className="mb-3 text-center titulosListados mt-5">Por favor revisa tu correo electrónico:<br/>
                </h1>
                <h2 className="mb-3 text-center titulosListados mt-5">Te hemos enviado un mensaje para que nos confirmes
                    tu correo</h2>
                <a href="/"><p className="titulosListados mt-5">Ir a home</p></a>

            </div>
        )
    }
}

export default Confirmation_mail;