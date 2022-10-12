export const getVideos = async () => {
    const YOUTUBE_API_KEY = 'AIzaSyC8FhJzWGVTdBxlPYwyVcsCd89MpK1rE4s';
    const playlistId = 'PLAIrgmV8jsCiD73Ic6MUKmSH3luRrqEn-';

    const request = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=18&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}`)
     const json = await request.json()
    return json
};

export const getArticles = async (value) => {

    const request = await fetch(`https://api.grovity.co/searchfiles/`)
    const json = await request.json();
    return json
}