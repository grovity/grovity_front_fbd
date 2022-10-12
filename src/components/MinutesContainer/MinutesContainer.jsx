import React, { useState,useEffect } from 'react';

import { Popover, Button ,Modal,InputNumber,Col,Row } from 'antd';
import CardEntidadMain from '../CardEntidadMain/CardEntidadMain';
import {Link} from 'react-router-dom';
import CardItemStat from "../CardItemStat/CardItemStat"
import FormIntegraciones from '../FormIntegraciones/FormIntegraciones';
import {QuestionCircleOutlined} from '@ant-design/icons';
import { HiPuzzle } from "react-icons/hi";
import { SiGoogleclassroom } from "react-icons/si";
import { FaComments } from "react-icons/fa";
import { GoStar } from "react-icons/go";
import {AiFillClockCircle,AiFillCreditCard} from 'react-icons/ai'
import {getUser} from '../../api/'
import './scss/style.scss'
const content = (
    <div>
    Estos datos tienen un retraso de 24 horas.
    ultima actualización: 12/12/2019 a las 12:00
    </div>
  );

export default function MinutesContainer() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [deuda, setDeuda] = useState(0);
    const [minutos, setMinutos] = useState(0);
    const [initialMinutos, setInitialMinutos] = useState(0);
    const [creditosMinutos, setCreditosMinutos] = useState(0);
    const [initialCreditosMinutos, setInitialCreditosMinutos] = useState(0);

    const clock = <AiFillClockCircle size={45} className='icons'/>
    const creditCard = <AiFillCreditCard size={45} className='icons'/>

    useEffect (() => {
       
      getUser().then(res => {
       
        setInitialMinutos(res[0].entidad_entidad[0].duracion_zoom);
        setInitialCreditosMinutos(res[0].entidad_entidad[0].zoom_credits);
        setMinutos(res[0].entidad_entidad[0].duracion_zoom);
        setCreditosMinutos(res[0].entidad_entidad[0].zoom_credits);
       
      })

      setDeuda(minutos - creditosMinutos);

    },[])

    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };
      const onChangeMinutos = (value) => {
        setMinutos(value);
        setDeuda(minutos - creditosMinutos);
      };
        const onChangeCreditos = (value) => {
            setCreditosMinutos(value);
            setDeuda(minutos - creditosMinutos);

        };
  return (
    <div>
               <div className='button-section'>
          <h3>Mis consumos</h3>
                 <Button onClick={()=>{
                showModal()
            }} type="primary">Calculadora de horas</Button>
      </div>  

        {/* <p>Min. credito: {initialCreditosMinutos} </p>
        <p>Minutos gastados este mes: {initialMinutos}   <Popover content={content}>
    
        <QuestionCircleOutlined className='icon' />
       
            </Popover> </p>

            <Button onClick={()=>{
                showModal()
            }} type="primary">Calculadora de horas</Button>
 */}
              
              <Col xxl={8} lg={11} md={11} sm={24} xs={24} className="programas">
                <CardItemStat titulo='Creditos'
                                icon={creditCard}

                                stat={initialCreditosMinutos}/>

                </Col>
                
        
                <Col xxl={8} lg={11} md={11} sm={24} xs={24} className="programas">
                <CardItemStat titulo='Minutos'
                                icon={clock}
                                popover={true}
                      	        popoverContent={content}
                                stat={initialMinutos}/>
               
              
   
                </Col>

  
            <Modal title="Calculadora de horas" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <span>Min ultimo mes</span>  
            <InputNumber min={0} defaultValue={minutos} onChange={onChangeMinutos} />
           <span> -</span>
            <span> Creditos</span>
            <InputNumber min={0}  defaultValue={creditosMinutos} onChange={onChangeCreditos} />
            
            {
                deuda >= 0 ? <p>Deuda: {deuda}$</p> : <p>Deuda: 0$ es gratis</p>
            }

      </Modal>
    </div>
  )
}
