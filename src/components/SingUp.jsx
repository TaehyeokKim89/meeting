import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useInputs } from '../hooks/Inputs';
import { StInput } from './Input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { StBtn } from './Button';
import Cookies from 'js-cookie';

function SingUp() {
    const [getId, onGetIdHandler, setGetId] = useInputs('');
    const [getPw, onGetPwHandler, setGetPw] = useInputs('');

    const navigate = useNavigate();
    const getToken = Cookies.get('token');

    useEffect(() => {
        if (getToken) {
            alert('로그인 중입니다.');
            navigate('/');
        }
    }, [navigate, getToken]);

    const addRegister = async () => {
        try {
            await axios.post('http://3.38.191.164/register', {
                id: getId,
                password: getPw,
            });
            navigate('/login');
        } catch (error) {
            alert(`${error.response.data.message}`);
        }
    };

    const signUpButtonHandler = (e) => {
        e.preventDefault();
        addRegister();
        setGetId('');
        setGetPw('');
    };

    return (
        <>
            <StForm onSubmit={signUpButtonHandler}>
                <h1>뭉치면 산다</h1>
                <h3>회원 가입 페이지입니다</h3>
                <div>
                    <label>ID:</label>
                    <StInput
                        required="required"
                        placeholder="아이디를 입력해주세요 "
                        type="text"
                        value={getId}
                        onChange={onGetIdHandler}
                    />
                </div>
                <div>
                    <label>PW:</label>
                    <StInput
                        required="required"
                        placeholder="비밀번호를 입력해주세요  "
                        type="text"
                        value={getPw}
                        onChange={onGetPwHandler}
                    />
                </div>

                <div>
                    <StBtn
                        type="button"
                        onClick={() => {
                            navigate('/login');
                        }}
                    >
                        로그인 페이지
                    </StBtn>
                    <StBtn>가입하기</StBtn>
                </div>
            </StForm>
        </>
    );
}

export default SingUp;

const StForm = styled.form`
    width: 500px;
    height: 600px;
    border: 1px solid black;
    border-radius: 5px;
    padding: 20px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    background-color: #c3b9b9;
`;

const StDupBtnContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: white;
    width: 400px;
    margin-left: 50px;
`;
