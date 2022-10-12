import React, {Fragment, useEffect, useState} from "react";
import {Row, Col, Form, Button, Spinner} from "react-bootstrap";
import {values, size} from "lodash";
import {toast} from "react-toastify";
import {connect} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {createEvent, getEventbyId} from "../../api";
import DateItem_edit from "../MultiSelector/DateItem_edit";
import DateItem_fin_edit from "../MultiSelector/DateItem_fin_edit";
import {getId, getUsername} from "../../selectors/institutions";
import RenderMultiselect_edit from "../MultipleSelect/MultiSelect_edit";
import {fetchEmprendedoresbyProgram, fetchEmprendedoresMentor, fetchFuncionarioEmpren} from "../../actions/fetchUsers";
import {getMentorships_mentor} from "../../selectors/mentors";
import {fetchMentorsbymentorship, fetchMentorships} from "../../actions/fetchMentorships";
import {CaretRightFilled} from "@ant-design/icons"
import "./EventCreateMentorForm.scss";
import {fetchEventsbyMentor, fetchTotalEventsUser} from "../../actions/fetchEvents";
import getJsonStrError from "../../helpers/handleJsonErrors";
import {getStatusMentor} from "../../selectors/users";
import {temas} from "../../helpers/temas";

function EventCreateMentorForm(props) {
    const {
        setShowModal, mentors, users, id,
        mentorias, username, status, programs, mentorships,
        fromProgram, program_id, total_mentorias_mentor
    } = props;
    const [formData, setFormData] = useState(initialFormValue(id, fromProgram, program_id));
    const [eventUpLoading, setEventUpLoading] = useState(false);
    const [listaEmprendedores, setListaEmprendedores] = useState([])
    const [listaMentores, setListaMentores] = useState([])
    const [idMentoria, setIdMentoria] = useState(0)
    const [idInstitution, setIdInstitution] = useState(0)
    const [idProgram, setIdProgram] = useState(0)
    const [CrearEvento, setCrearEvento] = useState({})
    const [flag, setFlag] = useState(false)
    const [arrayMentorias, setArrayMentorias] = useState([])

    const onClickCambiar = (num) => {
        return () => {
            let inicio = `${CrearEvento.opciones.fecha} ${CrearEvento.opciones[`hora${num}_inicio`]}`;
            let fin = `${CrearEvento.opciones.fecha} ${CrearEvento.opciones[`hora${num}_fin`]}`;

            setFormData({...formData, fecha_inicio: inicio, fecha_fin: fin})

            setTimeout(() => {
                const fecha = document.querySelectorAll("#fechas input[type='text']")
                fecha[0].value = inicio
                fecha[1].value = fin
            }, 0)
        }

    }

    const getMentorias = async (id_programa) => {
        let json = await props.fetchMentorships(id_programa)
        let array = []
        let array_index = []
        for (let i = 0; i < json.payload.length; i++) {
            let obj = json.payload[i].mentor.find(j => j.username === username)
            if (obj) {
                array_index.push(...array_index, i)
                // array.push(...array, json.payload[i])
            }
        }
        let unique = array_index.filter((v, i, a) => a.indexOf(v) === i);
        for (let j = 0; j < unique.length; j++) {
            array.push(json.payload[unique[j]])
        }
        setArrayMentorias(prev => [...[], array])

    }

    const selectIdProgramandEntidad = (mentorias, idMentoria) => {
        if(mentorias.length === 1 && Array.isArray(mentorias[0])){
            mentorias = mentorias[0]
        }
        if (mentorias && idMentoria) {
            let ob = mentorias.find(c => c.id === parseInt(idMentoria))
            return ob
        }
        return

    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (listaEmprendedores.length !== 0) {
            formData.sub_grupo = listaEmprendedores.getVal()
        }
        if (listaMentores.length !== 0) {
            formData.mentores = listaMentores.getVal()
        }

        if (formData.mentoria === "") {
            toast.info('Por favor seleccione una herramienta')
        }

        let validCount = 0;
        values(formData).some((value) => {
            value && validCount++;
            return null;
        });
        if (validCount !== size(formData) || formData.mentoria === "") {
            toast.info("Completa todos los campos del formulario");

        } else if ((formData.tipo === 'Individual' && !formData.usuario_individual) ||
            (formData.tipo === 'Grupal' && !formData.sub_grupo) ||
            (formData.tipo === 'Junta Directiva' && (!formData.sub_grupo || !formData.mentores))) {
            toast.info("Debes seleccionar al menos un participante. Si es junta directiva debe seleccionar participante y mentores");
        } else {
            setEventUpLoading(true);
            const btn = document.getElementById("crear-evento-desde-mentor")
            btn.disabled = true
            let crearEvento = await props.createEvent(formData, idMentoria, getJsonStrError,)
            setFlag(true)
            setCrearEvento(crearEvento);
            if (crearEvento && !crearEvento.detail && !crearEvento.error) {
                setShowModal(false);
                setFormData(initialFormValue(id));
                await props.fetchEventsbyMentor(username, status)
                await props.fetchTotalEventsUser()
            }

            setEventUpLoading(false);
            btn.disabled = false
        }
    }
    useEffect(() => {
        let form = {...formData}
        if (formData.tipo === 'Individual') {
            delete form['sub_grupo']
            delete form['mentores']
        } else if (formData.tipo === 'Grupal') {
            delete form['usuario_individual']
            delete form['mentores']
        } else {
            delete form['usuario_individual']
        }
        setFormData(() => ({
            ...form,
        }))

        if (idMentoria) {
            props.fetchMentorsbymentorship(idMentoria)
        }
        if (idInstitution && (idProgram || program_id)) {
            props.fetchEmprendedoresbyProgram(idInstitution, idProgram ? idProgram: program_id)
        }
        if (flag) {
            props.fetchEventsbyMentor(props.username, props.status)
        }
    }, [idMentoria, idInstitution, idProgram, formData.tipo, flag]);

    useEffect(() => {
        (async () => {
            if (program_id && fromProgram) {
                const json = await props.fetchMentorships(program_id)
                let array = []
                let array_index = []
                for (let i = 0; i < json.payload.length; i++) {
                    let obj = json.payload[i].mentor.find(j => j.username === username)
                    if (obj) {
                        array_index.push(...array_index, i)
                        // array.push(...array, json.payload[i])
                    }
                }
                let unique = array_index.filter((v, i, a) => a.indexOf(v) === i);
                for (let j = 0; j < unique.length; j++) {
                    array.push(json.payload[unique[j]])
                }

                setArrayMentorias(prev => [...prev, array])

            }

        })()
    }, [program_id])


    function onChange(date, dateString) {
        setFormData({...formData, date: dateString})
    }


    return (
        <div className={"sign-up-form"}>
            <h2>Crear evento</h2>
            <Form>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Nombre de la sesión"
                                name="nombre"
                                onChange={e =>
                                    setFormData({...formData, nombre: e.target.value})}
                            ></Form.Control>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        {
                            !fromProgram && (
                                <Col>
                                    <Form.Control
                                        as='select'
                                        placeholder="Seleccione tipo de mentoría"
                                        name="programa"
                                        onChange={(e) => {
                                            getMentorias(e.target.value)
                                            setFormData({...formData, programa: e.target.value})
                                        }}

                                    >
                                        <Fragment>
                                            <option value=''>Seleccione programa</option>
                                            {
                                                Array.isArray(programs) ?
                                                    programs.map(c => (
                                                        <option
                                                            value={c.id}
                                                        >
                                                            {c.nombre}

                                                        </option>
                                                    )) :
                                                    <option value=''></option>
                                            }

                                        </Fragment>
                                    </Form.Control>
                                </Col>

                            )
                        }

                        <Col>
                            <Form.Control
                                as='select'
                                placeholder="Seleccione tipo de mentoría"
                                name="mentoria"
                                onChange={(e) => {
                                    setIdMentoria(e.target.value)

                                        let obj = selectIdProgramandEntidad(!fromProgram ? mentorias: total_mentorias_mentor, e.target.value)
                                        if (obj && (idInstitution !== obj?.entidad)) {
                                            setIdInstitution(obj && obj.entidad)
                                        }
                                        if (!fromProgram) {
                                        if (idProgram !== obj?.programa) {
                                            setIdProgram(obj && obj.programa)
                                        }
                                    }
                                    setFormData({...formData, mentoria: e.target.value})
                                }}

                            >
                                <Fragment>
                                    <option value=''>Seleccione herramienta</option>
                                    {
                                        !fromProgram && (
                                            formData.programa === '' ?
                                                <option value=''>Por favor seleccione primero un programa...</option> :
                                                Array.isArray(arrayMentorias[0]) ?
                                                    arrayMentorias[0].map(c => (

                                                        <option
                                                            value={c.id}
                                                        >
                                                            {c.nombre}

                                                        </option>
                                                    )) :
                                                    <option value=''></option>

                                        )


                                    }
                                    {
                                        fromProgram && (
                                            Array.isArray(arrayMentorias[0]) ?
                                                arrayMentorias[0].map(c => (
                                                    <option
                                                        value={c.id}
                                                    >
                                                        {c.nombre}

                                                    </option>
                                                )) :
                                                <option value=''></option>

                                        )
                                    }

                                </Fragment>
                            </Form.Control>
                        </Col>

                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row id='fechas'>
                        <Col>
                            <Form.Control
                                as={DateItem_edit}
                                placeholder="Fechas de inicio"
                                name="fecha_inicio"
                                onChange={e => {
                                    setFormData({...formData, fecha_inicio: e})
                                }
                                }

                            ></Form.Control>
                        </Col>
                        <Col>
                            <Form.Control
                                as={DateItem_fin_edit}
                                placeholder="Fechas final"
                                name="fecha_fin"
                                onChange={e => {
                                    setFormData({...formData, fecha_fin: e})
                                }
                                }
                            ></Form.Control>
                        </Col>
                    </Row>
                </Form.Group>
                {CrearEvento && CrearEvento.opciones && CrearEvento.opciones.warning ?
                    (CrearEvento.opciones.hora1_inicio || CrearEvento.opciones.hora2_inicio) ?
                        <Form.Group style={{
                            backgroundColor: '#01404f',
                            paddingTop: '1%',
                            paddingLeft: '2%',
                            border: 'red',
                            borderWidth: '1px'
                        }}>
                            <Row>
                                <Col>
                                    <p style={{color: 'white', fontFamily: 'ObjectiveLightItalic'}}>
                                        <CaretRightFilled style={{color: 'red'}}/> Las horas
                                        escogidas <strong>NO</strong> están disponibles, te sugerimos los siguientes
                                        horarios</p>
                                </Col>
                            </Row>
                            {CrearEvento.opciones.hora1_inicio ?
                                <Row>
                                    <Col>
                                        <p style={{
                                            color: 'white', fontFamily: 'ObjectiveRegular',
                                            marginLeft: '1%', marginTop: '1%'
                                        }}
                                        >Opción 1</p>
                                        <Row>
                                            <Col lg={6} sm={5} style={{display: 'inline'}}>

                                                <p style={{
                                                    color: 'white', fontFamily: 'ObjectiveLight',
                                                    marginLeft: '3%', marginTop: '1%'
                                                }}
                                                ><strong>Fecha</strong> {CrearEvento.opciones.fecha}
                                                </p>
                                                <p style={{
                                                    color: 'white', fontFamily: 'ObjectiveLight',
                                                    float: 'left', marginLeft: '3%', marginTop: '1%'
                                                }}
                                                >
                                                    <strong>Hora</strong> {CrearEvento.opciones.hora1_inicio} - {CrearEvento.opciones.hora1_fin}
                                                </p>

                                            </Col>
                                            <Col>
                                                <Button size="sm"
                                                        variant='link'
                                                        onClick={onClickCambiar(1)}
                                                >Cambiar
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row> :
                                <span></span>
                            }
                            {CrearEvento.opciones.hora2_inicio ?
                                <Row>
                                    <Col>
                                        <p style={{
                                            color: 'white', fontFamily: 'ObjectiveRegular',
                                            marginLeft: '1%', marginTop: '1%'
                                        }}
                                        >Opción 2</p>
                                        <Row>
                                            <Col lg={6} sm={5} style={{display: 'inline'}}>

                                                <p style={{
                                                    color: 'white', fontFamily: 'ObjectiveLight',
                                                    marginLeft: '3%', marginTop: '1%'
                                                }}
                                                ><strong>Fecha</strong> {CrearEvento.opciones.fecha}
                                                </p>
                                                <p style={{
                                                    color: 'white', fontFamily: 'ObjectiveLight',
                                                    float: 'left', marginLeft: '3%', marginTop: '1%'
                                                }}
                                                >
                                                    <strong>Hora</strong> {CrearEvento.opciones.hora2_inicio} - {CrearEvento.opciones.hora2_fin}
                                                </p>

                                            </Col>
                                            <Col>
                                                <Button size="sm"
                                                        variant='link'
                                                        onClick={onClickCambiar(2)}
                                                >Cambiar
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row> :
                                <span></span>
                            }
                        </Form.Group>
                        :
                        <Row>
                            <Col>
                                <p style={{color: 'white', fontFamily: 'ObjectiveLightItalic'}}>
                                    <CaretRightFilled style={{color: 'red'}}/> No hay horarios disponibles
                                    en la fecha escogida, por favor escoge otra fecha
                                </p>
                            </Col>
                        </Row>
                    :
                    <Row></Row>
                }

                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control

                                as='select'
                                placeholder="Seleccione tipo"
                                name="tipo"
                                onChange={e =>
                                    setFormData({...formData, tipo: e.target.value})}

                            >
                                <option value="">Seleccione tipo</option>
                                <option value="Grupal">Grupal</option>
                                <option value="Individual">Individual</option>
                                <option value="Junta Directiva">Junta Directiva</option>
                            </Form.Control>
                        </Col>

                        <Col>
                            <Form.Control
                                as='select'
                                name="tema"
                                onChange={e =>
                                    setFormData({...formData, tema: e.target.value})}
                            >
                                <option value=''>Seleccione tema ...</option>
                                <Fragment>
                                    {
                                        Array.isArray(temas) ?
                                            temas.map(c => (
                                                <option
                                                    value={c.tipo}
                                                >
                                                    {c.tipo}

                                                </option>
                                            )) :
                                            <option value=''></option>
                                    }

                                </Fragment>
                            </Form.Control>
                        </Col>


                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        {
                            formData.tipo === 'Individual' && (

                                <Col>
                                    <Form.Control
                                        as='select'
                                        name="usuario_individual"
                                        onChange={e =>
                                            setFormData({...formData, usuario_individual: e.target.value})}

                                    >
                                        <Fragment>
                                            <option value=''>Seleccione participante</option>
                                            {
                                                Array.isArray(users) ?
                                                    users.map(c => (
                                                        <option
                                                            value={c.id}
                                                        >
                                                            {c.email} {c.first_name} {c.last_name}

                                                        </option>
                                                    )) :
                                                    <option value=''>Cargando participantes...</option>
                                            }

                                        </Fragment>
                                    </Form.Control>
                                </Col>
                            )}
                        <Col>
                            {
                                (formData.tipo === 'Grupal' || formData.tipo === 'Junta Directiva') && (
                                    <Form.Control
                                        as={RenderMultiselect_edit}
                                        name="sub_grupo"
                                        mensaje={'Edita los participantes del evento'}
                                        placeholder='Seleccione participantes'
                                        data={users}
                                        onChange={e => setListaEmprendedores(e)}
                                    >
                                    </Form.Control>

                                )
                            }

                        </Col>


                    </Row>
                </Form.Group>
                <Form.Group>

                    {
                        formData.tipo === 'Grupal' || formData.tipo === 'Junta Directiva' && (
                            <Form.Control
                                as={RenderMultiselect_edit}
                                name="mentores"
                                mensaje={'Edita los mentores del evento'}
                                placeholder='Seleccione mentores'
                                data={mentors}
                                onChange={e => setListaMentores(e)}
                            >
                            </Form.Control>

                        )
                    }

                </Form.Group>
                <Button id='crear-evento-desde-mentor' variant="primary" onClick={onSubmit}>
                    {!eventUpLoading ? "Crear" : <Spinner animation="border"/>}
                </Button>
                {/*<div style={{color: 'red', cursor: 'pointer', fontFamily: 'ObjectiveBold'}} className='mt-2 text-center'*/}
                {/*     onClick={handleDelete(id)}>Cancelar*/}
                {/*</div>*/}
            </Form>
        </div>
    );
}

function initialFormValue(id, fromProgram, program_id) {
    return {
        mentoria: "",
        nombre: "",
        fecha_inicio: "",
        fecha_fin: "",
        tipo: "",
        tema: '',
        usuario_individual: "",
        sub_grupo: [],
        mentores: [],
        mentor: id,
        programa: fromProgram ? program_id : '',

    };
}

const mapStateToProps = (state) => ({
    users: state.emprendedores_program,
    mentors: getMentorships_mentor(state),
    id: getId(state),
    username: getUsername(state),
    status: getStatusMentor(state),
    programs: state.programs_user,
    mentorships: state.mentorships,
    total_mentorias_mentor: state.mentorships_mentor,
});

export default connect(mapStateToProps, {
    createEvent,
    fetchFuncionarioEmpren,
    fetchEmprendedoresMentor,
    getEventbyId,
    fetchMentorsbymentorship,
    fetchEmprendedoresbyProgram,
    fetchTotalEventsUser,
    getJsonStrError,
    fetchEventsbyMentor,
    fetchMentorships,
})(EventCreateMentorForm)
