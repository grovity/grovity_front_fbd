import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';

class TopBar extends Component {
    render() {
        return (
            this.props.auth.isAuthenticated ?
                (<div id='topbar'>
                    {
                        this.props.auth.user ?
                            (
                                <div style={{cursor:'pointer'}} title={this.props.auth.user[0].email}>
                                    <a
                                        href={this.props.auth.user && this.props.auth.user[0] && this.props.auth.user[0].entidad_entidad.length !== 0 ? '/institution' : '/user'}>
                                        <div className='nombre_entidad'>
                                            {this.props.auth.user[0].first_name} {this.props.auth.user[0].last_name}
                                        </div>
                                    </a>
                                    <div className="circle_logo">
                                        <span>{this.props.auth.user[0].first_name ? this.props.auth.user[0].first_name[0] : ''}</span>
                                    </div>
                                </div>
                            )
                            :
                            (<Fragment/>)
                    }
                </div>)
                :
                (<Fragment/>)
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, null)(TopBar);