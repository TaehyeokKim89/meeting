import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';

function HeaderMain() {
    return (
        <>
            <StHeader>
                <Button.HomeButton>처음으로</Button.HomeButton>
                <div>Title</div>
            </StHeader>
        </>
    );
}
function HeaderList() {
    return (
        <>
            <StHeader>
                <div>
                    <Button.HomeButton>처음으로</Button.HomeButton>
                    <Button.MakeButton>모임 만들기</Button.MakeButton>
                </div>
                <div>Title</div>
            </StHeader>
        </>
    );
}

const MainHeader = HeaderMain;
const ListHeader = HeaderList;

const Header = { MainHeader, ListHeader };

export default Header;

const StHeader = styled.div`
    border: 1px solid black;
    display: flex;
    justify-content: space-between;
`;
