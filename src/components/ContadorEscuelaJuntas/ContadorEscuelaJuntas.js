import React, { useEffect, useState } from 'react';
import './ContadorEscuelaJuntas.scss';
import {Row, Col, Button} from 'antd';



function ContadorEscuelaJuntas(props) {

        const calculateTimeLeft = () => {
            let year = new Date().getFullYear();

            const difference = +new Date(`7/11/${year}`) - +new Date();
        
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
    
        const {inicio, preventa, preventaPrecio, inscripcion, segundaFecha} = props;
           
            return (
                <div className='fondo-contador-escuela' id="contadorEscuela">
                    <div className='mentores-section2'>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col lg={16} xs={20}> 
                                <p>{inicio}</p>
                                <h4>{preventa}</h4>
                                <h5>{preventaPrecio}</h5>
                                <p>{inscripcion}</p>
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
                                <h6>{segundaFecha}</h6>
                                {/* <h6>{terceraFecha}</h6> */}
                                <h4>Solo <strong>5</strong> cupos más disponibles</h4>
                            </Col>
                        </Row>
                        <Row className='boton-contador-escuela'>
                            <a target="_blank" rel="noopener noreferrer" className="menu-item"
                            href="https://checkout.wompi.co/l/dwE21n">

                            <Button type="success" className='button-call'>
                                PAGUE AQUÍ Y RESERVE SU CUPO
                            </Button></a>
                        </Row>
                    </div>
                </div>
            );
}

export default ContadorEscuelaJuntas;
   