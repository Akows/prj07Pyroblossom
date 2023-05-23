import React from 'react'
import styled from 'styled-components';

const BackGround = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    margin-top: 120px;
`;
const ComponentArea = styled.div`
    width: 70%;
    height: 1200px;

    border: 2px solid black;
`;
const UserInfoArea = styled.div`
    width: 20%;
    height: 1200px;

    border: 2px solid black;
`;

const B1 = styled.div`
    width: 100%;
    height: 250px;

    border: 2px solid black;
`;
const B2 = styled.div`
    width: 100%;
    height: 750px;

    border: 2px solid black;
`;

export const StoreMyPage = () => {
    return (
        <BackGround>
            <ComponentArea>
                컴포넌트 구역
            </ComponentArea>
            <UserInfoArea>
                <B1>
                    유저 프로필
                </B1>
                <B2>
                    사이드 메뉴
                </B2>
            </UserInfoArea>
        </BackGround>
    );
};
