import mobiscroll from "@mobiscroll/react";
import React from "react";
import './style.css'

const RenderMultiselect = (props) => {
   


        const {data , placeholder, value2, mensaje, value, onChange} = props;
        console.log(data);
        let data2 = data.concat([
            { first_name: 'Apple', id: 1, last_name: 'Apple', email: 'Apple'  }, 
        ])
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
                                        onFilter={
                                            console.log('onFilter')
                                        }
                                        onChange={
                                            console.log('onChange')
                                        }
                                        data={Array.isArray(data2) ? data2?.map(c => (
                                                {
                                                    value: c.id,
                                                    text: `${c.first_name}  ${c.last_name} ${c.email}`,
                                                    group: c.first_name ? c.first_name[0].toUpperCase(): ''

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

export default RenderMultiselect;