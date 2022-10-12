import mobiscroll from "@mobiscroll/react";
import React from "react";
import './style.css'
import {connect} from "react-redux";

class RenderMultiselect_tags extends React.Component {

    render() {
        const {data, onChange, defaultValue, mensaje} = this.props
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
                                        value={defaultValue ? defaultValue : []}
                                        data={Array.isArray(data) ? data.map(c => (
                                                {
                                                    value: c.tag_id,
                                                    text: c.name,

                                                }
                                            )
                                        ) : []}
                                        className='text-white multiselect'
                                        placeholder={this.props.placeholder}
                                        onSet={(_, e) => {
                                            onChange(e)
                                        }}
                                        display="bubble"
                                        group={false}
                                        // inputStyle= {{color: 'black'}}
                                        groupLabel="&nbsp;"
                                        height={60}
                                        multiline={2}
                                        filter={true}
                                        lang='es'
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

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, null)(RenderMultiselect_tags);