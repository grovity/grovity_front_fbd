import {validate} from '../FormRegisterInstitution/FormRegisterInstitution';
import CustomersActions from "../CustomerActions/CustomerActions";
import {setPropsAsInitial} from '../../helpers/setPropsAsInitial';
import {Field, reduxForm} from "redux-form";
import {Prompt} from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux'
import {getIdInstitution} from "../../selectors/institutions";
import 'react-widgets/dist/css/react-widgets.css'
import FileUploadMobiscrollFile from "../FileUpload/FileUploadMobiscrollFile";
import './style.css'

const Soporte = ({handleSubmit, submitting, onBack, pristine, submitSucceeded}) => {

    return (
        <div className='bg-transparent'>
            <div className="container py-5">
                <form onSubmit={handleSubmit} id="formedit">
                    <h2>Agrega un ticket</h2>
                    <div id="circles2"/>

                    <Field
                        placeholder="Agrega un ticket, describe tu problema lo más claro posible"
                        component="textarea"
                        className="textarea_soporte p-2"
                        name="solicitud"
                        style={{color: 'black'}}
                    />

                    <Field
                        component={FileUploadMobiscrollFile}
                        name="archivo"
                    />

                    <div id="circles3"/>

                    <CustomersActions>
                        <button className="customeractions" type="submit" disabled={pristine || submitting}>
                            Enviar
                        </button>

                        <button className="customeractions" type="button" onClick={onBack} disabled={submitting}>
                            Volver
                        </button>
                    </CustomersActions>

                    <Prompt when={!pristine && !submitSucceeded} message="Se perderán los datos si continua"/>
                </form>
            </div>
        </div>
    )
};

Soporte.propTypes = {
    onBack: PropTypes.func.isRequired,
    email: PropTypes.string,
    id: PropTypes.string,
};

const SoporteForm = reduxForm({
    form: 'Soporte',
    validate,
})(Soporte);

const mapStateToProps = (state, props) => ({
    id_institution: getIdInstitution(state),
});

export default connect(mapStateToProps, null)(setPropsAsInitial(SoporteForm));