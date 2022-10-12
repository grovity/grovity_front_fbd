export const getEvents = state => state.events;

export const selectAllEvents = state => {
    if (state.files_users_allEvents !== undefined) {
        return state.files_users_allEvents
    }

    return []
};

export const selectEventId = state => {
    if (state.event_id !== null && state.event_id[0] !== undefined) {
        return state.event_id[0]
    }

    return []
};

export const selectEventsCalendar = state => {
    if (state.events_calendar !== null && state.events_calendar !== undefined) {
        return state.events_calendar
    }

    return []
};


export const getAsistentesEvento = state => {
    if (state.users_event !== null || state.users_event !== undefined) {
        return state.users_event
    }

    return null
};


export const getEventId = state => {
    if (state.event_id !== null && state.event_id[0] !== undefined) {
        return state.event_id[0].id
    }

    return null
};
