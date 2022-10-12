import React from 'react'
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

mobiscroll.settings = {
    theme: 'ios',
    themeVariant: 'light',
};

const popupBtn = [{
        text: 'Agregar ',
        handler: 'set'
    },
    'cancel'
];

const monthView = {
    calendar: { type: 'month' }
};

const dayView = {
    eventList: { type: 'day' }
};

const respRange = {
    large: {
        touchUi: false
    }
};

const now = new Date();
const btn = '<button type="button" class="mbsc-btn mbsc-btn-outline mbsc-btn-danger md-delete-btn">Delete</button>';
let id = 5;
let preventSet = false;

class TimeDatePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            eventText: '',
            eventDesc: '',
            eventDate: [now, new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 2)],
            controls: ['date', 'time'],
            dateWheels: '|D M d|',
            allDay: false,
            isFree: 'busy',
            events: [{
                id: 1,
                start: new Date(now.getFullYear(), now.getMonth(), 8, 13),
                end: new Date(now.getFullYear(), now.getMonth(), 8, 13, 30),
                text: 'Lunch @ Butcher\'s' + btn,
                color: '#26c57d'
            }, {
                id: 2,
                start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15),
                end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16),
                text: 'General orientation' + btn,
                color: '#fd966a'
            }, {
                id: 3,
                start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 18),
                end: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 22),
                text: 'Dexter BD' + btn,
                color: '#37bbe4'
            }, {
                id: 4,
                start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 30),
                end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 11, 30),
                text: 'Stakeholder mtg.' + btn,
                color: '#d00f0f'
            }]
        };
    }

    textChange = (event) => {
        this.setState({
            eventText: event.target.value
        });
    }

    descChange = (event) => {
        this.setState({
            eventDesc: event.target.value
        });
    }

    allDayChange = (event) => {
        const checked = event.target.checked;
        this.setState({
            allDay: checked,
            controls: checked ? ['date'] : ['date', 'time'],
            dateWheels: checked ? 'MM dd yy' : '|D M d|'
        });
    }

    dateChange = (event, inst) => {
        this.setState({
            eventDate: inst.getVal()
        });
    }

    isFreeChange = (event) => {
        this.setState({
            isFree: event.target.value
        });
    }

    showAddEventPopup = () => {
        this.popup.instance.show();
    }

    addEvent = (event, inst) => {
        const state = this.state;
        const newItem = {
            id: id,
            start: state.eventDate[0],
            end: state.eventDate[1],
            text: (state.eventText || 'New Event') + btn,
            title: state.eventText || 'New Event',
            description: state.eventDesc,
            allDay: state.allDay,
            free: state.isFree === 'free'
        };
        this.setState(state => ({
            events: [...state.events, newItem]
        }));

        this.navigate(this.monthCal.instance, state.eventDate[0]);
    }

    onPageChange = (event, inst) => {
        const day = event.firstDay;

        preventSet = true;
        this.setState({
            eventDate: [day, new Date(day.getFullYear(), day.getMonth(), day.getDate(), day.getHours() + 2)]
        });
        this.navigate(this.monthCal.instance, day);
    }

    onPageLoaded = (event, inst) => {
        if(this.form !== undefined) {
            this.form.instance.refresh();
        }
    }

    onEventSelect = (event, inst) => {
        if (event.domEvent.target.classList.contains('md-delete-btn')) {
            mobiscroll.confirm({
                title: 'Confirm Deletion',
                message: 'Are you sure you want to delete this item?',
                okText: 'Delete',
                callback: (res) => {
                    if (res) {
                        //remove element by id
                        const events = this.state.events.slice(0);
                        const index = events.findIndex(item => item.id === event.event.id);

                        events.splice(index, 1);
                        this.setState({
                            events: events
                        });

                        mobiscroll.toast({
                            message: 'Deleted'
                        });
                    }
                }
            });
        }
    }

    onSetDate = (event) => {
        if (!preventSet && this.dayCal !== undefined) {
            this.navigate(this.dayCal.instance, event.date);
        }
        preventSet = false;
    }

    navigate(inst, val) {
        if (inst) {
            inst.navigate(val);
        }
    }

    setMonthCal = (comp) => {
        this.monthCal = comp;
    }

    setDayCal = (comp) => {
        this.dayCal = comp;
    }

    setPopup = (comp) => {
        this.popup = comp;
    }

    setRange = (comp) => {
        this.range = comp;
    }

    setForm = (comp) => {
        this.form = comp;
    }

    render () {
        return (
            <div>
                <mobiscroll.Form ref={this.setForm}>
                    <div className="mbsc-grid md-add-event-demo">
                        <div className="mbsc-row mbsc-no-padding">
                            <div className="mbsc-col-md-4 mbsc-col-12">
                                <mobiscroll.Eventcalendar
                                    ref={this.setMonthCal}
                                    display="inline"
                                    view={monthView}
                                    data={this.state.events}
                                    onSetDate={this.onSetDate}
                                />
                                <div className="mbsc-btn-group-block">
                                    <mobiscroll.Button onClick={this.showAddEventPopup}>Agregar disponibilidad</mobiscroll.Button>
                                </div>
                            </div>
                            <div className="mbsc-col-md-8 mbsc-col-12 md-col-right">
                                <mobiscroll.Eventcalendar
                                    ref={this.setDayCal}
                                    display="inline"
                                    layout="liquid"
                                    view={dayView}
                                    data={this.state.events}
                                    onPageChange={this.onPageChange}
                                    onPageLoaded={this.onPageLoaded}
                                    onEventSelect={this.onEventSelect}
                                />
                            </div>
                        </div>
                    </div>
                </mobiscroll.Form>
                <mobiscroll.Popup
                    ref={this.setPopup}
                    display="center"
                    cssClass="mbsc-no-padding"
                    buttons={popupBtn}
                    headerText="Agregar disponibilidad"
                    onSet={this.addEvent}
                >
                    <mobiscroll.Form>
                        <mobiscroll.FormGroup>
                            <mobiscroll.Form.Label>
                                Title
                                <input value={this.state.eventText} onChange={this.textChange} />
                            </mobiscroll.Form.Label>
                            <mobiscroll.Textarea value={this.state.eventDesc} onChange={this.descChange}>
                                Description
                            </mobiscroll.Textarea>
                        </mobiscroll.FormGroup>
                        <mobiscroll.FormGroup>
                            <mobiscroll.Switch value={this.state.allDay} onChange={this.allDayChange}>
                                All-day
                            </mobiscroll.Switch>
                                <mobiscroll.Form.Label>
                                    Starts
                                    <input id="startDate" />
                                </mobiscroll.Form.Label>
                                <mobiscroll.Form.Label>
                                    Ends
                                    <input id="endDate" />
                                </mobiscroll.Form.Label>
                                <mobiscroll.Range
                                    ref={this.setRange}
                                    type="hidden"
                                    controls={this.state.controls}
                                    dateWheels={this.state.dateWheels}
                                    startInput="#startDate"
                                    endInput="#endDate"
                                    tabs={false}
                                    responsive={respRange}
                                    value={this.state.eventDate}
                                    onSet={this.dateChange}
                                    showSelector={false}
                                />
                            <mobiscroll.Segmented name="group" value="busy" checked={this.state.isFree === 'busy'} onChange={this.isFreeChange}>
                                Show as busy
                            </mobiscroll.Segmented>
                            <mobiscroll.Segmented name="group" value="free" checked={this.state.isFree === 'free'} onChange={this.isFreeChange}>
                                Show as free
                            </mobiscroll.Segmented>
                        </mobiscroll.FormGroup>
                    </mobiscroll.Form>
                </mobiscroll.Popup>
            </div>
        );
    }
}

export default TimeDatePicker