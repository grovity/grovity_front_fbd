export const getVideos = async () => {
    const YOUTUBE_API_KEY = 'AIzaSyC8FhJzWGVTdBxlPYwyVcsCd89MpK1rE4s';
    const playlistId = 'PLzKJi2GjpkEFLvBB_JBd4tcbpHQ9F0dTg';

    const request = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=18&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}`, {
        headers: new Headers({
            value: ''
        }),

        method: 'GET'
    });

    const json = await request.json();

    return json
};

export async function getVideosBySearch(value) {
    const YOUTUBE_API_KEY = 'AIzaSyC8FhJzWGVTdBxlPYwyVcsCd89MpK1rE4s';
    const channelId = 'UC-b3c7kxa5vU-bnmaROgvog';

    const request = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=18&q=${value}&key=${YOUTUBE_API_KEY}`, {
        headers: new Headers({
            value: ''
        }),

        method: 'GET'
    });

    const json = await request.json();

    return json
}