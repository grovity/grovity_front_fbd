import React, { Component, Fragment } from 'react';
import {enquireScreen} from 'enquire-js';
import NavBar from '../../components/NavBar/NavBar';
import SomethingWrongImg from '../../components/SomethingWrongImg/SomethingWrongImg';


let isMobile = false;
enquireScreen((b) => {
    isMobile = b;
});

class SomethingWentWrong extends Component {
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
                <SomethingWrongImg key="not-found" isMobile={this.state.isMobile} navToShadow={this.navToShadow}/>
            </Fragment>
        )
    }
}

export default SomethingWentWrong;