import { configureStore } from '@reduxjs/toolkit';
import meetingsSlice from './modules/meetingsSlice';

const store = configureStore({
    reducer: {
        meetingsSlice,
    },
});

export default store;
