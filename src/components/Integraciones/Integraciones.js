import {setAlert} from "../../actions/alert";
import {URL_BASE} from "../../constants";
import React, {Component} from 'react';
import {connect} from "react-redux";
import './style.scss'
import {Input} from "reactstrap";
import AppFrame from "../AppFrame/AppFrame";

class Integraciones extends Component {

    componentDidMount() {

    }

    solicitud = async (e) => {
        let formData = new FormData(e.target);

        await fetch(`${URL_BASE}/integracion/crear`, {
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }),
            method: 'POST'
        }).then(r => {
            if (r.status !== 201) {
                this.props.setAlert("Error al enviar la solicitud", 'danger');
            } else {
                this.props.setAlert('La solicitud se envió correctamente, nos comunicaremos pronto a través de su correo electrónico', 'success', 2000);
                setTimeout(() => {
                    window.location.href = '/institution';
                }, 3000)
            }
        })
    }

    send = async (e) => {
        e.preventDefault();
        if (localStorage.getItem('token') !== null)
            await this.solicitud(e);
    }

    render(_) {
        return (
            <AppFrame>
                <div className='form_inte text-center container bg-light py-3 form_send_requirements'>
                    <h4 className='titulosazul'><span id='mensaje'>Por favor envíanos tus requerimientos</span></h4>
                    <form action={URL_BASE + "/integracion/crear"} onSubmit={this.send}>
                        <textarea style={{background:'white', border: '#ccc solid 1px'}} style={{color:'black', background:'white', border:'solid lightgrey'}} name="solicitud" placeholder='Describe  por favor las necesidades de integración '
                                  className='textarea_int form-control mt-3'/>
                        <input type="submit" value="Enviar"
                               className='mt-3 w-100 btn-success p-2 border-0 text-white'  ></input>
                    </form>
                </div>
           </AppFrame>
        );
    }

}

export default connect(null, {
    setAlert
})(Integraciones);