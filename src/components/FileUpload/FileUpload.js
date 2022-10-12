import React, {Component} from 'react'

class FileUpload extends Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        const {input: {onChange}} = this.props
        const file = e.target.files[0]
        onChange(file)
    }

    render() {
        const {input: {value}} = this.props
        const {input, label, required, meta, name} = this.props  //whatever props you send to the component from redux-form Field
        return (
            <div className="mt-4"><label>{label}</label>
                <div>
                    <input className="mb-3"
                           name={name}
                           type='file'
                           accept='.jpg, .png, .jpeg'
                           onChange={this.onChange}
                    />
                </div>
            </div>
        )
    }
}

export default FileUpload;