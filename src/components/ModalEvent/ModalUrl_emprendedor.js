import React, {useState} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {Button} from 'antd'
import {URL_BASE} from "../../constants";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {validate} from "../FormRegisterInstitution/FormRegisterInstitution";
import Spiner from "../Spiner";
import { toast } from "react-toastify";



var arr_files = []
const ModalUrl_emprendedor = (props) => {
    const [loading, setloading] = useState(true)

    const {
        className,
        show,
        modal,
        toggle,
        username,
        username2,
        status,
        id_usuario,
        entidad
    } = props;
    const [unmountOnClose] = useState(true);

    const handleSubmit = ({file, name}) => {

        const url = document.querySelector("input[name='url']").value
        const name_url = document.querySelector("input[name='name_url']").value
        const footer = document.querySelector(".modal-footer")
        footer.style.pointerEvents = 'none'
        var data = new FormData()
        if((status || entidad) && username !== username2) {
            data.append('usuario', id_usuario)
        }
        if (url !== undefined) {
            data.append('url', url)
        } else {
            toast.error("Debe incluir al menos una url")
            setloading(true)
            footer.style.pointerEvents = 'all'
            return
        }
        data.append('name', name_url)
        setloading(false)
        let url_fetch = ''
        if((status || entidad) && username !== username2) {
           url_fetch = `${URL_BASE}/urls/mentor/usuario/`
        } else {
            url_fetch = `${URL_BASE}/urls/usuario/`
        }
        fetch(url_fetch, {
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
                    toast.error("Error al enviar la url")
                } else {
                    toast.success("Se subió exitosamente la url")
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
                    <ModalHeader id='titulo-modales-blancos'>¿Quieres adjuntar un archivo?</ModalHeader>

                    <ModalBody id='modal-blanco-input'>
                        <label>Nombre de la Url:</label>
                        <Field
                            className="w-100 p-1"
                            placeholder="Nombre del archivo"
                            component='input'
                            name="name_url"
                            type="text"
                        />
                        <label className='mt-2'>Url:</label>
                        <Field
                            className="w-100 p-1"
                            placeholder="Url"
                            component='input'
                            name="url"
                            type="text"
                        />

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
                        <Button className='btn-verde-basico' onClick={handleSubmit} type="submit">Subir url</Button>
                        <Button className='btn-danger-basico' type='primary' danger onClick={toggle}>Cerrar</Button>
                    </ModalFooter>

                </Modal>
            </form>
        </div>
    );
}
const ModalUrlForm_emprendedor = reduxForm({
    form: 'ModalFile_emprendedor',
    validate,
})(ModalUrl_emprendedor);
const mapStateToProps = () => ({});

export default connect(mapStateToProps, null)(ModalUrlForm_emprendedor);