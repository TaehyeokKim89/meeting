import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { Switch } from '@mui/material';
import Button from '../components/Button';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getMeetings, deleteMeetings } from '../api/meetings';
import axios from 'axios';
import styled from 'styled-components';
import { StGoingDone, StGoingDone2 } from '../components/styled';
import Modal from '../components/Modal';

function Detail() {
    const params = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { isLoading, isError, data } = useQuery('meetings', getMeetings);

    const editMeetings = async (id) => {
        await axios.patch(`${process.env.REACT_APP_SERVER_URL}/meetings/${id}`, {
            isDone: !foundMeeting.isDone,
        });
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
        if (window.confirm('삭제하시겠습니까?') === true) {
            mutation.mutate(id);
            alert('삭제 되었습니다.');
        } else {
            alert('취소 되었습니다.');
        }
    };

    if (isLoading) {
        return <div>로딩중입니다</div>;
    }
    if (isError) {
        return <div>에러 발생!</div>;
    }

    return (
        <>
            <Header.ListHeader />

            <StDetailContainer>
                <StDetailMeetingCtn>
                    <h5>ID : {foundMeeting.id}</h5>
                    <h1>{foundMeeting.name}</h1>
                    <h3>{foundMeeting.when}</h3>
                    <h3>{foundMeeting.where}</h3>
                    <h2>{foundMeeting.desc}</h2>
                </StDetailMeetingCtn>

                <StCheckContainer>
                    <div>
                        <div>
                            <StGoingDone>{foundMeeting.isDone ? '🔴' : '🟢'}</StGoingDone>
                            <StGoingDone2>{foundMeeting.isDone ? '마감' : '모집중'}</StGoingDone2>
                        </div>

                        <div>
                            <Switch
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </div>
                    </div>
                    <div>
                        <Modal></Modal>
                        <Button.MultiButton
                            onClick={() => {
                                deleteButtonHandler(foundMeeting.id);
                            }}
                        >
                            모임 삭제
                        </Button.MultiButton>
                    </div>
                </StCheckContainer>
            </StDetailContainer>
        </>
    );
}

export default Detail;

const StDetailContainer = styled.div`
    width: 500px;
    height: 500px;
    background-color: #d4d2d2;
    border: 2px dashed #716a6a;
    box-shadow: 1px 1px 1px;
    margin: auto;
    display: flex;
    flex-direction: row;
    padding: 30px;
    align-items: left;
    justify-content: left;
`;

const StDetailMeetingCtn = styled.div`
    width: 450px;
    height: 470px;
`;

const StCheckContainer = styled.div`
    width: 80px;
    height: 470px;
    /* background-color: palegoldenrod; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;
