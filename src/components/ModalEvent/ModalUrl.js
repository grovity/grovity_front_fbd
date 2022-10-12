import React, {useState} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {Button} from 'antd'
import {URL_BASE} from "../../constants";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {validate} from "../FormRegisterInstitution/FormRegisterInstitution";
import Spiner from "../Spiner";

import {toast} from "react-toastify";

import './modalesBlancos.scss'


var arr_urls = []
const ModalFile = (props) => {
    const [loading, setloading] = useState(true)

    const {
        className,
        show,
        modal,
        toggle,
        evento,
    } = props;
    const [unmountOnClose] = useState(true);

    const handleSubmit = ({file, name}) => {
        const nombre = document.getElementsByName("name_url")[0].value
        const url = document.getElementsByName("url")[0].value
        const footer = document.querySelector(".modal-footer")
        footer.style.pointerEvents = 'none'
        if (url === undefined) {
            toast.error("Debe ingresar al menos una url")
            setloading(true)
            footer.style.pointerEvents = 'all'
            return
        }
        setloading(false)
        fetch(`${URL_BASE}/urls/evento/`, {
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            method: 'POST',
            body: JSON.stringify({nombre, url, evento})
        })
            .then(function (r) {
                footer.style.pointerEvents = 'all'
                setloading(true)
                if (r.status !== 201) {
                    toast.error("Error al subir la url")
                } else {
                    toast.success("Url cargada correctamente")
                    let hide = () => {
                        toggle()
                    }
                    setTimeout(hide, 1500)
                    return r.json()
                }
            })
            .then(function (r) {
                if (r) {
                    arr_urls.push(r.id)
                }


            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Modal isOpen={modal} className={className} unmountOnClose={unmountOnClose} show={show} toggle={toggle}>
                    <ModalHeader id='titulo-modales-blancos'>¿Quieres subir una url?</ModalHeader>

                    <ModalBody id='modal-blanco-input'>
                        <label>Nombre relacionado con la url:</label>
                        <Field
                            className="w-100 p-1"
                            placeholder="Nombre del archivo"
                            component='input'
                            name="name_url"
                            type="text"
                        />
                        <label className="mt-2">Ingrese la url:</label>
                        <Field
                            className="w-100 p-1"
                            placeholder="Nombre de la url"
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
                        <Button className='btn-verde-basico' onClick={handleSubmit} type="submit">Subir Url</Button>
                        <Button className='btn-danger-basico' type='primary' danger onClick={toggle}>Cerrar</Button>
                    </ModalFooter>

                </Modal>
            </form>
        </div>
    );
}
const ModalFileForm = reduxForm({
    form: 'ModalFile',
    validate,
})(ModalFile);
const mapStateToProps = () => ({});

export default connect(mapStateToProps, null)(ModalFileForm);
