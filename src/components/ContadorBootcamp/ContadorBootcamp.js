import React, { useEffect, useState } from 'react';
import './ContadorBootcamp.scss';
import {Row, Col, Button} from 'antd';


function ContadorBootcamp(props) {
    
    const calculateTimeLeft = () => {
        let year = new Date().getFullYear();
        const difference = +new Date(`09/24/${year}`) - +new Date(); 
    
        let timeLeft = {};
    
        if (difference > 0) {
            timeLeft = {
                Días: Math.floor(difference / (1000 * 60 * 60 * 24)),
                Horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
                Minutos: Math.floor((difference / 1000 / 60) % 60),
                Segundos: Math.floor((difference / 1000) % 60)
            };
        return timeLeft;
        } 
        else {
            return 0;
        }       
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <Row>
                <Col>
                    <h1>
                        {timeLeft[interval]}
                    </h1>
                    <h3>
                        {interval}{""}
                    </h3>
                </Col>
            </Row>
        );
    });

    const {inicio, preventa, preventaPrecio, inscripcion, segundaFecha, terceraFecha} = props;
       
        return (
            <div className='fondo-contador-bootcamp' id="contadorBootcamp">
                <div className='mentores-section2'>
                    <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                        <Col lg={16} xs={20}> 
                            <p>{preventa}</p>
                            <h5>{preventaPrecio}</h5>
                            {/* <p>{inscripcion}</p> */}
                            <h4>{inicio}</h4>
                        </Col>
                    </Row>
                    <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                        <Col lg={16} xs={16} className='contador'>
                        
                        {timerComponents.length ? timerComponents : <span>¡El tiempo se terminó!</span>}
                                            
                        </Col>
                    </Row>
                    <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                        <Col lg={16} xs={20}>
                            <hr/>
                            {/* <h6>{segundaFecha}</h6> */}
                            {/* <h6>{terceraFecha}</h6> */}
                            {/* <hr className="tachado"/> */}
                            <h4>Solo <strong>8</strong> cupos disponibles</h4>
                        </Col>
                    </Row>
                    <Row className='boton-contador-escuela'>
                        <a target="_blank" rel="noopener noreferrer" className="menu-item"
                        href="https://biz.payulatam.com/L0d77fb98160589"> 
                        <Button type="success" className='button-call'>
                            QUIERO ACCEDER AL BOOTCAMP
                        </Button></a>
                    </Row>
                </div>
            </div>
        );
}

export default ContadorBootcamp;
   