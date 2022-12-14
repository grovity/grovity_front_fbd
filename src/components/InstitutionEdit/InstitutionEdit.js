import {MyField, validate} from '../FormRegisterInstitution/FormRegisterInstitution'
import {setPropsAsInitial} from '../../helpers/setPropsAsInitial';
import CustomersActions from "../CustomerActions/CustomerActions";
import {Field, reduxForm} from "redux-form";
import {Prompt} from 'react-router-dom';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import FileUploadMobiscroll from "../FileUpload/FileUploadMobiscroll";
import PasswordHide from "../PasswordHide/PasswordHide";

const InstitutionEdit = ({submitting, onBack, pristine, submitSucceeded, handleSubmit, tipos_usuarios}) => {
    return (
        <div className='bg-transparent d-block'>
            <div className="container py-5">
                <form onSubmit={handleSubmit} id="formedit">
                    <h2>Completa tu perfil empresarial</h2>
                    <div id="circles2"/>
                    <label className="mb-0" style={{color:"#94c11f"}}>Nombre:</label>
                    <Field
                        placeholder="Nombre"
                        component={MyField}
                        name="first_name"
                        label="Nombre"
                    />
                    <label className="mb-0" style={{color:"#94c11f"}}>Apellido:</label>
                    <Field
                        placeholder="Apellido"
                        component={MyField}
                        name="last_name"
                        label="Apellido"
                    />
                    <label className="mb-0" style={{color:"#94c11f"}}>Nit:</label>
                    <Field
                        placeholder="Nit"
                        component={MyField}
                        name="nit"
                        label="Nit"
                        type="number"
                    />
                    <label className="mb-0" style={{color:"#94c11f"}}>Celular:</label>
                    <Field
                        placeholder="Celular"
                        component={MyField}
                        label="Celular"
                        name="telefono"
                        type="number"
                    />
                    <label className="mb-0" style={{color:"#94c11f"}}>Correo Electr??nico:</label>
                    <Field
                        placeholder="Correo Electr??nico"
                        component={MyField}
                        label="email"
                        name="email"
                        type="email"
                    />
                    <label className="mb-0" style={{color:"#94c11f"}}>Nombre de la organizaci??n:</label>
                    <Field
                        placeholder="Nombre de la organizaci??n"
                        label="Razon social"
                        name="razon_social"
                        component={MyField}
                    />
                    <label className="mb-0" style={{color:"#94c11f"}}>Direcci??n:</label>
                    <Field
                        placeholder="Direcci??n"
                        component={MyField}
                        label="Direcci??n"
                        name="direccion"
                    />
                    <label className="mb-0" style={{color:"#94c11f"}}>Logo de la organizaci??n:</label>
                    <Field
                        component={FileUploadMobiscroll}
                        name="logo"
                    />
                    <label className="mb-0" style={{color:"#94c11f"}}>Descripci??n:</label>
                    <Field
                        placeholder="Descripci??n de la organizaci??n"
                        component={MyField}
                        name="descripcion"
                        id="inputedit"
                    />
                    <label style={{color:"#94c11f"}}>??C??mo quieres llamar a los participantes?</label>
                    <Field
                        placeholder="C??mo quieres llamar a tus participates"
                        component="select"
                        label="Tipo participante"
                        name="emprendedor_tipo"
                        id="inputedit"
                    >
                        <Fragment>
                            {
                                tipos_usuarios && Array.isArray(tipos_usuarios.emprendedor) && (
                                    tipos_usuarios.emprendedor.map(c => (
                                        <option
                                            value={c[0]}
                                        >
                                            {c[1].replace('-', '')}

                                        </option>
                                    )))
                            }

                        </Fragment>
                    </Field>
                    <label style={{color:"#94c11f"}}>??C??mo quieres llamar a los mentores?</label>
                    <Field
                        placeholder="C??mo quieres llamar a tus mentores"
                        component="select"
                        label="Tipo mentor"
                        name="mentor_tipo"
                        id="inputedit"
                    >
                        <Fragment>
                            {
                                tipos_usuarios && Array.isArray(tipos_usuarios.mentor) && (
                                    tipos_usuarios.mentor.map(c => (
                                        <option
                                            value={c[0]}
                                        >
                                            {c[1].replace('-', '')}

                                        </option>
                                    )))
                            }

                        </Fragment>
                    </Field>
                     <label className="mb-0" style={{color:"#94c11f"}}>Contrase??a:</label>
                    <Field
                        placeholder="Contrase??a"
                        component={PasswordHide}
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

                    <Prompt when={!pristine && !submitSucceeded} message="Se perder??n los datos si continua"/>
                </form>
            </div>
        </div>
    )
};

InstitutionEdit.propTypes = {
    onBack: PropTypes.func.isRequired,
    name: PropTypes.string,
    dni: PropTypes.string,
    age: PropTypes.number,
};

const InstitutionEditForm = reduxForm({
    form: 'InstitutionEdit',
    validate,
})(InstitutionEdit);

export default setPropsAsInitial(InstitutionEditForm);
