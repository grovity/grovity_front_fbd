import React, {useState, useEffect, Fragment} from 'react';
import './NavBarCentroSoporte.scss'
import '../../components/styles/App.scss'
import {Link, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import AvatarDefault from "../../assets/images/avatar-not-found.png";
import {
    getStatusMentor,
    selectCurrentUser
} from "../../selectors/users";
import {getStatusEntidad} from "../../selectors/institutions";



function NavBarSoporte(props) {
    const {entidad} = props
    const [state, setState] = useState('header-soporte')
    const avatarUrl = AvatarDefault


    const handleScroll = () => {
        if (window.pageYOffset > 0) {
            setState('header-scroll-soporte')
        } else {
            setState('header-soporte')
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
            {localStorage.getItem('token') ?
            <div className="logo-in">
                <Link to={'/'}>
                    <i className="logo"/>
                </Link>
            </div>
            :
            <div className="logo-wrapper">
                <Link to={'/'}>
                    <i className="logo"/>

                    {/* <h1>Grovity</h1>
                    <span>Centro de Soporte</span> */}
                </Link>
            </div>
            }
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

export default withRouter(connect(mapStateToProps, null)(NavBarSoporte))