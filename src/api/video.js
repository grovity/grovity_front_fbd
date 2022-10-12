import {URL_BASE} from "../constants";
import getJsonStrError from "../helpers/handleJsonErrors";
import {toast} from "react-toastify";


export const getUrlVideo = async (slug, marketplace) => {
    try {
            let url=`${URL_BASE}/calendario/evento/${slug}/video`
            if(marketplace) {
                url = `${URL_BASE}/calendario/evento/${slug}/video/marketplace`
            }
            const request = await fetch(url, {
                headers: new Headers({
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }),

                method: 'GET'
            });

            const json = await request.json()
            if (request.status !== 200) {
                let error = await getJsonStrError(json)
                toast.error(error)
        } else {
                window.location.assign(json.url_video, '_blank')
            }

    } catch (e) {
       console.log(e)
    }
}