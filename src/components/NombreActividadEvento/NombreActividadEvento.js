import React, {useState, useEffect} from 'react'
import FormEditarActividad from "../FormEditarActividad/FormEditarActividad";
import {Modal, Tag} from "antd";
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'



const NombreActividadEvento = (props) => {
    const {activity, setActaInfo, setActividadesActa, event, acta_info, status, colors, entidad} = props

    const [visibleEditar, setVisibleEditar] = useState(false);
    const [flag, setFlag] = useState(false);
    const [visibleReportar, setVisibleReportar] = useState(false);
    const [visibleObservaciones, setVisibleObservaciones] = useState(false);
    const [loading, setLoading] = useState(false);
    const [theme, setTheme] = useState(null);

    useEffect(() => {
        const tema = localStorage.getItem('theme')
        setTheme(tema)
    }, [theme])


    const showModal = () => {
        setVisibleEditar(true);
    }

    const handleOk = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            if (visibleReportar === true) {
                setVisibleReportar(false);
            } else if (visibleEditar === true) {
                setVisibleEditar(false);
            }
        }, 3000);
    };

    const handleCancel = () => {
        if (visibleReportar === true) {
            setVisibleReportar(false);
        } else if (visibleObservaciones === true) {
            setVisibleObservaciones(false);
        } else if (visibleEditar === true) {
            setVisibleEditar(false);
        }
    };
    const showEditar = () => {
        setVisibleEditar(true)
    };
    return (
        <>
            <Modal
                className="modales-plan"
                visible={visibleEditar}
                title="Editar actividad"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[]}
            >
                <FormEditarActividad setVisible={setVisibleEditar} activity={activity}
                                     setActaInfo={setActaInfo}
                                     setActividadesActa={setActividadesActa}
                                     status={status} flag={flag} setFlag={setFlag}
                                     event={event}
                                     acta={true}
                                     acta_info={acta_info}
                                     entidad={entidad}/>
            </Modal>
           
                <Tag onClick={showModal} style={{cursor:'pointer', marginBottom: '2%'}} 
                className='tags-acta' color={theme ? 'volcano' : colors[Math.floor(Math.random() * 15)]}>{activity.name}</Tag>
        </>
    )
}

export default NombreActividadEvento