import React from 'react';
import { useInputs } from '../hooks/Inputs';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { StBtn } from './styled';
import { __addMeetings } from '../redux/config/modules/meetingsSlice';
import { useDispatch, useSelector } from 'react-redux';

function Input() {
    const dispatch = useDispatch();

    const { isLoading, error } = useSelector((state) => {
        console.log(state);
        return state.meetingsSlice;
    });

    const [meetingName, onNameHandler, setMeetingName] = useInputs('');
    const [whenMeeting, onWhenHandler, setWhenMeeting] = useInputs('');
    const [whereMeeting, onWhereHandler, setWhereMeeting] = useInputs('');
    const [detailMeeting, onDetailHandler, setDetailMeeting] = useInputs('');

    const navigate = useNavigate();

    const onSubmitHandler = (event) => {
        const newMeeting = {
            name: meetingName,
            when: whenMeeting,
            where: whereMeeting,
            desc: detailMeeting,
            isDone: false,
        };
        event.preventDefault();
        dispatch(__addMeetings(newMeeting));
        setMeetingName('');
        setWhenMeeting('');
        setWhereMeeting('');
        setDetailMeeting('');
        navigate('/');
    };

    if (isLoading) {
        return <div> 로딩중입니다. </div>;
    }

    if (error) return;

    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <StInputContainer>
                    <div>
                        <label>모임 이름 </label>

                        <StInput
                            required="required"
                            placeholder="모임 이름 입력 (3글자 이상) "
                            type="text"
                            value={meetingName}
                            onChange={onNameHandler}
                            minLength={3}
                        />
                    </div>
                    <div>
                        <label>모일 날짜</label>
                        <StInput
                            required="required"
                            type="date"
                            value={whenMeeting}
                            onChange={onWhenHandler}
                        />
                    </div>
                    <div>
                        <label>모일 장소</label>
                        <StInput
                            required="required"
                            placeholder="모일 장소 입력 "
                            type="text"
                            value={whereMeeting}
                            onChange={onWhereHandler}
                        />
                    </div>
                    <div>
                        <label>모임 내용</label>
                        <StTextArea
                            required="required"
                            placeholder="모임 내용 자세히 입력 (100자 이내) "
                            type="text"
                            value={detailMeeting}
                            onChange={onDetailHandler}
                            maxLength={100}
                        ></StTextArea>
                    </div>
                    <div>
                        <StBtn>모임 만들기</StBtn>
                    </div>
                </StInputContainer>
            </form>
        </>
    );
}

export default Input;

export const StInputContainer = styled.div`
    width: 500px;
    height: 500px;
    background-color: #bababa;
    border: 2px dashed #716a6a;
    box-shadow: 1px 1px 1px;
    margin: auto;
    display: flex;
    flex-direction: column;
    padding: 20px;
    align-items: center;
    justify-content: center;
`;

export const StInput = styled.input`
    width: 400px;
    min-width: 300px;
    min-height: 30px;
    margin: 20px;
    box-shadow: 1px 1px 1px;
    border-radius: 5px;
    border: none;
    font-size: 20px;
    padding-left: 20px;
    outline: none;
`;

export const StTextArea = styled.textarea`
    width: 400px;
    min-width: 300px;
    min-height: 100px;
    margin: 20px;
    box-shadow: 1px 1px 1px;
    border-radius: 5px;
    border: none;
    font-size: 20px;
    padding-left: 20px;
    outline: none;
`;
