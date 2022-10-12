import {createAction} from './index';
import {VIDEOS_SEARCH} from "../../constants";
import {getVideosBySearch} from '../api/videos';



export const fetchVideosSearch = createAction(VIDEOS_SEARCH, (value) => {
    return getVideosBySearch(value)
});