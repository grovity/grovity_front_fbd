import React, {useEffect, useState} from 'react'
import {withRouter} from "react-router-dom";
import {salesforce} from "../../api/salesforce";
import FBD from '../../assets/images/logo-fbd/Logo-FBD_Color.png'
import {Row, Col} from 'antd';

const SalesForce = (props) => {

    useEffect(()=>{
        (async()=>{
            const response = await salesforce(props.match.params.id)
            if(response){
                setTimeout(()=>{
                    window.location.href=('/user')
                }, 3000)

            } else {
                window.location.href=('/salesforce/error')
            }
        })()
    },[props.match.params.id])



    return (
        <>
            <Row style={{height: '10%', background: 'white'}}></Row>
            <Row justify='center' style={{background: 'white', height: 'vh'}}>
                <Col>
                    <iframe src="https://giphy.com/embed/feN0YJbVs0fwA" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                    <p style={{fontSize:'20%'}}>
                        <a href="https://giphy.com/gifs/artists-on-tumblr-design-feN0YJbVs0fwA" style={{color:'gray'}}>via GIPHY</a>
                    </p>
                    <Row justify="center">
                        <img src={FBD}/>
                    </Row>
                    <Row justify='center'>
                        <p>Redireccionando a plataforma para gestionar sus mentorías...</p>
                    </Row>
                </Col>  
            </Row>
            <Row style={{height: '10%', background: 'white'}}></Row>
        </>
    )
}

export default withRouter(SalesForce)