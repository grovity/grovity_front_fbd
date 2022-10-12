import {FETCH_INSTITUTIONS} from "../constants";
import {handleActions} from 'redux-actions'

export const institutions = handleActions({
    [FETCH_INSTITUTIONS]: (state, action) => [
        ...action.payload
    ]
}, []);