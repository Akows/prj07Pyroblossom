import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Imagesrc1 from '../../../assets/images/Genshin-Impact-Logo.webp';
import Imagesrc2 from '../../../assets/images/System_Shop.webp';

const Background = styled.div`
    width: 1200px;
    height: 80px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    background-color: #D3BC8E;
    border-radius: 5px;

    color: #414147;

    @media screen and (max-width: 1200px) {
        width: 95%;
    }
`;

const LogoAndCompoButton = styled.div`
    width: 70%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    & > a > img {
        width: 80px;
        height: 95%;

        margin-left: 10px;
    };
`;
const NavUtilButton = styled.div`
    width: 30%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    & > a > img {
        width: 80px;
        height: 95%;

        margin-left: 10px;
    };
`;

const NavText = styled.div`
    width: 150px;
    height: 50px;

    margin: 5px;

    font-size: 22px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    border: 1px solid gray;
    border-radius: 15px;

    &:hover {
        border: 3px solid gray;
    };
`;

export const MyPageNavigation = ({ isAdminLogin }) => {
    return (
        <Background>

            <LogoAndCompoButton>

                <Link to='/store'>
                    <img src={Imagesrc2} alt='' />
                </Link>
                <NavText>
                    {isAdminLogin && '관리페이지'}
                    {!isAdminLogin && '마이페이지'}
                </NavText>
            </LogoAndCompoButton>

            <NavUtilButton>

                <Link to='/'>
                    <img src={Imagesrc1} alt='' />
                </Link>

            </NavUtilButton>

        </Background>
    );
};
