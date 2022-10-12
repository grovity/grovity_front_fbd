import {URL_BASE} from "../../constants";
import React, {Component} from 'react';

class UserConfirmation extends Component {
    mensaje = 'Gracias por';

    async componentDidMount() {
        await fetch(`${URL_BASE}/usuario/confirmar/${this.props.id}`, {
            method: 'DELETE'
        }).then(r => {
            if (r.status === 404) {
                this.mensaje = 'Error al';
            } else {
                return r.json();
            }
        }).then(r => {
            if (r)
                localStorage.setItem('token', r.token);
        })

        document.querySelector('#mensaje').innerHTML = this.mensaje + ' confirmar tu correo !';
    }

    render(_) {
        return (
            <div id='content'>
                <div className='text-center w-100'>
                    <h1 className='titulosazul'><span id='mensaje'>...</span></h1>
                    <p><strong>{this.props.id}</strong></p>
                    <a href="/"><strong>Ir al inicio</strong></a>
                </div>
            </div>
        );
    }
}

export default UserConfirmation;