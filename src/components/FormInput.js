import React, {Component} from 'react';
import {Input} from 'reactstrap';

class FormInput extends Component {
    render() {
        return (
            <div className='input-icon'>
                <Input placeholder={this.props.ph} className='mb-3 input-login' type={this.props.type}/>
                <i className="material-icons">{this.props.icon}</i>
            </div>
        );
    }
}

export default FormInput;
