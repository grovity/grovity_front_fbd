import {createAction} from "redux-actions";
import {PLAN_TRABAJO} from "../constants";
import {getPlan, getPlanFromMentor} from "../api/plan";

export const fetchPlanbyId = createAction(PLAN_TRABAJO, (id) => getPlan(id));
export const fetchPlanbyIdMentor = createAction(PLAN_TRABAJO, (id_program, id_user) => getPlanFromMentor(id_program, id_user));