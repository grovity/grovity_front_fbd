import {api_key, url_base_weather} from "../components/CardMentorship/CardMentorship";

const getUrlMentorshipByTitle = name_mentorship => {
    return `${url_base_weather}?q=${name_mentorship}&appid=${api_key}&units=metric`;
};

export default getUrlMentorshipByTitle;