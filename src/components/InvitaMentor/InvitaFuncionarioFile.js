import {validate} from '../FormRegisterInstitution/FormRegisterInstitution';
import CustomersActions from "../CustomerActions/CustomerActions";
import {setPropsAsInitial} from '../../helpers/setPropsAsInitial';
import {Field, reduxForm} from "redux-form";
import {Prompt} from 'react-router-dom';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import {getIdInstitution} from "../../selectors/institutions";
import {fetchEmprendedor} from '../../actions/fetchUsers'
import 'react-widgets/dist/css/react-widgets.css'
import FileUploadMobiscrollFile from "../FileUpload/FileUploadMobiscrollFile";


const InvitaFuncionarioFile = ({handleSubmit, submitting, onBack, pristine, submitSucceeded}) => {
    return (
        <div className='bg-transparent'>
            <div className="container py-5">
                <form onSubmit={handleSubmit} id="formedit">
                    <h2>Invita Usuario</h2>
                    <div id="circles2"/>

                    <Field
                        component={FileUploadMobiscrollFile}
                        name="file_emprendedores"
                    />


                    <div id="circles3"/>

                    <CustomersActions>
                        <button className="customeractions" type="submit" disabled={pristine || submitting}>
                            Invitar
                        </button>

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

InvitaFuncionarioFile.propTypes = {
    onBack: PropTypes.func.isRequired,
    description: PropTypes.string,
    title: PropTypes.string,
    tema: PropTypes.number,
    id: PropTypes.string,
    fetchFuncionarioEmpren: PropTypes.func.isRequired
};

const InvitaFuncionarioFileForm = reduxForm({
    form: 'InvitaEmprendedor',
    validate,
})(InvitaFuncionarioFile);

const mapStateToProps = (state) => ({
    id_institution: getIdInstitution(state),
});

export default connect(mapStateToProps, {fetchEmprendedor})(setPropsAsInitial(InvitaFuncionarioFileForm));