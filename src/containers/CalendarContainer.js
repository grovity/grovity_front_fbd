
import React, {Component} from 'react';
import mobiscroll from "@mobiscroll/react";
import {connect} from 'react-redux';
import {getet, getmt, getStatusEntidad} from "../selectors/institutions";
import Spin from "antd/es/spin";
import AppFrame from "../components/AppFrame/AppFrame";
import {getId} from "../selectors/institutions";
import {getStatusMentor} from "../selectors/users";
import {getMentorshipsbyMentor} from "../selectors/mentorships";
import {fetchMentorshipsbyMentor} from "../actions/fetchMentorships";
import {fetchTotalEventsUser} from "../actions/fetchEvents";
import {selectEventsCalendar} from "../selectors/events";
import {fetchEventsMarketplace} from "../actions/marketplace";
import {Button, Row, Col, Modal, Divider, Layout} from 'antd';
import CalendarEventInfo from '../components/CalendarEventInfo/CalendarEventInfo';
import './CalendarContainer.scss'

const {Header, Content} = Layout;

class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            modal: false,
            info: "",
            view: 'month',
            calView: {
                calendar: {type: 'month', labels: 'true'},
                eventList: {type: 'month', scrollable: true}
            },
            spinner: false,
            showModal: false,
            contentModal: null,
            loading: false,
            myEvents2: this.props.myEvents
        };
    }

    async componentDidMount() {
        this.setState({
            spinner: true,
        })

        await this.props.fetchEventsMarketplace()
        if (this.props.status) {
            window.addEventListener('beforeunload', this.props.fetchTotalEventsUser())
            window.addEventListener('beforeunload', this.props.fetchMentorshipsbyMentor())
        } else {
            window.addEventListener('beforeunload', this.props.fetchTotalEventsUser())
        }

        if (this.props.myEvents.length === 0) {
            await this.props.fetchTotalEventsUser()
        }


        if (this.props.status && this.props.mentorships.length === 0) {
            await this.props.fetchMentorshipsbyMentor()
        }
        this.setState({
            spinner: false,
        });

        if (localStorage.getItem('theme')) {
            this.setState({
                myEvents2: this.props.myEvents?.map(event => {
                    const tema = localStorage.getItem('theme')
                    if (tema) {
                        if (!event.marketplace && event.color) {
                            event.color = '#ff671b'
                            return event
                        }
                        else {
                            return event
                        }   
                    } 
                })
            });
        }
        
    }

    onEventSelect = (event, inst) => {
        this.setState({
            show: true,
            modal: true,
            info: event.event,
        })
    }


    toggle = () => {
        this.setState({
            show: false,
            modal: false
        })
    }

    handleOnBack = () => {
        this.props.history.goBack();
    };

    changeView = (event) => {
        var view;
        switch (event.target.value) {
            case 'month':
                view = {
                    calendar: {type: 'month', labels: 'true'},
                    eventList: {type: 'month', scrollable: true}
                };
                break;
            case 'week':
                view = {
                    calendar: {type: 'week', labels: 'true'},
                    eventList: {type: 'week', scrollable: true}
                };
                break;
            case 'day':
                view = {
                    eventList: {type: 'day', scrollable: true}
                };
                break;
        }

        this.setState({
            view: event.target.value,
            calView: view
        });
    }

    openModal = () => {
        this.setState({
            showModal: true,
            // contentModal: content,
        })
    };
    closeModal = () => {
        this.setState({
           show: false,
        })
    };

    handleModal = (event, inst) => {
        this.setState({
            show: true,
            info: event.event,
        })
    }

    


    render() {

        return (
            <AppFrame>                
                {this.state.spinner && (
                    <div className='position-absolute d-flex justify-content-center align-items-center w-100 h-100'
                        style={{left: '0', top: '0'}}>
                        <Spin size='large' className='mt-5'/>
                    </div>
                )}
                {
                    !this.state.spinner && (
                        <Layout id='program-emprendedor'>
                            <Header>
                                <Row gutter={[8,8]}>
                                    <Col lg={18} md={16} xs={24} xl={20} xxl={20}>
                                        <h3>Mi Calendario</h3>
                                    </Col>
                                    <Col xxl={4} xl={4} lg={6} md={8} sm={8} xs={8}>
                                        <Button type='primary' className='btn-verde-basico mb-2' block onClick={this.handleOnBack}>
                                            Volver
                                        </Button>
                                    </Col> 
                                    <Divider className='header-marketplace'/>
                                </Row>
                            </Header>
                            <Content style={{overflow: 'hidden'}} className='calendar-container'>
                                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                                    <Col>
                                        <mobiscroll.Form>
                                            <mobiscroll.Segmented value="month" name="view"
                                                                checked={this.state.view === 'month'}
                                                                onChange={this.changeView}>
                                                Mes
                                            </mobiscroll.Segmented>
                                            <mobiscroll.Segmented value="week" name="view" checked={this.state.view === 'week'}
                                                                onChange={this.changeView}>
                                                Semana
                                            </mobiscroll.Segmented>
                                            <mobiscroll.Segmented value="day" name="view" checked={this.state.view === 'day'}
                                                                onChange={this.changeView}>
                                                Día
                                            </mobiscroll.Segmented>
                                        </mobiscroll.Form>
                                        <mobiscroll.Eventcalendar
                                            themeVariant="light"
                                            display="inline"
                                            theme="ios"
                                            lang='es'
                                            view={this.state.calView}
                                            onEventSelect={this.handleModal}
                                            data={localStorage.theme ? this.state.myEvents2 : this.props.myEvents }
                                        />
                                        <Modal
                                            className='modales-plan'
                                            title="Detalles del evento"
                                            centered
                                            visible={this.state.show}
                                            onOk={() => this.setState({show: false})}
                                            onCancel={() => this.setState({show: false})}
                                            width={600}
                                            footer={[]}
                                        >
                                            <CalendarEventInfo toggle={this.toggle} info={this.state.info} entidad={this.props.entidad} 
                                                                mt={this.props.mt} et={this.props.et} closeModal={this.closeModal} setVisibleEventInfo={()=>this.setState({show: false})}/>
                                        </Modal>
                                    </Col>
                                </Row>
                            </Content>
                        </Layout>
                )}
            </AppFrame>
        );
    }
}

const mapStateToProps = state => ({
    entidad: getStatusEntidad(state),
    mt: getmt(state).split('-')[0],
    et: getet(state).split('-')[0],
    id: getId(state),
    status: getStatusMentor(state),
    programs_user: state.programs_user,
    mentorships: getMentorshipsbyMentor(state),
    myEvents: selectEventsCalendar(state),
    eventsMarket: state.eventos_marketplace
});

export default connect(mapStateToProps, {
    fetchMentorshipsbyMentor,
    fetchTotalEventsUser,
    fetchEventsMarketplace
})(Calendar);