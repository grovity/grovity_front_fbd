import {handleActions} from "redux-actions";
import {PLAN_TRABAJO} from "../constants";

export const plan_user = handleActions({
    [PLAN_TRABAJO]: (state, action) => action.payload
}, []);