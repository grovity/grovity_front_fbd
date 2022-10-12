import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import {loadUser} from "./actions/auth";
import {Provider} from 'react-redux';
import {persistor, store} from './store/store';
import ReactDOM,{render } from 'react-dom';
import React from 'react';
import App from './App';
import LandingPage from './EscuelaJuntas';
import './index.css';
import './components/styles/App.scss'
import {PersistGate} from 'redux-persist/lib/integration/react';
import Spiner from "./components/Spiner";
import '@mobiscroll/react/dist/css/mobiscroll.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { createRoot } from 'react-dom/client';
import /* A library that allows you to add Google Tag Manager to your React app. */
TagManager from 'react-gtm-module'

const tagManagerArgs = {
    gtmId: 'GTM-NTFSQD8'
}

TagManager.initialize(tagManagerArgs)

if(localStorage.getItem('flag') === null){
    localStorage.setItem('count', '0')
} else {
    let iter = parseInt(localStorage.getItem('count')) + 1
    localStorage.setItem('count', iter)
}

localStorage.setItem('flag', '1')
if (localStorage.getItem('token')) {
    store.dispatch(loadUser());
}

let host = window.location.host;
const container = document.getElementById('app');
const root = createRoot(container); // 
root.render(
    <Provider store={store}>
    <PersistGate loading={<Spiner/>} persistor={persistor}>
        {host.split('.')[0] === 'escueladejuntasdirectivas' ? <LandingPage/> : <App/>}
    </PersistGate>
</Provider>
)
// ReactDOM.render(
//     <Provider store={store}>
//         <PersistGate loading={<Spiner/>} persistor={persistor}>
//             {host.split('.')[0] === 'escueladejuntasdirectivas' ? <LandingPage/> : <App/>}
//         </PersistGate>
//     </Provider>,
//     document.getElementById('app')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
