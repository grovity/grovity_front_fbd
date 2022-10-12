import mobiscroll from "@mobiscroll/react";
import React from "react";
import './style.css'

class RenderMultiselectIndicadores2 extends React.Component {
    render() {
        const {input: {value, onChange}, data, placeholder, value2} = this.props;
        const indicadores = data

        return (
            <div id="selectcomponent">
                <mobiscroll.Form theme="ios" themeVariant="light">
                    <div className="mbsc-no-padding">
                        <div className="mbsc-justify-content-center">
                            <div className="mbsc-col-sm-9 mbsc-col-md-7 mbsc-col-xl-5">
                                <mobiscroll.FormGroup>
                                    <mobiscroll.Select
                                        id="multiselect"
                                        select="multiple"
                                        touchUi={true}
                                        filter={true}
                                        value={value2}
                                        data={indicadores ? indicadores.map(c => (
                                                {
                                                    value: c.id,
                                                    text: c.nombre
                                                }
                                            )
                                        ) : []}
                                        onSet={(_, e) => onChange(e.getVal())}
                                        className='text-white multiselect'
                                        placeholder={placeholder}
                                    >
                                    </mobiscroll.Select>
                                </mobiscroll.FormGroup>
                            </div>
                        </div>
                    </div>
                </mobiscroll.Form>
            </div>
        )
    }
}

export default RenderMultiselectIndicadores2;