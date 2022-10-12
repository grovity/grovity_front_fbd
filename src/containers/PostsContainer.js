import {getPrograms} from "../selectors/programs";
import {withRouter} from 'react-router-dom';
import {loadUser} from "../actions/auth";
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';
import Posts from "../components/Posts/Posts";
import {getIdInstitution} from "../selectors/institutions";
import {fetchPosts} from "../actions/posts";
import {createPost} from "../api/posts";
import {Spin} from "antd";

class PostsContainer extends Component {
    componentDidMount() {
        this.props.loadUser()
        this.props.fetchPosts()
        setInterval(this.props.loadUser(), 3000);
    }

    handleAddNew = () => {
        this.props.history.push('programs/new')
    };

    handleOnBack = () => {
        this.props.history.goBack();
    };

     handleSubmit = async values => {
        if (values.contenido) {
            await this.props.createPost(values)
            setInterval(this.props.fetchPosts(), 3000);
        } else {
            this.props.setAlert("Post NO CREADO: Debes incluir contenido en el post", "danger")
        }
        //this.props.createProgramSendFile(values)
    };

    renderBody = (programs, auth) => (
        <div className='h-100'>
            <div id="content" className="d-block mentors-list text-center p-4">
                <div className="container">
                    {
                        this.props.programs ?
                            <Posts urlPath={'programs/'} posts={this.props.posts}
                                   auth={auth}
                                   onSubmit={this.handleSubmit}
                            />
                            :
                            <div id="content" className="text-center">
                                <Spin/>
                            </div>
                    }

                    <div className="text-center pt-3">
                        <button className="customeractions2" onClick={this.handleOnBack}>
                            Volver
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    render() {
        return (
            <div className='h-100'>
                {this.renderBody(this.props.programs, this.props.nombre_entidad,
                    this.props.auth, this.props.posts)}
            </div>
        )
    }
}

PostsContainer.propTypes = {
    fetchPrograms: PropTypes.func.isRequired,
    programs: PropTypes.array.isRequired,
    loadUser: PropTypes.func.isRequired,
    auth: PropTypes.array.isRequired

};

PostsContainer.defaultProps = {
    programs: []
};

const mapStateToProps = state => ({
    programs: getPrograms(state),
    posts: state.posts_inst,
    auth: state.auth,
    nombre_entidad: state.auth.user[0].entidad_entidad[0].razon_social,
    id_institution: getIdInstitution(state),
});

export default withRouter(connect(mapStateToProps, {
    loadUser,
    fetchPosts,
    createPost
})(PostsContainer));