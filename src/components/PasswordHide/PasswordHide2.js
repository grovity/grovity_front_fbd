import React from "react";
import mobiscroll from "@mobiscroll/react";

class PasswordHide2 extends React.Component {
    render() {
        const {input: {value, onChange}} = this.props
        return (
            <div className="mbsc-col-md-6 mbsc-col-12 customInput">
                <mobiscroll.Input type="password" passwordToggle="true" inputStyle="box"
                                  labelStyle="floating"  onChange={(a) => onChange(a.target.value)
                              } >Confirmar Contraseña
                </mobiscroll.Input>
            </div>
        )
    }
}

export default PasswordHide2