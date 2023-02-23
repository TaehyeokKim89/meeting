import React, { useEffect } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import styled from 'styled-components';
import { getMeetings } from '../api/meetings';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { StGoingDone, StGoingDone2 } from '../components/styled';
import Cookies from 'js-cookie';
import axios from 'axios';

function List() {
    const navigate = useNavigate();

    const token = Cookies.get('token');
    useEffect(() => {
        if (token) {
            authCheck();
        } else {
            alert('로그인이 필요합니다');
            navigate('/login');
        }
    }, [token]);

    const authCheck = async () => {
        try {
            await axios.get('http://3.38.191.164/user', {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.log(error.response.data);
            if (error.response.status === 401) {
                alert('로그인 시간이 만료되었습니다. 다시 로그인 해주세요!');
                navigate('/login');
            }
        }
    };
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
