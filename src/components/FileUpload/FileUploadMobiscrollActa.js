import React, {Component} from 'react'
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.scss';


class FileUploadMobiscrollActa extends Component {
    render() {
        const {onChange} = this.props
        return (
            <div className="mbsc-col-md-6 mbsc-col-12 customInput2 mt-2">
                <mobiscroll.Input type="file" inputStyle="box" labelStyle="floating" placeholder="Select file..."
                                  onChange={(a) => onChange(a.target.files[0].name)
                                  }
                >Sube el acta de la reunión
                </mobiscroll.Input>
            </div>
        )
    }
}

export default FileUploadMobiscrollActa