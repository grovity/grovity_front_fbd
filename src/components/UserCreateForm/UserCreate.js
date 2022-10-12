import {MyField, toLower, toUpper, validate} from '../FormRegisterInstitution/FormRegisterInstitution'
import {setPropsAsInitial} from '../../helpers/setPropsAsInitial';
import CustomersActions from "../CustomerActions/CustomerActions";
import {Field, reduxForm} from "redux-form";
import {Prompt} from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const UserCreate = ({handleSubmit, submitting, onBack, pristine, submitSucceeded}) => {
    return (
        <div id="contformsmentor">
            <form onSubmit={handleSubmit} id="formedit">
                <h2>Completa tu registro como mentor</h2>
                <div id="circles2"/>

                <Field
                    placeholder="Nombre"
                    component={MyField}
                    name="first_name"
                    format={toLower}
                    parse={toUpper}
                    label="Nombre"
                />

                <Field
                    placeholder="Apellido"
                    component={MyField}
                    name="last_name"
                    parse={toUpper}
                    format={toLower}
                    label="Nombre"
                />

                <Field
                    placeholder="Celular"
                    component={MyField}
                    format={toLower}
                    name="celphone"
                    label="Celular"
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
                    placeholder="Tu perfil"
                    component="textarea"
                    name="description"
                    format={toLower}
                    id="inputedit"
                />

                <Field
                    placeholder="Principales aptitudes"
                    component="textarea"
                    format={toLower}
                    id="inputedit"
                    name="skills"
                />

                <Field
                    placeholder="Url de tu foto"
                    component={MyField}
                    format={toLower}
                    label="Photo"
                    name="photo"
                />

                <Field
                    placeholder="Contraseña"
                    component={MyField}
                    label="password"
                    format={toLower}
                    name="password"
                    type="password"
                />

                <Field
                    placeholder="Confirmar Contraseña"
                    label="confirm_password"
                    name="confirm_password"
                    component={MyField}
                    type="password"
                    format={toLower}
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

UserCreate.propTypes = {
    onBack: PropTypes.func.isRequired,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    celphone: PropTypes.number,
    email: PropTypes.string,
    id: PropTypes.string,
};

const UserCreateForm = reduxForm({
    form: 'UserCreate',
    validate,
})(UserCreate);

export default setPropsAsInitial(UserCreateForm);