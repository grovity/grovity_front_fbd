import {URL_BASE} from "../constants";
import {toast} from "react-toastify";
import getJsonStrError from "./handleJsonErrors";

const link_zoom_create = (obj, status, entidad) => {
    if ((status || entidad) && !obj.comprador) {
        return async (e) => {
            let url = `${URL_BASE}/calendario/evento/${obj.slug}/iniciar`
            if(obj.marketplace) {
                url = `${URL_BASE}/marketplace/iniciar/evento/${obj.slug}`
            }
            const url_zoom = await fetch(url, {
                headers: new Headers({
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }),
            });
            const json = await url_zoom.json();
            if (url_zoom.status === 200) {
                window.open(`${json.url_mentor}`, "_blank")
            } else {
                let error = await getJsonStrError(json)
                toast.error(error)
            }

        }
    } else {
        return (e) => {
            if (obj.url_zoom) {
                window.open(`${obj.url_zoom}`, "_blank")
            } else {
                toast.error("La sesión aún no ha sido inicializada, por favor intente nuevamente en un momento")
                let reload = () => {
                    window.location.reload()
                }
                setTimeout(reload, 3000)
            }
        }
    }

}

export default link_zoom_create
