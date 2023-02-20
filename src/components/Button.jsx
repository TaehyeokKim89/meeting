import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeButton = (props) => {
    const navigate = useNavigate();
    return <button onClick={() => navigate('/')}>{props.children}</button>;
};

const MakeButton = (props) => {
    const navigate2 = useNavigate();
    return <button onClick={() => navigate2('/input')}>{props.children}</button>;
};

const MultiButton = (props) => {
    return <button {...props}>{props.children}</button>;
};

const Button = { HomeButton, MakeButton, MultiButton };
export default Button;
