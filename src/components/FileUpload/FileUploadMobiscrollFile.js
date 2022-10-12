import React, {Component} from 'react'
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.scss';


class FileUploadMobiscrollFile extends Component {
    render() {
        const {input: {value, onChange}} = this.props
        return (
            <div className="mbsc-col-md-6 mbsc-col-12 customInput3 mt-2">
                <mobiscroll.Input type="file" inputStyle="box" labelStyle="floating" placeholder="Select file..."
                                  onChange={(a) => onChange(a.target.files[0].name)
                                  }
                >Sube archivo
                </mobiscroll.Input>
            </div>
        )
    }
}

export default FileUploadMobiscrollFile