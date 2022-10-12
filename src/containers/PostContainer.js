import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Post from "../components/Post/Post";
import {addComment, getPost} from "../actions/posts";
import {setAlert} from "../actions/alert";


class PostContainer extends Component {

    componentDidMount() {
        this.props.getPost(this.props.match.params.id)
    }

    handleOnBack = () => {
        this.props.history.goBack();
    };

       handleSubmit = async values => {
        if (values.contenido) {
            await this.props.addComment(values, this.props.match.params.id)
            setInterval(this.props.getPost(this.props.match.params.id), 3000);
        } else {
            this.props.setAlert("Post NO CREADO: Debes incluir contenido en el post", "danger")
        }
        //this.props.createProgramSendFile(values)
    };

    render() {
        return (
            <div  className='h-100'>
                <div id="content" className="d-block mentors-list text-center p-4">
                    <div className="container">
                        <Post
                            post={ this.props.post ? this.props.post[0] : []}
                            id={this.props.match.params.id}
                            onBack={this.handleOnBack}
                            onSubmit={this.handleSubmit}
                        />
                    </div>
                </div>
            </div>
    )
    }
}

PostContainer.propTypes = {
    id: PropTypes.string.isRequired,
    mentor: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
    post: state.posts.post
});

export default withRouter(connect(mapStateToProps,
    {
        getPost,
        addComment,
        setAlert,
    })(PostContainer));
