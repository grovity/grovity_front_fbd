import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';
import {getIdInstitution} from "../selectors/institutions";
import {loadUser} from "../actions/auth";
import {fetchFuncionarios} from "../actions/fetchUsers";
import {Spin} from "antd";
import FuncionariosEntidad from '../pages/FuncionariosEntidad/FuncionariosEntidad';

class FuncionariosContainer extends Component {
    async componentDidMount() {
        await this.props.fetchFuncionarios(this.props.id_institution)
    }

    
    handleAddNew = () => {
        this.props.history.push('funcionarios/new')
    };

    handleOnBack = () => {
        this.props.history.goBack();
    };
    handleAddNewFile = () => {
        this.props.history.push('funcionarios/file/new')
    };

    renderBody = funcionarios => (
        <>
        {
            this.props.funcionarios ?
                <FuncionariosEntidad funcionarios={funcionarios} count={this.props.count} urlPath={'mentors/'}/>
            :
            <div id="content" className="text-center">
                <Spin></Spin>
            </div>
        }
        </>
    );

    render() {
        
        return (
            <>
                {this.renderBody(this.props.funcionarios)}
            </>
        )
    }
}

FuncionariosContainer.propTypes = {
    funcionarios: PropTypes.array.isRequired,
};

FuncionariosContainer.defaultProps = {
    funcionarios: []
};

const mapStateToProps = state => ({
    funcionarios: state.funcionarios_entidad.results,
    id_institution: getIdInstitution(state),
    count: state.funcionarios_entidad.count
});

//mapStateToprops(values) ijecta valores como propiedades (recibe el estado y se devuelve un objeto con las propiedades que queremos para injectarlas al componente) accedemos a esas propiedades con this.props
//mapDispatchToProps(funciones) injecta las funciones como propiedades del componente y se hace la validación a través del proptypes
// al ejecutar funciones se actualizan los valores del mapStateToProps lo que obliga a nueva renderizaciones
export default withRouter(connect(mapStateToProps, {
    fetchFuncionarios,
    loadUser,
})(FuncionariosContainer));
