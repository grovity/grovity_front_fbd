import {MyField, validate} from '../FormRegisterInstitution/FormRegisterInstitution'
import {setPropsAsInitial} from '../../helpers/setPropsAsInitial';
import CustomersActions from "../CustomerActions/CustomerActions";
import {Field, reduxForm} from "redux-form";
import {Prompt} from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import FileUploadMobiscroll from "../FileUpload/FileUploadMobiscroll";

const MentorAddInfo = ({submitting, onBack, pristine, submitSucceeded, handleSubmit}) => {
    return (
        <div id="content">
            <div className="container py-5">
                <form onSubmit={handleSubmit} id="formedit">
                    <h2>Completa tu perfil como mentor</h2>
                    <div id="circles2"/>
                    {/*<Field
                        placeholder="Nombre"
                        component={MyField}
                        name="first_name"
                        label="Nombre"
                    />

                    <Field
                        placeholder="Apellido"
                        component={MyField}
                        name="last_name"
                        label="Apellido"
                    />
                    <Field
                        placeholder="Nit"
                        component={MyField}
                        name="nit"
                        label="Nit"
                        type="number"
                    />

                    <Field
                        placeholder="Celular"
                        component={MyField}
                        label="Celular"
                        name="telefono"
                        type="number"
                    />

                    <Field
                        placeholder="Correo Electrónico"
                        component={MyField}
                        label="email"
                        name="email"
                        type="email"
                    />

                    <Field
                        placeholder="Razón social"
                        label="Razon social"
                        name="razon_social"
                        component={MyField}
                    />

                    <Field
                        placeholder="Dirección de la empresa"
                        component={MyField}
                        label="Dirección"
                        name="direccion"
                    />*/}
                    {/* <Field
                        placeholder="Ciudad"
                        component={MyField}
                        name="ciudad"
                        label="Ciudad"
                    />*/}
                    <Field
                        component={FileUploadMobiscroll}
                        name="img_usuario"
                    />

                    <Field
                        placeholder=" Breve Descripción de tu perfil"
                        component={MyField}
                        name="descripcion"
                        id="inputedit"
                    />

                    <Field
                        placeholder="Contraseña"
                        component={MyField}
                        label="password"
                        name="password"
                        type="password"
                    />

                    <div id="circles3"/>

                    <CustomersActions>
                        <input className="customeractions" type="submit" value='Aceptar'/>

                        <button className="customeractions" type="button" onClick={onBack} disabled={submitting}>
                            Cancelar
                        </button>
                    </CustomersActions>

                    <Prompt when={!pristine && !submitSucceeded} message="Se perderán los datos si continua"/>
                </form>
            </div>
        </div>
    )
};

MentorAddInfo.propTypes = {
    onBack: PropTypes.func.isRequired,
    name: PropTypes.string,
    dni: PropTypes.string,
    age: PropTypes.number,
};

const MentorAddInfoForm = reduxForm({
    form: 'InstitutionEdit',
    validate,
})(MentorAddInfo);

export default setPropsAsInitial(MentorAddInfoForm);