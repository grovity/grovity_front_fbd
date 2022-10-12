import React, {useEffect, useState} from 'react'
import './video.scss'
import {URL_BASE} from "../../constants";
import ReactPlayer from "react-player";
import {toast} from "react-toastify";
import getJsonStrError from "../../helpers/handleJsonErrors";
import AppFrame from "../AppFrame/AppFrame";
import {connect} from "react-redux";



const Video = (props) => {
    const [video, setVideo] = useState('');
    useEffect(() => {
        const getUrlVideo = async () => {
            let url=`${URL_BASE}/calendario/evento/${props.match.params.id}/video`
            if(props.event && props.event.marketplace) {
                url = `${URL_BASE}/calendario/evento/${props.match.params.id}/video/marketplace`
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
            }
            setVideo(json.url_video)
        }

        getUrlVideo()
    }, [props.match.params.id])
    return (
        <AppFrame>
            {/*<ReactHlsPlayer*/}
            {/*    url={video}*/}
            {/*    autoplay={false}*/}
            {/*    controls={true}*/}
            {/*    width={800}*/}
            {/*    height={500}*/}
            {/*/>*/}
                <ReactPlayer
                    url={video}
                    className='react-player'
                    playing
                    width={800}
                    controls={true}>
                </ReactPlayer>

        </AppFrame>
    )
}

const mapStateToProps = state => ({
    event:state.event_id


});
export default connect(mapStateToProps, {

})(Video);