import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { Switch } from '@mui/material';
import Button from '../components/Button';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getMeetings, deleteMeetings } from '../api/meetings';
import axios from 'axios';

function Detail() {
    const params = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { isLoading, isError, data } = useQuery('meetings', getMeetings);

    const editMeetings = async (id) => {
        await axios.patch(`${process.env.REACT_APP_SERVER_URL}/meetings/${id}`, {
            isDone: !foundMeeting.isDone,
        }); //editMeetings를 api에 몰고 싶은데 isDone 처리가 안됨
    };

    const mutation = useMutation(deleteMeetings, {
        onSuccess: () => {
            queryClient.invalidateQueries('meetings');
            navigate('/');
        },
    });

    const mutation2 = useMutation(editMeetings, {
        onSuccess: () => {
            queryClient.invalidateQueries('meetings');
        },
    });

    const foundMeeting = data.find((item) => {
        return item.id === parseInt(params.id);
    });
    const [checked, setChecked] = useState(!foundMeeting.isDone);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        mutation2.mutate(foundMeeting.id);
    };

    const deleteButtonHandler = (id) => {
        mutation.mutate(id);
    };

    return (
        <>
            <Header.ListHeader />
            <div>
                <div>{foundMeeting.id}</div>
                <div>{foundMeeting.name}</div>
                <div>{foundMeeting.when}</div>
                <div>{foundMeeting.where}</div>
                <div>{foundMeeting.desc}</div>

                <div>
                    <Button.MultiButton
                        onClick={() => {
                            deleteButtonHandler(foundMeeting.id);
                        }}
                    >
                        삭제
                    </Button.MultiButton>
                </div>
                <div>{foundMeeting.isDone ? ' 완료됨' : '진행중'}</div>
            </div>

            <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />
        </>
    );
}

export default Detail;
