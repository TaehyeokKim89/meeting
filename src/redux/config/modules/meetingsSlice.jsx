import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const __getMeetings = createAsyncThunk('getMeetings', async (payload, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:4000/meetings');
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const __addMeetings = createAsyncThunk('addMeetings', async (payload, thunkAPI) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/meetings`, payload);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const __deleteMeetings = createAsyncThunk('deleteMeetings', async (id, thunkAPI) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/meetings/${id}`);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const __editDoneMeetings = createAsyncThunk(
    'editDoneMeetings',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.patch(
                `http://localhost:4000/meetings/${payload.id}`,
                payload
            );
            console.log(response);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const __editDetailMeetings = createAsyncThunk(
    'editDetailMeetings',
    async (payload, thunkAPI) => {
        console.log('payload', payload);
        try {
            const response = await axios.patch(
                `http://localhost:4000/meetings/${payload.id}`,
                payload.newMeeting
            );
            console.log(response);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const initialState = {
    meetings: [],
    isLoading: false,
    isError: false,
    error: null,
};

const meetingsSlice = createSlice({
    name: 'meetingList',
    initialState,
    // reducers: {
    //     addMeeting: (state, action) => {
    //         state.push(action.payload);
    //     },
    //     deleteMeeting: (state, action) => {
    //         return state.filter((x) => x.id !== action.payload);
    //     },
    //     editMeeting: (state, action) => {
    //         return state.map((x) => {
    //             if (x.id === action.payload) {
    //                 return { ...x, isDone: !x.isDone };
    //             } else {
    //                 return { ...x };
    //             }
    //         });
    //     },
    // },
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
            })
            .addCase(__addMeetings.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(__addMeetings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.meetings = [...state.meetings, action.payload];
            })
            .addCase(__addMeetings.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })
            .addCase(__deleteMeetings.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(__deleteMeetings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.meetings = state.meetings.filter((x) => x.id !== action.payload);
            })
            .addCase(__deleteMeetings.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })
            .addCase(__editDoneMeetings.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(__editDoneMeetings.fulfilled, (state, action) => {
                console.log(action);
                console.log('action.payload', action.payload);
                state.isLoading = false;
                state.isError = false;
                state.meetings = state.meetings.map((x) => {
                    if (x.id === action.payload.id) {
                        return { ...x, isDone: !x.isDone };
                    } else {
                        return { ...x };
                    }
                });
            })
            .addCase(__editDoneMeetings.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })

            .addCase(__editDetailMeetings.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(__editDetailMeetings.fulfilled, (state, action) => {
                console.log('action.payload', action.payload);
                state.isLoading = false;
                state.isError = false;
                state.meetings = state.meetings.map((x) => {
                    if (x.id === action.payload.id) {
                        return (x = { ...action.payload });
                    } else {
                        return { ...x };
                    }
                });
            })
            .addCase(__editDetailMeetings.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            });
    },
});

export default meetingsSlice.reducer;
export const { addMeeting, editMeeting, deleteMeeting } = meetingsSlice.actions;
