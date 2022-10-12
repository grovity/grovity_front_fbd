import './components/styles/App.scss';
import '@mobiscroll/react/dist/css/mobiscroll.scss';
import {Fragment} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import setAuthToken from "./helpers/setAuthToke";
import React from 'react';

import EscuelaJuntas from "./pages/EscuelaJuntas/EscuelaJuntas";

if (localStorage.token) {
    setAuthToken(localStorage.token)
}

function LandingPage() {
    return (
        <Fragment>
            <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={EscuelaJuntas}/>
                    </Switch>
            </BrowserRouter>
        </Fragment>
    );
}

export default LandingPage;
