const { configureStore, getDefaultMiddleware } = require('@reduxjs/toolkit')
const videoSlice = require('../features/videoSlice');
const { createLogger } = require('redux-logger');

const logger = createLogger()

const store = configureStore({
    reducer: {
        video: videoSlice
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(logger)
    }
})
module.exports = store;