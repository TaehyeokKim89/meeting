import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { StInputContainer, StInput, StTextArea } from './Input';
import { StBtn } from './styled';
import { useParams } from 'react-router-dom';
import { useInputs } from '../hooks/Inputs';
import { useDispatch, useSelector } from 'react-redux';
import { __editDetailMeetings, __getMeetings } from '../redux/config/modules/meetingsSlice';

function Modal() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(__getMeetings());
    }, [dispatch]);

    const { meetings } = useSelector((state) => {
        return state.meetingsSlice;
    });

    const params = useParams();

    const foundMeeting = meetings.find((item) => {
        return item.id === parseInt(params.id);
    });

    const [meetingName, onNameHandler, setMeetingName] = useInputs(foundMeeting.name);
    const [whenMeeting, onWhenHandler, setWhenMeeting] = useInputs(foundMeeting.when);
    const [whereMeeting, onWhereHandler, setWhereMeeting] = useInputs(foundMeeting.where);
    const [detailMeeting, onDetailHandler, setDetailMeeting] = useInputs(foundMeeting.desc);

    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef();

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleClickOutsideModal = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModal(false);
        }
    };

    const onSubmitHandler = (event) => {
        const newMeeting = {
            name: meetingName,
            when: whenMeeting,
            where: whereMeeting,
            desc: detailMeeting,
        };

        event.preventDefault();
        dispatch(__editDetailMeetings({ id: foundMeeting.id, newMeeting }));
        setMeetingName(meetingName);
        setWhenMeeting(whenMeeting);
        setWhereMeeting(whereMeeting);
        setDetailMeeting(detailMeeting);
        handleCloseModal();
    };

    return (
        <>
            <StEditBtn onClick={handleShowModal}>본문 수정</StEditBtn>
            {showModal && (
                <div>
                    <StModal onClick={handleClickOutsideModal}>
                        <StCloseButton className="close" onClick={handleCloseModal}>
                            &times;
                        </StCloseButton>
                        <form onSubmit={onSubmitHandler}>
                            <StInputContainer ref={modalRef}>
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
                                <StBtn>모임 수정하기</StBtn>
                            </StInputContainer>
                        </form>
                    </StModal>
                </div>
            )}
        </>
    );
}

export default Modal;

const StCloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5rem;
    border: none;
    background-color: transparent;
    cursor: pointer;
`;

const StModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
`;

const StEditBtn = styled.button`
    border: none;
    color: blue;
    background-color: transparent;
    margin-bottom: 20px;
    cursor: pointer;
`;
