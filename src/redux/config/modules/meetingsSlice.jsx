import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: 0,
        name: '아이언맨',
        when: '23년 4월 29일',
        where: '서울',
        desc: '서울에서 모이자 인원 10명',
        isDone: false,
    },
];

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
});

export default meetingsSlice.reducer;
export const { addMeeting, editMeeting, deleteMeeting } = meetingsSlice.actions;
