import React, {Fragment, useState} from "react";
import {Row, Col, Form, Button, Spinner} from "react-bootstrap";
import {values, size} from "lodash";
import {toast} from "react-toastify";
import {connect} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {getId, getUsername} from "../../selectors/institutions";
import DateItem_disponbilidad from "../MultiSelector/DateItem_disponbilidad";
import {agregarDisponibilidadMentor, getDispoMentorDay} from "../../api/marketplace"
import {fetchDisponibilidadMentor} from "../../actions/marketplace";

function AgregarDisponibilidad(props) {

    const dias = [
        {
            id: 1,
            dia: "Lunes"
        },
        {
            id: 2,
            dia: "Martes"
        },
        {
            id: 3,
            dia: "Miercoles"
        },
        {
            id: 4,
            dia: "Jueves"
        },
        {
            id: 5,
            dia: "Viernes"
        }, {
            id: 6,
            dia: "Sábado"
        }, {
            id: 7,
            dia: "Domingo"
        },

    ];

    const {setShowModal, id, dateStr, setdispoMentor} = props;
    const [formData, setFormData] = useState(initialFormValue(id));
    const [eventUpLoading, setEventUpLoading] = useState(false);


    const onSubmit = async (e) => {
        e.preventDefault();

        let validCount = 0;
        values(formData).some((value) => {
            value && validCount++;
            return null;
        });
        if (validCount !== size(formData)) {
            toast.info("Completa todos los campos del formulario");

        } else {
            setEventUpLoading(true);
            const btn = document.getElementById("crear-evento-desde-mentor")
            btn.disabled = true
            let CrearDispo = await agregarDisponibilidadMentor(formData)
            if (CrearDispo && !CrearDispo.detail && !CrearDispo.error) {
                setShowModal(false);
                setFormData(initialFormValue(id));
                await props.fetchDisponibilidadMentor(id)
                let dispo = await getDispoMentorDay(dateStr, id)
                if (dispo) {
                    setdispoMentor(dispo)
                }

            }

            setEventUpLoading(false);
            btn.disabled = false
        }
    }

    return (
        <div className={"sign-up-form"}>
            <h2>Agregar disponibilidad semanal</h2>
            <Form>
                <Form.Group>
                    <Row>
                        <Form.Control
                            as='select'
                            placeholder="Seleccione tipo de mentoría"
                            name="mentoria"
                            onChange={(e) => {

                                setFormData({...formData, day: e.target.value})
                            }}

                        >
                            <Fragment>
                                <option value=''>Seleccione día de la semana</option>
                                {
                                    Array.isArray(dias) ?
                                        dias.map(c => (
                                            <option
                                                value={c.id}
                                            >
                                                {c.dia}

                                            </option>
                                        )) :
                                        <option value=''></option>
                                }

                            </Fragment>
                        </Form.Control>

                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row id='fechas'>
                        <Col>
                            <Form.Control
                                as={DateItem_disponbilidad}
                                placeholder="Hora de inicio"
                                name="fecha_inicio"
                                onChange={e => {
                                    setFormData({...formData, fecha_inicio: e})
                                }
                                }

                            ></Form.Control>
                        </Col>
                        <Col>
                            <Form.Control
                                as={DateItem_disponbilidad}
                                placeholder="Hora final"
                                name="fecha_fin"
                                onChange={e => {
                                    setFormData({...formData, fecha_fin: e})
                                }
                                }
                            ></Form.Control>
                        </Col>
                    </Row>
                </Form.Group>

                <Button id='crear-evento-desde-mentor' variant="primary" onClick={onSubmit}>
                    {!eventUpLoading ? "Agregar" : <Spinner animation="border"/>}
                </Button>
            </Form>
        </div>
    );
}

function initialFormValue(id) {
    return {
        day: "",
        mentor_id: id,
        fecha_inicio: "",
        fecha_fin: "",
    };
}

const mapStateToProps = (state) => ({

    id: getId(state),
    username: getUsername(state),
});

export default connect(mapStateToProps, {
    fetchDisponibilidadMentor

})(AgregarDisponibilidad)