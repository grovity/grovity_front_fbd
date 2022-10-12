import mobiscroll from "@mobiscroll/react";
import React, {Component} from "react";

class InputFormMobiscroll extends Component {


    render() {
        return (
            <div className='col-md-8'>
                <mobiscroll.Input className="auto" inputStyle="outline" labelStyle="floating"
                                  placeholder="Ingrese el avance del indicador" type="number"
                                  defaultValue={this.props.defaultValue ? this.props.defaultValue: ''}
                                  onChange={(a) => this.props.onChange(a.target.value)}
                                  name={this.props.name}
                title="Ingresa el dato del indicador">{this.props.indicador}

                </mobiscroll.Input>
            </div>
        )
    }
}

export default InputFormMobiscroll;
