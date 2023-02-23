import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { StInput } from '../pages/Input';
import axios from 'axios';
import { useInputs } from '../hooks/Inputs';
import Cookies from 'js-cookie';
import { StBtn } from './Button';

function Login() {
    const navigate = useNavigate();

    const [getId, onGetIdHandler, setGetId] = useInputs('');
    const [getPw, onGetPwHandler, setGetPw] = useInputs('');

    const logInData = async () => {
        try {
            const response = await axios.post('http://3.38.191.164/login', {
                id: getId,
                password: getPw,
            });
            const { token } = response.data;

            Cookies.set('token', token, { expires: 1 / 24 / 60 });

            navigate('/');
        } catch (error) {
            alert(`${error.response.data.message}`);
        }
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        logInData();
        setGetId('');
        setGetPw('');
    };

    const singUpButtonHandler = () => {
        navigate('/register');
    };

    return (
        <>
            <StForm onSubmit={onSubmitHandler}>
                <h1>뭉치면 산다</h1>
                <h3>흩어지면 죽는거야...다 모여</h3>
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
                        type="password"
                        value={getPw}
                        onChange={onGetPwHandler}
                    />
                </div>
                <div>
                    <StBtn type="submit">로그인</StBtn>
                    <StBtn type="button" onClick={singUpButtonHandler}>
                        회원가입
                    </StBtn>
                </div>
            </StForm>
        </>
    );
}

export default Login;

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
