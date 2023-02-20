import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Button from '../components/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function List() {
    const navigate = useNavigate();

    const meetings = useSelector((state) => {
        return state.meetingsSlice;
    });
    console.log(meetings);
    return (
        <>
            <Header.ListHeader />
            <StListContainer>
                {meetings.map((item) => {
                    return (
                        <StListBox key={item.id}>
                            <div>{item.name}</div>
                            <div>{item.when}</div>
                            <div>{item.where}</div>
                            <div>{item.isDone ? '완료됨' : '진행중'}</div>

                            <div>
                                <Button.MultiButton
                                    onClick={() => {
                                        navigate(`/list/${item.id}`);
                                    }}
                                >
                                    자세히 보기
                                </Button.MultiButton>
                            </div>
                        </StListBox>
                    );
                })}

                <Button.MakeButton>더하기</Button.MakeButton>
            </StListContainer>
        </>
    );
}

export default List;

const StListBox = styled.div`
    width: 180px;
    height: 150px;
    border: 1px solid black;
    margin: 10px;
`;

const StListContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;
