import React from 'react';
import Header from './Header';
import Button from './Button';
import styled from 'styled-components';
import { getMeetings } from '../api/meetings';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { StGoingDone, StGoingDone2 } from './styled';
import useAuthorization from '../hooks/Auth';

function List() {
    const navigate = useNavigate();

    useAuthorization();
    const { isLoading, isError, data } = useQuery('meetings', getMeetings);

    if (isLoading) {
        return <div>로딩 중입니다</div>;
    }

    if (isError) {
        return <div>에러 발생!</div>;
    }

    return (
        <>
            <StListContainer>
                {data?.map((item) => {
                    return (
                        <StListBox key={item.id}>
                            <StListBoxLayout>
                                <StList>
                                    <h3>{item.name}</h3>
                                    <h5>{item.when}</h5>
                                    <h5>{item.where}</h5>

                                    <div>
                                        <Button.MultiButton
                                            onClick={() => {
                                                navigate(`/list/${item.id}`);
                                            }}
                                        >
                                            자세히 보기
                                        </Button.MultiButton>
                                    </div>
                                </StList>
                                <div>
                                    <StGoingDone>{item.isDone ? '🔴' : '🟢'}</StGoingDone>
                                    <StGoingDone2>{item.isDone ? '마감' : '모집중'}</StGoingDone2>
                                </div>
                            </StListBoxLayout>
                        </StListBox>
                    );
                })}

                <StPlusBtn
                    onClick={() => {
                        navigate(`/input`);
                    }}
                >
                    <h2>➕</h2>
                </StPlusBtn>
            </StListContainer>
        </>
    );
}

export default List;

const StListBox = styled.div`
    min-width: 300px;
    min-height: 250px;
    margin: 10px;
    border-radius: 3px;
    box-shadow: 2px 2px 2px 1px;
    font-size: 19px;
    padding: 10px;
    display: flex;
    flex-direction: column;
`;

const StListContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const StPlusBtn = styled.button`
    min-width: 300px;
    min-height: 240px;
    margin: 10px;
    border-radius: 3px;
    box-shadow: 2px 2px 2px 1px;
    font-size: 30px;
    cursor: pointer;
    background-color: aliceblue;
`;

const StListBoxLayout = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px;
    width: 280px;
`;
const StList = styled.div`
    width: 200px;
    margin: 3px;
`;
