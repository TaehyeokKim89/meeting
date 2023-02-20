import React, { useState } from 'react';
import { useInputs } from '../hooks/Inputs';
import Header from '../components/Header';
import nextId from 'react-id-generator/lib';
import { useDispatch } from 'react-redux';
import { addMeeting } from '../redux/config/modules/meetingsSlice';
import { useNavigate } from 'react-router-dom';

function Input() {
    const [meetingName, setMeetingName] = useInputs('');
    const [whenMeeting, setWhenMeeting] = useInputs('');
    const [whereMeeting, setWhereMeeting] = useInputs('');
    const [detailMeeting, setDetailMeeting] = useInputs('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const randomId = nextId();
    const newId = parseInt(randomId.replace(/[^0-9]/g, ''));

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const meeting = {
            id: newId + 1,
            name: meetingName,
            when: whenMeeting,
            where: whereMeeting,
            desc: detailMeeting,
            isDone: false,
        };

        dispatch(addMeeting({ ...meeting }));
        setMeetingName('');
        setWhenMeeting('');
        setWhereMeeting('');
        setDetailMeeting('');
        navigate('/');
    };

    return (
        <>
            <Header.MainHeader />
            <form onSubmit={onSubmitHandler}>
                <div>
                    <div>
                        무슨 모임?
                        <input type="text" value={meetingName || ''} onChange={setMeetingName} />
                    </div>
                    <div>
                        언제 모일까?
                        <input type="text" value={whenMeeting || ''} onChange={setWhenMeeting} />
                    </div>
                    <div>
                        어디서 모일까?
                        <input type="text" value={whereMeeting || ''} onChange={setWhereMeeting} />
                    </div>
                    <div>
                        어떤 모임인지 자세히 적어줘!
                        <input
                            type="text"
                            value={detailMeeting || ''}
                            onChange={setDetailMeeting}
                        />
                    </div>
                    <div>
                        <button>모임 만들기</button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Input;
