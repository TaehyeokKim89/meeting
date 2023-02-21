import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import styled from 'styled-components';
import { getMeetings } from '../api/meetings';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

function List() {
    const navigate = useNavigate();

    const { isLoading, isError, data } = useQuery('meetings', getMeetings);

    if (isLoading) {
        return <div>로딩 중입니다</div>;
    }

    if (isError) {
        return <div>에러 발생!</div>;
    }

    return (
        <>
            <Header.ListHeader />
            <StListContainer>
                {data?.map((item) => {
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
