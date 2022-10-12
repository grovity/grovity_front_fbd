import React, {useState} from "react";
import {Row, Col, Form, Button, Spinner} from "react-bootstrap";
import {toast} from "react-toastify";
import {register} from "../../actions/auth";
import {connect} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {registerUser} from "../../actions/auth";
import "./ActaFirms.scss";
import FileUploadMobiscrollActa from "../FileUpload/FileUploadMobiscrollActa";
import {sendAsistencia} from "../../api";
import {URL_BASE} from "../../constants";
import RenderMultiselect_edit from "../MultipleSelect/MultiSelect_edit";

function ActFirm(props) {
    const {id, users, slug} = props;
    const [formData, setFormData] = useState(initialFormValue(users));
    const [signUpLoading, setSignUpLoading] = useState(false);
    const [asistentes, setAsistentes] = useState([]);

    const uploadFile = (file_name, id) => {
        let file = undefined
        if (document.querySelector("input[type='file']")) {
            file = document.querySelector("input[type='file']").files[0]
        }

        var data = new FormData()
        if (file !== undefined) {
            data.append('file', file, file_name)
        }
        data.append('name', file_name)
        data.append('evento', id)
        fetch(`${URL_BASE}/archivos/evento/`, {
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }),
            method: 'POST',
            body: data
        })
            .then(function (r) {
                if (r.status !== 201) {
                    toast.error("Error al enviar el archivo")
                } else {
                    toast.success("Archivo cargado correctamente")
                    // let hide = () => {
                    //
                    // }
                    // setTimeout(hide, 1500)
                    return r.json()
                }


            })
    }

    const onSubmit = async (e) => {
        setSignUpLoading(true);
        if (asistentes.length !== 0) {
            formData.asistente = asistentes.getVal()
        }
        let asistencia = await props.sendAsistencia(formData.asistente, formData.file, slug)
        if (formData.file) {
            await uploadFile(formData.file, id)
        }
        if (asistencia) {
            setSignUpLoading(false);
            let reload = () => {
                window.location.reload()
            }
            setTimeout(reload, 2000)
        }


    }
    return (
        <div className={"sign-up-form"}>
            <h2 style={{color: '#00495d'}}>Sube el acta de la reunión - opcional</h2>
            <Form>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control
                                className='customInput'
                                as={FileUploadMobiscrollActa}
                                placeholder="File"
                                name="file"
                                defaultValue={formData.file}
                                onChange={e => {
                                    setFormData({...formData, file: e})
                                }
                                }
                            ></Form.Control>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>

                    <Form.Control
                        required
                        as={RenderMultiselect_edit}
                        name="indicador"
                        mensaje={'Selecciona los participantes que asistieron'}
                        placeholder='Seleccione los participantes que asistieron'
                        data={users}
                        defaultValue={Array.isArray(users) ? users.map(c =>
                            c.asistencia ? c.id : ''
                        ) : []}
                        onChange={e => setAsistentes(e)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" onClick={onSubmit}>
                    {!signUpLoading ? "Confirmar evento" : <Spinner animation="border"/>}
                </Button>
            </Form>
        </div>
    );
}

function initialFormValue(props) {
    let user = props
    let asistencia = []
    if (Array.isArray(user)) {
        user.map(c =>
            c.asistencia && (asistencia.push(c.id)))
        return {
            file: "",
            asistente: asistencia
        }
    }
    return {
        file: "",
        asistente: ""
    };
}

export default connect(null, {
    register,
    registerUser,
    sendAsistencia,
})(ActFirm)
