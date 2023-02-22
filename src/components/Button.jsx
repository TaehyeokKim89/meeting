import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';

const HomeButton = (props) => {
    const navigate = useNavigate();
    return <StBtn onClick={() => navigate('/')}>{props.children}</StBtn>;
};

const MakeButton = (props) => {
    const navigate2 = useNavigate();
    return <StBtn onClick={() => navigate2('/input')}>{props.children}</StBtn>;
};

const MultiButton = (props) => {
    return <StMultiButton {...props}>{props.children}</StMultiButton>;
};

const LogOutButton = (props) => {
    const navigate3 = useNavigate();
    return (
        <StBtn
            onClick={() => {
                Cookies.remove('token');
                navigate3('/login');
            }}
        >
            로그 아웃
        </StBtn>
    );
};

const Button = { HomeButton, MakeButton, MultiButton, LogOutButton };
export default Button;

export const StBtn = styled.button`
    width: 100px;
    height: 40px;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
    background-color: transparent;
    box-shadow: 1px 1px 1px;
`;

const StMultiButton = styled.button`
    background-color: transparent;
    border: none;
    color: blue;
    cursor: pointer;
`;
