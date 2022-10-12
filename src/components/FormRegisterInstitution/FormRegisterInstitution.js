import CustomersActions from "../CustomerActions/CustomerActions";
import {setPropsAsInitial} from '../../helpers/setPropsAsInitial';
import {Field, reduxForm} from "redux-form";
import {Prompt} from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import './style.css'
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PasswordHide from "../PasswordHide/PasswordHide";

export const isNumber = value => (
    isNaN(Number(value)) && "El campo debe ser un número"
);

export const MyField = ({
                            input,
                            meta: {touched, error, warning},
                            type,
                            label,
                            name,
                            placeholder,
                            className
                        }) => (
    <div className='customInput3'>
        <input {...input} id="inputedit" className={className} placeholder={placeholder} type={!type ? "text" : type}/>

        {

            touched && ((error &&
                <span className="errorForms"><FontAwesomeIcon className="errorForms" icon={faExclamationCircle}/>{error}</span>) ||
                (warning && <span>{error}</span>))
        }
    </div>
);

export const validate = values => {
    const error = {};

    if (!values.first_name) {
        error.first_name = "El campo nombre es requerido"
    }

    if (!values.last_name) {
        error.last_name = "El campo nombre es requerido"
    }

    if (!values.telefono) {
        error.telefono = "El celular es un campo requerido"
    }

    if (!values.email) {
        error.email = "El email es un campo requerido"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i.test(values.email)) {
        error.email = ' Email invalido'
    }
    if (!values.password) {
        error.password = " El password es un campo requerido"
    }
    if (!values.nombre) {
        error.nombre = " El nombre es un campo requerido"
    }
    if (!values.n_sesiones) {
        error.n_sesiones = " El número de sesiones es un campo requerido"
    }
    if (!values.nit) {
        error.nit = " El número legal de la organización es un campo requerido"
    }
    if (!values.razon_social) {
        error.razon_social = " El nombre de la organización es un campo requerido"
    }
    if (!values.direccion) {
        error.direccion = " La dirección es un campo requerido"
    }
    if (!values.descripcion) {
        error.descripcion = " La descripción es un campo requerido"
    }
    return error;
};

export const toUpper = value => value && value.toUpperCase();
export const toLower = value => value && value.toLowerCase();
export const toNumber = value => value && Number(value);

const FormRegisterInstitution = ({handleSubmit, submitting, onBack, pristine, submitSucceeded}) => {
    return (
        <div id="contformsmentor">
            <form onSubmit={handleSubmit} id="formedit">
                <h2 id="titleregister" className="p-3">Registro Empresas</h2>
                <div id="circles2"/>

                <Field
                    placeholder="Razón social"
                    label="Razon social"
                    name="razon_social"
                    component={MyField}
                    format={toLower}
                    parse={toUpper}
                />

                <Field
                    component={MyField}
                    placeholder="Identificación tributaria"
                    format={toLower}
                    type="number"
                    label="Identificación tributaria"
                    name="nit"
                />

                <Field
                    placeholder="Celular"
                    component={MyField}
                    format={toLower}
                    label="Celular"
                    name="celular"
                    type="number"
                />

                <Field
                    placeholder="Correo Electrónico"
                    component={MyField}
                    format={toLower}
                    label="email"
                    name="email"
                    type="email"
                />

                <Field
                    placeholder="Contraseña"
                    component={PasswordHide}
                    format={toLower}
                    label="password"
                    name="password"
                    type="password"
                />

                <Field
                    placeholder="Confirmar Contraseña"
                    label="confirm_password"
                    name="confirm_password"
                    component={PasswordHide}
                    format={toLower}
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

FormRegisterInstitution.propTypes = {
    onBack: PropTypes.func.isRequired,
    name: PropTypes.string,
    dni: PropTypes.string,
    age: PropTypes.number,
};

const InstitutionForm = reduxForm({
    form: 'InstitutionNew',
    validate,
})(FormRegisterInstitution);

export default setPropsAsInitial(InstitutionForm)
