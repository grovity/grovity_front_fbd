import React from 'react'
import {withRouter} from "react-router-dom";
import {Row, Col, Button} from 'antd';
import {Link} from 'react-router-dom';
import FBD from '../../assets/images/logo-fbd/logo-FBD-blanco-naranja.png'


const SalesForceError = (props) => {

        return (
            <>
                <Row style={{height: '20%', background: 'black'}}></Row>
                <Row justify='center' style={{background: 'black', height: 'vh'}}>
                    <Col>                    
                        <iframe src="https://giphy.com/embed/3osxY9kuM2NGUfvThe" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                        <p style={{fontSize:'20%'}}>
                            <a href="https://giphy.com/gifs/glitch-alphabet-font-3osxY9kuM2NGUfvThe" style={{color: 'gray'}}>via GIPHY</a>
                        </p>
                        <Row justify="center">
                            <img src={FBD}/>
                        </Row>
                        <Row justify='center'>
                            <h5>Hubo un error! <br/>Por favor intenta de nuevo.</h5>
                        </Row>
                        <Row justify='center' style={{marginTop: '2%'}}>
                            <Col xxl={14} xl={14} lg={14} md={14} sm={14} xs={14}>
                                <Link to={'/login'}>
                                    <Button className='btn-verde-basico' style={{backgroundColor: '#ff671b'}} block>Login</Button>
                                </Link>
                            </Col>
                        </Row>
                    </Col>  
                </Row>
                <Row style={{height: '20%', background: 'black'}}></Row>
            </>
        )
}

export default withRouter(SalesForceError)