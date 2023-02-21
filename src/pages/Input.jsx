import React from 'react';
import { useInputs } from '../hooks/Inputs';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { addMeetings } from '../api/meetings';
import { useMutation, useQueryClient } from 'react-query';

function Input() {
    const queryClient = useQueryClient();
    const mutation = useMutation(addMeetings, {
        onSuccess: () => {
            queryClient.invalidateQueries('meetings');
        },
    });

    const [meetingName, onNameHandler, setMeetingName] = useInputs('');
    const [whenMeeting, onWhenHandler, setWhenMeeting] = useInputs('');
    const [whereMeeting, onWhereHandler, setWhereMeeting] = useInputs('');
    const [detailMeeting, onDetailHandler, setDetailMeeting] = useInputs('');

    // const dispatch = useDispatch();
    const navigate = useNavigate();

    // const randomId = nextId();
    // const newId = parseInt(randomId.replace(/[^0-9]/g, ''));

    const onSubmitHandler = (event) => {
        const newMeeting = {
            name: meetingName,
            when: whenMeeting,
            where: whenMeeting,
            desc: detailMeeting,
            isDone: false,
        };
        event.preventDefault();
        mutation.mutate(newMeeting);
        setMeetingName('');
        setWhenMeeting('');
        setWhereMeeting('');
        setDetailMeeting('');
        navigate('/');
    };

    // const onSubmitHandler = (event) => {
    //     event.preventDefault();

    //     const meeting = {
    //         id: newId + 1,
    //         name: meetingName,
    //         when: whenMeeting,
    //         where: whereMeeting,
    //         desc: detailMeeting,
    //         isDone: false,
    //     };

    //     dispatch(addMeeting({ ...meeting }));
    //     setMeetingName('');
    //     setWhenMeeting('');
    //     setWhereMeeting('');
    //     setDetailMeeting('');
    //     navigate('/');
    // };

    return (
        <>
            <Header.MainHeader />
            <form onSubmit={onSubmitHandler}>
                <div>
                    <div>
                        무슨 모임?
                        <input type="text" value={meetingName} onChange={onNameHandler} />
                    </div>
                    <div>
                        언제 모일까?
                        <input type="text" value={whenMeeting} onChange={onWhenHandler} />
                    </div>
                    <div>
                        어디서 모일까?
                        <input type="text" value={whereMeeting} onChange={onWhereHandler} />
                    </div>
                    <div>
                        어떤 모임인지 자세히 적어줘!
                        <input type="text" value={detailMeeting} onChange={onDetailHandler} />
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
