import React, {useState, useEffect, Fragment} from 'react';
import './NavBarEscuelaJuntas.scss'
import '../../components/styles/App.scss'
import {Link, withRouter} from 'react-router-dom';
import AvatarDefault from "../../assets/images/avatar-not-found.png";
import {
    getStatusMentor,
    selectCurrentUser
} from "../../selectors/users";
import {getStatusEntidad} from "../../selectors/institutions";

export default function Header(props) {
    const {user, status, entidad} = props
    const [state, setState] = useState('header-escuela')
    const avatarUrl = AvatarDefault

    const handleScroll = () => {
        if (window.pageYOffset > 0) {
            setState('header-scroll-escuela')
        } else {
            setState('header-escuela')
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
                <a href={'https://www.grovity.co/'}>
                    <i className="logo"/>
                </a>
            </div>

            <div className='login-wraper'>
                {
                    !localStorage.getItem('token') && (
                        <Fragment>
                            <a href={`https://www.grovity.co/sign-up`}>
                                <span>SignUp</span>
                            </a>
                            <span id='lineWhite'></span>
                            <a href={`https://www.grovity.co/login`}>
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