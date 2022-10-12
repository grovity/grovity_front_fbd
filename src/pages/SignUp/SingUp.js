import React, {Component, Fragment} from 'react';
import SignupSection from '../../components/SignUpSection/SignUpSection';
import SignupSectionProgramas from '../../components/SignUpSection/SignupSectionProgramas';
class SignUp extends Component {
    render() {
        if(window.location.host.includes('programas')) {
            return (
                <Fragment>
                    <SignupSectionProgramas />
                </Fragment>
            )
        }
        return (
            <Fragment>
                <SignupSection/>
            </Fragment>
        );
    }
}

export default SignUp;