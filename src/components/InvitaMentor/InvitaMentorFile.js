import {validate} from '../FormRegisterInstitution/FormRegisterInstitution';
import CustomersActions from "../CustomerActions/CustomerActions";
import {setPropsAsInitial} from '../../helpers/setPropsAsInitial';
import {Field, reduxForm} from "redux-form";
import {Prompt} from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux'
import {getIdInstitution, getmt} from "../../selectors/institutions";
import 'react-widgets/dist/css/react-widgets.css'
import FileUploadMobiscrollFile from "../FileUpload/FileUploadMobiscrollFile";


const InvitaMentorFile = ({handleSubmit, submitting, onBack, pristine, submitSucceeded, id_institution, mt_plural}) => {
    return (
        <div className='bg-transparent'>
            <div className="container py-5">
                <form onSubmit={handleSubmit} id="formedit">
                    <h2>Invita {mt_plural}</h2>
                    <div id="circles2"/>

                    <Field
                        component={FileUploadMobiscrollFile}
                        name="file_mentors"
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

InvitaMentorFile.propTypes = {
    onBack: PropTypes.func.isRequired,
    email: PropTypes.string,
    id: PropTypes.string,
};

const InvitaMentorFileForm = reduxForm({
    form: 'InvitaMentor',
    validate,
})(InvitaMentorFile);

const mapStateToProps = (state, props) => ({
    id_institution: getIdInstitution(state),
    mt_plural: getmt(state).replace('-' ,''),
});

export default connect(mapStateToProps, null)(setPropsAsInitial(InvitaMentorFileForm));