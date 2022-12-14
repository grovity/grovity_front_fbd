import React, {useState} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {Button} from 'antd'
import {URL_BASE} from "../../constants";
import {connect} from "react-redux";
import FileUploadMobiscrollFile from "../FileUpload/FileUploadMobiscrollFile";
import {Field, reduxForm} from "redux-form";
import {validate} from "../FormRegisterInstitution/FormRegisterInstitution";
import Spiner from "../Spiner";
import {toast} from "react-toastify";


var arr_files = []
const ModalFile_emprendedor = (props) => {
    const [loading, setloading] = useState(true)

    const {
        className,
        show,
        modal,
        toggle,
        username,
        status,
        id_usuario,
        username2,
        entidad
    } = props;
    const [unmountOnClose] = useState(true);

    const handleSubmit = () => {

        const imagen = document.querySelector("input[type='file']").files[0]
        const name2 = document.querySelector("input[name='name']").value
        const footer = document.querySelector(".modal-footer")
        footer.style.pointerEvents = 'none'
        var data = new FormData()
        if((status || entidad) && username !== username2) {
            data.append('usuario', id_usuario)
        }
        if (imagen !== undefined) {
            data.append('file', imagen)
        } else {
            toast.error("Debe seleccionar al menos un archivo")
            setloading(true)
            footer.style.pointerEvents = 'all'
            return
        }
        data.append('name', name2)
        setloading(false)
        let url = ''
        if((status || entidad) && username2 !== username) {
           url = `${URL_BASE}/archivos/mentor/usuario/`
        } else {
            url = `${URL_BASE}/archivos/usuario/`
        }

        fetch(url, {
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }),
            method: 'POST',
            body: data
        })
            .then(function (r) {
                footer.style.pointerEvents = 'all'
                setloading(true)
                if (r.status !== 201) {
                    toast.error("Error al enviar el archivo")
                } else {
                    toast.success("Archivo cargado correctamente")
                    let reload = () => {
                        toggle()
                    }
                    setTimeout(reload, 2000)
                    return r.json()
                }


            })
            .then(function (r) {
                if (r) {
                    arr_files.push(r.id)
                }


            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Modal isOpen={modal} className={className} unmountOnClose={unmountOnClose} show={show} toggle={toggle}>
                    <ModalHeader id='titulo-modales-blancos'>??Quieres adjuntar un archivo?</ModalHeader>

                    <ModalBody id='modal-blanco-input'>
                        <div className='m-3'>
                            <label>Nombre del archivo:</label>
                            <Field
                                className="w-100 p-1"
                                placeholder="Nombre del archivo"
                                component='input'
                                name="name"
                                type="text"
                            />
                        </div>
                        <Field
                            component={FileUploadMobiscrollFile}
                            name="file"
                        >
                        </Field>

                    </ModalBody>
                    {
                        !loading && (
                            <Spiner></Spiner>
                        )
                    }
                    {
                        !loading && (
                            <h3 className="titulosazul large text-center">Cargando...</h3>
                        )
                    }
                    <ModalFooter>
                        <Button className='btn-verde-basico' onClick={handleSubmit} type="submit">Subir archivo</Button>
                        <Button className='btn-danger-basico' type='primary' danger onClick={toggle}>Cerrar</Button>
                    </ModalFooter>

                </Modal>
            </form>
        </div>
    );
}
const ModalFileForm_emprendedor = reduxForm({
    form: 'ModalFile_emprendedor',
    validate,
})(ModalFile_emprendedor);
const mapStateToProps = () => ({});

export default connect(mapStateToProps, null)(ModalFileForm_emprendedor);
