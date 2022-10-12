import {handleActions} from "redux-actions";
import {FETCH_INDICADORES_EMPRESA} from "../constants";

export const indicadores_empresa = handleActions({
    [FETCH_INDICADORES_EMPRESA]: (state, action) => action.payload
}, []);