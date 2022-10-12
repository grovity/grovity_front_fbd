import {MyField, validate} from '../FormRegisterInstitution/FormRegisterInstitution'
import CustomersActions from "../CustomerActions/CustomerActions";
import {setPropsAsInitial} from '../../helpers/setPropsAsInitial';
import {Field, reduxForm} from "redux-form";
import {Prompt} from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import './style.css';
import FileUploadMobiscroll from "../FileUpload/FileUploadMobiscroll";
import PasswordHide from "../PasswordHide/PasswordHide";

const UserEnEdit = ({handleSubmit, submitting, onBack, pristine, submitSucceeded, status}) => {
    return (
        <div className='bg-transparent mt-5'>
            <form onSubmit={handleSubmit} id="formedit">
                <h2 className='mt-3'>Edita tu perfil</h2>
                <div id="circles2"/>

                <label className="mb-0" style={{color:"#94c11f"}}>Nombre:</label>
                <Field
                    name="first_name"
                    component={MyField}
                    label="Nombre"
                    placeholder="Nombre"
                />
                <label className="mb-0" style={{color:"#94c11f"}}>Apellido:</label>
                <Field
                    placeholder="Apellido"
                    component={MyField}
                    name="last_name"
                    label="Nombre"
                />
                <label className="mb-0" style={{color:"#94c11f"}}>Celular:</label>
                <Field
                    placeholder="Celular"
                    component={MyField}
                    name="telefono"
                    label="Celular"
                    type="number"
                />
                <label className="mb-0" style={{color:"#94c11f"}}>Correo Electrónico:</label>
                <Field
                    placeholder="Correo Electrónico"
                    component={MyField}
                    label="email"
                    name="email"
                    type="email"
                />
                <label className="mb-0" style={{color:"#94c11f"}}>Tu foto:</label>
                <Field
                    component={FileUploadMobiscroll}
                    name="img_usuario"
                />
                <label className="mb-0" style={{color:"#94c11f"}}>{status ? "Breve descripción de tu perfil:": "Escribe acá la meta más grande que tiene tu empresa en este momento:"}</label>
                <Field
                    placeholder={status ? " Breve Descripción de tu perfil" : "Escribe acá la meta más grande que tiene tu empresa en este momento"}
                    component={MyField}
                    name="descripcion"
                    id="inputedit"
                />
                <label className="mb-0" style={{color:"#94c11f"}}>Contraseña:</label>
                <Field
                    placeholder="Contraseña"
                    component={PasswordHide}
                    label="password"
                    name="password"
                    type="password"
                />

                <div id="circles3"/>

                <CustomersActions>
                    <button className="customeractions" type="submit" disabled={pristine || submitting}>
                        Aceptar
                    </button>

                    <button className="customeractions" type="button" onClick={onBack} disabled={submitting}>
                        Cancelar
                    </button>
                </CustomersActions>

                <Prompt when={!pristine && !submitSucceeded} message="Se perderán los datos si continua"/>
            </form>
        </div>
    )
};

UserEnEdit.propTypes = {
    onBack: PropTypes.func.isRequired,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    celphone: PropTypes.number,
    email: PropTypes.string,
    id: PropTypes.string,

};

const UserEnEditForm = reduxForm({
    form: 'UserEnEdit',
    validate,
})(UserEnEdit);

export default setPropsAsInitial(UserEnEditForm)