import mobiscroll from "@mobiscroll/react";
// import {mo} from '@mobiscroll/react-lite'
import React from "react";
import './style.css'

const RenderMultiselect = (props) => {
 

        const {data , placeholder, value2, mensaje, value, onChange , setMentees} = props;
        const [invitatodo, setInvitatodo] = React.useState(data ?? []);

        if(value?.length > 0 ){
        return (
            <div id="selectcomponent" className='mb-2'>
                <mobiscroll.Form theme="ios" themeVariant="light">
                    <div className="mbsc-no-padding">
                        <div className="mbsc-justify-content-center">
                            <div className="mbsc-col-sm-9 mbsc-col-md-7 mbsc-col-xl-5">
                           
                                    <mobiscroll.Select
                                        id="multiselect"
                                        select="multiple"
                                        touchUi={true}
                                        value={value ? value.length > 0 ? value : [] : []}
                                        onFilter={(event) => {
                                            // // // Filter out the items that don't match the search query
                                            // // event.instance.filter((item) => {
                                            // //     return item.text.toLowerCase().indexOf(event.query.toLowerCase()) > -1;
                                            // // });
                                            // // // Set the new data
                                            // console.log("*******************************")
                                            // setInvitatodo([{
                                            //     id: "prueba",
                                            //     first_name: "prueba",
                                            //     last_name: "prueba",
                                            //     email: "prueba",
                                            //     text: "prueba",


                                            // }])
                                        
                                        }}
                                        data={invitatodo ? invitatodo.map(c => (
                                                {
                                                    value: c.id,
                                                    text: `${c.email} - ${c.first_name}  ${c.last_name}` ?? '',
                                                    group: c.first_name ? c.first_name[0].toUpperCase(): ''

                                                }
                                            )
                                        ) : []}
                                        // onSet={(_, e) => onChange(e.getVal())}
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
                           
                                    <mobiscroll.Select
                                        id="multiselect"
                                        select="multiple"
                                        touchUi={true}
                                        onFilter={(event) => {
                                            // // // Filter out the items that don't match the search query
                                            // // event.instance.filter((item) => {
                                            // //     return item.text.toLowerCase().indexOf(event.query.toLowerCase()) > -1;
                                            // // });
                                            // // // Set the new data
                                            // console.log("*******************************")
                                            // setInvitatodo([{
                                            //     id: "prueba",
                                            //     first_name: "prueba",
                                            //     last_name: "prueba",
                                            //     email: "prueba",
                                            //     text: "prueba",


                                            // }])
                                        
                                        }}
                                        data={invitatodo ? invitatodo.map(c => (
                                                {
                                                    value: c.id,
                                                    text: `${c.email} - ${c.first_name}  ${c.last_name}` ?? '',
                                                    group: c.first_name ? c.first_name[0].toUpperCase(): ''

                                                }
                                            )
                                        ) : []}
                                        // onSet={(_, e) => onChange(e.getVal())}
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
                            
                            </div>
                        </div>
                    </div>
                </mobiscroll.Form>
            </div>
        )
     }
    
}

export default RenderMultiselect;