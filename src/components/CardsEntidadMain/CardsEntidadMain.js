import React, { useState, useEffect } from "react";
import { Col, Row, Modal, Button, InputNumber } from "antd";
import "./scss/component-sm.scss";
import "./scss/component-md.scss";
import "./scss/component-lg.scss";
import CardEntidadMain from "../CardEntidadMain/CardEntidadMain";
import { Link,useLocation,useHistory } from "react-router-dom";
import CardItemStat from "../CardItemStat/CardItemStat";

import { getUser } from "../../api/";

import MinutesContainer from "../MinutesContainer/MinutesContainer";
import FormIntegraciones from "../FormIntegraciones/FormIntegraciones";
import { SiGoogleclassroom } from "react-icons/si";
import { GoChecklist } from "react-icons/go";
import { HiPuzzle } from "react-icons/hi";
import { FaUsersCog } from "react-icons/fa";
import { ImStatsDots } from "react-icons/im";
import { RiUserStarFill } from "react-icons/ri";
import { AiFillClockCircle, AiFillCreditCard,AiFillCalculator } from "react-icons/ai";

//obtener la fecha en formato dd/mm/yyyy
let date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let text = "";
if (month < 10) {
  text = `   Estos datos tienen un retraso de 24 horas.
  ultima actualización: ${day}-0${month}-${year} a las 1:00 am`;
} else {
  text = `   Estos datos tienen un retraso de 24 horas.
    ultima actualización: ${day}-${month}-${year} a las 1:00 am`;
}

const content = <div>{text}</div>;

const CardsEntidadMain = (props) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deuda, setDeuda] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [initialMinutos, setInitialMinutos] = useState(0);
  const [creditosMinutos, setCreditosMinutos] = useState(0);
  const [initialCreditosMinutos, setInitialCreditosMinutos] = useState(0);

  const programs = <GoChecklist size={45} className="icons" />;
  const mentors = <RiUserStarFill size={45} className="icons" />;
  const users = <SiGoogleclassroom size={45} className="icons" />;
  const funcionarios = <FaUsersCog size={45} className="icons" />;
  const reports = <ImStatsDots size={45} className="icons" />;
  const integracion = <HiPuzzle size={45} className="icons" />;

  const clock = <AiFillClockCircle size={45} className="icons" />;
  const creditCard = <AiFillCreditCard size={45} className="icons" />;
  const calculator = <AiFillCalculator size={45} className="icons" />;
  let location = useLocation();
  const history = useHistory();
  useEffect(() => {
    getUser().then((res) => {
      setInitialMinutos(res[0].entidad_entidad[0].duracion_zoom ?? 0);
      setInitialCreditosMinutos(res[0].entidad_entidad[0].zoom_credits ?? 0);
      setMinutos(res[0].entidad_entidad[0].duracion_zoom ?? 0);
      setCreditosMinutos(res[0].entidad_entidad[0].zoom_credits ?? 0);
    });
    let calDeuda = minutos - creditosMinutos;
    if(calDeuda < 0){
        setDeuda(0);
    }else{
        setDeuda((calDeuda * 0.015).toFixed(2));
    }
 
  }, []);

  const showModal = () => {
    let calDeuda = minutos - creditosMinutos;
    if(calDeuda < 0){
        setDeuda(0);
    }else{
        setDeuda((calDeuda * 0.015).toFixed(2));
    }
    setIsModalVisible(true);
  };

  const HandleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onChangeMinutos = (value) => {
    setMinutos(value);
    let calDeuda = value - creditosMinutos;
    if(calDeuda < 0){
        setDeuda(0);
    }else{
        setDeuda((calDeuda * 0.015).toFixed(2));
    }
  };
  const onChangeCreditos = (value) => {
    setCreditosMinutos(value);
    let calDeuda = minutos - value;
    if(calDeuda < 0){
        setDeuda(0);
    }
    else{
        setDeuda((calDeuda * 0.015).toFixed(2));
    }
  };
  const handleModal = () => {
   //to page facturacion 
   
    history.push("/facturacion");
  };

  const handleModalCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  return (
    <div className="site-car-wrapper">
      <Modal
        title="Calculadora de horas"
        visible={isModalVisible}
        onOk={HandleOk}
        onCancel={handleCancel}
      >
        <span>Min ultimo mes</span>
        <InputNumber
          min={0}
          defaultValue={minutos}
          onChange={onChangeMinutos}
        />
        <span> -</span>
        <span> Creditos</span>
        <InputNumber
          min={0}
          defaultValue={creditosMinutos}
          onChange={onChangeCreditos}
        />

        {deuda >= 0 ? <p>saldo a pagar: {deuda}$ usd</p> : <p>saldo a pagar: 0$ usd es gratis</p>}
      </Modal>
      <div className="section-button">
        <h3>Mis consumos</h3>

        <Button
          onClick={() => {
            showModal();
          }}
          className='btn-verde-basico'
    
        >
          Calculadora de horas
        </Button>
      </div>
      <Row
        className="cards-entidad-main"
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        <Col lg={22} xs={24} md={24}>
          <Row>
            <Col xxl={7} lg={11} md={11} sm={24} xs={24} className="programas">
              <CardItemStat
                titulo="Creditos"
                icon={creditCard}
                stat={initialCreditosMinutos}
              />
            </Col>

            
            <Col xxl={8} lg={11} md={11} sm={24} xs={24} className="programas">
              <CardItemStat
                titulo="Hora/fraccion a pagar"
                icon={clock}
                small={true}
                popover={true}
                popoverContent={content}
                stat={initialMinutos}
              />
            </Col>
            <Col xxl={8} lg={11} md={11} sm={24} xs={24} className="programas">
         <div >
         <CardItemStat
                titulo="Calcula las horas"
                icon={calculator}

                stat={deuda}
              />
         </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <hr style={{ color: "black" }} />
      <Row
        className="cards-entidad-main"
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        <h3>Accesos </h3>
        <Col lg={22} xs={24} md={24}>
          <Row>
            <Col xxl={8} lg={11} md={11} sm={24} xs={24} className="programas">
              <Link to={"programs/"}>
                <CardEntidadMain titulo="Mis programas" icon={programs} />
              </Link>
            </Col>
            <Col xxl={7} lg={12} md={12} sm={24} xs={24} className="mentores">
              <Link to={"mentors/"}>
                <CardEntidadMain titulo={props.mt_plural} icon={mentors} />
              </Link>
            </Col>
            <Col
              xxl={8}
              lg={11}
              md={11}
              sm={24}
              xs={24}
              className="emprendedores"
            >
              <Link to={"users/"}>
                <CardEntidadMain titulo={props.et_plural} icon={users} />
              </Link>
            </Col>
            <Col xxl={8} lg={12} md={12} sm={24} xs={24} className="admin">
              <Link to={"funcionarios/"}>
                <CardEntidadMain
                  titulo="Administrar usuarios y roles"
                  icon={funcionarios}
                />
              </Link>
            </Col>
            <Col xxl={7} lg={11} md={11} sm={24} xs={24} className="reportes">
              <Link to={"reports/"}>
                <CardEntidadMain titulo="Reportes programas" icon={reports} />
              </Link>
            </Col>
            <Col
              xxl={8}
              lg={12}
              md={12}
              sm={24}
              xs={24}
              className="integracion"
            >
              <a onClick={handleModal}>
                <CardEntidadMain
                  titulo="Página de facturación "
                  icon={integracion}
                />
              </a>
              <Modal
                title="Por favor envíanos tus requerimientos"
                centered
                visible={visible}
                onOk={handleOk}
                onCancel={handleModalCancel}
                footer={[
                  <Button
                    form="integraciones-entidad"
                    key="submit"
                    htmlType="submit"
                    className="btn-verde-basico"
                    loading={loading}
                    onClick={handleOk}
                  >
                    Enviar
                  </Button>,
                ]}
              >
                <FormIntegraciones />
              </Modal>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default CardsEntidadMain;
