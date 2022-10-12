import {mentorships, mentorships_mentor, mentorshipsbymentor} from "./mentorships";
import {reducer as reduxForm} from 'redux-form';
import {institutions} from "./institutions";
import {combineReducers} from "redux";
import {
    array,
    array_tarea,
    empresa_emprendedor,
    empresa_emprendedor_desde_mentor,
    programs_user,
    user,
    users,
    files_users,
    files_users_allEvents,
    emprendedores_mentor,
    empresa_emprendedor_info,
    emprendedores_program,
    sectores,
    emprendedores_entidad, funcionarios_entidad, funcionarios_emprendedores,
} from "./users";
import {emprendedores_programa, programs} from "./programs"
import {
    calificacion_mentor,
    mentors,
    mentors_by_mentorship,
    mentors_by_mentorships,
    mentors_by_program,
    mentors_entidad
} from "./mentors";
import {event_id, events, events_mentor, events_user, files_event, users_event, events_calendar} from "./events";
import alert from "./alert"
import auth from "./auth"
import posts from "./posts"
import {posts_inst} from "./posts";
import {LOGOUT} from "../constants";
import {videos} from "../reducers/videos";
import {articles} from '../reducers/articles';
import {
    areas,
    disponibilidad_mentor, disponibilidad_mentor_day, disponibilidad_mentor_dia,
    eventos_marketplace,
    mentores_marketplace,
    price,
    rating,
    sort
} from "./marketplace";
import {plan_user} from "./plan";
import {indicadores_empresa} from "./empresa";

const appReducer = combineReducers({
    form: reduxForm,

    mentorshipsbymentor,
    mentorships_mentor,
    mentors_by_mentorship,
    auth,
    institutions,
    mentorships,
    programs,
    funcionarios_emprendedores,
    emprendedores_entidad,
    funcionarios_entidad,
    emprendedores_programa,
    emprendedores_mentor,
    emprendedores_program,
    mentors,
    mentors_entidad,
    mentors_by_mentorships,
    calificacion_mentor,
    events,
    events_calendar,
    events_mentor,
    events_user,
    users_event,
     event_id,
    files_event,
    files_users,
    files_users_allEvents,
    users,
    array,
    array_tarea,
    alert,
    user,
    programs_user,
    posts_inst,
    posts,
    sectores,
    empresa_emprendedor,
    indicadores_empresa,
    empresa_emprendedor_info,
    empresa_emprendedor_desde_mentor,
    videos,
    articles,
    disponibilidad_mentor,
    disponibilidad_mentor_day,
    disponibilidad_mentor_dia,
    mentores_marketplace,
    eventos_marketplace,
    plan_user,
    areas,
    sort,
    rating,
    price,
    mentors_by_program,
})


export default (state, action) => {
    if (action.type === LOGOUT) {
        state = undefined;
    }

    return appReducer(state, action)
}