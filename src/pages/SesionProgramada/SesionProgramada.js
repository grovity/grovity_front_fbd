import React, { Component, Fragment } from 'react';
import {enquireScreen} from 'enquire-js';
import NavBarDark from '../../components/NavBarDark/NavBarDark';
import SesionProgramadaImg from '../../components/SesionProgramadaImg/SesionProgramadaImg';
import {fetchEventsbyUser} from "../../actions/fetchEvents";


let isMobile = false;
enquireScreen((b) => {
    isMobile = b;
});

class SesionProgramada extends Component {
    state = {
        isMobile,
    };

    async componentDidMount() {
        enquireScreen((b) => {
            this.setState({
                isMobile: !!b,
            });
        });
        await fetchEventsbyUser()
    }

    navToShadow = (e) => {
        this.setState({showShadow: e.mode === 'leave'});
    }

    render() {
        return (
            <Fragment>
                <NavBarDark key="header" className={this.state.showShadow ? 'show-shadow' : ''}/>
                <SesionProgramadaImg key="not-found" isMobile={this.state.isMobile} navToShadow={this.navToShadow}/>
            </Fragment>
        )
    }
}

export default SesionProgramada;