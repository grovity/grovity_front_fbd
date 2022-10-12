import React, {useState, useEffect, Fragment} from 'react';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import '../../components/styles/App.scss'
import {Link, withRouter} from 'react-router-dom';
import {
    getStatusMentor,
    selectCurrentUser
} from "../../selectors/users";
import {connect} from "react-redux";
import AvatarDefault from "../../assets/images/avatar-not-found.png";
import {getStatusEntidad} from "../../selectors/institutions";

const NavBarDark = (props) => {
    const {user, status, entidad} = props
    const [state, setState] = useState('header-dark')
    const avatarUrl = AvatarDefault

    const handleScroll = () => {
        if (window.pageYOffset > 0) {
            setState('header-dark-scroll')
        } else {
            setState('header-dark')
        }
    }

    const logout2 = () => {
        localStorage.clear();
    }


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, []);


    return (
        <header {...props} className={state}>
            <div className="logo-wrapper">
                <Link to={'/'}>
                    <i className="logo"/>

                    <span>Fundadores y Empresarios</span>
                    <span id='lineBlue'></span>
                    <span>Ecosistemas</span>
                </Link>
            </div>
            <div className='login-wraper'>


                {
                    !localStorage.getItem('token') && (
                        <Fragment>
                            <a href={`/sign-up`}>
                                <span>SignUp</span>
                            </a>
                            <span id='lineWhite'></span>
                            <a href={`/login`}>
                                <span>Login</span>
                            </a>
                        </Fragment>

                    )
                }

                {
                    localStorage.getItem('token') && (
                        <Fragment>
                            <div className='logout'>
                                <a href={`/`} onClick={logout2}>
                                    <span>Logout</span>
                                </a>
                                <span id='lineWhite'></span>
                                <Link to={entidad ? '/institution': 'user'}>
                                    <div
                                        className='avatar-mini'
                                        style={{backgroundImage: `url('${avatarUrl}')`}}>
                                    </div>
                                </Link>
                            </div>
                        </Fragment>
                    )
                }


            </div>
        </header>
    );
}


const mapStateToProps = state => ({
    user: selectCurrentUser(state),
    status: getStatusMentor(state),
    entidad: getStatusEntidad(state),

});

export default withRouter(connect(mapStateToProps, null)(NavBarDark))
