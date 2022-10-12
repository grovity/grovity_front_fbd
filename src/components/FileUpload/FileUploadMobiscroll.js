import React, {Component} from 'react'
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.scss';


class FileUploadMobiscroll extends Component {
    render() {
        const {input: {value, onChange}} = this.props
        return (
            <div className="mbsc-col-md-6 mbsc-col-12 customInput">
            <mobiscroll.Input  type="file" inputStyle="box" labelStyle="floating" placeholder="Select file..."
                              onChange={(a) => onChange(a.target.files[0].name)
                              }
            >Sube foto</mobiscroll.Input>
                </div>
        )
    }
}

export default FileUploadMobiscroll