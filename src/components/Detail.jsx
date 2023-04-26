import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Switch } from '@mui/material';
import Button from './Button';
import styled from 'styled-components';
import { StGoingDone, StGoingDone2 } from './styled';
import Modal from './Modal';
import useAuthorization from '../hooks/Auth';
import { useDispatch, useSelector } from 'react-redux';
import {
    __deleteMeetings,
    __editDoneMeetings,
    __getMeetings,
} from '../redux/config/modules/meetingsSlice';

function Detail() {
    useAuthorization();
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(__getMeetings());
    }, [dispatch]);

    const { meetings } = useSelector((state) => {
        return state.meetingsSlice;
    });
    const foundMeeting = meetings?.find((item) => {
        return item.id === parseInt(params.id);
    });
    const [checked, setChecked] = useState(!foundMeeting?.isDone);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        dispatch(__editDoneMeetings({ id: foundMeeting.id, isDone: !foundMeeting?.isDone }));
    };

    const deleteButtonHandler = (id) => {
        if (window.confirm('삭제하시겠습니까?') === true) {
            dispatch(__deleteMeetings(id));
            alert('삭제 되었습니다.');
            navigate('/');
        } else {
            alert('취소 되었습니다.');
        }
    };

    return (
        <>
            {foundMeeting && (
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
                                <StGoingDone2>
                                    {foundMeeting.isDone ? '마감' : '모집중'}
                                </StGoingDone2>
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
            )}
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;
