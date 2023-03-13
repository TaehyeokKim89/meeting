import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    meetings: [],
    isLoading: false,
    isError: false,
    error: null,
};

export const __getMeetings = createAsyncThunk('getMeetings', async (payload, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:4000/meetings');
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const meetingsSlice = createSlice({
    name: 'meetingList',
    initialState,
    reducers: {
        addMeeting: (state, action) => {
            state.push(action.payload);
        },
        deleteMeeting: (state, action) => {
            return state.filter((x) => x.id !== action.payload);
        },
        editMeeting: (state, action) => {
            return state.map((x) => {
                if (x.id === action.payload) {
                    return { ...x, isDone: !x.isDone };
                } else {
                    return { ...x };
                }
            });
        },
    },
    extraReducers(builder) {
        builder
            .addCase(__getMeetings.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(__getMeetings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.meetings = action.payload;
            })
            .addCase(__getMeetings.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            });
    },
});

export default meetingsSlice.reducer;
export const { addMeeting, editMeeting, deleteMeeting } = meetingsSlice.actions;
