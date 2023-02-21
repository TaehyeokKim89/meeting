import React from 'react';
import styled from 'styled-components';
import Button from './Button';

function HeaderMain() {
    return (
        <>
            <StHeader>
                <Button.HomeButton>처음으로</Button.HomeButton>
                <StTitle>뭉치면 산다</StTitle>
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

                <StTitle>뭉치면 산다</StTitle>
            </StHeader>
        </>
    );
}

const MainHeader = HeaderMain;
const ListHeader = HeaderList;

const Header = { MainHeader, ListHeader };

export default Header;

const StHeader = styled.div`
    box-shadow: 1px 1px 1px;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
`;

const StTitle = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 20px;
    font-weight: 500;
`;
