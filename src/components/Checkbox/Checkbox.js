import React from 'react'
import mobiscroll from '@mobiscroll/react';
import {connect} from "react-redux";
import {guardarArray} from "../../actions/fetchUsers";

mobiscroll.settings = {
    theme: 'mobiscrol',
    themeVariant: 'light'
}

var arr2 = []

class Checkbox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkbox1: false,
        }
    }

    componentDidMount() {
        const arr = [...this.props.users_event].filter(j => j.asistencia)
        arr2 = []
        arr.map(c =>
            arr2.push(parseInt(c.id))
        )
        this.props.users_event.map(c => {
            if (c.asistencia !== null && c.id === this.props.value) {
                this.setState({
                    checkbox1: true,
                })
            }
        })
        this.props.guardarArray(arr2)
    }

    setCheckbox1 = (ev) => {
        if (ev.target.checked) {
            arr2.push(parseInt(ev.target.id))

        } else {
            arr2.pop(ev.target.id)
        }
        this.props.guardarArray(arr2)
        this.setState({
            checkbox1: ev.target.checked
        });

    }

    preChecked = (ev) => {
        this.setState({
            checkbox1: ev.target.checked
        });
    }

    render() {
        return (
            <div className="mbsc-grid mbsc-form-grid">
                <div className="mbsc-row">
                    <div className="mbsc-col-sm-12 mbsc-col-md-4">
                        <div id="content">

                            <mobiscroll.Checkbox className="mbsc-mobiscroll-text" inputStyle="underline"
                                                 checked={this.state.checkbox1}
                                                 onChange={this.setCheckbox1}
                                                 id={this.props.value}></mobiscroll.Checkbox>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    users_event: state.users_event

});

export default connect(mapStateToProps, {guardarArray})(Checkbox)