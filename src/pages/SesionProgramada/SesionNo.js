import React, { Component, Fragment } from 'react';
import {enquireScreen} from 'enquire-js';
import NavBar from '../../components/NavBar/NavBar';
import SesionNoImg from '../../components/SesionNoImg/SesionNoImg';


let isMobile = false;
enquireScreen((b) => {
    isMobile = b;
});

class SesionNo extends Component {
    state = {
        isMobile,
    };

    componentDidMount() {
        enquireScreen((b) => {
            this.setState({
                isMobile: !!b,
            });
        });
    }

    navToShadow = (e) => {
        this.setState({showShadow: e.mode === 'leave'});
    }

    render() {
        return (
            <Fragment>
                <NavBar key="header" className={this.state.showShadow ? 'show-shadow' : ''}/>
                <SesionNoImg key="not-found" isMobile={this.state.isMobile} navToShadow={this.navToShadow}/>
            </Fragment>
        )
    }
}

export default SesionNo;