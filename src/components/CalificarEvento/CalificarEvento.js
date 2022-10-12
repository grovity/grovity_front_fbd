import React, {useState} from 'react';
import {Button, Input, Row, Col} from 'antd';
import {URL_BASE} from "../../constants";
import {connect} from "react-redux";
import RatingMentor from "../RatingMentor/RatingMentor";
import {toast} from "react-toastify";
import getJsonStrError from "../../helpers/handleJsonErrors";
import {fetchEventsbyId} from "../../actions/fetchEvents";


const CalificarEvento = (props) => {
    const {
        onCancel,
        username,
        marketplace,
    } = props;

    const [review, setReview] = useState("");
    const [calificacion, setCalificacion] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true)
        let url = `${URL_BASE}/calendario/evento/calificar/${username}`
        let bool= false
        if(marketplace) {
            url = `${URL_BASE}/marketplace/calificar/evento/${username}`
            bool = true
        }
        let request = await fetch(url, {
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            }),
            method: 'POST',
            body: JSON.stringify({'puntaje': calificacion, 'comentario': review}),
        })

        const json = await request.json();
        if (request.status !== 201) {
            toast.error(getJsonStrError(json))
        } else {
            toast.success("Tu calificación ha sido enviada correctamente")
            await props.fetchEventsbyId(username, bool)
            let reload = () => {
                onCancel()
            }
            setTimeout(reload, 2000)
        }
        setLoading(false);

    }

    return (
        <>
        <Row justify='center'>
        <Col lg={24} md={24} sm={24} xs={24}>
            <Row justify='space-between'>
                <Col lg={24} md={24} sm={24} xs={24}>
                    <Input.TextArea/>
                </Col>
            </Row>
            <Row justify='space-between'>
                <Col lg={24} md={24} sm={24} xs={24}>
                    <RatingMentor calificacion={setCalificacion}/>
                </Col>
            </Row>
            <Row justify='end' gutter={[8]}>
                <Col>
                    <Button form="invitar-mentor" key='submit' htmlType="submit"
                            loading={loading} className='btn-verde-basico'>
                        Calificar
                    </Button>
                </Col>
                <Col>
                    <Button danger type='primary' onClick={onCancel} className='btn-danger-basico'>
                        Cancelar
                    </Button>
                </Col>
            </Row>
        </Col>
    </Row>
                    <Input style={{color: 'black'}} id="text-area-reviews" type="textarea"
                           placeholder='Déjanos tus comentarios' rows={5}
                           onChange={(obj) => {
                               setReview(obj.target.value)
                           }} className='mb-3'/>
                    <RatingMentor calificacion={setCalificacion}/>
                
                    <Button color="info" onClick={handleSubmit} type="submit">Enviar</Button>
                   
            </>
    );
}
const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
    fetchEventsbyId
})(CalificarEvento);