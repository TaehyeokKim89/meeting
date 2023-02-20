import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { Switch } from '@mui/material';
import { editMeeting } from '../redux/config/modules/meetingsSlice';
import Button from '../components/Button';
import { deleteMeeting } from '../redux/config/modules/meetingsSlice';

function Detail() {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const meetings = useSelector((state) => {
        return state.meetingsSlice;
    });

    const foundMeeting = meetings.find((item) => {
        return item.id === parseInt(params.id);
    });

    const [checked, setChecked] = React.useState(!foundMeeting.isDone);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        dispatch(editMeeting(foundMeeting.id));
    };

    const deleteButtonHandler = (id) => {
        dispatch(deleteMeeting(id));
        navigate('/');
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
