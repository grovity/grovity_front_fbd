import React from 'react'
import mobiscroll from '@mobiscroll/react';
import {connect} from "react-redux";
import {guardarArray_tarea} from "../../actions/fetchUsers";

mobiscroll.settings = {
    theme: 'mobiscrol',
    themeVariant: 'light',
    lang: 'es'
}

var arr2 = []

class Checkbox_tarea extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkbox_tarea: false,
        }
    }

    componentDidMount() {
        const arr = [...this.props.users_event].filter(j => j.tarea)
        arr2 = []
        arr.map(c =>
            arr2.push(parseInt(c.id))
        )
        this.props.users_event.map(c => {
            if (c.tarea !== null && c.id === this.props.value) {
                this.setState({
                    checkbox_tarea: true,
                })
            }
        })
        this.props.guardarArray_tarea(arr2)
    }

    setCheckbox1 = (ev) => {
        if (ev.target.checked) {
            arr2.push(parseInt(ev.target.id))

        } else {
            arr2.pop(ev.target.id)
        }
        this.props.guardarArray_tarea(arr2)
        this.setState({
            checkbox_tarea: ev.target.checked
        });
    }


    render() {
        return (
            <div className="mbsc-grid mbsc-form-grid">
                <div className="mbsc-row">
                    <div className="mbsc-col-sm-12 mbsc-col-md-4">
                        <div id="content">

                            <mobiscroll.Checkbox className="mbsc-mobiscroll-text" inputStyle="underline"
                                                 checked={this.state.checkbox_tarea}
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

export default connect(mapStateToProps, {guardarArray_tarea})(Checkbox_tarea)