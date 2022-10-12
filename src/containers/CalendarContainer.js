import React, { Component, useState, useEffect } from "react";
import mobiscroll from "@mobiscroll/react";
import { connect } from "react-redux";
import { getet, getmt, getStatusEntidad } from "../selectors/institutions";
import Spin from "antd/es/spin";
import AppFrame from "../components/AppFrame/AppFrame";
import { getId } from "../selectors/institutions";
import { getStatusMentor } from "../selectors/users";
import { getMentorshipsbyMentor } from "../selectors/mentorships";
import { fetchMentorshipsbyMentor } from "../actions/fetchMentorships";
import { fetchTotalEventsUser } from "../actions/fetchEvents";
import { selectEventsCalendar } from "../selectors/events";
import { fetchEventsMarketplace } from "../actions/marketplace";
import { Button, Row, Col, Modal, Divider, Layout, Select } from "antd";
import CalendarEventInfo from "../components/CalendarEventInfo/CalendarEventInfo";
import "./CalendarContainer.scss";
import { CompassOutlined } from "@ant-design/icons";
import {
  convertUtcToTimeZone,
  convertTimeZoneToUtc,
  colTimeZonetoOtherTimeZone,
} from "../helpers/timeZone";
import { da } from "date-fns/locale";
import AllCountryWithTimeZone, {getTimeZone ,setTimeZone} from "../helpers/countrys";
const { Header, Content } = Layout;
const { Option } = Select;

let datasEvents = []
let timezone =getTimeZone()
const Calendar = (props) => {
  let getTimeZoneUser = getTimeZone();
    const [show , setShow] = useState(false);
    const [modal , setModal] = useState(false);
    const [info , setInfo] = useState('');
    const [view , setView] = useState('month');
    const [calView , setCalView] = useState({
        calendar: { type: "month", labels: "true" },
        eventList: { type: "month", scrollable: true },
    });
    const [spinner , setSpinner] = useState(false);
    const [spinnerDates , setSpinnerDates] = useState(false);
    const [showModal , setShowModal] = useState(false);
    const [contentModal , setContentModal] = useState('');
    // const loading = spinner || spinnerDates;
    const [loading , setLoading] = useState(false);
    const [myEventsData, setMyEvents] = useState(props.myEvents || []);
    const [calendarIsLoading, setCalendarIsLoading] = useState(false);
    const [timeZoneSelect, setTimeZoneSelect] = useState(
      { id: 0, value: "America/Bogota", label: "Colombia", short: "CO" }
    );
    datasEvents = myEventsData
    console.log(datasEvents)
    // || [...myEventsData]
    useEffect(() => {
      (async () => {
        setSpinner(true);
        await props.fetchEventsMarketplace();
        if (props.status) {
          window.addEventListener(
            "beforeunload",
            props.fetchTotalEventsUser()
          );
          window.addEventListener(
            "beforeunload",
            props.fetchMentorshipsbyMentor()
          );
        } else {
          window.addEventListener(
            "beforeunload",
            props.fetchTotalEventsUser()
          );
        }
    
        if (props.myEvents.length === 0) {
          await props.fetchTotalEventsUser();
        }
    
        if (props.status && props.mentorships.length === 0) {
          await props.fetchMentorshipsbyMentor();
        }
    
        setSpinner(false);
    
        // if (localStorage.getItem("theme")) {
        //     this.setState({
        //       myEvents2: this.state.myEvents2?.map((event) => {
        //         const tema = localStorage.getItem("theme");
        //         if (tema) {
        //           if (!event.marketplace && event.color) {
        //             event.color = "#ff671b";
        //             return event;
        //           } else {
        //             return event;
        //           }
        //         }
        //       }),
        //     });
        //   }
        

        let newMyEvents = [];
        setCalendarIsLoading(true);
        let events = datasEvents?.forEach((event,index) => {
          
          //buscar en el array de paises el pais seleccionado
          let timeZoneLocal = AllCountryWithTimeZone.find( pais => pais.label === getTimeZoneUser);
          setTimeZoneSelect(timeZoneLocal);
    
          event.start = colTimeZonetoOtherTimeZone(props.myEvents[index].start,timeZoneLocal.value ).replace(' ', 'T');
          event.end = colTimeZonetoOtherTimeZone(props.myEvents[index].end, timeZoneLocal.value).replace(' ', 'T');
          //added to the new array
          newMyEvents.push(event);
            return event;
       
          

      })
      setTimeout(() => {
        
        setMyEvents(newMyEvents);
        setCalendarIsLoading(false);
      },);

          if (localStorage.getItem("theme")) {
            let newMyEvents = myEventsData?.map((event) => {
                const tema = localStorage.getItem("theme");
                if (tema) {
                    if (!event.marketplace && event.color) {
                    event.color = "#ff671b";
                    return event;
                    } else {
                    return event;
                    }
                }
    
            })
            setMyEvents(newMyEvents);
        }
      })();
    },[]);

    const onEventSelect = (event, inst) => {
        setShow(true);
        setInfo(event);
        setModal(true);
    }
    const toggle = () => {
        setShow(false);
        setModal(false);
    }
    const handleOnBack = () => {
        props.history.goBack();
    }

    const changeView = (event) => {
        // var view;
        // switch (event.target.value) {
        //   case "month":
        //     view = {
        //       calendar: { type: "month", labels: "true" },
        //       eventList: { type: "month", scrollable: true },
        //     };
        //     break;
        //   case "week":
        //     view = {
        //       calendar: { type: "week", labels: "true" },
        //       eventList: { type: "week", scrollable: true },
        //     };
        //     break;
        //   case "day":
        //     view = {
        //       eventList: { type: "day", scrollable: true },
        //     };
        //     break;
        // }
   
        // setView(event.target.value);
        // setCalView(view);
      };

      const openModal = () => {
        setShowModal(true);
      }

      const closeModal = () => {
        setShowModal(false);
      }

      const handleModal = (event, inst) => {
  
        setShowModal(true);
        setInfo(event.event);
      }

      return (
        <AppFrame>
          {spinner && (
            <div
              className="position-absolute d-flex justify-content-center align-items-center w-100 h-100"
              style={{ left: "0", top: "0" }}
            >
              <Spin size="large" className="mt-5" />
            </div>
          )}
          {!spinner && (
            <Layout id="program-emprendedor">
              <Header>
                <Row gutter={[8, 8]}>
                  <Col span={12}>
                    <h3>Mi Calendario</h3>
                  </Col>
                  <Col span={6}>
                    <Button
                      type="primary"
                      className="btn-verde-basico mb-2"
                      block
                      onClick={() => handleOnBack()}
                    >
                      Volver
                    </Button>
                  </Col>
                  <Col span={6}>
                    <span>Zona horaria</span>
                    <Select
                      defaultValue={getTimeZoneUser}
                      showSearch
                      style={{ width: 120 }}
                      onChange={(e) => {
                        let newMyEvents = [];
                        setCalendarIsLoading(true);
                        let events = datasEvents?.forEach((event,index) => {
                          
                          //buscar en el array de paises el pais seleccionado
                          let timeZone = AllCountryWithTimeZone.find( pais => pais.label === e);
                          setTimeZoneSelect(timeZone);
                    
                          event.start = colTimeZonetoOtherTimeZone(props.myEvents[index].start,timeZone.value ).replace(' ', 'T');
                          event.end = colTimeZonetoOtherTimeZone(props.myEvents[index].end, timeZone.value).replace(' ', 'T');
                          //added to the new array
                          newMyEvents.push(event);
                            return event;
                       
                          
              
                      })
                      setTimeout(() => {
                        
                        setMyEvents(newMyEvents);
                        setCalendarIsLoading(false);
                      },);

                      setTimeZone(e);
                      }}
                    >
                     {
                      AllCountryWithTimeZone.map((country) => {
                        return (
                          <Option key={country.id} value={country.label}>
                            {country.label}
                          </Option>
                        );
                      })
                     }
                    </Select>
                    {/* <Button
                      type="primary"
                      className="btn-verde-basico mb-2"
                      block
                      onClick={this.changeTimeZone}
                    >
                      {this.state.spinnerDates ? (
                        <Spin size="small" />
                      ) : (
                        "Cambiar zona horaria"
                      )}
                    </Button> */}
                  </Col>
                  <Divider className="header-marketplace" />
                </Row>
              </Header>
             {
              !calendarIsLoading ? (
                <Content
                style={{ overflow: "hidden" }}
                className="calendar-container"
              >
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col>
                    <mobiscroll.Form>
                      <mobiscroll.Segmented
                        value="month"
                        name="view"
                        checked={view === "month"}
                        onChange={() =>changeView()}
                      >
                        Mes
                      </mobiscroll.Segmented>
                      <mobiscroll.Segmented
                        value="week"
                        name="view"
                        checked={view === "week"}
                        onChange={() => changeView()}
                      >
                        Semana
                      </mobiscroll.Segmented>
                      <mobiscroll.Segmented
                        value="day"
                        name="view"
                        checked={view === "day"}
                        onChange={ () => changeView()}
                      >
                        Día
                      </mobiscroll.Segmented>
                    </mobiscroll.Form>
                    <mobiscroll.Eventcalendar
                      themeVariant="light"
                      display="inline"
                      theme="ios"
                      lang="es"
                      view={calView}
                      onEventSelect={(e) => handleModal(e)}
                      data={myEventsData}
                    />
                    <Modal
                      className="modales-plan"
                      title="Detalles del evento"
                      centered
                      visible={showModal}
                      onOk={() => setShowModal(false)}
                      onCancel={() => setShowModal(false)}
                      width={600}
                      footer={[]}
                    >
                      <CalendarEventInfo
                        toggle={toggle}
                        info={info}
                        entidad={props.entidad}
                        timeZoneSelect={timeZoneSelect}
                        mt={props.mt}
                        et={props.et}
                        closeModal={() => closeModal()}
                        setVisibleEventInfo={() => setShow(false)}
                      />
                    </Modal>
                  </Col>
                </Row>
              </Content>
              ) :(    <Spin size="large" className="mt-5" />)
             }
            </Layout>
          )}
        </AppFrame>
      );
}
const mapStateToProps = (state) => ({
  entidad: getStatusEntidad(state),
  mt: getmt(state).split("-")[0],
  et: getet(state).split("-")[0],
  id: getId(state),
  status: getStatusMentor(state),
  programs_user: state.programs_user,
  mentorships: getMentorshipsbyMentor(state),
  myEvents: selectEventsCalendar(state),
  eventsMarket: state.eventos_marketplace,
});

export default connect(mapStateToProps, {
  fetchMentorshipsbyMentor,
  fetchTotalEventsUser,
  fetchEventsMarketplace,
})(Calendar);
