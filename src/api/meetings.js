import axios from 'axios';

const getMeetings = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/meetings`);
    return response.data;
};

const addMeetings = async (newMeeting) => {
    console.log(newMeeting);
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/meetings`, newMeeting);
};

export { getMeetings, addMeetings };
