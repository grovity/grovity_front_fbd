import React, {useState, useEffect} from 'react'
import {Card, Col, Row, Spin} from 'antd';
import ReviewsPerfilMentor from "./ReviewsPerfilMentor";
import {connect} from "react-redux";
import {fetchCalifiacionbyMentor} from "../../actions/fetchMentors";

import {getUsername} from "../../selectors/institutions";



function ReviewMentor(props) {
    const {username, current_username, flag, setFlag} = props
    const [spinner, setSpinner] = useState(true)

    useEffect(() => {
        (async () => {
            if (!username){
                await props.fetchCalifiacionbyMentor(current_username)
            } else if(username && username !== current_username){
                await props.fetchCalifiacionbyMentor(username)
            } else {
                await props.fetchCalifiacionbyMentor(username)
            }

            setSpinner(false)
            if (setFlag) {
                setFlag(false)
            }
        })()
    }, [username, flag])


    return (
        <>
            <Row id='reviews-perfil-mentor' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col lg={24} xs={24} md={24}>
                    <Card
                        style={{width: '100%'}}
                    >
                        <Row>
                            <Col>
                                <h3>Reseñas:</h3>
                            </Col>
                        </Row>

                        {
                            !spinner && !flag ?

                                <Row className="cards-reviews">

                                    {
                                        Array.isArray(props.calificacion.calificaciones) ?
                                            props.calificacion.calificaciones.map(function (comment) {
                                                return <ReviewsPerfilMentor comment={comment} key={comment.id}/>;
                                            })
                                            : ""
                                    }
                                </Row> :
                                <div
                                    className='position-absolute d-flex justify-content-center align-items-center w-100 h-100'
                                    style={{left: '0', top: '0'}}>
                                    <Spin size='default' className='mt-5'/>
                                </div>
                        }

                    </Card>
                </Col>


            </Row>
        </>
    )
}


const mapStateToProps = (state, props) => ({
    calificacion: state.calificacion_mentor,
    current_username: getUsername(state)
});

export default connect(mapStateToProps, {
    fetchCalifiacionbyMentor,
})(ReviewMentor)

