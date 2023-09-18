const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");

const initialState = {
    videos: [],
    loading: false,
    error: '',
    objectLoaded: false
}

const videoSlice = createSlice({
    name: 'video',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchVideo.pending, (state, action) => {
            state.loading = true;
            state.error = '';
        })
        builder.addCase(fetchVideo.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.videos = action.payload;
            state.objectLoaded = true

        })
        builder.addCase(fetchVideo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
            state.objectLoaded = false

        })
        builder.addCase(fetchRelatedVideos.pending, (state, action) => {
            state.loading = true;
            state.error = '';
            state.objectLoaded = false

        })
        builder.addCase(fetchRelatedVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.error = ''
            state.videos = action.payload
            state.objectLoaded = false

        })
        builder.addCase(fetchRelatedVideos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
            state.objectLoaded = false

        })
    }
})

const fetchVideo = createAsyncThunk('video/get', async () => {
    const response = await axios.get("http://localhost:9000/videos");



    return response.data
})


const fetchRelatedVideos = createAsyncThunk('relatedvideo/get', async (query) => {
    const response = await axios.get(`http://localhost:9000/videos?${query}`)
    response.data.sort((a, b) => {

        if (a.views > b.views) {
            return -1
        }
        else if (a.views < b.views) {
            return 1
        }
        else { return 0 }
    })
   
    return response.data
})

module.exports = videoSlice.reducer;
module.exports.fetchVideo = fetchVideo;
module.exports.fetchRelatedVideos = fetchRelatedVideos;