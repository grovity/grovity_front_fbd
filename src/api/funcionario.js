import {URL_BASE} from "../constants";
import {toast} from "react-toastify";


export const deleteFuncionario = (username) => {
    fetch(`${URL_BASE}/usuario/desactivar/${username}`, {
        headers: new Headers({
            'Authorization': `Token ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
        }),
        method: 'PUT',
        body: JSON.stringify({
            'is_active': false
        })
    })
        .then(function (r) {
            if (r.status === 200) {
                toast.success("Usuario eliminado correctamente")
                return true
            } else {
                toast.error("Error al eliminar el usuario. Por favor intente nuevamente")
            }

        })
}
