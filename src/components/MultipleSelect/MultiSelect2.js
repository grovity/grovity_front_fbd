import mobiscroll from "@mobiscroll/react";
import { values } from "lodash";
import React from "react";
import './style.css'

class RenderMultiselect2 extends React.Component {
    render() {
        const {input: {value, onChange}, data, placeholder, value2, mensaje} = this.props;
        if(value?.length > 0 ){
            return (
                <div id="selectcomponent" className='mb-2'>
                    <mobiscroll.Form theme="ios" themeVariant="light">
                        <div className="mbsc-no-padding">
                            <div className="mbsc-justify-content-center">
                                <div className="mbsc-col-sm-9 mbsc-col-md-7 mbsc-col-xl-5">
                                    <mobiscroll.FormGroup>
                                        <mobiscroll.Select
                                            id="multiselect"
                                            select="multiple"
                                            touchUi={true}
                                            value={value ? value.length > 0 ? value : [] : []}
                                            data={data ? data.map(c => (
                                                    {
                                                        value: c?.id ?? '',
                                                        text: `${c?.email} - ${c?.first_name}  ${c?.last_name}` ?? '',
                                                        group: c?.email ? c.email[0]?.toUpperCase(): ''
    
                                                    }
                                                )
                                            ) : []}
                                            onSet={(_, e) => onChange(e.getVal())}
                                            className='text-white multiselect'
                                            placeholder={placeholder}
                                            display="bubble"
                                            group={true}
                                            filter={true}
                                            lang='es'
                                            groupLabel="&nbsp;"
                                            height={60}
                                            multiline={2}
                                            //rows={6}
                                            headerText={mensaje}
                                        >
                                        </mobiscroll.Select>
                                    </mobiscroll.FormGroup>
                                </div>
                            </div>
                        </div>
                    </mobiscroll.Form>
                </div>
            )
        }else{
            return (
                <div id="selectcomponent" className='mb-2'>
                    <mobiscroll.Form theme="ios" themeVariant="light">
                        <div className="mbsc-no-padding">
                            <div className="mbsc-justify-content-center">
                                <div className="mbsc-col-sm-9 mbsc-col-md-7 mbsc-col-xl-5">
                                    <mobiscroll.FormGroup>
                                        <mobiscroll.Select
                                            id="multiselect"
                                            select="multiple"
                                            touchUi={true}
                                      
                                            data={data ? data.map(c => (
                                                    {
                                                        value: c?.id ?? '',
                                                        text: `${c?.email} - ${c?.first_name}  ${c?.last_name}` ?? '',
                                                        group: c?.email ? c.email[0]?.toUpperCase(): ''
    
                                                    }
                                                )
                                            ) : []}
                                            onSet={(_, e) => onChange(e.getVal())}
                                            className='text-white multiselect'
                                            placeholder={placeholder}
                                            display="bubble"
                                            group={true}
                                            filter={true}
                                            lang='es'
                                            groupLabel="&nbsp;"
                                            height={60}
                                            multiline={2}
                                            //rows={6}
                                            headerText={mensaje}
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
}

export default RenderMultiselect2;