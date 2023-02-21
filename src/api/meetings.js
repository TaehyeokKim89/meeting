import axios from 'axios';

const getMeetings = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/meetings`);
    return response.data;
};

const addMeetings = async (newMeeting) => {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/meetings`, newMeeting);
};

const deleteMeetings = async (id) => {
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/meetings/${id}`);
};

export { getMeetings, addMeetings, deleteMeetings };
