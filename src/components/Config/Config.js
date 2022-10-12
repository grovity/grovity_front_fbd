import React, {Component} from 'react'
import {Link} from "react-router-dom";


class Config extends Component {

    componentDidMount() {
        localStorage.removeItem('persist:root')
    }

    render() {
        return (
            <div id='content' className='d-block text-center'>
                <h2 className="h1-porque text-center mt-5"> Grovity se ha configurado correctamente</h2>

                <Link to='/login/user' className="text-center">
                    <input type="submit" className='customeractions2 pr-5 pl-5 mt-3'
                           value="Inicia sesión aquí"/>
                </Link>

            </div>
        )
    }
}

export default Config