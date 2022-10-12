import React, { useState, useEffect } from "react";
import "./scss/component-sm.scss";
import "./scss/component-md.scss";
import "./scss/component-lg.scss";
import { getStatusMentor, selectCurrentUser } from "../../selectors/users";
import { connect } from "react-redux";
import { enquireScreen } from "enquire-js";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Divider,
  Checkbox,
  DatePicker,
  Select,
} from "antd";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { URL_BASE } from "../../constants";
import RenderMultiselect from "../MultipleSelect/MultiSelect";
import { getId } from "../../selectors/institutions";
import AddActivityFromAct from "../AddActivityFromAct/AddActivityFromAct";
import { toast } from "react-toastify";
import moment from "moment";
import getJsonStrError from "../../helpers/handleJsonErrors";
import NombreActividadEvento from "../NombreActividadEvento/NombreActividadEvento";

const { Option } = Select;
const colors = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
  "magenta",
  "red",
  "volcano",
  "orange",
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const dateFormat = "YYYY/MM/DD HH:mm";

const ActaFormEdit = ({
  users,
  event,
  id_user,
  status,
  acta_info,
  setVisible,
  setActaInfo,
  actividadesActa,
  setActividadesActa,
  idsAsistentes,
}) => {
  const { put, get } = useFetch(URL_BASE);
  const [form] = Form.useForm();
  const [isMobile, setIsMobile] = useState(false);

  const [loading, setLoading] = useState(false);

  enquireScreen((b) => {
    return () => {
      setIsMobile(b);
    };
  });

  useEffect(() => {
    enquireScreen((b) => {
      setIsMobile(!!b);
    });
  }, [isMobile]);

  const onFinish = async (values) => {
    console.log(values);
    setLoading(true);
    if (values.summary) {
      let fecha_i = values.start_date.format("YYYY-MM-DD HH:mm");
      let fecha_f = values.end_date.format("YYYY-MM-DD HH:mm");
      const values2 = {
        ...values,
        event: event?.id,
        creator: id_user,
        start_date: fecha_i,
        end_date: fecha_f,
      };
      const response = await put(`/acts/acts/${event?.act}/`, values2);
      if (response) {
        if (response.error) {
          let error = getJsonStrError(response.error);
          toast.error(error);
        } else {
          toast.success("Acta editada correctamente");
          const response2 = await get(`/acts/acts/${event?.act}/`);
          if (response2) {
            setActaInfo(response2);
          }
        }

        setVisible(false);
      }
    }

    setLoading(false);
  };

  function onOk(value) {}

  function onChange(value, dateString) {}

  return (
    <>
      <Form
        id={`acta-edit-form-${event?.id}`}
        {...formItemLayout}
        form={form}
        name={`acta-edit-form-${event?.id}`}
        onFinish={onFinish}
        initialValues={{
          assistants: idsAsistentes,
          summary: acta_info?.summary,
          start_date: moment(acta_info?.start_date, dateFormat),
          end_date: moment(acta_info?.end_date, dateFormat),
          objetive: acta_info?.objetive,
          keywords: acta_info?.keywords,
          mentee_comment: acta_info?.mentee_comment,
          mentee_grade: acta_info?.mentee_grade,
          users_retired_str: acta_info?.users_retired_str,
          retire: acta_info?.retire ? "True" : "False",
          final_event: acta_info?.final_event ? "True" : "False",
        }}
        scrollToFirstError
        labelAlign="right"
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col lg={24} md={24} sm={24} xs={24}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  name="assistants"
                  label="Asistentes"
                  rules={[
                    {
                      required: true,
                      message: "Por favor seleccione al menos un asistente",
                    },
                  ]}
                >
                  <RenderMultiselect
                    mensaje={"Selecciona los participantes que asistieron"}
                    placeholder="Seleccione los participantes que asistieron"
                    data={users}
                    value2={
                      Array.isArray(acta_info.assistants)
                        ? acta_info.assistants.map((c) => c.id)
                        : []
                    }
                  />
                </Form.Item>
              </Col>
              <Col lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  name="summary"
                  label="Resumen de la sesión"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingrese el resumen de la reunión",
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  name="start_date"
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
                    onChange={onChange}
                    onOk={onOk}
                  />
                </Form.Item>
              </Col>
              <Col lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  name="end_date"
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
                    onChange={onChange}
                    onOk={onOk}
                  />
                </Form.Item>
              </Col>
              <Col lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  name="objetive"
                  label="Objetivo general (del proceso de mentorías)"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingrese el objetivo de la reunión",
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  name="keywords"
                  label="Temas claves (trabajado en la sesión)"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingrese los temas clave de la reunión",
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  name="mentee_comment"
                  label="Comentarios de tu mentee: "
                  rules={[
                    {
                      required: false,
                      message: "Por favor ingrese los comentarios de la reunión",
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  name="mentee_grade"
                  label="Califica a tu mentee: "
                  rules={[
                    {
                      required: false,
                      message: "Ingresa la calificación de parte del mentor a su mentee",
                    },
                  ]}
                >
                  <Select defaultValue="0" style={{ width: 120 }}>
                    <Option>Selecciona una opción</Option>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={28} xs={26} md={24}>
                <Form.Item
                    name="retire"
                    label="¿Alguien se retiro del proceso de mentorias?"
                    rules={[
                      {
                        required: false,
                        message: "Especifique si se retiraron metees de la mentoría",
                      },
                    ]}
                  >
                    <Select defaultValue="False" style={{ width: 100 }}>
                      <Option>Selecciona una opción</Option>
                      <Option value="True">Si</Option>
                      <Option value="False">No</Option>
                    </Select>
                </Form.Item>
              </Col>
              <Col lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  name="users_retired_str"
                  label="¿Quien se retiró?  "
                  rules={[
                    {
                      required: false,
                      message: "Por favor seleccione si se retiró un mentor o un mentee",
                    },
                  ]}
                >
                  <Select defaultValue="Ninguno" style={{ width: 120 }}>
                      <Option>Selecciona una opción</Option>
                      <Option value="Mentee">Mentee</Option>
                      <Option value="Mentor">Mentor</Option>
                      <Option value="Ninguno">Ninguno</Option>
                    </Select>
                </Form.Item>
              </Col>
              <Col lg={24} xs={24} md={24}>
                <Form.Item
                      name="final_event"
                      label="¿Esta es la mentoria final?"
                      rules={[
                        {
                          required: false,
                          message: "Evento Final",
                        },
                      ]}
                    >
                      <Select defaultValue="False" style={{ width: 120 }}>
                        <Option>Selecciona una opción</Option>
                        <Option value="True">Si</Option>
                        <Option value="False">No</Option>
                      </Select>
                  </Form.Item>
              </Col>
            </Row>

            <Row justify="end" gutter={[12, 12]} style={{ marginBottom: "0%" }}>
              <Col>
                <Button
                  form={`acta-edit-form-${event?.id}`}
                  key="submit"
                  htmlType="submit"
                  type="primary"
                  className="btn-verde-basico"
                  loading={loading}
                >
                  Editar Acta
                </Button>
              </Col>
              {/*<Col>*/}
              {/*    <PopConfirm message={'acta'} type={'primary'}*/}
              {/*        // functionDelete={() => deleteEquipo(team?.username)}*/}
              {/*        // id={team?.username}*/}
              {/*    ></PopConfirm>*/}
              {/*</Col>*/}
            </Row>

            <Divider className="divider-sections" />
            {event.workplan ? (
              <AddActivityFromAct
                id_program={event?.programa}
                id_plan={event?.workplan}
                id_mentor={event?.mentor}
                id_user={id_user}
                status={status}
                acta_id={event?.act}
                actividadesActa={actividadesActa}
                setActividadesActa={setActividadesActa}
                acta_info={acta_info}
                event={event}
                setActaInfo={setActaInfo}
              />
            ) : (
              <>
                {status ? (
                  <></>
                ) : (
                  <>
                    <span>
                      Para crear actividades debe crear un plan de trabajo
                    </span>
                    <Link to={`/programs/programs/${event?.programa}`}>
                      <p style={{ color: "var(--primary-color)" }}>
                        Crear plan de trabajo
                      </p>
                    </Link>
                  </>
                )}
              </>
            )}

            {status && (
              <>
                <Row>Actividades: </Row>
                <br />
                <Row className="mb-4">
                  {Array.isArray(actividadesActa) &&
                    actividadesActa.map(function (activity) {
                      return (
                        <Col key={activity.id}>
                          <NombreActividadEvento
                            setActaInfo={setActaInfo}
                            setActividadesActa={setActividadesActa}
                            activity={activity}
                            event={event}
                            acta={true}
                            acta_info={acta_info}
                            colors={colors}
                          />
                        </Col>
                      );
                    })}
                </Row>
              </>
            )}
          </Col>
        </Row>
      </Form>
    </>
  );
};

const mapStateToProps = (state, props) => ({
  user: selectCurrentUser(state),
  id_user: getId(state),
  status: getStatusMentor(state),
});

export default connect(mapStateToProps, null)(ActaFormEdit);
