import React, { Fragment, useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Layout,
  Divider,
  Modal,
  Input,
  Spin,
  Form,
  Select,
  DatePicker,
  Checkbox,
  Radio,
} from "antd";
import "./scss/component-sm.scss";
import "./scss/component-md.scss";
import "./scss/component-lg.scss";
import PropTypes from "prop-types";
import {
  getet,
  getIdInstitution,
  getmt,
  getStatusEntidad,
} from "../../selectors/institutions";
import {getProgramsUser} from "../../selectors/programs";
import AppFrame from "../AppFrame/AppFrame";
import { enquireScreen } from "enquire-js";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchEmprendedoresPrograma,
  fetchEmprendedor,
  fetchEmprendedoresbyProgram,
} from "../../actions/fetchUsers";
import { loadUser } from "../../actions/auth";
import CardProgramsAnt from "../../components/CardItemAnt/CardItemAnt";
import { fetchMentorships } from "../../actions/fetchMentorships";
import ProgramRegister from "../../components/ProgramRegister/ProgramRegister";
import { fetchTotalEventsUser } from "../../actions/fetchEvents";
import getJsonStrError from "../../helpers/handleJsonErrors";
import { fetchPrograms_entidad } from "../../actions/fetchPrograms";
import AllCountryWithTimeZone, { getTimeZone } from "../../helpers/countrys";
import { TimeZonetoColTimeZone } from "../../helpers/timeZone.js";
import { CaretRightFilled } from "@ant-design/icons";
import { fetchMentorsbymentorship } from "../../actions/fetchMentorships";
import { getMentors, getMentorships_mentor } from "../../selectors/mentors";
import { createEvent, getEventbyId } from "../../api";
import { getId } from "../../selectors/institutions";
import {
  convertUtcToTimeZone,
  convertTimeZoneToUtc,
  colTimeZonetoOtherTimeZone,
} from "../../helpers/timeZone.js";
import EventCreateFastInput from "../EventCreateFastInput/EventCreateFastInput";
import {fetchEmpresaEmprendedor, fetchInfoEmpresa, fetchProgramsbyUser} from "../../actions/fetchUsers";
import moment from "moment";
import RenderMultiselect from "../MultipleSelect/MultiSelectEvent";
import { user } from "../../reducers/mentors";
import {GET_USER_FAILED, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, URL_BASE, USER_LOADED,} from "../../constants";
import {selectMentorsEntidad} from "../../selectors/users";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const EventCreateFast = (props) => {
  const { programs, entidad, id_entidad, mentorships ,programs_user } = props;

  const [programasEntidad, setProgramasEntidad] = useState([]);
  const [isLoadingProgramasEntidad, setIsLoadingProgramasEntidad] =
    useState(false);
  const [programSelected, setProgramSelected] = useState(null);
  const [herramientas, setHerramientas] = useState([]);
  const [isLoadingHerramientas, setIsLoadingHerramientas] = useState(false);

  let timeZone = getTimeZone();
  let timeZoneLocal = AllCountryWithTimeZone.find(
    (pais) => pais.label === timeZone
  );
  // localStorage.setItem("mentor" , false)
  // localStorage.setItem("entidad" , true)
  if(localStorage.getItem("entidad") === "false" || localStorage.getItem("entidad") === false){
    localStorage.setItem("mentor" , true)
  

  }
  const [form] = Form.useForm();
  // const [isMentor, setIsMentor] = useState(localStorage.getItem("mentor") ?? false);
  const [isMentor, setIsMentor] = useState(props.auth.user[0].mentor);
  const [mentoresHerramienta, setMentoresHerramienta] = useState([]); 
    
  const {
    mentors,
    users,
    idMentoria,
    id_institution,
    mentors_entidad,
    onCancel,
    setVisible,
  } = props;

  const [CrearEvento, setCrearEvento] = useState({});
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(null);

  const [inicio, setInicio] = useState(false);
  const [fin, setFin] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userFilter, setUserFilter] = useState([]);
  const [idHerramienta, setIdHerramienta] = useState(null);
  const [herramienta, setHerramienta] = useState(null);
  const [programId , setProgramId] = useState(null);
  const [mentees , setMentees] = useState([]);
  const [menteesSelected,SetmenteesSelected ] =  useState([])
  const [mentoresSelected,SetmentoresSelected ] =  useState([])
  useEffect(() => {
    (async () => {
      if(props.auth.user[0].entidad_entidad){
        
              const { payload } = await props.fetchPrograms_entidad(id_entidad);
        
              setProgramasEntidad(payload);

      }else{

        setProgramasEntidad(programs_user);
      }
  
     
    })();
  }, []);
  //fetch when sleect program
  useEffect(() => {
    (async () => {
      setIsLoadingHerramientas(true);
      if (programSelected) {
        const { payload } = await props.fetchMentorships(programSelected);
       
        setHerramientas(payload);

        fetch(`${URL_BASE}/programa/${programId}/emprendedores`,{
          headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`
        }),

        method: 'GET'
        }).then(res => res.json())
        .then(res => {
     
          setMentees(res.emprendedor);
        })
      
      }

      setIsLoadingHerramientas(false);
    })();
  }, [programSelected]);
  





  function onChange(value, dateString) {
    setInicio(dateString);
  }

  function onChangeFin(value, dateString) {
    setFin(dateString);
  }

  function onOk(value) {}
  const handleChangeTipo = (value) => {
    setType(value);
  };

  const onClickCambiar = (num) => {};

  const onFinish = async (values) => {
   
    values.sub_grupo =  menteesSelected
    if(values.tipo === "Junta Directiva"){
     
      values.mentores = mentoresSelected
    }
  
    setLoading(true);
    if(isMentor){
      values.mentor = props.auth.user[0].id
    }
    if (values.nombre) {
      let date = moment().format("YYYY/MM/DD HH:").toString();
      let time = "00";
      let timeAndDate = moment(date + time);
      if (inicio === false && fin === false) {
        values.fecha_inicio = TimeZonetoColTimeZone(
          timeAndDate._i.replaceAll("/", "-"),
          timeZoneLocal.value
        );
        values.fecha_fin = TimeZonetoColTimeZone(
          timeAndDate._i.replaceAll("/", "-"),
          timeZoneLocal.value
        );
      }
      if (inicio === true && fin === false) {
        values.fecha_inicio = TimeZonetoColTimeZone(
          inicio,
          timeZoneLocal.value
        );
        values.fecha_fin = TimeZonetoColTimeZone(
          timeAndDate._i.replaceAll("/", "-"),
          timeZoneLocal.value
        );
      }
      if (inicio === false && fin === true) {
        values.fecha_inicio = TimeZonetoColTimeZone(
          timeAndDate._i.replaceAll("/", "-"),
          timeZoneLocal.value
        );
        values.fecha_fin = TimeZonetoColTimeZone(fin, timeZoneLocal.value);
      }
      if (inicio === true && fin === true) {
        values.fecha_inicio = TimeZonetoColTimeZone(
          inicio,
          timeZoneLocal.value
        );
        values.fecha_fin = TimeZonetoColTimeZone(fin, timeZoneLocal.value);
      }
      let idMentoria = idHerramienta;

      const response = await props.createEvent(values, idMentoria, inicio, fin);
      if (response && !response.error) {
        props.fetchTotalEventsUser();
        setVisible(false);
      }
    }

    setLoading(false);
  };
  const handleChangeProgram = (value) => {
   
    setProgramSelected(value);
 
    setProgramId(value);
    //buscar en las herramientas el id de la herramienta
    let idHerramienta = herramientas.find((herramienta) => {
   
      return herramienta.id === value;
    }
    );
  };
  const selectHerramientas = (value) => {
    setIdHerramienta(value);


    //buscar en las herramientas el id de la herramienta
    let idHerramienta = herramientas.find((herramienta) => {
      
      return herramienta.id === value;
    }
    );

    setMentoresHerramienta(idHerramienta.mentor);
  };
  const filter = (e) => {
    let array = e.target.value.replace(/\s+/g, " ");
    let array2 = mentees.filter((user) => {
      return array.includes(user.email);
    });

    //obtener solo los id de array2
    let array3 = array2.map((user) => {
      return user.id;
    });
    setUserFilter(array3);
  };

  let date = moment().format("YYYY/MM/DD HH:").toString();
  let time = "00";
  let timeAndDate = moment(date + time);

 
  return (
    <div>
      <Form
        id="crear-evento-entidad"
        {...formItemLayout}
   
        onFinish={onFinish} 
        name="crear-evento-entidad"
    
        initialValues={{
          nombre: "",
          fecha_inicio: timeAndDate,
          fecha_fin: timeAndDate,
          mentor:  "",
          tipo: "",
          usuario_individual: "",
          sub_grupo: "",
          tema: "",
          mentores: "",
          espacio: "0",
          repeticion: "0",
        }}
        scrollToFirstError
        labelAlign="right"
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col lg={24} md={24} sm={24} xs={24}>
          <Row>
              <Col lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  name="programa"
                  label="Programa"
                  rules={[
                    {
                      required: true,
                      message: "¡Por favor agregue el nombre del evento!",
                    },
                  ]}
                >
                  <Select onChange={handleChangeProgram}>
                    {programasEntidad.map((programa) => {
                      return (
                        <Option value={programa.id}>{programa.nombre}</Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            {isLoadingHerramientas > 0 ? (
              <div style={{ textAlign: "center" }}>
                <Spin size="large" />
              </div>
            ) : herramientas.length > 0 ? (
              <Row>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item
                    name="herramienta"
                    label="Herramienta"
                    rules={[
                      {
                        required: true,
                        message: "¡Por favor agregue la herramienta!",
                      },
                    ]}
                  >
                    <Select defaultValue={""} onChange={selectHerramientas}>
                      {herramientas.map((herramienta) => {
                        return (
                          <Option value={herramienta.id}>
                            {herramienta.nombre}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            ) : null}

            <Row>
              <Col lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  name="nombre"
                  label="Nombre"
                  rules={[
                    {
                      required: true,
                      message: "¡Por favor agregue el nombre del evento!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  name="fecha_inicio"
                  label="Fecha inicio"
                  rules={[
                    {
                      required: true,
                      message: "Por favor seleccione la fecha de inicio!",
                    },
                  ]}
                >
                  <DatePicker
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm"
                    minuteStep={30}
                    allowClear={false}
                    placeholder="Seleccione fecha"
                    onChange={onChange}
                    onOk={onOk}
                  />
                </Form.Item>
              </Col>
              <Col lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  name="fecha_fin"
                  label="Fecha fin"
                  rules={[
                    {
                      required: true,
                      message: "Por favor seleccione la fecha de finalización!",
                    },
                  ]}
                >
                  <DatePicker
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm"
                    minuteStep={30}
                    allowClear={false}
                    placeholder="Seleccione fecha"
                    onChange={onChangeFin}
                    onOk={onOk}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
                  {
                    isMentor === true || isMentor === "true" ?     null
                  : 
                  <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item
                    name="mentor"
                    label="Anfitrión"
                    rules={[
                      {
                        required: true,
                        message: "¡Por favor seleccione el mentor!",
                      },
                    ]}
                  >
                    <Select placeholder="Seleccionar...">
                      <Option value="">Seleccione mentor</Option>
                      {Array.isArray(mentoresHerramienta) ? (
                        mentoresHerramienta.map((c, i) => (
                          <Option value={c.id} key={i}>
                            {c.first_name} {c.last_name} {c.email}
                          </Option>
                        ))
                      ) : (
                        <Option value="Cargando información de mentores...">
                          Cargando información de mentores...
                        </Option>
                      )}
                    </Select>
                  </Form.Item>
                </Col> 
                  }
              <Col lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  name="tipo"
                  label="Tipo de sesión"
                  rules={[
                    {
                      required: true,
                      message: "¡Por favor seleccione el tipo!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Seleccionar tipo..."
                    onChange={handleChangeTipo}
                  >
                    <Select.Option value="">Seleccione tipo</Select.Option>
                    <Select.Option value="Grupal">Grupal</Select.Option>
                    <Select.Option value="Individual">Individual</Select.Option>
                    <Select.Option value="Junta Directiva">
                      Junta Directiva
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              {type === "Individual" && (
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item
                    name="usuario_individual"
                    label="Seleccione Cliente"
                  >
                    <Select placeholder="Seleccionar participante...">
                      {Array.isArray(mentees) ? (
                        mentees.map((c) => (
                          <Option value={c.id}>
                            {c.first_name} {c.last_name} {c.email}
                          </Option>
                        ))
                      ) : (
                        <Option value="Cargando información de usuarios...">
                          Cargando información de usuarios...
                        </Option>
                      )}
                    </Select>
                  </Form.Item>
                </Col>
              )}
              <Col lg={24} md={24} sm={24} xs={24} offset={isMobile ? 0 : 6}>
                {(type === "Grupal" || type === "Junta Directiva") && (
                  <>
                    <Form.Item name="sub_grupo" label="">
                    <EventCreateFastInput data={mentees}          menteesSelected={menteesSelected}
                        SetmenteesSelected={SetmenteesSelected}></EventCreateFastInput>
                      {/* <RenderMultiselect
                        data={mentees}
             
                        placeholder="Seleccione participantes"
                      /> */}
                    </Form.Item>
                    <Form.Item placeholder="filtrar">
                      <Input
                        onChange={(e) => filter(e)}
                        placeholder="Ingrese correos para seleccionar automáticamente"
                      />
                    </Form.Item>
                  </>
                )}
              </Col>
              <Col lg={24} md={24} sm={24} xs={24} offset={isMobile ? 0 : 6}>
                {type === "Grupal" ||
                  (type === "Junta Directiva" && (
                    <Form.Item name="mentores">
                      {/* <RenderMultiselect
                        data={mentors_entidad}
               
                        placeholder="seleccione mentores"
                    
                      /> */}
                           <EventCreateFastInput data={mentors_entidad}          menteesSelected={mentoresSelected}
                        SetmenteesSelected={SetmentoresSelected}></EventCreateFastInput>
                    </Form.Item>
                  ))}
              </Col>
            </Row>
            <Row>
              {CrearEvento &&
              CrearEvento.opciones &&
              CrearEvento.opciones.warning ? (
                CrearEvento.opciones.hora1_inicio ||
                CrearEvento.opciones.hora2_inicio ? (
                  <Fragment
                    style={{
                      backgroundColor: "#01404f",
                      paddingTop: "1%",
                      paddingLeft: "2%",
                      border: "red",
                      borderWidth: "1px",
                    }}
                  >
                    <Row>
                      <Col>
                        <p
                          style={{
                            color: "white",
                            fontFamily: "ObjectiveLightItalic",
                          }}
                        >
                          <CaretRightFilled style={{ color: "red" }} /> Las
                          horas escogidas <strong>NO</strong> están disponibles,
                          te sugerimos los siguientes horarios
                        </p>
                      </Col>
                    </Row>
                    {CrearEvento.opciones.hora1_inicio ? (
                      <Row>
                        <Col>
                          <p
                            style={{
                              color: "white",
                              fontFamily: "ObjectiveRegular",
                              marginLeft: "1%",
                              marginTop: "1%",
                            }}
                          >
                            Opción 1
                          </p>
                          <Row>
                            <Col lg={6} sm={5} style={{ display: "inline" }}>
                              <p
                                style={{
                                  color: "white",
                                  fontFamily: "ObjectiveLight",
                                  marginLeft: "3%",
                                  marginTop: "1%",
                                }}
                              >
                                <strong>Fecha</strong>{" "}
                                {CrearEvento.opciones.fecha}
                              </p>
                              <p
                                style={{
                                  color: "white",
                                  fontFamily: "ObjectiveLight",
                                  float: "left",
                                  marginLeft: "3%",
                                  marginTop: "1%",
                                }}
                              >
                                <strong>Hora</strong>{" "}
                                {CrearEvento.opciones.hora1_inicio} -{" "}
                                {CrearEvento.opciones.hora1_fin}
                              </p>
                            </Col>
                            <Col>
                              <Button
                                size="sm"
                                variant="link"
                                onClick={onClickCambiar(1)}
                              >
                                Cambiar
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    ) : (
                      <span></span>
                    )}
                    {CrearEvento.opciones.hora2_inicio ? (
                      <Row>
                        <Col>
                          <p
                            style={{
                              color: "white",
                              fontFamily: "ObjectiveRegular",
                              marginLeft: "1%",
                              marginTop: "1%",
                            }}
                          >
                            Opción 2
                          </p>
                          <Row>
                            <Col lg={6} sm={5} style={{ display: "inline" }}>
                              <p
                                style={{
                                  color: "white",
                                  fontFamily: "ObjectiveLight",
                                  marginLeft: "3%",
                                  marginTop: "1%",
                                }}
                              >
                                <strong>Fecha</strong>{" "}
                                {CrearEvento.opciones.fecha}
                              </p>
                              <p
                                style={{
                                  color: "white",
                                  fontFamily: "ObjectiveLight",
                                  float: "left",
                                  marginLeft: "3%",
                                  marginTop: "1%",
                                }}
                              >
                                <strong>Hora</strong>{" "}
                                {CrearEvento.opciones.hora2_inicio} -{" "}
                                {CrearEvento.opciones.hora2_fin}
                              </p>
                            </Col>
                            <Col>
                              <Button
                                size="sm"
                                variant="link"
                                onClick={onClickCambiar(2)}
                              >
                                Cambiar
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    ) : (
                      <span></span>
                    )}
                  </Fragment>
                ) : (
                  <Row>
                    <Col>
                      <p
                        style={{
                          color: "white",
                          fontFamily: "ObjectiveLightItalic",
                        }}
                      >
                        <CaretRightFilled style={{ color: "red" }} /> No hay
                        horarios disponibles en la fecha escogida, por favor
                        escoge otra fecha
                      </p>
                    </Col>
                  </Row>
                )
              ) : (
                <Row></Row>
              )}
            </Row>
           
            <Divider style={{ marginTop: "2%", marginBottom: "2%" }} />
            <Row justify="end" gutter={[8]}>
              <Col>
                <Button
                   
                
                     htmlType="submit"
                     loading={loading}
                     className="btn-verde-basico"
                
        
                >
                  Crear
                </Button>
              </Col>
              <Col>
                <Button
                  danger
                  type="primary"
                  onClick={onCancel}
                  className="btn-danger-basico"
                >
                  Cancelar
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>

  
    </div>
  );
 
};

EventCreateFast.propTypes = {
  fetchPrograms: PropTypes.func,
  programs: PropTypes.array.isRequired,
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.array.isRequired,
};

EventCreateFast.defaultProps = {
  programs: [],
};

const mapStateToProps = (state) => ({
  programs: state.programs_user,
  auth: state.auth,
  // nombre_entidad: state.auth.user[0].entidad_entidad[0].razon_social,
  mt: getmt(state).split("-")[0],
  mt_plural: getmt(state).replace("-", ""),
  et: getet(state).split("-")[0],
  et_plural: getet(state).replace("-", ""),
  entidad: getStatusEntidad(state),
  id_entidad: getIdInstitution(state),
  id_institution: getIdInstitution(state),
  mentors: getMentorships_mentor(state),
  // mentors_entidad: getMentors(state),
  users: state.emprendedores_programa.emprendedor,
  mentor: getId(state),
  total_mentorias_mentor: state.mentorships_mentor,
  programs_user: getProgramsUser(state),
  mentors_entidad: selectMentorsEntidad(state),
});

export default withRouter(
  connect(mapStateToProps, {
    loadUser,
    fetchPrograms_entidad,
    fetchMentorships,
    createEvent,
    fetchEmprendedor,
    getEventbyId,
    fetchTotalEventsUser,
    getJsonStrError,
    fetchEmprendedoresPrograma,
    fetchMentorsbymentorship,
    fetchEmprendedoresbyProgram,
    fetchProgramsbyUser,
  })(EventCreateFast)
);
