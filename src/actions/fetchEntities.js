import {FETCH_ENTITIES} from "../constants";
import {createAction} from 'redux-actions';
import {getEntities} from "../api";

// cuando se conecte con el api, como segundo paremtro se debe pasar la función que hace el fetch al api.
export const fetchEntities = createAction(FETCH_ENTITIES, () => getEntities());
