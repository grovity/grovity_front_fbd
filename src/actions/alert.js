import { toast } from "react-toastify";

export const setAlert = (msg, alertType, timeout = 3000) => async dispatch => {

    if (alertType === 'danger'){
        alertType = 'error'
    }
    if (msg && alertType) {
          toast[alertType](msg)
    } else {
        return;
    }


};
