import React, {useState} from 'react'
import {Button, Col, Modal, Row} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import FormCrearActividad from "../FormCrearActividad/FormCrearActividad";
import NombreActividadEvento from "../NombreActividadEvento/NombreActividadEvento";


const colors = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
    'magenta',
    'red',
    'volcano',
    'orange'

]

const AddActivityFromAct = (props) => {
    const {
        id_user, id_plan, id_mentor, status, id_program, acta_id, actividadesActa,
        setActividadesActa, acta_info, event, setActaInfo
    } = props
    const [visible, setVisible] = useState(false);

     const showModal = () => {
        setVisible(true);
    }

    return (
        <>
            <Row>
                <h6 style={{marginBottom:'5%'}}>Actividades relacionadas con el acta: </h6>
                <Col lg={24} md={24} sm={24} xs={24}>
                    <Row className='mb-4'>
                        {
                            Array.isArray(actividadesActa) && (
                                actividadesActa.map(function (activity) {
                                    return (
                                        <Col key={activity.id}>

                                            <NombreActividadEvento
                                                setActaInfo={setActaInfo}
                                                setActividadesActa={setActividadesActa}
                                                activity={activity}
                                                event={event}
                                                acta={true}
                                                acta_info={acta_info}
                                                status={status}
                                                colors = {colors}
                                            />
                                        </Col>
                                    )
                                })
                            )
                        }
                    </Row>
                            <Button type="dashed" onClick={() => {
                                showModal()
                            }} block icon={<PlusOutlined/>}>
                                Agregar actividad
                            </Button>
                            <Modal
                                className="modales-plan"
                                title="Agregar Actividad"
                                visible={visible}
                                onOk={() => setVisible(false)}
                                onCancel={() => setVisible(false)}>
                                <FormCrearActividad id_program={id_program}
                                                    id_plan={id_plan}
                                                    id_mentor_evento={id_mentor}
                                                    id_user={id_user}
                                                    status={status}
                                                    acta_id={acta_id}
                                                    setVisible={setVisible}
                                                    acta={true}
                                                    setActividadesActa={setActividadesActa}
                                                    acta_info={acta_info}
                                                    event={event}
                                                    setActaInfo={setActaInfo}/>
                            </Modal>
                </Col>
            </Row>
        </>
    )
}

export default AddActivityFromAct