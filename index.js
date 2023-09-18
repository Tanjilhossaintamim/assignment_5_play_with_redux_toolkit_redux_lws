const store = require('./rtk/app/store');
const { fetchVideo, fetchRelatedVideos } = require('./rtk/features/videoSlice');

const fetchmoreVieo = () => {
    const tags = store.getState().video.videos.tags

    let str = ""
    tags && tags.forEach(element => {
        str += `tags_like=${element}&`

    });
    str = str.substring(0, str.length - 1)
    tags && store.dispatch(fetchRelatedVideos(str))
}



store.subscribe(() => {
    store.getState().video.objectLoaded && fetchmoreVieo()



})

store.dispatch(fetchVideo())