import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {createEvent, getEventbyId, getMentorshipsbyProgram} from "../../api";
import {getId, getUsername} from "../../selectors/institutions";
import {fetchEmprendedoresbyProgram, fetchEmprendedoresMentor, fetchEmprendedor} from "../../actions/fetchUsers";
import {getMentorships_mentor} from "../../selectors/mentors";
import {fetchMentorsbymentorship, fetchMentorships} from "../../actions/fetchMentorships";
import "./EventCreateMentorForm.scss";
import {fetchEventsbyMentor, fetchTotalEventsUser} from "../../actions/fetchEvents";
import getJsonStrError from "../../helpers/handleJsonErrors";
import {getStatusMentor, selectCurrentUser, selectIdEmpresaEquipo} from "../../selectors/users";
import Scheduler5 from "../Scheduler/Scheduler5";
import SchedulerNew from "../Scheduler/SchedulerNew.js";
import {Select, Divider, Row, Col, Form} from 'antd';
import DateItem_disponbilidad from "../MultiSelector/DateItem_disponbilidad";
import {createEventFromUserNormal} from "../../api/marketplace";
import moment from "moment";
import {getDispoMentorDay} from "../../api/marketplace";
import {fetchDisponibilidadMentor} from "../../actions/marketplace";

const {Option} = Select;
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};

function EventCreateMenteeForm(props) {
    const [formData] = Form.useForm();


    const {program_id,  program_nombre, current_user, setLoading, setVisible} = props;
    const [mentores, setMentores] = useState([])
    const [idMentoria, setIdMentoria] = useState(0)
    const [dateScheduler, setDateScheduler] = useState(null);
    const [dispoMentor, setdispoMentor] = useState(null);
    const [dispo, setDispo] = useState(false);
    const [mentor, setMentor] = useState(null);
    const [time, setTime] = useState(false);
    // const [date, setDate] = useState(new Date());
    const [dateNew, setDateNew] = useState(new Date());
    const [hours, setHours] = useState(null);
    const [horaInicio, setHoraInicio] = useState(null)
    const [horaFin, setHoraFin] = useState(null)
    const [flag, setFlag] = useState(false)
    const [flag2, setFlag2] = useState(false)
    const [mentorias, setMentorias] = useState([])

    let user = current_user
    let id =  current_user
    let val = new Date()
    let date = val.getDate();
    let month = val.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    let year = val.getFullYear();
    let dateStr = year + "-" + month + "-" + date;

    const selectIdProgramandEntidad = (mentorias, idMentoria) => {
        let ob = mentorias.find(c => c.id == idMentoria)
        return ob
    }


    useEffect(() => {
        (async () => {
            const json = await getMentorshipsbyProgram(program_id)
            setMentorias(json)
        })()

    }, [program_id])

    useEffect(()=>{
        (async () => {
  

                await props.fetchDisponibilidadMentor(mentor,dateStr)
              
            
       })()
   },[flag2])

  async function getDayMentor (){
    
      const dateformated = dateScheduler.toISOString().split('T')[0]
     let dayDispo = await props.fetchDisponibilidadMentor(mentor,dateformated)

    return dayDispo.payload

   }
   useEffect(()=>{
    
       if (dateScheduler !== null) {
        //    const dateformated = dateScheduler.toISOString().split('T')[0]
        //    getDispoMentorDay(dateformated, user.id).then(dispo => setdispoMentor(dispo))
           getDayMentor().then(dispo => {
        
            setdispoMentor(dispo)
           })
  
       }
   },[dateScheduler?.getDate(), flag, flag2])

    function handleChange(value) {
        setIdMentoria(value)
        let obj = selectIdProgramandEntidad(mentorias, value)
        setMentores(obj?.mentor)
    }

    function handleChange2(value) {
        setDispo(true)
        setMentor(value)
    }

    const onFinish = async (values) => {
        //{date, mentor_id, nombre, fecha_inicio, fecha_fin, mentoria}
        let values2 = {
            ...values, date: dateNew,
            nombre: `${program_nombre} -  ${current_user.first_name} ${current_user.last_name}`
        }
        setLoading(true)
   
        let flag = values2.mentor_id
        let flag2 = values2.mentoria
        values.mentoria = flag
        values.mentor_id = flag2

        const response = await props.createEventFromUserNormal(values2)
        if (response) {
            await props.fetchTotalEventsUser()
            setFlag(true)
            setFlag2(true)
            setVisible(false)
            formData.resetFields()
            setTime(false)
            setDispo(false)
        }
        setLoading(false)
    }
    useEffect(() => {
        formData.setFieldsValue({
            date: dateNew,
            mentor_id: '',
            fecha_inicio: horaInicio,
            fecha_fin: horaFin,
            nombre: '',
            mentoria: '',
            usuario_individual: ''
        })
    }, [formData])

    return (
        <Form id={`crear-evento-emprendedor${program_id}`}
              {...formItemLayout}
              form={formData}
              name={`crear-evento-emprendedor${program_id}`}
              onFinish={onFinish}
              initialValues={{

                  date: date,
                  mentor_id: '',
                  fecha_inicio: '',
                  fecha_fin: '',
                  nombre: '',
                  mentoria: '',
                  usuario_individual: '',

              }}
              scrollToFirstError
              labelAlign="right"
        >
            <Row gutter={[8, 8]}>
                <Col lg={24} md={24} sm={24} xs={24}>
                    <Row>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item
                                name="mentoria"
                                label="Tipo de mentoría"
                                rules={[{required: true, message: 'Por favor seleccione el tipo de mentoría!'}]}
                            >
                                <Select placeholder="Seleccionar tipo..." onChange={handleChange}>
                                    {
                                        Array.isArray(mentorias) ?
                                            mentorias.map((c, i) => (
                                                <Option
                                                    value={c.id}
                                                    key={i}
                                                >
                                                    {c.nombre}

                                                </Option>
                                            )) :
                                            <Option value=''></Option>
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item
                                name="mentor_id"
                                label="Mentor"
                                rules={[{required: true, message: 'Por favor seleccione un mentor!'}]}
                            >
                                <Select placeholder="Seleccionar mentor..." onChange={handleChange2}>
                                    {
                                        Array.isArray(mentores) ?
                                            mentores.map((c, i) => (
                                                <Option
                                                    value={c.id}
                                                    key={i}
                                                >
                                                    {c.first_name} {c.last_name} {c.email}
                                                </Option>
                                            )) :
                                            <Option value=''>Cargando mentores...</Option>
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    
                       
                      {
                          dispo ? 
                          <>
                          <Divider className='divider-sections'/>
                          <Row justify='center'>
                              <Col lg={24} md={22} sm={22} xs={22}>
                                  <h4>Selecciona la disponibilidad</h4>
                                  <SchedulerNew setDataScheduler={setDateScheduler} setFlag={setFlag2}
                                    disponibilidad={dispoMentor} modalSchedule={false}
                                    horaInicio={setHoraInicio} horaFin={setHoraFin}
                                    isMetor={true} setTime = {setTime} setDateNew={setDateNew}
                                    />
          
                              </Col>
                          </Row>
                      </>
                      : 
                        <></>
                      }
                   
                    
                    {
                        time ?
                            <>
                                <Divider className='divider-sections'/>
                                <Row>
                                    <h4>Selecciona la hora</h4>
                                </Row>
                                <Row justify='center' gutter={[12]}>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <Form.Item name="fecha_inicio" rules={[{
                                            required: true,
                                            message: 'Por favor selecciona la hora de inicio!'
                                        }]}>
                                            <DateItem_disponbilidad min={horaInicio} max={horaFin}
                                                                    placeholder="Hora de inicio"/>
                                        </Form.Item>
                                    </Col>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <Form.Item name="fecha_fin" rules={[{
                                            required: true,
                                            message: 'Por favor selecciona la hora de finalización!'
                                        }]}>
                                            <DateItem_disponbilidad min={horaInicio} max={horaFin}
                                                                    placeholder="Hora fin"/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </>
                            :
                            <></>
                    }
                </Col>
            </Row>
        </Form>
    );
}


const mapStateToProps = (state) => ({
    mentors: getMentorships_mentor(state),
    id: getId(state),
    username: getUsername(state),
    status: getStatusMentor(state),
    current_user: selectCurrentUser(state),
    user: selectCurrentUser(state),
    id: getId(state),
    disponibilidad: state.disponibilidad_mentor
});

export default connect(mapStateToProps, {
    createEvent,
    fetchEmprendedor,
    fetchEmprendedoresMentor,
    getEventbyId,
    fetchMentorsbymentorship,
    fetchEmprendedoresbyProgram,
    fetchTotalEventsUser,
    getJsonStrError,
    fetchEventsbyMentor,
    fetchMentorships,
    createEventFromUserNormal,
    fetchDisponibilidadMentor,
})(EventCreateMenteeForm)