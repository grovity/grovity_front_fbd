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
  DatePicker,
  Select,
  Checkbox,
} from "antd";
import useFetch from "../../hooks/useFetch";
import { URL_BASE } from "../../constants";
import RenderMultiselect from "../MultipleSelect/MultiSelect";
import { getId } from "../../selectors/institutions";
import { fetchEventsbyId } from "../../actions/fetchEvents";
import { toast } from "react-toastify";
import getJsonStrError from "../../helpers/handleJsonErrors";
import moment from "moment";
import RenderMultiselectRetired from "../MultipleSelect/MultiSelectRetired";
import { isNumber } from "lodash";
const { Option } = Select;

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

const ActaForm = (props) => {
  const { users, event, id_user, status, setVisible } = props;
  const { post } = useFetch(URL_BASE);
  const [form] = Form.useForm();
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const user_creator = selectCurrentUser(status);

  const [users_retired_api, setUsersRetired] = useState([]);
  const [inital_retited, setInitalRetited] = useState([]);
  let usuarios_retirados_send = []
  enquireScreen((b) => {
    return () => {
      setIsMobile(b);
    };
  });
  useEffect(() => {
    // /calendario/evento/37e6ae2b-a086-4323-a145-575fe8a67b29/usersinfo
      fetch(`${URL_BASE}/calendario/evento/${event.slug}/usersinfo`,{
        headers: new Headers({
          'Authorization': `Token ${localStorage.getItem("token")}`
        }),
        method: "GET",
      })
      .then((res) => res.json())
      .then((data) => {

        setUsersRetired(data)


      })
  }, []);

  useEffect(() => {
    enquireScreen((b) => {
      setIsMobile(!!b);
    });
  }, [isMobile]);

  function onOk(value) {}

  function onChange(value, dateString) {}

  const onFinish = async (values) => {
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
        user_retired: usuarios_retirados_send,
        users_retired_str: "Retiro"
      };
      const response = await post(`/acts/acts/`, values2);
      if (response) {
        if (response.error) {
          let error = getJsonStrError(response.error);
          toast.error(error);
        } else {
          await props.fetchEventsbyId(event?.slug, false);
          setVisible(false);
          toast.success("Acta creada correctamente");
        }
      }
    }

    setLoading(false);
  };

  return (
    <>
      <Form
        id="acta-crear-form"
        {...formItemLayout}
        form={form}
        name="acta-crear-form"
        onFinish={onFinish}
        initialValues={{
          assistants: [],
          summary: "",
          start_date: moment(event.fecha_inicio, dateFormat),
          end_date: moment(event.fecha_fin, dateFormat),
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
                  label="Fecha inicio real"
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
                  label="Fecha fin real"
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
                  label="Objetivo: "
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
                  label="Temas clave: "
                  rules={[
                    {
                      required: true,
                      message:
                        "Por favor ingrese los temas clave de la reunión",
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  name="mentee_comment"
                  label="Califica a tu mentee: "
                  rules={[
                    {
                      required: false,
                      message:
                        "Ingresa la calificación de parte del mentor a su mentee",
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  name="mentee_grade"
                  label="Califica a tus mentees"
                  rules={[
                    {
                      required: false,
                      message: "Ingresa la calificación de parte del mentor a su mentee",
                    },
                  ]}
                >
                  <Select defaultValue="5" style={{ width: 120 }}>
                    <Option>Selecciona una opción</Option>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={24} xs={24} md={24}>
                <Form.Item
                    name="retire"
                    label="¿Hay retiros en la mentoría?"
                    rules={[
                      {
                        required: false,
                        message: "Especifique si se retiraron metees de la mentoría",
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
              <Col lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  name="user_retired_str"
                  label="Tipo de Usuario Retirado: "
                  rules={[
                    {
                      required: false,
                      message: "Por favor seleccione al menos un asistente",
                    },
                  ]}
                >
                                 <RenderMultiselectRetired
                    mensaje={"Seleccione los participantes retirados"}
                    placeholder="Seleccione los participantes retirados"
                    data={users_retired_api}
                    onChange = { (value)=>{
                      let newValue = value.filter(c =>  isNumber(c))

                      usuarios_retirados_send = newValue;
                    }}
                    value2={

                      Array.isArray(users_retired_api) 
                      ? users_retired_api.map((c) => c.retiro === true && c.id )
                      : []
                    }
                  />
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
                  form="acta-crear-form"
                  key="submit"
                  htmlType="submit"
                  type="primary"
                  className="btn-verde-basico"
                  loading={loading}
                >
                  Crear Acta
                </Button>
              </Col>
            </Row>
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

export default connect(mapStateToProps, { fetchEventsbyId })(ActaForm);
