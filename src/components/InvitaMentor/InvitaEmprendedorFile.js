import {validate} from '../FormRegisterInstitution/FormRegisterInstitution';
import CustomersActions from "../CustomerActions/CustomerActions";
import {setPropsAsInitial} from '../../helpers/setPropsAsInitial';
import {Field, reduxForm} from "redux-form";
import {Prompt} from 'react-router-dom';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import {getet, getIdInstitution} from "../../selectors/institutions";
import {fetchEmprendedor} from '../../actions/fetchUsers'
import 'react-widgets/dist/css/react-widgets.css'
import FileUploadMobiscrollFile from "../FileUpload/FileUploadMobiscrollFile";


const InvitaEmprendedorFile = ({handleSubmit, submitting, onBack, pristine, submitSucceeded, et_plural}) => {
    return (
        <div className='bg-transparent'>
            <div className="container py-5">
                <form onSubmit={handleSubmit} id="formedit">
                    <h2>Invita {et_plural}</h2>
                    <div id="circles2"/>

                    <Field
                        component={FileUploadMobiscrollFile}
                        name="file_funcionario"
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

InvitaEmprendedorFile.propTypes = {
    onBack: PropTypes.func.isRequired,
    description: PropTypes.string,
    title: PropTypes.string,
    tema: PropTypes.number,
    id: PropTypes.string,
    fetchFuncionarioEmpren: PropTypes.func.isRequired
};

const InvitaEmprendedorFileForm = reduxForm({
    form: 'InvitaEmprendedor',
    validate,
})(InvitaEmprendedorFile);

const mapStateToProps = (state, props) => ({
    id_institution: getIdInstitution(state),
    et_plural: getet(state).replace('-' ,''),
});

export default connect(mapStateToProps, {fetchEmprendedor})(setPropsAsInitial(InvitaEmprendedorFileForm));